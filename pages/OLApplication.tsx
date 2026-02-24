import React, { useState } from 'react';
import type { OLApplicationData } from '../types';

interface OLApplicationProps {
  lang: string;
  t: any;
  highContrast?: boolean;
  onNavigate?: (page: string) => void;
}

const OLApplication: React.FC<OLApplicationProps> = ({ t, highContrast, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OLApplicationData>({
    applicantName: '',
    idNumber: '',
    contactNumber: '',
    email: '',
    address: '',
    postalCode: '',
    vehicleReg: '',
    vehicleMake: '',
    vehicleYear: '',
    vin: '',
    seatingCapacity: '',
    vehicleType: '',
    routeOrigin: '',
    routeDestination: '',
    operatingHours: '',
    frequency: '',
    existingPermit: '',
    documents: {},
    declaration: false,
  });

  const ol = t.ol_application;

  const steps = [
    { number: 1, label: ol.step_1, icon: 'fa-user' },
    { number: 2, label: ol.step_2, icon: 'fa-car' },
    { number: 3, label: ol.step_3, icon: 'fa-route' },
    { number: 4, label: ol.step_4, icon: 'fa-file-arrow-up' },
    { number: 5, label: ol.step_5, icon: 'fa-clipboard-check' },
  ];

  const vehicleTypes = ['Minibus Taxi', 'Bus', 'Metered Taxi'];

  const handleInputChange = (field: keyof OLApplicationData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (formData.declaration) {
      alert(`Application submitted!\nReference: OL-2026-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`);
      // Reset form
      setCurrentStep(1);
      setFormData({
        applicantName: '',
        idNumber: '',
        contactNumber: '',
        email: '',
        address: '',
        postalCode: '',
        vehicleReg: '',
        vehicleMake: '',
        vehicleYear: '',
        vin: '',
        seatingCapacity: '',
        vehicleType: '',
        routeOrigin: '',
        routeDestination: '',
        operatingHours: '',
        frequency: '',
        existingPermit: '',
        documents: {},
        declaration: false,
      });
    }
  };

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.applicantName && formData.idNumber && formData.contactNumber && formData.email);
      case 2:
        return !!(formData.vehicleReg && formData.vehicleMake && formData.vehicleType);
      case 3:
        return !!(formData.routeOrigin && formData.routeDestination);
      case 4:
        return true; // Documents are optional
      case 5:
        return formData.declaration;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className={`text-4xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
          {ol.title}
        </h1>
        <p className="text-slate-500 leading-relaxed">{ol.subtitle}</p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, idx) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentStep === step.number
                    ? (highContrast ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/30' : 'bg-green-700 text-white ring-4 ring-green-200 shadow-lg')
                    : currentStep > step.number
                      ? (highContrast ? 'bg-zinc-700 text-white' : 'bg-green-100 text-green-700')
                      : (highContrast ? 'bg-zinc-800 text-zinc-500' : 'bg-slate-100 text-slate-400')
                }`}
              >
                {currentStep > step.number ? (
                  <i className="fa-solid fa-check"></i>
                ) : (
                  <i className={`fa-solid ${step.icon}`}></i>
                )}
              </div>
              <span
                className={`text-xs font-medium text-center hidden sm:block ${
                  currentStep >= step.number
                    ? (highContrast ? 'text-white' : 'text-slate-700')
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 transition-colors ${
                  currentStep > step.number
                    ? (highContrast ? 'bg-zinc-700' : 'bg-green-200')
                    : (highContrast ? 'bg-zinc-800' : 'bg-slate-100')
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-3">
          <div
            className={`p-8 rounded-3xl border ${
              highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-lg'
            }`}
          >
            {/* Step 1: Applicant Details */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                  {ol.step_1}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.full_name}
                    </label>
                    <input
                      type="text"
                      value={formData.applicantName}
                      onChange={(e) => handleInputChange('applicantName', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.id_number}
                    </label>
                    <input
                      type="text"
                      value={formData.idNumber}
                      onChange={(e) => handleInputChange('idNumber', e.target.value)}
                      placeholder="0000000000000"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.contact}
                    </label>
                    <input
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                      placeholder="0XX XXX XXXX"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.email}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.address}
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.postal_code}
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder="0000"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Vehicle Information */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                  {ol.step_2}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.vehicle_reg}
                    </label>
                    <input
                      type="text"
                      value={formData.vehicleReg}
                      onChange={(e) => handleInputChange('vehicleReg', e.target.value)}
                      placeholder="ABC 123 GP"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.vehicle_make}
                    </label>
                    <input
                      type="text"
                      value={formData.vehicleMake}
                      onChange={(e) => handleInputChange('vehicleMake', e.target.value)}
                      placeholder="Toyota Quantum"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.vehicle_year}
                    </label>
                    <input
                      type="text"
                      value={formData.vehicleYear}
                      onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
                      placeholder="2020"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.vin}
                    </label>
                    <input
                      type="text"
                      value={formData.vin}
                      onChange={(e) => handleInputChange('vin', e.target.value)}
                      placeholder="17 characters"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.seating}
                    </label>
                    <input
                      type="number"
                      value={formData.seatingCapacity}
                      onChange={(e) => handleInputChange('seatingCapacity', e.target.value)}
                      placeholder="15"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.vehicle_type}
                    </label>
                    <select
                      value={formData.vehicleType}
                      onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <option value="">Select...</option>
                      {vehicleTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Route Details */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                  {ol.step_3}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.route_origin}
                    </label>
                    <input
                      type="text"
                      value={formData.routeOrigin}
                      onChange={(e) => handleInputChange('routeOrigin', e.target.value)}
                      placeholder="Durban Central"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.route_dest}
                    </label>
                    <input
                      type="text"
                      value={formData.routeDestination}
                      onChange={(e) => handleInputChange('routeDestination', e.target.value)}
                      placeholder="Umlazi Township"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.operating_hours}
                    </label>
                    <input
                      type="text"
                      value={formData.operatingHours}
                      onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                      placeholder="05:00 - 22:00"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.frequency}
                    </label>
                    <input
                      type="text"
                      value={formData.frequency}
                      onChange={(e) => handleInputChange('frequency', e.target.value)}
                      placeholder="Every 20 minutes"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                      {ol.existing_permit}
                    </label>
                    <input
                      type="text"
                      value={formData.existingPermit}
                      onChange={(e) => handleInputChange('existingPermit', e.target.value)}
                      placeholder="Leave blank if new application"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                        highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Document Upload */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                  {ol.step_4}
                </h2>
                <div className="space-y-4">
                  {[
                    { key: 'id', label: ol.upload_id },
                    { key: 'address', label: ol.upload_address },
                    { key: 'roadworthy', label: ol.upload_roadworthy },
                    { key: 'prdp', label: ol.upload_prdp },
                    { key: 'tax', label: ol.upload_tax },
                  ].map((doc) => (
                    <div
                      key={doc.key}
                      className={`p-6 rounded-2xl border-2 border-dashed transition-colors ${
                        highContrast ? 'border-zinc-700 hover:border-yellow-400 bg-zinc-800' : 'border-slate-200 hover:border-green-300 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className={`font-bold mb-1 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                            {doc.label}
                          </h4>
                          <p className="text-xs text-slate-500">{ol.accepted_formats}</p>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                            highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-green-700 text-white hover:bg-green-800'
                          }`}
                        >
                          <i className="fa-solid fa-cloud-arrow-up mr-2"></i>
                          {ol.browse}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                  {ol.review_title}
                </h2>

                {/* Review Sections */}
                <div className="space-y-4">
                  {/* Applicant Details */}
                  <div className={`p-6 rounded-2xl ${highContrast ? 'bg-zinc-800' : 'bg-slate-50'}`}>
                    <h3 className={`font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                      <i className="fa-solid fa-user mr-2 text-green-600"></i>
                      {ol.step_1}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-500">Name:</span>
                        <span className={`ml-2 font-medium ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                          {formData.applicantName || '-'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">ID:</span>
                        <span className={`ml-2 font-medium ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                          {formData.idNumber || '-'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Contact:</span>
                        <span className={`ml-2 font-medium ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                          {formData.contactNumber || '-'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Email:</span>
                        <span className={`ml-2 font-medium ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                          {formData.email || '-'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className={`p-6 rounded-2xl ${highContrast ? 'bg-zinc-800' : 'bg-slate-50'}`}>
                    <h3 className={`font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                      <i className="fa-solid fa-car mr-2 text-green-600"></i>
                      {ol.step_2}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-500">Registration:</span>
                        <span className={`ml-2 font-medium ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                          {formData.vehicleReg || '-'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Make:</span>
                        <span className={`ml-2 font-medium ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                          {formData.vehicleMake || '-'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Type:</span>
                        <span className={`ml-2 font-medium ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                          {formData.vehicleType || '-'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Seating:</span>
                        <span className={`ml-2 font-medium ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                          {formData.seatingCapacity || '-'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Route Details */}
                  <div className={`p-6 rounded-2xl ${highContrast ? 'bg-zinc-800' : 'bg-slate-50'}`}>
                    <h3 className={`font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                      <i className="fa-solid fa-route mr-2 text-green-600"></i>
                      {ol.step_3}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-500">Origin:</span>
                        <span className={`ml-2 font-medium ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                          {formData.routeOrigin || '-'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Destination:</span>
                        <span className={`ml-2 font-medium ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                          {formData.routeDestination || '-'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Hours:</span>
                        <span className={`ml-2 font-medium ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                          {formData.operatingHours || '-'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Frequency:</span>
                        <span className={`ml-2 font-medium ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                          {formData.frequency || '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Declaration */}
                <label
                  className={`flex items-start gap-3 p-6 rounded-2xl border-2 cursor-pointer transition-colors ${
                    formData.declaration
                      ? (highContrast ? 'border-yellow-400 bg-zinc-800' : 'border-green-600 bg-green-50')
                      : (highContrast ? 'border-zinc-700 bg-zinc-800' : 'border-slate-200 bg-slate-50')
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.declaration}
                    onChange={(e) => handleInputChange('declaration', e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className={`text-sm leading-relaxed ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                    {ol.declaration}
                  </span>
                </label>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-6">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                    highContrast ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <i className="fa-solid fa-chevron-left mr-2"></i>
                  {ol.back}
                </button>
              )}
              {currentStep < 5 ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepComplete(currentStep)}
                  className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                    isStepComplete(currentStep)
                      ? (highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-green-700 text-white hover:bg-green-800')
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {ol.next}
                  <i className="fa-solid fa-chevron-right ml-2"></i>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.declaration}
                  className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                    formData.declaration
                      ? (highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-green-700 text-white hover:bg-green-800')
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <i className="fa-solid fa-paper-plane mr-2"></i>
                  {ol.submit}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Fee Summary */}
          <div className={`p-6 rounded-3xl border ${
            highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <h3 className={`text-lg font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
              <i className="fa-solid fa-money-bill mr-2 text-green-600"></i>
              Application Fee
            </h3>
            <div className={`text-center p-6 rounded-2xl ${highContrast ? 'bg-zinc-800' : 'bg-green-50'}`}>
              <div className="text-sm text-slate-500 mb-2">{ol.fee}</div>
              <div className={`text-4xl font-black ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>
                R500.00
              </div>
            </div>
          </div>

          {/* Processing Time */}
          <div className={`p-6 rounded-3xl border ${
            highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <h3 className={`text-lg font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
              <i className="fa-solid fa-clock mr-2 text-blue-600"></i>
              {ol.processing}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Applications are typically processed within 21 business days. You will receive updates via email and SMS.
            </p>
          </div>

          {/* Help Contact */}
          <div className={`p-6 rounded-3xl border ${
            highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <h3 className={`text-lg font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
              <i className="fa-solid fa-headset mr-2 text-purple-600"></i>
              {ol.help}
            </h3>
            <p className="text-sm text-slate-500 mb-3 leading-relaxed">
              Need assistance with your application?
            </p>
            <div className="space-y-2 text-sm">
              <div className={`font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                <i className="fa-solid fa-phone mr-2 text-green-600"></i>
                {ol.help_phone}
              </div>
              <div className={`font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                <i className="fa-solid fa-envelope mr-2 text-green-600"></i>
                ol@kzndot.gov.za
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OLApplication;
