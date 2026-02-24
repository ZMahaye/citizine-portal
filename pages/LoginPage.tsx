import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (user: { name: string; email: string; role: string }) => void;
  onNavigate: (page: string) => void;
  highContrast: boolean;
  t: any;
}

const DEMO_ACCOUNTS = [
  {
    email: 'citizen@kzndot.gov.za',
    password: 'citizen123',
    name: 'Sibusiso Dlamini',
    role: 'Citizen',
  },
  {
    email: 'operator@kzndot.gov.za',
    password: 'operator123',
    name: 'Thandi Nkosi',
    role: 'Transport Operator',
  },
  {
    email: 'admin@kzndot.gov.za',
    password: 'admin123',
    name: 'Admin User',
    role: 'Administrator',
  },
];

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate, highContrast }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regId, setRegId] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('Citizen');
  const [regSuccess, setRegSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const account = DEMO_ACCOUNTS.find(
        (a) => a.email === email.trim() && a.password === password
      );
      if (account) {
        onLogin({ name: account.name, email: account.email, role: account.role });
      } else {
        setError('Invalid email or password. Try a demo account below.');
      }
      setLoading(false);
    }, 900);
  };

  const handleDemoLogin = (account: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(account.email);
    setPassword(account.password);
    setError('');
    setLoading(true);
    setTimeout(() => {
      onLogin({ name: account.name, email: account.email, role: account.role });
      setLoading(false);
    }, 700);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!regName || !regEmail || !regId || !regPassword) {
      setError('Please complete all required fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRegSuccess(true);
    }, 1000);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none transition ${
    highContrast
      ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
      : 'bg-slate-50 border-slate-200 text-slate-900'
  }`;

  const labelClass = `block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`;

  return (
    <div className={`min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 ${highContrast ? 'bg-black' : 'bg-slate-50'}`}>
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-0 overflow-hidden rounded-[40px] shadow-2xl">
        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-between bg-green-700 text-white p-12 lg:w-5/12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex justify-center items-center bg-white rounded-lg w-10 h-10 font-bold text-green-700 text-xl">
                K
              </div>
              <div>
                <p className="font-bold text-lg leading-tight">KZN DOT</p>
                <p className="text-green-300 text-[10px] font-bold uppercase tracking-widest">Citizen Portal</p>
              </div>
            </div>
            <h2 className="text-3xl font-black leading-tight mt-8">
              Your gateway to <br />
              <span className="text-green-300">seamless transport</span> <br />
              services.
            </h2>
            <p className="text-green-100 text-sm leading-relaxed">
              Sign in to access your personalized dashboard, apply for licenses, plan trips, pay fines, and more — all in one place.
            </p>
          </div>

          <div className="space-y-4 mt-12">
            <p className="text-xs font-bold text-green-300 uppercase tracking-widest">What you can do:</p>
            {[
              { icon: 'fa-id-card', text: "Apply for licenses & permits" },
              { icon: 'fa-route', text: "Plan journeys with live schedules" },
              { icon: 'fa-credit-card', text: "Pay fines and service fees" },
              { icon: 'fa-bus', text: "Manage operating licenses" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                  <i className={`fa-solid ${item.icon} text-sm text-white`}></i>
                </div>
                <span className="text-sm text-green-100">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className={`flex-1 p-8 lg:p-12 ${highContrast ? 'bg-zinc-900' : 'bg-white'}`}>
          {/* Tabs */}
          <div className={`flex rounded-2xl p-1 mb-8 ${highContrast ? 'bg-zinc-800' : 'bg-slate-100'}`}>
            {(['login', 'register'] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); setRegSuccess(false); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  tab === t
                    ? (highContrast ? 'bg-yellow-400 text-black' : 'bg-white text-slate-800 shadow')
                    : (highContrast ? 'text-zinc-400' : 'text-slate-400')
                }`}
              >
                {t === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {/* Login Form */}
          {tab === 'login' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h1 className={`text-2xl font-black ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                  Welcome back
                </h1>
                <p className="text-slate-500 text-sm mt-1">Sign in to your KZN DOT account</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    loading
                      ? 'opacity-60 cursor-not-allowed'
                      : ''
                  } ${highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-green-700 text-white hover:bg-green-800 shadow-lg'}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-arrow-right-to-bracket"></i>
                      Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Demo Accounts */}
              <div className={`p-4 rounded-2xl border ${highContrast ? 'bg-zinc-800 border-zinc-700' : 'bg-blue-50 border-blue-100'}`}>
                <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${highContrast ? 'text-zinc-400' : 'text-blue-600'}`}>
                  Demo Accounts — click to login instantly
                </p>
                <div className="space-y-2">
                  {DEMO_ACCOUNTS.map((account) => (
                    <button
                      key={account.email}
                      onClick={() => handleDemoLogin(account)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition ${
                        highContrast
                          ? 'bg-zinc-700 hover:bg-zinc-600 text-white'
                          : 'bg-white hover:bg-blue-100 border border-blue-200'
                      }`}
                    >
                      <div>
                        <p className={`text-sm font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{account.name}</p>
                        <p className="text-xs text-slate-500">{account.role} · {account.email}</p>
                      </div>
                      <i className={`fa-solid fa-arrow-right text-xs ${highContrast ? 'text-yellow-400' : 'text-blue-500'}`}></i>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Register Form */}
          {tab === 'register' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h1 className={`text-2xl font-black ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                  Create Account
                </h1>
                <p className="text-slate-500 text-sm mt-1">Register for a KZN DOT Citizen Portal account</p>
              </div>

              {regSuccess ? (
                <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <i className="fa-solid fa-check text-3xl text-green-600"></i>
                  </div>
                  <h2 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Registration Successful!</h2>
                  <p className="text-slate-500 text-sm">Your account has been created. You can now sign in.</p>
                  <button
                    onClick={() => { setTab('login'); setRegSuccess(false); setEmail(regEmail); }}
                    className={`px-8 py-3 rounded-xl font-bold transition ${highContrast ? 'bg-yellow-400 text-black' : 'bg-green-700 text-white hover:bg-green-800'}`}
                  >
                    Sign In Now
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className={labelClass}>Full Name</label>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Sibusiso Dlamini"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>SA ID Number</label>
                      <input
                        type="text"
                        value={regId}
                        onChange={(e) => setRegId(e.target.value)}
                        placeholder="0000000000000"
                        maxLength={13}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Account Type</label>
                      <select
                        value={regRole}
                        onChange={(e) => setRegRole(e.target.value)}
                        className={inputClass}
                      >
                        <option value="Citizen">Citizen</option>
                        <option value="Transport Operator">Transport Operator</option>
                        <option value="Business">Business</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Password</label>
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                      <i className="fa-solid fa-circle-exclamation"></i>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                      loading ? 'opacity-60 cursor-not-allowed' : ''
                    } ${highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-green-700 text-white hover:bg-green-800 shadow-lg'}`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Creating account...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-user-plus"></i>
                        Create Account
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          <p className="mt-6 text-center text-xs text-slate-400">
            By signing in you agree to the{' '}
            <button className={`underline ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>Terms of Use</button>
            {' '}and{' '}
            <button className={`underline ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>Privacy Policy</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
