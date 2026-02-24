
import React, { useEffect, useState } from 'react';
import { MOCK_NOTIFICATIONS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  lang: string;
  t: any;
  highContrast?: boolean;
  onNavigate?: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ t, highContrast, onNavigate }) => {
  const [animate, setAnimate] = useState(false);
  const [sosModal, setSosModal] = useState(false);
  const [sosPhone, setSosPhone] = useState('');
  const [sosActivated, setSosActivated] = useState(false);
  const [sosLoading, setSosLoading] = useState(false);

  const handleSosActivate = () => {
    if (!sosPhone.trim()) return;
    setSosLoading(true);
    setTimeout(() => {
      setSosLoading(false);
      setSosActivated(true);
    }, 1500);
  };

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const statsData = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 19 },
    { name: 'Mar', value: 25 },
    { name: 'Apr', value: 15 },
    { name: 'May', value: 22 },
    { name: 'Jun', value: 30 },
  ];

  const applicationStatus = [
    { id: 'APP-8231', service: t.services.items.renewal, date: '2026-02-10', status: t.dashboard.status.progress, progress: 65, color: 'blue' },
    { id: 'APP-9012', service: t.services.items.disc, date: '2026-01-22', status: t.dashboard.status.completed, progress: 100, color: 'green' },
    { id: 'APP-1142', service: t.services.items.ol, date: '2026-02-15', status: t.dashboard.status.review, progress: 20, color: 'yellow' },
  ];

  const quickActions = [
    { icon: 'fa-id-card', label: t.services.items.renewal, color: 'bg-blue-500', page: 'drivers_license_renewal' },
    { icon: 'fa-car-side', label: t.services.items.disc, color: 'bg-green-600', page: 'vehicle_license_disc' },
    { icon: 'fa-hand-holding-dollar', label: "Fines", color: 'bg-orange-500', page: 'payment' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className={`text-3xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{t.dashboard.welcome}</h1>
          <p className="text-slate-500">{t.dashboard.active_apps}</p>
        </div>
        <button onClick={() => onNavigate && onNavigate('services')} className="bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-green-700/20 hover:bg-green-800 transition transform hover:scale-105">
          <i className="fa-solid fa-plus mr-2"></i> {t.dashboard.new_app}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action, i) => (
          <button key={i} onClick={() => onNavigate && onNavigate(action.page)} className={`p-4 rounded-2xl border flex items-center space-x-4 transition group ${highContrast ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'}`}>
            <div className={`w-12 h-12 rounded-xl ${action.color} text-white flex items-center justify-center shrink-0`}>
              <i className={`fa-solid ${action.icon}`}></i>
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t.dashboard.quick_actions}</p>
              <h4 className="text-sm font-bold truncate max-w-[150px]">{action.label}</h4>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className={`rounded-3xl border shadow-sm overflow-hidden ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-200'}`}>
            <div className={`p-6 border-b flex justify-between items-center ${highContrast ? 'bg-zinc-800' : 'bg-slate-50/50'}`}>
              <h2 className={`font-bold flex items-center ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                <i className="fa-solid fa-clock-rotate-left mr-2 text-green-700"></i>
                {t.dashboard.track}
              </h2>
              <button className="text-xs text-green-700 font-bold uppercase hover:underline">{t.dashboard.history}</button>
            </div>
            <div className="p-6 space-y-8">
              {applicationStatus.map((app) => (
                <div key={app.id} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className={`font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{app.service}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.dashboard.reference}: {app.id} • {app.date}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{t.dashboard.progress}</span>
                      <span className={`text-[10px] font-bold ${highContrast ? 'text-white' : 'text-slate-700'}`}>{app.progress}%</span>
                    </div>
                    <div className={`overflow-hidden h-2.5 mb-4 rounded-full ${highContrast ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                      <div
                        style={{ width: animate ? `${app.progress}%` : '0%' }}
                        className={`h-full bg-green-600 transition-all duration-1000 ease-out`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={`p-6 rounded-3xl border shadow-sm ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-200'}`}>
            <h2 className={`font-bold mb-8 ${highContrast ? 'text-white' : 'text-slate-800'}`}>{t.dashboard.safety_reports}</h2>
            <div className="h-64 min-h-[256px] w-full relative">
              <ResponsiveContainer width="99%" height="100%">
                <BarChart data={statsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={highContrast ? '#3f3f46' : '#f1f5f9'} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', backgroundColor: highContrast ? '#18181b' : '#fff', color: highContrast ? '#fff' : '#000' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {statsData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index === statsData.length - 1 ? '#15803d' : highContrast ? '#27272a' : '#e2e8f0'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className={`p-6 rounded-3xl border shadow-sm ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{t.dashboard.traffic_live}</h2>
              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[9px] font-bold animate-pulse">LIVE</span>
            </div>
            <div className="space-y-4">
              {MOCK_NOTIFICATIONS.map((notif) => (
                <div key={notif.id} className="flex gap-4 p-4 rounded-2xl border border-transparent hover:bg-slate-50 transition cursor-pointer group">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-circle-info text-slate-400"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{notif.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">{notif.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-slate-50 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-widest hover:bg-slate-100">
              {t.dashboard.clear_all}
            </button>
          </section>

          <section className={`p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group ${sosActivated ? 'bg-green-700' : 'bg-green-900'}`}>
            <div className="relative z-10 space-y-4">
              {sosActivated ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <i className="fa-solid fa-shield-check text-white text-lg"></i>
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-green-200">Active</span>
                  </div>
                  <h3 className="text-xl font-bold">SOS Tracking Active</h3>
                  <p className="text-green-100 text-sm opacity-70">Emergency responders can locate you at {sosPhone}. Stay safe.</p>
                  <button onClick={() => { setSosActivated(false); setSosPhone(''); }} className="bg-white/20 hover:bg-white/30 text-white px-6 py-2.5 rounded-xl text-sm font-black w-full transition">
                    Deactivate
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold">{t.dashboard.sos_title}</h3>
                  <p className="text-green-100 text-sm opacity-70">{t.dashboard.sos_desc}</p>
                  <button onClick={() => setSosModal(true)} className="bg-white text-green-900 px-6 py-2.5 rounded-xl text-sm font-black w-full transform group-hover:scale-105 transition">
                    {t.dashboard.sos_btn}
                  </button>
                </>
              )}
            </div>
          </section>

          {/* SOS Activation Modal */}
          {sosModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSosModal(false)}>
              <div
                className={`w-full max-w-md rounded-3xl shadow-2xl p-8 space-y-6 ${highContrast ? 'bg-zinc-900 border border-zinc-700' : 'bg-white'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                      <i className="fa-solid fa-shield-halved text-red-600 text-xl"></i>
                    </div>
                    <div>
                      <h2 className={`font-black text-lg ${highContrast ? 'text-white' : 'text-slate-800'}`}>Activate Safe Passage SOS</h2>
                      <p className="text-xs text-slate-400">Emergency response tracking</p>
                    </div>
                  </div>
                  <button onClick={() => setSosModal(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition">
                    <i className="fa-solid fa-times text-slate-500 text-sm"></i>
                  </button>
                </div>

                <div className={`p-4 rounded-2xl text-sm ${highContrast ? 'bg-zinc-800 text-zinc-300' : 'bg-amber-50 text-amber-800'}`}>
                  <i className="fa-solid fa-circle-info mr-2"></i>
                  Once activated, emergency services will be able to track your location when you trigger an SOS alert.
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-bold ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                    Emergency Contact Number
                  </label>
                  <input
                    type="tel"
                    value={sosPhone}
                    onChange={(e) => setSosPhone(e.target.value)}
                    placeholder="e.g. 082 123 4567"
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${highContrast ? 'bg-zinc-800 border-zinc-600 text-white placeholder-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSosModal(false)}
                    className={`py-3 rounded-xl text-sm font-bold transition ${highContrast ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => { handleSosActivate(); setSosModal(false); }}
                    disabled={!sosPhone.trim() || sosLoading}
                    className="py-3 rounded-xl text-sm font-black bg-red-600 text-white hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    {sosLoading ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i>Activating...</> : 'Activate Now'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
