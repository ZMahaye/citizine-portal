
import React from 'react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
  lang: string;
  t: any;
  highContrast: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, t, highContrast }) => {
  const stats = [
    { label: t.landing.km_maintained, value: "12,400+", icon: "fa-road" },
    { label: t.landing.licenses_issued, value: "85k+", icon: "fa-id-card" },
    { label: t.landing.safety_score, value: "+18%", icon: "fa-shield-halved" },
  ];

  const goals = [
    { title: t.landing.goal_1, icon: "fa-bus-simple", desc: "Connecting communities through unified transport." },
    { title: t.landing.goal_2, icon: "fa-hammer", desc: "Rapid response to road infrastructure issues." },
    { title: t.landing.goal_3, icon: "fa-universal-access", desc: "Leaving no citizen behind in the digital age." },
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative flex justify-center items-center h-[650px] overflow-hidden" role="banner">
        <div className="z-0 absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000"
            className={`w-full h-full object-cover ${highContrast ? 'grayscale brightness-[0.2]' : 'brightness-[0.4]'}`}
            alt="Durban road infrastructure at sunset"
          />
        </div>
        <div className="z-10 relative space-y-8 mx-auto px-4 max-w-4xl text-center">
          <h1 className="slide-in-from-top-10 font-black text-white text-5xl md:text-7xl leading-tight tracking-tighter animate-in duration-1000 fade-in">
            {t.hero.title.split('.').map((word: string, i: number) => (
              <span key={i} className={i === 2 ? (highContrast ? "text-yellow-400" : "text-green-400") : ""}>{word}{i < 2 ? '.' : ''} </span>
            ))}
          </h1>
          <p className="slide-in-from-top-8 mx-auto max-w-2xl font-medium text-slate-200 text-xl md:text-2xl animate-in duration-1000 delay-150 fade-in">
            {t.hero.subtitle}
          </p>
          <div className="flex sm:flex-row flex-col justify-center gap-6 pt-6 animate-in duration-1000 delay-300 fade-in zoom-in-95">
            <button
              onClick={() => onNavigate('services')}
              className="flex justify-center items-center space-x-3 bg-green-600 hover:bg-green-700 shadow-2xl px-10 py-5 rounded-2xl font-black text-white text-lg hover:scale-105 transition transform"
            >
              <span>{t.hero.explore}</span>
              <i className="fa-arrow-right fa-solid"></i>
            </button>
            <button
              onClick={() => onNavigate('report')}
              className="flex justify-center items-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl px-10 py-5 border border-white/30 rounded-2xl font-black text-white text-lg transition"
            >
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>{t.hero.report}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto px-4 max-w-7xl" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">{t.landing.stats_title}</h2>
        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={i} className={`p-10 rounded-[40px] border text-center space-y-4 transition hover:shadow-xl ${highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100'}`}>
              <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-2xl ${highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-green-50 text-green-700'}`}>
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
              <p className="font-black text-4xl tracking-tighter">{stat.value}</p>
              <p className="font-bold text-slate-500 text-sm uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Goals Section */}
      <section className={`py-24 ${highContrast ? 'bg-zinc-900' : 'bg-slate-900'} text-white relative overflow-hidden`}>
        <div className="z-10 relative mx-auto px-4 max-w-7xl">
          <div className="space-y-4 mx-auto mb-16 max-w-3xl text-center">
            <h2 className="font-black text-4xl italic tracking-tight">{t.landing.goals_title}</h2>
            <div className={`h-1 w-20 mx-auto ${highContrast ? 'bg-yellow-400' : 'bg-green-500'}`}></div>
          </div>
          <div className="gap-12 grid grid-cols-1 md:grid-cols-3">
            {goals.map((goal, i) => (
              <div key={i} className="group space-y-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-transform group-hover:rotate-12 ${highContrast ? 'bg-zinc-800 text-yellow-400 border border-zinc-700' : 'bg-green-600 text-white'}`}>
                  <i className={`fa-solid ${goal.icon}`}></i>
                </div>
                <h3 className="font-bold text-2xl">{goal.title}</h3>
                <p className="text-slate-400 leading-relaxed">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="top-0 right-0 absolute opacity-5 p-20 pointer-events-none">
          <i className="text-[400px] fa-solid fa-map-location-dot"></i>
        </div>
      </section>

      {/* Quick Access Cards for New Features */}
      <section className="mx-auto px-4 max-w-7xl">
        <div className="space-y-3 mb-12 text-center">
          <h2 className={`text-3xl font-black tracking-tight ${highContrast ? 'text-white' : 'text-slate-900'}`}>Quick Access</h2>
          <p className="text-slate-500">Fast-track to essential services</p>
        </div>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Payment Gateway */}
          <button
            onClick={() => onNavigate('payment')}
            className={`p-8 rounded-3xl text-left space-y-4 transition hover:scale-105 hover:shadow-xl border ${highContrast ? 'bg-zinc-900 border-zinc-700 hover:border-yellow-400' : 'bg-white border-slate-100 hover:border-green-500'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-green-50 text-green-700'}`}>
              <i className="fa-solid fa-credit-card"></i>
            </div>
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-slate-900'}`}>{t.nav.payment}</h3>
            <p className="text-slate-500 text-sm">Pay fines, fees, and service charges securely online</p>
            <div className={`text-sm font-semibold flex items-center gap-2 ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>
              Pay Now <i className="fa-arrow-right text-xs fa-solid"></i>
            </div>
          </button>

          {/* Trip Planner */}
          <button
            onClick={() => onNavigate('trip_planner')}
            className={`p-8 rounded-3xl text-left space-y-4 transition hover:scale-105 hover:shadow-xl border ${highContrast ? 'bg-zinc-900 border-zinc-700 hover:border-yellow-400' : 'bg-white border-slate-100 hover:border-green-500'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-blue-50 text-blue-700'}`}>
              <i className="fa-solid fa-route"></i>
            </div>
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-slate-900'}`}>{t.nav.trip_planner}</h3>
            <p className="text-slate-500 text-sm">Plan your journey with live schedules and routes</p>
            <div className={`text-sm font-semibold flex items-center gap-2 ${highContrast ? 'text-yellow-400' : 'text-blue-700'}`}>
              Plan Trip <i className="fa-arrow-right text-xs fa-solid"></i>
            </div>
          </button>

          {/* Road Alerts */}
          <button
            onClick={() => onNavigate('road_alerts')}
            className={`p-8 rounded-3xl text-left space-y-4 transition hover:scale-105 hover:shadow-xl border ${highContrast ? 'bg-zinc-900 border-zinc-700 hover:border-yellow-400' : 'bg-white border-slate-100 hover:border-green-500'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-red-50 text-red-700'}`}>
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-slate-900'}`}>{t.nav.road_alerts}</h3>
            <p className="text-slate-500 text-sm">Stay informed about road conditions and weather</p>
            <div className={`text-sm font-semibold flex items-center gap-2 ${highContrast ? 'text-yellow-400' : 'text-red-700'}`}>
              View Alerts <i className="fa-arrow-right text-xs fa-solid"></i>
            </div>
          </button>



          {/* Driver's License Renewal */}
          <button
            onClick={() => onNavigate('drivers_license_renewal')}
            className={`p-8 rounded-3xl text-left space-y-4 transition hover:scale-105 hover:shadow-xl border ${highContrast ? 'bg-zinc-900 border-zinc-700 hover:border-yellow-400' : 'bg-white border-slate-100 hover:border-green-500'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-green-50 text-green-700'}`}>
              <i className="fa-solid fa-id-card"></i>
            </div>
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-slate-900'}`}>Driver's License Renewal</h3>
            <p className="text-slate-500 text-sm">Renew your driver's license quickly and conveniently online</p>
            <div className={`text-sm font-semibold flex items-center gap-2 ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>
              Apply Now <i className="fa-arrow-right text-xs fa-solid"></i>
            </div>
          </button>

          {/* Vehicle License Disc */}
          <button
            onClick={() => onNavigate('vehicle_license_disc')}
            className={`p-8 rounded-3xl text-left space-y-4 transition hover:scale-105 hover:shadow-xl border ${highContrast ? 'bg-zinc-900 border-zinc-700 hover:border-yellow-400' : 'bg-white border-slate-100 hover:border-green-500'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-blue-50 text-blue-700'}`}>
              <i className="fa-solid fa-car"></i>
            </div>
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-slate-900'}`}>Vehicle License Disc</h3>
            <p className="text-slate-500 text-sm">Renew your vehicle license disc without visiting a licensing office</p>
            <div className={`text-sm font-semibold flex items-center gap-2 ${highContrast ? 'text-yellow-400' : 'text-blue-700'}`}>
              Apply Now <i className="fa-arrow-right text-xs fa-solid"></i>
            </div>
          </button>

          {/* Fines */}
          <button
            onClick={() => onNavigate('payment')}
            className={`p-8 rounded-3xl text-left space-y-4 transition hover:scale-105 hover:shadow-xl border ${highContrast ? 'bg-zinc-900 border-zinc-700 hover:border-yellow-400' : 'bg-white border-slate-100 hover:border-green-500'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-red-50 text-red-700'}`}>
              <i className="fa-solid fa-file-invoice-dollar"></i>
            </div>
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-slate-900'}`}>Fines</h3>
            <p className="text-slate-500 text-sm">View and pay outstanding traffic fines and penalties online</p>
            <div className={`text-sm font-semibold flex items-center gap-2 ${highContrast ? 'text-yellow-400' : 'text-red-700'}`}>
              Pay Fines <i className="fa-arrow-right text-xs fa-solid"></i>
            </div>
          </button>

          {/* Feedback Portal */}
          <button
            onClick={() => onNavigate('feedback')}
            className={`p-8 rounded-3xl text-left space-y-4 transition hover:scale-105 hover:shadow-xl border ${highContrast ? 'bg-zinc-900 border-zinc-700 hover:border-yellow-400' : 'bg-white border-slate-100 hover:border-green-500'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-orange-50 text-orange-700'}`}>
              <i className="fa-solid fa-comments"></i>
            </div>
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-slate-900'}`}>{t.nav.feedback}</h3>
            <p className="text-slate-500 text-sm">Submit feedback, complaints, or satisfaction surveys</p>
            <div className={`text-sm font-semibold flex items-center gap-2 ${highContrast ? 'text-yellow-400' : 'text-orange-700'}`}>
              Give Feedback <i className="fa-arrow-right text-xs fa-solid"></i>
            </div>
          </button>

          {/* Service Catalogue */}
          <button
            onClick={() => onNavigate('services')}
            className={`p-8 rounded-3xl text-left space-y-4 transition hover:scale-105 hover:shadow-xl border ${highContrast ? 'bg-zinc-900 border-zinc-700 hover:border-yellow-400' : 'bg-white border-slate-100 hover:border-green-500'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${highContrast ? 'bg-zinc-800 text-yellow-400' : 'bg-green-50 text-green-700'}`}>
              <i className="fa-solid fa-th-large"></i>
            </div>
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-slate-900'}`}>{t.nav.services}</h3>
            <p className="text-slate-500 text-sm">Browse all DOT services and applications</p>
            <div className={`text-sm font-semibold flex items-center gap-2 ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>
              Explore All <i className="fa-arrow-right text-xs fa-solid"></i>
            </div>
          </button>

          {/* New Application */}
          <button
            onClick={() => onNavigate('services')}
            className={`p-8 rounded-3xl text-left space-y-4 transition hover:scale-105 hover:shadow-xl border ${highContrast ? 'bg-yellow-400 border-yellow-400 hover:bg-yellow-300' : 'bg-green-700 border-green-700 hover:bg-green-800'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${highContrast ? 'bg-yellow-300 text-black' : 'bg-green-600 text-white'}`}>
              <i className="fa-solid fa-plus"></i>
            </div>
            <h3 className={`text-xl font-bold ${highContrast ? 'text-black' : 'text-white'}`}>New Application</h3>
            <p className={`text-sm ${highContrast ? 'text-zinc-800' : 'text-green-100'}`}>Start a new application for any DOT service or permit</p>
            <div className={`text-sm font-semibold flex items-center gap-2 ${highContrast ? 'text-black' : 'text-white'}`}>
              Start Now <i className="fa-arrow-right text-xs fa-solid"></i>
            </div>
          </button>
        </div>
      </section>

      {/* Reliability Callout */}
      <section className="mx-auto px-4 max-w-7xl">
        <div className={`rounded-[50px] p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 ${highContrast ? 'bg-zinc-900 border border-zinc-700' : 'bg-green-700 text-white shadow-2xl'}`}>
          <div className="space-y-6 lg:w-2/3">
            <h2 className="font-black text-4xl tracking-tight">{t.transport.mobility}</h2>
            <p className="opacity-80 max-w-xl text-xl leading-relaxed">
              {t.transport.subtitle}
            </p>
            <button
              onClick={() => onNavigate('transport')}
              className={`px-10 py-4 rounded-2xl font-black text-lg transition shadow-xl ${highContrast ? 'bg-white text-black' : 'bg-slate-900 text-white'}`}
            >
              {t.transport.find_route}
            </button>
          </div>
          <div className="lg:w-1/3 text-center">
            <div className={`inline-block p-10 rounded-full border-8 ${highContrast ? 'border-zinc-800 bg-zinc-800' : 'border-white/20 bg-white/10'}`}>
              <p className="font-black text-6xl">98%</p>
              <p className="mt-2 font-bold text-xs uppercase tracking-widest">{t.hero.reliability}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
