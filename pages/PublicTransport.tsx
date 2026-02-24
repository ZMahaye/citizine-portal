
import React, { useState } from 'react';
import { TRANSPORT_HUBS } from '../constants';

interface PublicTransportProps {
  lang: string;
  t: any;
  highContrast?: boolean;
  onNavigate?: (page: string) => void;
}

const PublicTransport: React.FC<PublicTransportProps> = ({ t, highContrast, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Bus' | 'Taxi' | 'Rail'>('All');
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
              {(['All', 'Bus', 'Taxi', 'Rail'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${activeTab === tab ? 'bg-green-700 text-white shadow-lg' : (highContrast ? 'bg-zinc-800 text-zinc-400' : 'bg-slate-50 text-slate-400')
                    }`}
                >
                  {t.transport.hub_types[tab.toLowerCase() as keyof typeof t.transport.hub_types]}
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
                <h3 className={`font-bold text-lg mb-1 ${highContrast ? 'text-white' : 'text-slate-800'}`}>{hub.name}</h3>
                <p className="text-xs text-slate-400 font-medium mb-4 uppercase">{hub.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicTransport;
