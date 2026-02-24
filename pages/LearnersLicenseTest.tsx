import React, { useState } from 'react';

interface LearnersLicenseTestProps {
  lang: string;
  t: any;
  highContrast?: boolean;
  onNavigate?: (page: string) => void;
}

const DLTCS = [
  'Durban DLTC - 53 Bram Fischer Rd',
  'Pinetown DLTC - Old Main Rd',
  'Pietermaritzburg DLTC - Longmarket St',
  'Richards Bay DLTC - Naboomnek Rd',
  'Newcastle DLTC - Allen St',
  'Ladysmith DLTC - Queen St',
];

const LICENSE_CODES = [
  { code: 'A', desc: 'Motorcycle only' },
  { code: 'A1', desc: 'Motorcycle ≤ 125cc' },
  { code: 'B', desc: 'Motor vehicle (not code A)' },
  { code: 'C1', desc: 'Motor vehicle > 3 500 kg' },
  { code: 'C', desc: 'Motor vehicle > 16 000 kg' },
  { code: 'EB', desc: 'Motor vehicle with trailer' },
  { code: 'EC1', desc: 'C1 vehicle with trailer' },
  { code: 'EC', desc: 'C vehicle with trailer' },
];

const LearnersLicenseTest: React.FC<LearnersLicenseTestProps> = ({ t, highContrast, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    dateOfBirth: '',
    contactNumber: '',
    email: '',
    address: '',
    postalCode: '',
    licenseCode: '',
    dltc: '',
    preferredDate: '',
    previousAttempts: '0',
    declaration: false,
  });

  const steps = [
    { number: 1, label: 'Personal Details', icon: 'fa-user' },
    { number: 2, label: 'Test Booking', icon: 'fa-book-open' },
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
    if (step === 1) return !!(formData.fullName && formData.idNumber && formData.dateOfBirth && formData.contactNumber && formData.email);
    if (step === 2) return !!(formData.licenseCode && formData.dltc && formData.preferredDate);
    if (step === 3) return formData.declaration;
    return false;
  };

  const handleSubmit = () => {
    const ref = `LLT-2026-${Math.floor(Math.random() * 90000 + 10000)}`;
    setReference(ref);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-in fade-in duration-700">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto text-4xl ${highContrast ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-700'}`}>
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <h1 className={`text-3xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Booking Confirmed!</h1>
        <p className="text-slate-500">Your Learner's License Test has been booked successfully.</p>
        <div className={`p-6 rounded-2xl border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-slate-50 border-slate-200'}`}>
          <p className="text-sm text-slate-400 mb-1">Reference Number</p>
          <p className={`text-2xl font-mono font-bold ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>{reference}</p>
        </div>
        <div className={`p-4 rounded-xl text-left ${highContrast ? 'bg-zinc-800' : 'bg-blue-50'}`}>
          <p className={`text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-blue-700'}`}>What to bring on test day:</p>
          <ul className={`text-sm space-y-1 ${highContrast ? 'text-zinc-300' : 'text-blue-700'}`}>
            <li>• Original RSA ID document</li>
            <li>• This reference number</li>
            <li>• Proof of payment (test fee)</li>
          </ul>
        </div>
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
          <i className="fa-solid fa-book-open"></i>
        </div>
        <h1 className={`text-4xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Learner's License Test</h1>
        <p className="text-slate-500">Book your learner's license theoretical test at a DLTC near you.</p>
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
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className={lbl}>Full Name (as per ID)</label>
                    <input type="text" value={formData.fullName} onChange={(e) => handle('fullName', e.target.value)} className={inp} placeholder="SURNAME FIRSTNAME" />
                  </div>
                  <div>
                    <label className={lbl}>RSA ID Number</label>
                    <input type="text" value={formData.idNumber} onChange={(e) => handle('idNumber', e.target.value)} placeholder="0000000000000" maxLength={13} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Date of Birth</label>
                    <input type="date" value={formData.dateOfBirth} onChange={(e) => handle('dateOfBirth', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Contact Number</label>
                    <input type="tel" value={formData.contactNumber} onChange={(e) => handle('contactNumber', e.target.value)} placeholder="0XX XXX XXXX" className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Email Address</label>
                    <input type="email" value={formData.email} onChange={(e) => handle('email', e.target.value)} placeholder="name@example.com" className={inp} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={lbl}>Residential Address</label>
                    <input type="text" value={formData.address} onChange={(e) => handle('address', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Postal Code</label>
                    <input type="text" value={formData.postalCode} onChange={(e) => handle('postalCode', e.target.value)} placeholder="0000" maxLength={4} className={inp} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Test Booking</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className={lbl}>License Code Applying For</label>
                    <div className="grid grid-cols-2 gap-3">
                      {LICENSE_CODES.map(({ code, desc }) => (
                        <label key={code} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                          formData.licenseCode === code
                            ? (highContrast ? 'border-yellow-400 bg-zinc-800' : 'border-green-500 bg-green-50')
                            : (highContrast ? 'border-zinc-700' : 'border-slate-200')
                        }`}>
                          <input type="radio" name="licenseCode" value={code} checked={formData.licenseCode === code} onChange={() => handle('licenseCode', code)} className="accent-green-700" />
                          <div>
                            <span className={`font-bold text-sm ${highContrast ? 'text-white' : 'text-slate-800'}`}>Code {code}</span>
                            <p className="text-xs text-slate-400">{desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className={lbl}>Preferred DLTC</label>
                    <select value={formData.dltc} onChange={(e) => handle('dltc', e.target.value)} className={inp}>
                      <option value="">Select DLTC...</option>
                      {DLTCS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>Preferred Test Date</label>
                    <input type="date" value={formData.preferredDate} min={new Date().toISOString().split('T')[0]} onChange={(e) => handle('preferredDate', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Previous Test Attempts</label>
                    <select value={formData.previousAttempts} onChange={(e) => handle('previousAttempts', e.target.value)} className={inp}>
                      {['0', '1', '2', '3+'].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <div className={`p-4 rounded-xl flex gap-3 ${highContrast ? 'bg-zinc-800 border border-zinc-700' : 'bg-green-50 border border-green-100'}`}>
                  <i className={`fa-solid fa-lightbulb mt-0.5 ${highContrast ? 'text-yellow-400' : 'text-green-600'}`}></i>
                  <p className={`text-sm ${highContrast ? 'text-zinc-300' : 'text-green-700'}`}>
                    Study the K53 manual before your test. The test consists of road signs, vehicle controls, and road safety questions.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Review & Submit</h2>
                <div className={`rounded-2xl border divide-y ${highContrast ? 'border-zinc-700 divide-zinc-700' : 'border-slate-100 divide-slate-100'}`}>
                  {[
                    ['Full Name', formData.fullName],
                    ['ID Number', formData.idNumber],
                    ['Date of Birth', formData.dateOfBirth],
                    ['Contact', formData.contactNumber],
                    ['Email', formData.email],
                    ['License Code', `Code ${formData.licenseCode}`],
                    ['Preferred DLTC', formData.dltc],
                    ['Test Date', formData.preferredDate],
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
                    I declare that all information is correct and I meet the minimum age requirement (16 years for Code A1/B, 18 for others).
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
                  Book Test <i className="fa-solid fa-paper-plane ml-2 text-xs"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`p-6 rounded-2xl border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-sm'}`}>
            <h3 className={`font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>Requirements</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              {['Original RSA ID document', 'Must be 17+ (Code B)', 'Must be 16+ (Code A1)', 'Test fee: R70', 'K53 study material (optional)'].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <i className={`fa-solid fa-circle-check mt-0.5 ${highContrast ? 'text-yellow-400' : 'text-green-600'}`}></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`p-6 rounded-2xl border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-blue-50 border-blue-100'}`}>
            <h3 className={`font-bold mb-2 text-sm ${highContrast ? 'text-yellow-400' : 'text-blue-700'}`}><i className="fa-solid fa-circle-info mr-2"></i>After Passing</h3>
            <p className={`text-sm ${highContrast ? 'text-zinc-300' : 'text-blue-700'}`}>Your learner's licence is valid for 24 months. Use it to practise driving with a licensed driver.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnersLicenseTest;
