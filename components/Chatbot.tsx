
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { GoogleGenAI, Modality } from "@google/genai";

interface Message {
  text: string;
  sender: 'user' | 'bot';
  sources?: { title: string; uri: string }[];
}

const Chatbot: React.FC<{ lang: string; t: any }> = ({ lang, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: t.chatbot.greeting, sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Update greeting when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'bot') {
      setMessages([{ text: t.chatbot.greeting, sender: 'bot' }]);
    }
  }, [lang, t.chatbot.greeting]);

  const speakMessage = async (text: string) => {
    if (isReading) return;
    setIsReading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `${lang === 'zu' ? 'Say in isiZulu: ' : 'Say: '}${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: lang === 'zu' ? 'Puck' : 'Kore' } },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.onended = () => setIsReading(false);
        source.start();
      }
    } catch (e) {
      console.error("TTS Error:", e);
      setIsReading(false);
    }
  };

  // Helper functions for audio
  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
    return buffer;
  }

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setIsTyping(true);

    const result = await getGeminiResponse(userMsg, lang);
    setMessages(prev => [...prev, { 
      text: result.text, 
      sender: 'bot',
      sources: result.sources
    }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col mb-4 animate-in slide-in-from-bottom-5 fade-in duration-300" role="dialog" aria-label="Chat assistant">
          <div className="bg-green-800 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-robot text-sm"></i>
              </div>
              <h3 className="text-sm font-bold">{t.chatbot.title}</h3>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat"><i className="fa-solid fa-times"></i></button>
          </div>

          <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-slate-50" aria-live="polite">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm relative group ${
                  msg.sender === 'user' 
                    ? 'bg-green-700 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm'
                }`}>
                  <p>{msg.text}</p>
                  {msg.sender === 'bot' && (
                    <button 
                      onClick={() => speakMessage(msg.text)}
                      className="absolute -right-10 top-0 p-2 text-slate-400 hover:text-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={t.chatbot.listen}
                      title={t.chatbot.listen}
                    >
                      <i className={`fa-solid ${isReading ? 'fa-volume-high animate-pulse' : 'fa-volume-up'}`}></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.chatbot.placeholder}
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              aria-label="Message input"
            />
            <button onClick={handleSend} className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center hover:bg-green-800 transition" aria-label="Send message">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat assistant"
        className="w-16 h-16 bg-green-700 text-white rounded-full shadow-xl hover:bg-green-800 transition-all transform hover:scale-110 flex items-center justify-center"
      >
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-comment-dots'} text-2xl`}></i>
      </button>
    </div>
  );
};

export default Chatbot;
