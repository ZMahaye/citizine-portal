import React, { useState } from 'react';

interface VukuzakheRegistrationProps {
  lang: string;
  t: any;
  highContrast?: boolean;
  onNavigate?: (page: string) => void;
}

const CIDB_GRADES = ['Grade 1 (up to R200k)', 'Grade 2 (up to R650k)', 'Grade 3 (up to R2m)', 'Grade 4 (up to R4m)', 'Grade 5 (up to R6.5m)', 'Grade 6 (up to R13m)', 'Grade 7 (up to R40m)', 'Grade 8 (up to R130m)', 'Grade 9 (R130m+)'];
const TRADES = ['Roads & Earthworks', 'Building & Civil', 'Electrical Works', 'Plumbing & Drainage', 'Painting & Finishing', 'Landscaping', 'Fencing', 'Bridge Construction', 'Other'];
const REGIONS = ['eThekwini', 'uMgungundlovu', 'uThukela', 'Zululand', 'uMkhanyakude', 'King Cetshwayo', 'iLembe', 'Harry Gwala', 'uMzinyathi', 'Amajuba', 'uMkhambathini'];

const VukuzakheRegistration: React.FC<VukuzakheRegistrationProps> = ({ t, highContrast, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');
  const [formData, setFormData] = useState({
    contactName: '',
    idNumber: '',
    contactNumber: '',
    email: '',
    companyName: '',
    companyReg: '',
    address: '',
    region: '',
    cidbGrade: '',
    trade: '',
    yearsExperience: '',
    vatNumber: '',
    bbbeeLevel: '',
    declaration: false,
  });

  const steps = [
    { number: 1, label: 'Contact Person', icon: 'fa-user' },
    { number: 2, label: 'Company & Skills', icon: 'fa-helmet-safety' },
    { number: 3, label: 'Review & Submit', icon: 'fa-clipboard-check' },
  ];

  const inp = `w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none transition ${
    highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
  }`;
  const lbl = `block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`;
  const card = `p-8 rounded-3xl border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-lg'}`;

  const handle = (field: string, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const isStepComplete = (step: number) => {
    if (step === 1) return !!(formData.contactName && formData.idNumber && formData.contactNumber && formData.email);
    if (step === 2) return !!(formData.companyName && formData.cidbGrade && formData.trade && formData.region);
    if (step === 3) return formData.declaration;
    return false;
  };

  const handleSubmit = () => {
    const ref = `VUK-2026-${Math.floor(Math.random() * 90000 + 10000)}`;
    setReference(ref);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-in fade-in duration-700">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto text-4xl ${highContrast ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-700'}`}>
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <h1 className={`text-3xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Registration Submitted!</h1>
        <p className="text-slate-500">Your Vukuzakhe Contractor Programme registration has been received.</p>
        <div className={`p-6 rounded-2xl border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-slate-50 border-slate-200'}`}>
          <p className="text-sm text-slate-400 mb-1">Reference Number</p>
          <p className={`text-2xl font-mono font-bold ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>{reference}</p>
        </div>
        <p className="text-sm text-slate-500">A KZN DOT representative will contact you within 10 working days to confirm your registration and next steps.</p>
        <button
          onClick={() => onNavigate && onNavigate('services')}
          className="px-8 py-3 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition"
        >
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10 animate-in fade-in duration-700">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-2xl ${highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-green-100 text-green-700'}`}>
          <i className="fa-solid fa-helmet-safety"></i>
        </div>
        <h1 className={`text-4xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Vukuzakhe Registration</h1>
        <p className="text-slate-500">Register for the KZN Contractor Development Programme and access government contracts.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {steps.map((step, idx) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                currentStep === step.number
                  ? (highContrast ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/30' : 'bg-green-700 text-white ring-4 ring-green-200 shadow-lg')
                  : currentStep > step.number
                    ? (highContrast ? 'bg-zinc-700 text-white' : 'bg-green-100 text-green-700')
                    : (highContrast ? 'bg-zinc-800 text-zinc-500' : 'bg-slate-100 text-slate-400')
              }`}>
                {currentStep > step.number ? <i className="fa-solid fa-check"></i> : <i className={`fa-solid ${step.icon}`}></i>}
              </div>
              <span className={`text-xs font-medium text-center hidden sm:block ${currentStep >= step.number ? (highContrast ? 'text-white' : 'text-slate-700') : 'text-slate-400'}`}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-2 transition-colors ${currentStep > step.number ? (highContrast ? 'bg-zinc-600' : 'bg-green-200') : (highContrast ? 'bg-zinc-800' : 'bg-slate-100')}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className={card}>
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Contact Person Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className={lbl}>Full Name</label>
                    <input type="text" value={formData.contactName} onChange={(e) => handle('contactName', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>RSA ID Number</label>
                    <input type="text" value={formData.idNumber} onChange={(e) => handle('idNumber', e.target.value)} placeholder="0000000000000" maxLength={13} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Contact Number</label>
                    <input type="tel" value={formData.contactNumber} onChange={(e) => handle('contactNumber', e.target.value)} placeholder="0XX XXX XXXX" className={inp} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={lbl}>Email Address</label>
                    <input type="email" value={formData.email} onChange={(e) => handle('email', e.target.value)} placeholder="name@example.com" className={inp} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={lbl}>Business / Residential Address</label>
                    <input type="text" value={formData.address} onChange={(e) => handle('address', e.target.value)} className={inp} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Company & Skills Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className={lbl}>Company / Entity Name</label>
                    <input type="text" value={formData.companyName} onChange={(e) => handle('companyName', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Company Reg. Number (if applicable)</label>
                    <input type="text" value={formData.companyReg} onChange={(e) => handle('companyReg', e.target.value)} placeholder="e.g. 2021/000000/07" className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>VAT Number (if applicable)</label>
                    <input type="text" value={formData.vatNumber} onChange={(e) => handle('vatNumber', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>CIDB Grade</label>
                    <select value={formData.cidbGrade} onChange={(e) => handle('cidbGrade', e.target.value)} className={inp}>
                      <option value="">Select grade...</option>
                      {CIDB_GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>B-BBEE Level</label>
                    <select value={formData.bbbeeLevel} onChange={(e) => handle('bbbeeLevel', e.target.value)} className={inp}>
                      <option value="">Select level...</option>
                      {['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Exempt Micro Enterprise', 'Qualifying Small Enterprise'].map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>Primary Trade / Expertise</label>
                    <select value={formData.trade} onChange={(e) => handle('trade', e.target.value)} className={inp}>
                      <option value="">Select trade...</option>
                      {TRADES.map((tr) => <option key={tr} value={tr}>{tr}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>Years of Experience</label>
                    <select value={formData.yearsExperience} onChange={(e) => handle('yearsExperience', e.target.value)} className={inp}>
                      <option value="">Select...</option>
                      {['Less than 1 year', '1–2 years', '3–5 years', '6–10 years', '10+ years'].map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={lbl}>Operating Region</label>
                    <select value={formData.region} onChange={(e) => handle('region', e.target.value)} className={inp}>
                      <option value="">Select region...</option>
                      {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Review & Submit</h2>
                <div className={`rounded-2xl border divide-y ${highContrast ? 'border-zinc-700 divide-zinc-700' : 'border-slate-100 divide-slate-100'}`}>
                  {[
                    ['Contact Person', formData.contactName],
                    ['ID Number', formData.idNumber],
                    ['Contact', formData.contactNumber],
                    ['Email', formData.email],
                    ['Company Name', formData.companyName],
                    ['CIDB Grade', formData.cidbGrade],
                    ['Trade', formData.trade],
                    ['Experience', formData.yearsExperience],
                    ['Region', formData.region],
                    ['B-BBEE Level', formData.bbbeeLevel],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between px-5 py-3">
                      <span className="text-sm text-slate-400">{label}</span>
                      <span className={`text-sm font-semibold ${highContrast ? 'text-white' : 'text-slate-700'}`}>{value || '—'}</span>
                    </div>
                  ))}
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={formData.declaration} onChange={(e) => handle('declaration', e.target.checked)} className="mt-1 w-5 h-5 accent-green-700" />
                  <span className={`text-sm ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                    I declare that all information is true and correct and I consent to verification by the KZN Department of Transport.
                  </span>
                </label>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onNavigate && onNavigate('services')}
                className={`px-6 py-3 rounded-xl font-bold border transition ${highContrast ? 'border-zinc-600 text-white hover:bg-zinc-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                <i className="fa-solid fa-chevron-left mr-2 text-xs"></i>{currentStep > 1 ? 'Back' : 'Cancel'}
              </button>
              {currentStep < 3 ? (
                <button onClick={() => setCurrentStep(currentStep + 1)} disabled={!isStepComplete(currentStep)} className="px-8 py-3 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition disabled:opacity-40 disabled:cursor-not-allowed">
                  Continue <i className="fa-solid fa-chevron-right ml-2 text-xs"></i>
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={!isStepComplete(3)} className="px-8 py-3 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition disabled:opacity-40 disabled:cursor-not-allowed">
                  Submit Registration <i className="fa-solid fa-paper-plane ml-2 text-xs"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`p-6 rounded-2xl border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-sm'}`}>
            <h3 className={`font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>Requirements</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              {['Certified copy of RSA ID', 'Company registration docs', 'CIDB certificate', 'B-BBEE certificate', 'Tax clearance certificate', 'Registration fee: R350'].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <i className={`fa-solid fa-circle-check mt-0.5 ${highContrast ? 'text-yellow-400' : 'text-green-600'}`}></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`p-6 rounded-2xl border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-green-50 border-green-100'}`}>
            <h3 className={`font-bold mb-2 text-sm ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}><i className="fa-solid fa-star mr-2"></i>Programme Benefits</h3>
            <p className={`text-sm ${highContrast ? 'text-zinc-300' : 'text-green-700'}`}>Access to government infrastructure contracts, mentorship, and SMME development support.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VukuzakheRegistration;
