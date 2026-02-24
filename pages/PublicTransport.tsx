
import React, { useState } from 'react';
import { TRANSPORT_HUBS } from '../constants';

interface PublicTransportProps {
  lang: string;
  t: any;
  highContrast?: boolean;
  onNavigate?: (page: string) => void;
}

const HUB_TYPE_ICON: Record<string, string> = {
  Bus: 'fa-bus',
  Taxi: 'fa-taxi',
  Rail: 'fa-train',
  Flight: 'fa-plane',
};

const HUB_TYPE_COLOR: Record<string, string> = {
  Bus: 'bg-blue-100 text-blue-700',
  Taxi: 'bg-yellow-100 text-yellow-700',
  Rail: 'bg-purple-100 text-purple-700',
  Flight: 'bg-sky-100 text-sky-700',
};

const PublicTransport: React.FC<PublicTransportProps> = ({ t, highContrast, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Bus' | 'Taxi' | 'Rail' | 'Flight'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHubs = TRANSPORT_HUBS.filter(hub => {
    const matchesSearch = hub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hub.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || hub.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="lg:w-1/2 space-y-6">
          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest">
            <i className="fa-solid fa-van-shuttle mr-2"></i> {t.transport.mobility}
          </div>
          <h1 className={`text-4xl lg:text-5xl font-extrabold leading-tight ${highContrast ? 'text-white' : 'text-slate-800'}`}>
            {t.transport.title}
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            {t.transport.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-xl hover:bg-slate-800 transition transform hover:-translate-y-1">
              {t.transport.find_route}
            </button>
            <button onClick={() => onNavigate && onNavigate('ol_application')} className={`px-8 py-3 rounded-xl font-bold border transition ${highContrast ? 'border-zinc-700 text-white hover:bg-zinc-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {t.transport.op_license}
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="aspect-square bg-green-50 rounded-[60px] flex items-center justify-center overflow-hidden border-8 border-white shadow-2xl">
            <img src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale" alt="KZN Public Transport" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-[200px]">
            <p className="text-2xl font-black text-green-700">98%</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.hero.reliability}</p>
          </div>
        </div>
      </div>

      <section className={`rounded-[40px] border shadow-sm overflow-hidden ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-200'}`}>
        <div className="p-8 lg:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{t.transport.locator}</h2>
              <p className="text-slate-500 text-sm">{t.transport.locator_sub}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['All', 'Bus', 'Taxi', 'Rail', 'Flight'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-1.5 ${activeTab === tab ? 'bg-green-700 text-white shadow-lg' : (highContrast ? 'bg-zinc-800 text-zinc-400' : 'bg-slate-50 text-slate-400')
                    }`}
                >
                  {tab !== 'All' && <i className={`fa-solid ${HUB_TYPE_ICON[tab]} text-[10px]`}></i>}
                  {tab === 'All' ? (t.transport.hub_types?.all || 'All') : tab === 'Flight' ? 'Flight' : t.transport.hub_types[tab.toLowerCase() as keyof typeof t.transport.hub_types]}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder={t.transport.search_area}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-6 py-4 rounded-2xl outline-none transition ${highContrast ? 'bg-zinc-800 border border-zinc-700 text-white' : 'bg-slate-50 border border-slate-100'}`}
            />
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHubs.map(hub => (
              <div key={hub.id} className={`group p-6 rounded-3xl border transition-all ${highContrast ? 'bg-zinc-900 border-zinc-800 hover:border-yellow-400' : 'hover:border-green-200 hover:bg-green-50/30 border-slate-100'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${highContrast ? 'bg-zinc-800 text-yellow-400' : HUB_TYPE_COLOR[hub.type]}`}>
                    <i className={`fa-solid ${HUB_TYPE_ICON[hub.type]} text-sm`}></i>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${highContrast ? 'bg-zinc-800 text-zinc-400' : HUB_TYPE_COLOR[hub.type]}`}>
                    {hub.type}
                  </span>
                </div>
                <h3 className={`font-bold text-base mb-1 ${highContrast ? 'text-white' : 'text-slate-800'}`}>{hub.name}</h3>
                <p className="text-xs text-slate-400 font-medium mb-3 flex items-center gap-1">
                  <i className="fa-solid fa-location-dot text-slate-300"></i>
                  {hub.location}
                </p>
                {hub.services && hub.services.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {hub.services.map((svc, i) => (
                      <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${highContrast ? 'bg-zinc-800 text-zinc-300' : 'bg-slate-100 text-slate-500'}`}>
                        {svc}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Licenses Section */}
      <section className={`rounded-[40px] border overflow-hidden ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-200'}`}>
        <div className="p-8 lg:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-green-100 text-green-700 mb-3">
                <i className="fa-solid fa-file-certificate"></i> Operating Licenses
              </div>
              <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>Public Transport Operating Licenses</h2>
              <p className="text-slate-500 text-sm mt-1">Apply for, renew, or check the status of your public transport operating license.</p>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('ol_application')}
              className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 flex-shrink-0 transition ${highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-green-700 text-white hover:bg-green-800 shadow-lg'}`}
            >
              <i className="fa-solid fa-plus"></i>
              Apply for New License
            </button>
          </div>

          {/* OL Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'fa-file-circle-plus',
                title: 'New Application',
                desc: 'Apply for a new operating license for your public transport vehicle or fleet.',
                action: 'Start Application',
                color: highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-green-50 text-green-700',
              },
              {
                icon: 'fa-rotate',
                title: 'Renewal',
                desc: 'Renew an expiring or expired operating license before penalties apply.',
                action: 'Renew License',
                color: highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-blue-50 text-blue-700',
              },
              {
                icon: 'fa-magnifying-glass-chart',
                title: 'Track Application',
                desc: 'Check the processing status of a submitted operating license application.',
                action: 'Track Status',
                color: highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-amber-50 text-amber-700',
              },
            ].map((card, i) => (
              <button
                key={i}
                onClick={() => onNavigate && onNavigate('ol_application')}
                className={`p-6 rounded-3xl border text-left transition group hover:scale-[1.02] hover:shadow-md ${highContrast ? 'bg-zinc-900 border-zinc-800 hover:border-yellow-400' : 'border-slate-100 hover:border-green-200'}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-lg ${card.color}`}>
                  <i className={`fa-solid ${card.icon}`}></i>
                </div>
                <h3 className={`font-bold text-base mb-2 ${highContrast ? 'text-white' : 'text-slate-800'}`}>{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{card.desc}</p>
                <span className={`text-sm font-bold flex items-center gap-1.5 ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>
                  {card.action} <i className="fa-solid fa-arrow-right text-xs"></i>
                </span>
              </button>
            ))}
          </div>

          {/* Mock Active Licenses */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
              <i className="fa-solid fa-list-check mr-2 text-green-600"></i>
              Sample Active Licenses
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`text-left ${highContrast ? 'text-zinc-400' : 'text-slate-500'}`}>
                    <th className="pb-3 pr-6 font-bold text-xs uppercase tracking-widest">License No.</th>
                    <th className="pb-3 pr-6 font-bold text-xs uppercase tracking-widest">Vehicle</th>
                    <th className="pb-3 pr-6 font-bold text-xs uppercase tracking-widest">Route</th>
                    <th className="pb-3 pr-6 font-bold text-xs uppercase tracking-widest">Expires</th>
                    <th className="pb-3 font-bold text-xs uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { no: 'OL-2024-00412', vehicle: 'Toyota Quantum (NP 12 FG)', route: 'Durban – KwaMashu', expires: '2026-06-30', status: 'active' },
                    { no: 'OL-2024-00891', vehicle: 'Iveco Daily Bus (ND 44 HX)', route: 'Durban – Umlazi', expires: '2026-03-15', status: 'expiring' },
                    { no: 'OL-2023-01204', vehicle: 'Mercedes Sprinter (CA 78 JK)', route: 'PMB – Edendale', expires: '2025-12-31', status: 'expired' },
                  ].map((row, i) => (
                    <tr key={i} className={highContrast ? 'border-zinc-800' : ''}>
                      <td className={`py-4 pr-6 font-mono font-bold text-xs ${highContrast ? 'text-white' : 'text-slate-800'}`}>{row.no}</td>
                      <td className={`py-4 pr-6 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>{row.vehicle}</td>
                      <td className={`py-4 pr-6 ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>{row.route}</td>
                      <td className={`py-4 pr-6 text-xs ${highContrast ? 'text-zinc-400' : 'text-slate-500'}`}>{row.expires}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          row.status === 'active' ? 'bg-green-100 text-green-700' :
                          row.status === 'expiring' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {row.status === 'active' ? 'Active' : row.status === 'expiring' ? 'Expiring Soon' : 'Expired'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info Banner */}
          <div className={`p-5 rounded-2xl flex items-start gap-4 ${highContrast ? 'bg-zinc-800 border border-zinc-700' : 'bg-amber-50 border border-amber-200'}`}>
            <i className={`fa-solid fa-circle-info text-xl flex-shrink-0 mt-0.5 ${highContrast ? 'text-yellow-400' : 'text-amber-600'}`}></i>
            <div>
              <p className={`font-bold text-sm ${highContrast ? 'text-white' : 'text-amber-800'}`}>Operating Without a Valid License is an Offence</p>
              <p className={`text-sm mt-1 ${highContrast ? 'text-zinc-300' : 'text-amber-700'}`}>
                Under the National Land Transport Act (NLTA), operating a public transport vehicle without a valid operating license may result in fines, vehicle impoundment, and prosecution. Renew your license before it expires. Processing takes up to 21 business days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicTransport;
