
import React, { useState } from 'react';

interface TrafficMapProps {
  lang: string;
  t: any;
  highContrast?: boolean;
}

const TrafficMap: React.FC<TrafficMapProps> = ({ t, highContrast }) => {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'map' | 'cctv' | 'planned'>('map');

  const incidents = [
    { id: 'I-001', title: 'Accident - N2 Southbound', loc: 'Umgeni Interchange', impact: 'High', type: 'accident', coords: { top: '25%', left: '35%' }, time: '12 mins ago' },
    { id: 'I-002', title: 'Roadworks - M13 West', loc: '45th Cutting', impact: 'Med', type: 'construction', coords: { top: '55%', left: '55%' }, time: '45 mins ago' },
  ];

  const cctvFeeds = [
    { id: 'CAM-01', label: 'N2 Northbound — Umgeni', status: 'live' },
    { id: 'CAM-02', label: 'M4 Marine Drive', status: 'live' },
    { id: 'CAM-03', label: 'N3 Toll — Mariannhill', status: 'live' },
    { id: 'CAM-04', label: 'R102 King Cetshwayo', status: 'offline' },
    { id: 'CAM-05', label: 'M13 Westville Interchange', status: 'live' },
    { id: 'CAM-06', label: 'N2 Southbound — Isipingo', status: 'live' },
  ];

  const plannedWorks = [
    { id: 'PW-001', title: 'N3 Resurfacing', loc: 'Hammarsdale to Cato Ridge', start: '2026-03-01', end: '2026-03-28', impact: 'High', lanes: '2 lanes closed' },
    { id: 'PW-002', title: 'M13 Bridge Maintenance', loc: '45th Cutting, Pinetown', start: '2026-02-24', end: '2026-03-07', impact: 'Med', lanes: '1 lane closed' },
    { id: 'PW-003', title: 'R102 Stormwater Repairs', loc: 'Tongaat North', start: '2026-03-10', end: '2026-03-15', impact: 'Low', lanes: 'Shoulder only' },
    { id: 'PW-004', title: 'N2 Median Barrier Upgrade', loc: 'Isipingo to Amanzimtoti', start: '2026-04-01', end: '2026-04-30', impact: 'Med', lanes: '1 lane closed' },
  ];

  const tabBtn = (view: 'map' | 'cctv' | 'planned', label: string) => (
    <button
      onClick={() => setActiveView(view)}
      className={`px-6 py-2 rounded-xl text-xs font-black transition ${activeView === view
        ? highContrast ? 'bg-yellow-400 text-black' : 'bg-white text-slate-900 shadow-sm'
        : highContrast ? 'text-zinc-300 hover:text-white' : 'text-slate-500 hover:text-slate-700'
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className={`text-3xl font-extrabold tracking-tight ${highContrast ? 'text-white' : 'text-slate-800'}`}>{t.traffic.title}</h1>
          <p className="text-slate-500">{t.traffic.subtitle}</p>
        </div>
        <div className={`flex p-1 rounded-2xl border ${highContrast ? 'bg-zinc-800 border-zinc-700' : 'bg-slate-100 border-slate-200 shadow-inner'}`}>
          {tabBtn('map', t.traffic.views.map)}
          {tabBtn('cctv', t.traffic.views.cctv)}
          {tabBtn('planned', t.traffic.views.planned)}
        </div>
      </div>

      {/* MAP VIEW */}
      {activeView === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className={`lg:col-span-3 aspect-[16/10] rounded-[40px] overflow-hidden relative border-8 shadow-2xl ${highContrast ? 'bg-black border-zinc-800' : 'bg-slate-900 border-white'}`}>
            <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Map Grid" />
            </div>

            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                style={{ top: incident.coords.top, left: incident.coords.left }}
                onClick={() => setSelectedIncident(incident.id)}
                aria-label={`${incident.title}, ${incident.impact} impact`}
              >
                <div className={`w-10 h-10 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white ${incident.impact === 'High' ? 'bg-red-600' : 'bg-yellow-500'
                  }`}>
                  <i className={`fa-solid ${incident.type === 'accident' ? 'fa-car-burst' : 'fa-person-digging'} text-sm`}></i>
                </div>
              </div>
            ))}

            <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {t.traffic.system_nominal}
              </div>
              <div className="w-px h-3 bg-white/20"></div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">{t.traffic.nodes}: 442</div>
            </div>
          </div>

          <div className="space-y-6">
            <section className={`p-6 rounded-[32px] border shadow-sm ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-200'}`}>
              <h2 className={`font-bold mb-6 ${highContrast ? 'text-white' : 'text-slate-800'}`}>{t.traffic.live_incidents}</h2>
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <div key={incident.id} className={`p-4 rounded-2xl border cursor-pointer ${highContrast ? 'border-zinc-800 hover:bg-zinc-800' : 'border-slate-50 hover:bg-slate-50'}`}>
                    <h4 className={`text-sm font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{incident.title}</h4>
                    <p className="text-[11px] text-slate-500">{incident.loc}</p>
                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-tight mt-2">
                      <span className="text-slate-400">{incident.time}</span>
                      <span className={incident.impact === 'High' ? 'text-red-600' : 'text-yellow-600'}>{incident.impact} {t.traffic.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* CCTV VIEW */}
      {activeView === 'cctv' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
            <span className={`text-xs font-bold uppercase tracking-widest ${highContrast ? 'text-white' : 'text-slate-500'}`}>Live Feeds — {cctvFeeds.filter(c => c.status === 'live').length} cameras online</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cctvFeeds.map((cam) => (
              <div key={cam.id} className={`rounded-3xl overflow-hidden border shadow-sm ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-200'}`}>
                <div className={`aspect-video relative flex items-center justify-center ${highContrast ? 'bg-zinc-800' : 'bg-slate-900'}`}>
                  {cam.status === 'live' ? (
                    <>
                      <img
                        src={`https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&q=60&w=600&h=340`}
                        className="w-full h-full object-cover opacity-60 grayscale"
                        alt={cam.label}
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        <span className="text-[9px] font-black text-white uppercase">Live</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                      <i className="fa-solid fa-video-slash text-3xl"></i>
                      <span className="text-xs font-bold uppercase tracking-wider">Offline</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-0.5 rounded-lg">
                    <span className="text-[9px] font-bold text-white">{cam.id}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className={`text-sm font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{cam.label}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${cam.status === 'live' ? 'text-green-600' : 'text-red-500'}`}>{cam.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PLANNED ROADWORKS VIEW */}
      {activeView === 'planned' && (
        <div className="space-y-6">
          <p className={`text-sm ${highContrast ? 'text-zinc-400' : 'text-slate-500'}`}>Upcoming and active planned roadworks across KwaZulu-Natal.</p>
          <div className="space-y-4">
            {plannedWorks.map((work) => (
              <div key={work.id} className={`p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row md:items-center gap-4 ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-200'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${work.impact === 'High' ? 'bg-red-100 text-red-600' :
                    work.impact === 'Med' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                  }`}>
                  <i className="fa-solid fa-person-digging"></i>
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className={`font-bold text-base ${highContrast ? 'text-white' : 'text-slate-800'}`}>{work.title}</h3>
                  <p className="text-sm text-slate-500">{work.loc}</p>
                  <p className={`text-xs font-semibold ${highContrast ? 'text-zinc-400' : 'text-slate-400'}`}><i className="fa-solid fa-cone fa-xs mr-1"></i>{work.lanes}</p>
                </div>
                <div className="text-right space-y-1 shrink-0">
                  <p className={`text-xs font-bold uppercase tracking-wider ${work.impact === 'High' ? 'text-red-600' :
                      work.impact === 'Med' ? 'text-yellow-600' : 'text-green-600'
                    }`}>{work.impact} Impact</p>
                  <p className="text-[11px] text-slate-400">{work.start} → {work.end}</p>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}>{work.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default TrafficMap;
