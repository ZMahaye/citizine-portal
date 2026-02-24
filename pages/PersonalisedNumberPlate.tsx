import React, { useState } from 'react';

interface PersonalisedNumberPlateProps {
  lang: string;
  t: any;
  highContrast?: boolean;
  onNavigate?: (page: string) => void;
}

const PROVINCES = [
  { code: 'KZN', name: 'KwaZulu-Natal' },
  { code: 'GP', name: 'Gauteng' },
  { code: 'WC', name: 'Western Cape' },
  { code: 'EC', name: 'Eastern Cape' },
  { code: 'FS', name: 'Free State' },
  { code: 'NW', name: 'North West' },
  { code: 'MP', name: 'Mpumalanga' },
  { code: 'LP', name: 'Limpopo' },
  { code: 'NC', name: 'Northern Cape' },
];

const PLATE_TYPES = [
  { id: 'standard', label: 'Standard Personalised', desc: 'Up to 7 characters', fee: 'R1,500' },
  { id: 'premium', label: 'Premium Personalised', desc: 'Up to 7 characters, custom border', fee: 'R2,500' },
  { id: 'special', label: 'Special Series', desc: 'Themed/commemorative plates', fee: 'R3,000' },
];

const FORBIDDEN_PATTERNS = ['SEX', 'XXX', 'ASS', 'FUK', 'KKK'];

const PersonalisedNumberPlate: React.FC<PersonalisedNumberPlateProps> = ({ highContrast, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');
  const [plateError, setPlateError] = useState('');
  const [formData, setFormData] = useState({
    ownerName: '',
    idNumber: '',
    contactNumber: '',
    email: '',
    address: '',
    postalCode: '',
    vehicleReg: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    engineNumber: '',
    vinNumber: '',
    plateText: '',
    plateType: '',
    province: 'KZN',
    alternateText1: '',
    alternateText2: '',
    deliveryMethod: 'postal',
    declaration: false,
  });

  const steps = [
    { number: 1, label: 'Owner Details', icon: 'fa-user' },
    { number: 2, label: 'Vehicle Details', icon: 'fa-car' },
    { number: 3, label: 'Plate Design', icon: 'fa-rectangle-list' },
    { number: 4, label: 'Review & Submit', icon: 'fa-clipboard-check' },
  ];

  const inp = `w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none transition ${
    highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
  }`;
  const lbl = `block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`;
  const card = `p-8 rounded-3xl border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-lg'}`;

  const handle = (field: string, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const validatePlateText = (value: string) => {
    const cleaned = value.toUpperCase().replace(/\s/g, '');
    if (cleaned.length < 2) { setPlateError('Minimum 2 characters required.'); return false; }
    if (cleaned.length > 7) { setPlateError('Maximum 7 characters allowed.'); return false; }
    if (!/^[A-Z0-9]+$/.test(cleaned)) { setPlateError('Only letters (A–Z) and numbers (0–9) are allowed.'); return false; }
    if (FORBIDDEN_PATTERNS.some((p) => cleaned.includes(p))) { setPlateError('This combination is not permitted.'); return false; }
    setPlateError('');
    return true;
  };

  const handlePlateChange = (value: string) => {
    handle('plateText', value.toUpperCase());
    validatePlateText(value);
  };

  const isStepComplete = (step: number) => {
    if (step === 1) return !!(formData.ownerName && formData.idNumber && formData.contactNumber && formData.email);
    if (step === 2) return !!(formData.vehicleReg && formData.vehicleMake && formData.vehicleModel && formData.engineNumber && formData.vinNumber);
    if (step === 3) return !!(formData.plateText && formData.plateType && !plateError);
    if (step === 4) return formData.declaration;
    return false;
  };

  const handleSubmit = () => {
    const ref = `PNP-2026-${Math.floor(Math.random() * 90000 + 10000)}`;
    setReference(ref);
    setSubmitted(true);
  };

  const selectedPlateType = PLATE_TYPES.find((p) => p.id === formData.plateType);

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-in fade-in duration-700">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto text-4xl ${highContrast ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-700'}`}>
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <h1 className={`text-3xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Application Submitted!</h1>
        <p className="text-slate-500">Your Personalised Number Plate application has been received.</p>

        {/* Plate preview */}
        <div className="flex justify-center">
          <div className={`px-8 py-4 rounded-xl border-4 font-black text-3xl tracking-[0.3em] shadow-lg ${highContrast ? 'bg-zinc-800 border-yellow-400 text-yellow-400' : 'bg-yellow-400 border-slate-800 text-slate-900'}`}>
            {formData.plateText} {formData.province}
          </div>
        </div>

        <div className={`p-6 rounded-2xl border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-slate-50 border-slate-200'}`}>
          <p className="text-sm text-slate-400 mb-1">Reference Number</p>
          <p className={`text-2xl font-mono font-bold ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>{reference}</p>
        </div>
        <p className="text-sm text-slate-500">
          Your application will be reviewed within 10 working days. If approved, your plate will be{' '}
          {formData.deliveryMethod === 'postal' ? 'posted to your address' : 'available for collection at your nearest NaTIS office'}.
        </p>
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
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-2xl ${highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-green-100 text-green-700'}`}>
          <i className="fa-solid fa-rectangle-list"></i>
        </div>
        <h1 className={`text-4xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Personalised Number Plate</h1>
        <p className="text-slate-500">Apply for a customised number plate for your registered motor vehicle.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between max-w-2xl mx-auto">
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

            {/* Step 1 — Owner */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Registered Owner Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className={lbl}>Full Name (as per ID / Company Name)</label>
                    <input type="text" value={formData.ownerName} onChange={(e) => handle('ownerName', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>RSA ID / CK Number</label>
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
                    <label className={lbl}>Postal Address</label>
                    <input type="text" value={formData.address} onChange={(e) => handle('address', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Postal Code</label>
                    <input type="text" value={formData.postalCode} onChange={(e) => handle('postalCode', e.target.value)} placeholder="0000" maxLength={4} className={inp} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 — Vehicle */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Vehicle Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={lbl}>Current Registration Number</label>
                    <input type="text" value={formData.vehicleReg} onChange={(e) => handle('vehicleReg', e.target.value)} placeholder="e.g. KZN 123 456" className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Make</label>
                    <input type="text" value={formData.vehicleMake} onChange={(e) => handle('vehicleMake', e.target.value)} placeholder="e.g. Toyota" className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Model</label>
                    <input type="text" value={formData.vehicleModel} onChange={(e) => handle('vehicleModel', e.target.value)} placeholder="e.g. Fortuner" className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Year</label>
                    <input type="number" value={formData.vehicleYear} onChange={(e) => handle('vehicleYear', e.target.value)} placeholder="e.g. 2023" className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Engine Number</label>
                    <input type="text" value={formData.engineNumber} onChange={(e) => handle('engineNumber', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>VIN / Chassis Number</label>
                    <input type="text" value={formData.vinNumber} onChange={(e) => handle('vinNumber', e.target.value)} className={inp} />
                  </div>
                </div>
                <div className={`p-4 rounded-xl flex gap-3 ${highContrast ? 'bg-zinc-800 border border-zinc-700' : 'bg-blue-50 border border-blue-100'}`}>
                  <i className={`fa-solid fa-circle-info mt-0.5 ${highContrast ? 'text-yellow-400' : 'text-blue-500'}`}></i>
                  <p className={`text-sm ${highContrast ? 'text-zinc-300' : 'text-blue-700'}`}>
                    The vehicle must be registered in your name. Details must match your NaTIS registration certificate exactly.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3 — Plate Design */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Plate Design</h2>

                {/* Live Preview */}
                <div className="flex flex-col items-center gap-3">
                  <p className={`text-sm font-bold ${highContrast ? 'text-zinc-400' : 'text-slate-500'}`}>LIVE PREVIEW</p>
                  <div className={`px-10 py-5 rounded-xl border-4 font-black text-4xl tracking-[0.3em] shadow-xl select-none transition-all ${
                    highContrast ? 'bg-zinc-800 border-yellow-400 text-yellow-400' : 'bg-yellow-400 border-slate-800 text-slate-900'
                  }`}>
                    {formData.plateText || 'KZN DOT'} {formData.province}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Desired text */}
                  <div className="md:col-span-2">
                    <label className={lbl}>Desired Plate Text <span className="font-normal text-slate-400">(2–7 characters, letters & numbers only)</span></label>
                    <input
                      type="text"
                      value={formData.plateText}
                      onChange={(e) => handlePlateChange(e.target.value)}
                      placeholder="e.g. KZN1"
                      maxLength={7}
                      className={`${inp} font-bold text-xl tracking-widest uppercase ${plateError ? 'border-red-400 focus:ring-red-400' : ''}`}
                    />
                    {plateError && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><i className="fa-solid fa-circle-exclamation"></i> {plateError}</p>}
                    {!plateError && formData.plateText.length >= 2 && (
                      <p className="mt-1 text-sm text-green-600 flex items-center gap-1"><i className="fa-solid fa-circle-check"></i> Combination available (subject to final approval)</p>
                    )}
                  </div>

                  {/* Province */}
                  <div>
                    <label className={lbl}>Province</label>
                    <select value={formData.province} onChange={(e) => handle('province', e.target.value)} className={inp}>
                      {PROVINCES.map((p) => <option key={p.code} value={p.code}>{p.name} ({p.code})</option>)}
                    </select>
                  </div>

                  {/* Alternate text */}
                  <div>
                    <label className={lbl}>1st Alternate Text <span className="font-normal text-slate-400">(if unavailable)</span></label>
                    <input type="text" value={formData.alternateText1} onChange={(e) => handle('alternateText1', e.target.value.toUpperCase())} maxLength={7} placeholder="Optional" className={`${inp} uppercase`} />
                  </div>
                  <div>
                    <label className={lbl}>2nd Alternate Text <span className="font-normal text-slate-400">(if unavailable)</span></label>
                    <input type="text" value={formData.alternateText2} onChange={(e) => handle('alternateText2', e.target.value.toUpperCase())} maxLength={7} placeholder="Optional" className={`${inp} uppercase`} />
                  </div>
                </div>

                {/* Plate type */}
                <div>
                  <label className={lbl}>Plate Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
                    {PLATE_TYPES.map((type) => (
                      <label key={type.id} className={`flex flex-col gap-1 p-4 rounded-xl border cursor-pointer transition ${
                        formData.plateType === type.id
                          ? (highContrast ? 'border-yellow-400 bg-zinc-800' : 'border-green-500 bg-green-50')
                          : (highContrast ? 'border-zinc-700 hover:border-zinc-500' : 'border-slate-200 hover:border-slate-300')
                      }`}>
                        <div className="flex items-center gap-2">
                          <input type="radio" name="plateType" value={type.id} checked={formData.plateType === type.id} onChange={() => handle('plateType', type.id)} className="accent-green-700" />
                          <span className={`font-bold text-sm ${highContrast ? 'text-white' : 'text-slate-800'}`}>{type.label}</span>
                        </div>
                        <p className="text-xs text-slate-400 pl-5">{type.desc}</p>
                        <p className={`text-sm font-bold pl-5 ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>{type.fee}</p>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Delivery */}
                <div>
                  <label className={lbl}>Delivery Method</label>
                  <select value={formData.deliveryMethod} onChange={(e) => handle('deliveryMethod', e.target.value)} className={inp}>
                    <option value="postal">Post to my address</option>
                    <option value="collect">Collect at nearest NaTIS office</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4 — Review */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Review & Submit</h2>

                {/* Plate preview */}
                <div className="flex justify-center py-2">
                  <div className={`px-10 py-4 rounded-xl border-4 font-black text-3xl tracking-[0.3em] shadow-lg ${
                    highContrast ? 'bg-zinc-800 border-yellow-400 text-yellow-400' : 'bg-yellow-400 border-slate-800 text-slate-900'
                  }`}>
                    {formData.plateText} {formData.province}
                  </div>
                </div>

                <div className={`rounded-2xl border divide-y ${highContrast ? 'border-zinc-700 divide-zinc-700' : 'border-slate-100 divide-slate-100'}`}>
                  {[
                    ['Owner Name', formData.ownerName],
                    ['ID / CK Number', formData.idNumber],
                    ['Contact', formData.contactNumber],
                    ['Email', formData.email],
                    ['Vehicle Reg.', formData.vehicleReg],
                    ['Make & Model', `${formData.vehicleMake} ${formData.vehicleModel} (${formData.vehicleYear})`],
                    ['Requested Plate', formData.plateText],
                    ['Province', formData.province],
                    ['Alternate 1', formData.alternateText1 || '—'],
                    ['Alternate 2', formData.alternateText2 || '—'],
                    ['Plate Type', selectedPlateType?.label || '—'],
                    ['Application Fee', selectedPlateType?.fee || '—'],
                    ['Delivery', formData.deliveryMethod === 'postal' ? 'Post to address' : 'Collect at NaTIS'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between px-5 py-3">
                      <span className="text-sm text-slate-400">{label}</span>
                      <span className={`text-sm font-semibold ${highContrast ? 'text-white' : 'text-slate-700'}`}>{value}</span>
                    </div>
                  ))}
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={formData.declaration} onChange={(e) => handle('declaration', e.target.checked)} className="mt-1 w-5 h-5 accent-green-700" />
                  <span className={`text-sm ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                    I declare that I am the registered owner of the vehicle, all information is true and correct, and I understand the plate combination is subject to NaTIS approval. I agree to pay the applicable fee upon approval.
                  </span>
                </label>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onNavigate && onNavigate('services')}
                className={`px-6 py-3 rounded-xl font-bold border transition ${highContrast ? 'border-zinc-600 text-white hover:bg-zinc-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                <i className="fa-solid fa-chevron-left mr-2 text-xs"></i>{currentStep > 1 ? 'Back' : 'Cancel'}
              </button>
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!isStepComplete(currentStep)}
                  className="px-8 py-3 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue <i className="fa-solid fa-chevron-right ml-2 text-xs"></i>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepComplete(4)}
                  className="px-8 py-3 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit Application <i className="fa-solid fa-paper-plane ml-2 text-xs"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className={`p-6 rounded-2xl border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-sm'}`}>
            <h3 className={`font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>Requirements</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              {[
                'Certified copy of RSA ID / CK docs',
                'Original vehicle registration certificate',
                'Valid roadworthiness certificate',
                'Proof of residential address',
                'Application fee (see plate types)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <i className={`fa-solid fa-circle-check mt-0.5 ${highContrast ? 'text-yellow-400' : 'text-green-600'}`}></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`p-6 rounded-2xl border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-amber-50 border-amber-100'}`}>
            <h3 className={`font-bold mb-2 text-sm ${highContrast ? 'text-yellow-400' : 'text-amber-700'}`}>
              <i className="fa-solid fa-circle-info mr-2"></i>Rules
            </h3>
            <ul className={`text-sm space-y-1 ${highContrast ? 'text-zinc-300' : 'text-amber-700'}`}>
              <li>• Max 7 characters</li>
              <li>• Letters & numbers only</li>
              <li>• No offensive content</li>
              <li>• Subject to NaTIS availability</li>
              <li>• Non-refundable fee</li>
            </ul>
          </div>

          <div className={`p-6 rounded-2xl border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-slate-50 border-slate-100'}`}>
            <h3 className={`font-bold mb-2 text-sm ${highContrast ? 'text-white' : 'text-slate-700'}`}>
              <i className="fa-solid fa-clock mr-2 text-green-600"></i>Processing Time
            </h3>
            <p className={`text-sm ${highContrast ? 'text-zinc-300' : 'text-slate-500'}`}>Allow 4–6 weeks from approval for plate manufacturing and delivery.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalisedNumberPlate;
