import React, { useState } from 'react';

interface VehicleLicenseDiscProps {
  lang: string;
  t: any;
  highContrast?: boolean;
  onNavigate?: (page: string) => void;
}

const VEHICLE_TYPES = ['Motor Car', 'Motorcycle', 'Light Delivery Vehicle', 'Minibus', 'Bus', 'Heavy Motor Vehicle', 'Trailer'];

const VehicleLicenseDisc: React.FC<VehicleLicenseDiscProps> = ({ t, highContrast, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');
  const [formData, setFormData] = useState({
    ownerName: '',
    idNumber: '',
    contactNumber: '',
    email: '',
    postalAddress: '',
    postalCode: '',
    vehicleReg: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleType: '',
    engineNumber: '',
    vinNumber: '',
    discExpiryDate: '',
    deliveryMethod: 'postal',
    declaration: false,
  });

  const steps = [
    { number: 1, label: 'Owner Details', icon: 'fa-user' },
    { number: 2, label: 'Vehicle Details', icon: 'fa-car' },
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
    if (step === 1) return !!(formData.ownerName && formData.idNumber && formData.contactNumber && formData.email);
    if (step === 2) return !!(formData.vehicleReg && formData.vehicleMake && formData.vehicleModel && formData.vehicleType);
    if (step === 3) return formData.declaration;
    return false;
  };

  const handleSubmit = () => {
    const ref = `VLD-2026-${Math.floor(Math.random() * 90000 + 10000)}`;
    setReference(ref);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-in fade-in duration-700">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto text-4xl ${highContrast ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-700'}`}>
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <h1 className={`text-3xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Application Submitted!</h1>
        <p className="text-slate-500">Your Vehicle License Disc renewal application has been received.</p>
        <div className={`p-6 rounded-2xl border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-slate-50 border-slate-200'}`}>
          <p className="text-sm text-slate-400 mb-1">Reference Number</p>
          <p className={`text-2xl font-mono font-bold ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>{reference}</p>
        </div>
        <p className="text-sm text-slate-500">Your new license disc will be {formData.deliveryMethod === 'postal' ? 'posted to your address' : 'available for collection at your nearest DLTC'} within 10 working days.</p>
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
          <i className="fa-solid fa-car"></i>
        </div>
        <h1 className={`text-4xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Vehicle License Disc Renewal</h1>
        <p className="text-slate-500">Renew your motor vehicle license disc online.</p>
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
            {/* Step 1 */}
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
                    <input type="text" value={formData.idNumber} onChange={(e) => handle('idNumber', e.target.value)} placeholder="0000000000000" className={inp} />
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
                    <input type="text" value={formData.postalAddress} onChange={(e) => handle('postalAddress', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Postal Code</label>
                    <input type="text" value={formData.postalCode} onChange={(e) => handle('postalCode', e.target.value)} placeholder="0000" maxLength={4} className={inp} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Vehicle Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={lbl}>Registration Number</label>
                    <input type="text" value={formData.vehicleReg} onChange={(e) => handle('vehicleReg', e.target.value)} placeholder="e.g. KZN 123 456" className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Vehicle Type</label>
                    <select value={formData.vehicleType} onChange={(e) => handle('vehicleType', e.target.value)} className={inp}>
                      <option value="">Select type...</option>
                      {VEHICLE_TYPES.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>Make</label>
                    <input type="text" value={formData.vehicleMake} onChange={(e) => handle('vehicleMake', e.target.value)} placeholder="e.g. Toyota" className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Model</label>
                    <input type="text" value={formData.vehicleModel} onChange={(e) => handle('vehicleModel', e.target.value)} placeholder="e.g. Corolla" className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Year</label>
                    <input type="number" value={formData.vehicleYear} onChange={(e) => handle('vehicleYear', e.target.value)} placeholder="e.g. 2020" className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Engine Number</label>
                    <input type="text" value={formData.engineNumber} onChange={(e) => handle('engineNumber', e.target.value)} className={inp} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={lbl}>VIN / Chassis Number</label>
                    <input type="text" value={formData.vinNumber} onChange={(e) => handle('vinNumber', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Current Disc Expiry Date</label>
                    <input type="date" value={formData.discExpiryDate} onChange={(e) => handle('discExpiryDate', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Delivery Method</label>
                    <select value={formData.deliveryMethod} onChange={(e) => handle('deliveryMethod', e.target.value)} className={inp}>
                      <option value="postal">Post to my address</option>
                      <option value="collect">Collect at DLTC</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Review & Submit</h2>
                <div className={`rounded-2xl border divide-y ${highContrast ? 'border-zinc-700 divide-zinc-700' : 'border-slate-100 divide-slate-100'}`}>
                  {[
                    ['Owner Name', formData.ownerName],
                    ['ID / CK Number', formData.idNumber],
                    ['Contact', formData.contactNumber],
                    ['Email', formData.email],
                    ['Registration', formData.vehicleReg],
                    ['Make & Model', `${formData.vehicleMake} ${formData.vehicleModel}`],
                    ['Year', formData.vehicleYear],
                    ['Vehicle Type', formData.vehicleType],
                    ['Delivery', formData.deliveryMethod === 'postal' ? 'Post to my address' : 'Collect at DLTC'],
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
                    I declare that the information provided is true and correct, and I confirm that the vehicle is roadworthy and insured.
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
              {currentStep < 3 ? (
                <button onClick={() => setCurrentStep(currentStep + 1)} disabled={!isStepComplete(currentStep)} className="px-8 py-3 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition disabled:opacity-40 disabled:cursor-not-allowed">
                  Continue <i className="fa-solid fa-chevron-right ml-2 text-xs"></i>
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={!isStepComplete(3)} className="px-8 py-3 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition disabled:opacity-40 disabled:cursor-not-allowed">
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
              {['Certified copy of ID / CK', 'Vehicle registration papers', 'Valid roadworthiness certificate', 'Proof of insurance', 'Renewal fee: R150 – R800'].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <i className={`fa-solid fa-circle-check mt-0.5 ${highContrast ? 'text-yellow-400' : 'text-green-600'}`}></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`p-6 rounded-2xl border ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-amber-50 border-amber-100'}`}>
            <h3 className={`font-bold mb-2 text-sm ${highContrast ? 'text-yellow-400' : 'text-amber-700'}`}><i className="fa-solid fa-triangle-exclamation mr-2"></i>Important</h3>
            <p className={`text-sm ${highContrast ? 'text-zinc-300' : 'text-amber-700'}`}>Operating a vehicle with an expired disc is an offence and may result in a fine.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleLicenseDisc;
