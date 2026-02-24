
import React, { useState } from 'react';

interface ReportIssueProps {
  lang: string;
  t: any;
  highContrast?: boolean;
}

const ReportIssue: React.FC<ReportIssueProps> = ({ t, highContrast }) => {
  const [step, setStep] = useState(1);
  const [issueType, setIssueType] = useState('');
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const issueTypes = [
    { label: 'Pothole', icon: 'fa-circle-dot' },
    { label: 'Broken Signage', icon: 'fa-map-signs' },
    { label: 'Street Light', icon: 'fa-lightbulb' },
    { label: 'Flooding', icon: 'fa-water' },
  ];

  const handleGPS = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setLocation('N3 South, near Pavilion, Durban');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in zoom-in-95 duration-500">
      <div className={`rounded-[40px] shadow-2xl overflow-hidden border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100'}`}>
        <div className={`p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative ${highContrast ? 'bg-zinc-800' : 'bg-slate-900 text-white'}`}>
          <div className="space-y-1">
            <h2 className={`text-3xl font-black italic tracking-tighter ${highContrast ? 'text-yellow-400' : 'text-white'}`}>{t.report.title}</h2>
            <p className="text-xs text-green-400 font-bold uppercase tracking-widest">{t.report.system}</p>
          </div>
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                step === s ? 'bg-green-500 text-slate-900' : (highContrast ? 'bg-zinc-700 text-zinc-500' : 'bg-slate-800 text-slate-500')
              }`}>
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="p-10">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center space-y-2">
                <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{t.report.step_1}</h3>
                <p className="text-slate-500">{t.report.category_q}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {issueTypes.map((t_item) => (
                  <button
                    key={t_item.label}
                    onClick={() => { setIssueType(t_item.label); setStep(2); }}
                    className={`p-6 rounded-3xl border-2 text-left group transition-all ${
                      issueType === t_item.label ? 'border-green-600 bg-green-50' : (highContrast ? 'border-zinc-800 hover:border-zinc-700' : 'border-slate-100 hover:border-green-200')
                    }`}
                  >
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                      <i className={`fa-solid ${t_item.icon} text-slate-400`}></i>
                    </div>
                    <h4 className={`font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{t_item.label}</h4>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8">
              <div className="text-center space-y-2">
                <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{t.report.step_2}</h3>
                <p className="text-slate-500">{t.report.evidence_q}</p>
              </div>
              <div className="aspect-video bg-slate-100 rounded-[32px] flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
                <i className="fa-solid fa-camera text-5xl"></i>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(3)} className="flex-1 bg-green-700 text-white py-4 rounded-2xl font-bold">{t.report.take_photo}</button>
                <button className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold">{t.report.gallery}</button>
              </div>
              <button onClick={() => setStep(1)} className="text-slate-400 font-bold block mx-auto">{t.report.back}</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8">
              <div className="text-center space-y-2">
                <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{t.report.step_3}</h3>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{t.report.road_loc}</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`w-full px-6 py-4 rounded-2xl outline-none border-2 transition ${
                      highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-100 focus:border-green-600'
                    }`}
                  />
                  <button onClick={handleGPS} className="absolute right-3 top-3 w-10 h-10 bg-green-100 text-green-700 rounded-xl">
                    <i className={`fa-solid ${isLocating ? 'fa-spinner fa-spin' : 'fa-location-dot'}`}></i>
                  </button>
                </div>
              </div>
              <button onClick={() => setStep(1)} className="w-full bg-green-700 text-white py-5 rounded-2xl font-black shadow-xl">{t.report.submit}</button>
              <button onClick={() => setStep(2)} className="text-slate-400 font-bold block mx-auto">{t.report.back}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
