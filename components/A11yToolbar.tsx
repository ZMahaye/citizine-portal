
import React, { useState } from 'react';

interface A11yToolbarProps {
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  fontSize: 'normal' | 'large' | 'xl';
  setFontSize: (v: 'normal' | 'large' | 'xl') => void;
  dyslexicFont: boolean;
  setDyslexicFont: (v: boolean) => void;
  t: any;
}

const A11yToolbar: React.FC<A11yToolbarProps> = ({ 
  highContrast, setHighContrast, fontSize, setFontSize, dyslexicFont, setDyslexicFont, t 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-[90]">
      {isOpen && (
        <div className={`mb-4 p-6 rounded-3xl shadow-2xl w-64 animate-in fade-in slide-in-from-right-4 ${highContrast ? 'bg-zinc-900 border border-zinc-700 text-white' : 'bg-white border border-slate-200 text-slate-800'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-sm uppercase tracking-widest">{t.a11y.toolbar}</h3>
            <button onClick={() => setIsOpen(false)} aria-label="Close accessibility menu">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold">{t.a11y.contrast}</span>
              <button 
                onClick={() => setHighContrast(!highContrast)}
                className={`w-12 h-6 rounded-full transition-colors relative ${highContrast ? 'bg-green-600' : 'bg-slate-200'}`}
                aria-pressed={highContrast}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${highContrast ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold">{t.a11y.text_size}</span>
              <div className="grid grid-cols-3 gap-1">
                {(['normal', 'large', 'xl'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`text-[10px] py-2 rounded-lg border font-bold ${
                      fontSize === size 
                        ? (highContrast ? 'bg-white text-black border-white' : 'bg-green-700 text-white border-green-700') 
                        : (highContrast ? 'border-zinc-700 text-zinc-400' : 'border-slate-200 text-slate-500')
                    }`}
                  >
                    {size === 'normal' ? t.a11y.normal : size === 'large' ? t.a11y.large : t.a11y.extra_large}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs font-bold">{t.a11y.dyslexic}</span>
              <button 
                onClick={() => setDyslexicFont(!dyslexicFont)}
                className={`w-12 h-6 rounded-full transition-colors relative ${dyslexicFont ? 'bg-green-600' : 'bg-slate-200'}`}
                aria-pressed={dyslexicFont}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${dyslexicFont ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility options"
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition transform hover:scale-110 ${
          highContrast ? 'bg-white text-black' : 'bg-slate-800 text-white'
        }`}
      >
        <i className="fa-solid fa-universal-access text-xl"></i>
      </button>
    </div>
  );
};

export default A11yToolbar;
