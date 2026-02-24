import React, { useState } from 'react';
import { PAYMENT_CATEGORIES, MOCK_PAYMENTS } from '../constants';

interface PaymentGatewayProps {
  lang: string;
  t: any;
  highContrast?: boolean;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ t, highContrast }) => {
  const [step, setStep] = useState(0); // 0 = category view, 1 = reference, 2 = review, 3 = payment method
  const [selectedCategory, setSelectedCategory] = useState('');
  const [reference, setReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showHistory, setShowHistory] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const tp = t.payment;

  const handleCategorySelect = (title: string) => {
    setSelectedCategory(title);
    setStep(1);
  };

  const handleContinueToReview = () => {
    if (reference.trim()) setStep(2);
  };

  const handleProcessPayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setStep(0);
      setReference('');
      setSelectedCategory('');
    }, 3000);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case 'paid': return tp.paid;
      case 'pending': return tp.pending;
      case 'failed': return tp.failed;
      default: return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-green-50 text-green-700'}`}>
          <i className="fa-solid fa-lock"></i> PCI-DSS Compliant
        </div>
        <h1 className={`text-4xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{tp.title}</h1>
        <p className="text-slate-500">{tp.subtitle}</p>
      </div>

      {/* Step Indicator */}
      {step > 0 && (
        <div className="flex items-center justify-center gap-4">
          {[tp.step_1, tp.step_2, tp.step_3].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= i + 1 
                  ? (highContrast ? 'bg-yellow-400 text-black' : 'bg-green-700 text-white') 
                  : (highContrast ? 'bg-zinc-800 text-zinc-500' : 'bg-slate-200 text-slate-400')
              }`}>{i + 1}</div>
              <span className={`text-xs font-semibold hidden sm:inline ${step >= i + 1 ? (highContrast ? 'text-white' : 'text-slate-800') : 'text-slate-400'}`}>{label}</span>
              {i < 2 && <div className={`w-12 h-0.5 ${step > i + 1 ? (highContrast ? 'bg-yellow-400' : 'bg-green-700') : 'bg-slate-200'}`}></div>}
            </div>
          ))}
        </div>
      )}

      {/* Step 0 - Category Selection */}
      {step === 0 && !showHistory && (
        <div className="space-y-8">
          <h2 className={`text-xl font-bold text-center ${highContrast ? 'text-white' : 'text-slate-700'}`}>{tp.categories}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAYMENT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.title)}
                className={`p-8 rounded-3xl border text-left group transition-all hover:shadow-lg ${
                  highContrast ? 'bg-zinc-900 border-zinc-700 hover:border-yellow-400' : 'bg-white border-slate-100 hover:border-green-200'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${highContrast ? 'bg-zinc-800' : 'bg-green-50'}`}>
                  <i className={`fa-solid ${cat.icon} text-xl ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}></i>
                </div>
                <h3 className={`text-lg font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-800'}`}>{cat.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{cat.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${highContrast ? 'text-zinc-400' : 'text-slate-400'}`}>{cat.amountRange}</span>
                  <span className={`font-bold text-sm group-hover:translate-x-1 transition-transform ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>
                    {tp.pay_now} <i className="fa-solid fa-chevron-right ml-1 text-[10px]"></i>
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Payment History Toggle */}
          <div className="text-center pt-4">
            <button
              onClick={() => setShowHistory(true)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition ${
                highContrast ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-clock-rotate-left"></i> {tp.history}
            </button>
          </div>
        </div>
      )}

      {/* Payment History */}
      {showHistory && step === 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{tp.history}</h2>
            <button onClick={() => setShowHistory(false)} className={`text-sm font-bold ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>
              <i className="fa-solid fa-arrow-left mr-1"></i> {tp.back}
            </button>
          </div>
          <div className={`rounded-3xl border overflow-hidden ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100'}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={highContrast ? 'bg-zinc-800' : 'bg-slate-50'}>
                    <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500 px-6 py-4">{tp.reference}</th>
                    <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500 px-6 py-4">{tp.service}</th>
                    <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500 px-6 py-4">{tp.amount}</th>
                    <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500 px-6 py-4">{tp.date}</th>
                    <th className="text-left text-xs font-bold uppercase tracking-wider text-slate-500 px-6 py-4">{tp.status}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_PAYMENTS.map((pay) => (
                    <tr key={pay.id} className={`transition ${highContrast ? 'hover:bg-zinc-800' : 'hover:bg-slate-50'}`}>
                      <td className="px-6 py-4 text-sm font-mono font-bold">{pay.reference}</td>
                      <td className="px-6 py-4 text-sm">{pay.service}</td>
                      <td className="px-6 py-4 text-sm font-bold">R{pay.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{pay.date}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor(pay.status)}`}>
                          {statusLabel(pay.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Step 1 - Reference Number */}
      {step === 1 && (
        <div className={`max-w-xl mx-auto p-10 rounded-[40px] border space-y-8 animate-in fade-in slide-in-from-bottom-4 ${
          highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-xl'
        }`}>
          <div className="text-center space-y-2">
            <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${highContrast ? 'bg-zinc-800' : 'bg-green-50'}`}>
              <i className={`fa-solid fa-receipt text-2xl ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}></i>
            </div>
            <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{selectedCategory}</h3>
            <p className="text-slate-500 text-sm">{tp.reference}</p>
          </div>
          <input
            type="text"
            placeholder={tp.enter_ref}
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className={`w-full px-6 py-4 rounded-2xl text-center font-mono text-lg outline-none border-2 transition ${
              highContrast ? 'bg-zinc-800 border-zinc-700 text-white focus:border-yellow-400' : 'bg-slate-50 border-slate-100 focus:border-green-600'
            }`}
          />
          <div className="flex gap-4">
            <button onClick={() => setStep(0)} className={`flex-1 py-4 rounded-2xl font-bold transition ${highContrast ? 'bg-zinc-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {tp.back}
            </button>
            <button
              onClick={handleContinueToReview}
              disabled={!reference.trim()}
              className="flex-1 bg-green-700 text-white py-4 rounded-2xl font-bold disabled:opacity-40 transition hover:bg-green-800"
            >
              {tp.continue}
            </button>
          </div>
        </div>
      )}

      {/* Step 2 - Review Amount */}
      {step === 2 && (
        <div className={`max-w-xl mx-auto p-10 rounded-[40px] border space-y-8 animate-in fade-in slide-in-from-bottom-4 ${
          highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-xl'
        }`}>
          <div className="text-center space-y-2">
            <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{tp.amount_due}</h3>
            <p className="text-slate-500 font-mono text-sm">{reference}</p>
          </div>
          <div className={`p-6 rounded-2xl space-y-4 ${highContrast ? 'bg-zinc-800' : 'bg-slate-50'}`}>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{tp.service}</span>
              <span className={`font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{selectedCategory}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{tp.subtotal}</span>
              <span className={`font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>R450.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{tp.service_fee}</span>
              <span className={`font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>R15.00</span>
            </div>
            <div className={`border-t pt-4 flex justify-between ${highContrast ? 'border-zinc-700' : 'border-slate-200'}`}>
              <span className="font-bold">{tp.total}</span>
              <span className={`text-2xl font-black ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>R465.00</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className={`flex-1 py-4 rounded-2xl font-bold transition ${highContrast ? 'bg-zinc-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {tp.back}
            </button>
            <button onClick={() => setStep(3)} className="flex-1 bg-green-700 text-white py-4 rounded-2xl font-bold transition hover:bg-green-800">
              {tp.continue}
            </button>
          </div>
        </div>
      )}

      {/* Step 3 - Payment Method */}
      {step === 3 && (
        <div className={`max-w-xl mx-auto p-10 rounded-[40px] border space-y-8 animate-in fade-in slide-in-from-bottom-4 ${
          highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-xl'
        }`}>
          {paymentSuccess ? (
            <div className="text-center space-y-6 py-8 animate-in fade-in zoom-in-95">
              <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                <i className="fa-solid fa-check text-3xl text-green-700"></i>
              </div>
              <h3 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Payment Successful</h3>
              <p className="text-slate-500">Reference: {reference}</p>
            </div>
          ) : (
            <>
              <h3 className={`text-xl font-bold text-center ${highContrast ? 'text-white' : 'text-slate-800'}`}>{tp.step_3}</h3>

              {/* Method Selector */}
              <div className="flex gap-3">
                {[
                  { id: 'card', label: tp.card, icon: 'fa-credit-card' },
                  { id: 'eft', label: tp.eft, icon: 'fa-building-columns' },
                  { id: 'mobile', label: tp.mobile, icon: 'fa-mobile-screen' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`flex-1 p-4 rounded-2xl border-2 text-center transition ${
                      paymentMethod === m.id
                        ? (highContrast ? 'border-yellow-400 bg-zinc-800' : 'border-green-600 bg-green-50')
                        : (highContrast ? 'border-zinc-700 bg-zinc-800' : 'border-slate-100')
                    }`}
                  >
                    <i className={`fa-solid ${m.icon} text-lg mb-2 block ${paymentMethod === m.id ? (highContrast ? 'text-yellow-400' : 'text-green-700') : 'text-slate-400'}`}></i>
                    <span className="text-xs font-bold">{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{tp.cardholder}</label>
                    <input type="text" className={`w-full px-5 py-3 rounded-xl border outline-none transition ${highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200 focus:border-green-600'}`} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{tp.card_number}</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className={`w-full px-5 py-3 rounded-xl border outline-none transition font-mono ${highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200 focus:border-green-600'}`} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{tp.expiry}</label>
                      <input type="text" placeholder="MM/YY" className={`w-full px-5 py-3 rounded-xl border outline-none transition font-mono ${highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200 focus:border-green-600'}`} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{tp.cvv}</label>
                      <input type="text" placeholder="***" className={`w-full px-5 py-3 rounded-xl border outline-none transition font-mono ${highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200 focus:border-green-600'}`} />
                    </div>
                  </div>
                </div>
              )}

              {/* EFT Info */}
              {paymentMethod === 'eft' && (
                <div className={`p-6 rounded-2xl space-y-3 animate-in fade-in ${highContrast ? 'bg-zinc-800' : 'bg-blue-50'}`}>
                  <p className={`text-sm font-bold ${highContrast ? 'text-white' : 'text-blue-800'}`}>Bank: ABSA</p>
                  <p className="text-sm text-slate-500">Account: 405 000 1234</p>
                  <p className="text-sm text-slate-500">Branch: 632005</p>
                  <p className="text-sm text-slate-500">Reference: {reference}</p>
                </div>
              )}

              {/* Mobile Wallet */}
              {paymentMethod === 'mobile' && (
                <div className="space-y-4 animate-in fade-in">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{tp.phone || 'Phone Number'}</label>
                  <input type="tel" placeholder="07X XXX XXXX" className={`w-full px-5 py-3 rounded-xl border outline-none transition ${highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200 focus:border-green-600'}`} />
                </div>
              )}

              <div className="flex gap-4">
                <button onClick={() => setStep(2)} className={`flex-1 py-4 rounded-2xl font-bold transition ${highContrast ? 'bg-zinc-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {tp.back}
                </button>
                <button onClick={handleProcessPayment} className="flex-1 bg-green-700 text-white py-4 rounded-2xl font-bold transition hover:bg-green-800 flex items-center justify-center gap-2">
                  <i className="fa-solid fa-lock"></i> {tp.process}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Security Badge */}
      <div className="text-center pt-4">
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs ${highContrast ? 'bg-zinc-900 text-zinc-400' : 'bg-slate-100 text-slate-500'}`}>
          <i className="fa-solid fa-shield-halved text-green-600"></i>
          <span>{tp.security}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
