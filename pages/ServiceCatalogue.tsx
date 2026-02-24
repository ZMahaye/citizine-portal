
import React, { useState } from 'react';
import { SERVICES } from '../constants';

interface ServiceCatalogueProps {
  lang: string;
  t: any;
  highContrast?: boolean;
  onNavigate?: (page: string) => void;
}

const ServiceCatalogue: React.FC<ServiceCatalogueProps> = ({ t, highContrast, onNavigate }) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Enatis', 'Operator', 'Community'];

  const filteredServices = SERVICES.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    // match tabs case-insensitively and treat legacy Driver/Vehicle as Enatis
    const svcCat = (s.category || '').toString().toLowerCase();
    const active = (activeTab || '').toString().toLowerCase();
    const matchesTab = active === 'all' || svcCat === active || (active === 'enatis' && (svcCat === 'driver' || svcCat === 'vehicle' || svcCat === 'enatis'));
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-12 mx-auto px-4 py-12 max-w-7xl animate-in duration-700 fade-in">
      <div className="space-y-4 mx-auto max-w-2xl text-center">
        <h1 className={`text-4xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{t.services.title}</h1>
        <p className="text-slate-500">{t.services.subtitle}</p>

        <div className="relative mt-8">
          <input
            type="text"
            placeholder={t.services.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full px-12 py-4 rounded-2xl shadow-sm focus:ring-2 focus:ring-green-500 outline-none text-lg transition ${highContrast ? 'bg-zinc-900 border border-zinc-700 text-white' : 'bg-white border border-slate-200'
              }`}
          />
          <i className="top-1/2 left-4 absolute text-slate-400 text-xl -translate-y-1/2 fa-solid fa-magnifying-glass"></i>
        </div>
      </div>

      <div className={`flex flex-wrap justify-center gap-2 border-b pb-4 ${highContrast ? 'border-zinc-800' : 'border-slate-200'}`}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition ${activeTab === tab
                ? 'bg-green-700 text-white shadow-md'
                : (highContrast ? 'text-zinc-500 hover:bg-zinc-800' : 'text-slate-500 hover:bg-slate-100')
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((svc) => (
          <div key={svc.id} className={`group p-8 rounded-3xl border shadow-sm transition-all cursor-pointer ${highContrast ? 'bg-zinc-900 border-zinc-700 hover:border-yellow-400' : 'bg-white border-slate-100 hover:shadow-xl hover:border-green-100'
            }`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${highContrast ? 'bg-zinc-800' : 'bg-slate-50'}`}>
                <i className={`fa-solid ${svc.icon} text-xl ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}></i>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${highContrast ? 'bg-zinc-800 text-zinc-400' : 'bg-slate-100 text-slate-500'}`}>
                {svc.category}
              </span>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-800'}`}>{svc.title}</h3>
            <p className="mb-6 text-slate-500 text-sm leading-relaxed">{svc.description}</p>
            <div className={`flex items-center justify-between mt-auto pt-6 border-t ${highContrast ? 'border-zinc-800' : 'border-slate-50'}`}>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${svc.status === 'online' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                <span className="font-medium text-slate-400 text-xs">{t.services.online}</span>
              </div>
              <button
                onClick={() => svc.navigateTo && onNavigate && onNavigate(svc.navigateTo)}
                className={`font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}
              >
                {t.services.apply} <i className="fa-chevron-right ml-1 text-[10px] fa-solid"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className={`text-center py-20 rounded-3xl border-2 border-dashed ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-slate-50 border-slate-200'}`}>
          <i className="mb-4 text-slate-300 text-5xl fa-solid fa-face-frown"></i>
          <h3 className="font-bold text-slate-400 text-xl">{t.services.no_results}</h3>
          <button onClick={() => { setSearch(''); setActiveTab('All'); }} className="mt-2 font-bold text-green-700 hover:underline">{t.services.clear}</button>
        </div>
      )}
    </div>
  );
};

export default ServiceCatalogue;
