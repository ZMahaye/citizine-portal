import React, { useState } from 'react';
import { MOCK_ROAD_ALERTS, MOCK_WEATHER, SAFETY_TIPS } from '../constants';

interface RoadAlertsProps {
  lang: string;
  t: any;
  highContrast?: boolean;
}

const RoadAlerts: React.FC<RoadAlertsProps> = ({ t, highContrast }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [frequency, setFrequency] = useState('immediate');

  const ra = t.road_alerts;

  const filters = [
    { id: 'all', label: ra.filter_all, icon: 'fa-list' },
    { id: 'critical', label: ra.filter_critical, icon: 'fa-triangle-exclamation' },
    { id: 'weather', label: ra.filter_weather, icon: 'fa-cloud-rain' },
    { id: 'roadworks', label: ra.filter_roadworks, icon: 'fa-road-barrier' },
    { id: 'congestion', label: ra.filter_congestion, icon: 'fa-car' },
    { id: 'speed', label: ra.filter_speed, icon: 'fa-gauge-high' },
  ];

  const filteredAlerts = activeFilter === 'all' 
    ? MOCK_ROAD_ALERTS 
    : activeFilter === 'critical'
      ? MOCK_ROAD_ALERTS.filter(a => a.severity === 'critical')
      : MOCK_ROAD_ALERTS.filter(a => a.category === activeFilter);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return highContrast ? 'border-yellow-400 bg-zinc-900' : 'border-red-200 bg-red-50';
      case 'warning': return highContrast ? 'border-yellow-400 bg-zinc-900' : 'border-amber-200 bg-amber-50';
      default: return highContrast ? 'border-zinc-700 bg-zinc-900' : 'border-blue-200 bg-blue-50';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white';
      case 'warning': return 'bg-amber-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return 'fa-circle-exclamation';
      case 'warning': return 'fa-triangle-exclamation';
      default: return 'fa-circle-info';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weather': return 'fa-cloud-bolt';
      case 'roadworks': return 'fa-road-barrier';
      case 'congestion': return 'fa-car-burst';
      case 'speed': return 'fa-gauge-high';
      case 'emergency': return 'fa-siren-on';
      default: return 'fa-triangle-exclamation';
    }
  };

  const handleSubscribe = () => {
    if (email || phone) {
      alert(`Subscribed! ${email || phone} will receive ${frequency} alerts.`);
      setEmail('');
      setPhone('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className={`text-4xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
          {ra.title}
        </h1>
        <p className="text-slate-500 leading-relaxed">{ra.subtitle}</p>
      </div>

      {/* Critical Alert Banner */}
      {MOCK_ROAD_ALERTS.some(a => a.severity === 'critical') && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 to-red-700 p-6 text-white shadow-lg animate-pulse">
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-siren-on text-2xl"></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-white text-red-700 text-xs font-bold uppercase">
                    {ra.critical}
                  </span>
                  <span className="text-sm font-medium opacity-90">
                    {MOCK_ROAD_ALERTS.filter(a => a.severity === 'critical').length} Active
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1">
                  {MOCK_ROAD_ALERTS.find(a => a.severity === 'critical')?.title}
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  {MOCK_ROAD_ALERTS.find(a => a.severity === 'critical')?.description}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
              activeFilter === filter.id
                ? (highContrast ? 'bg-yellow-400 text-black' : 'bg-green-700 text-white shadow-md')
                : (highContrast ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
            }`}
          >
            <i className={`fa-solid ${filter.icon}`}></i>
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alert Feed */}
        <div className="lg:col-span-2 space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-6 rounded-3xl border-2 transition-all ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  highContrast ? 'bg-zinc-800' : 'bg-white/50'
                }`}>
                  <i className={`fa-solid ${getCategoryIcon(alert.category)} text-xl ${
                    alert.severity === 'critical' ? 'text-red-600' : alert.severity === 'warning' ? 'text-amber-600' : 'text-blue-600'
                  }`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${getSeverityBadge(alert.severity)}`}>
                        <i className={`fa-solid ${getSeverityIcon(alert.severity)} mr-1`}></i>
                        {alert.severity === 'critical' ? ra.critical : alert.severity === 'warning' ? ra.warning : ra.info}
                      </span>
                      <h3 className={`text-lg font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                        {alert.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">{alert.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>
                        <i className="fa-solid fa-location-dot mr-1"></i>
                        {alert.affectedRoad}
                      </span>
                      <span>
                        <i className="fa-solid fa-clock mr-1"></i>
                        {alert.relativeTime}
                      </span>
                    </div>
                    <button className={`text-sm font-bold flex items-center gap-1 ${
                      highContrast ? 'text-yellow-400' : 'text-green-700'
                    }`}>
                      {ra.view_map}
                      <i className="fa-solid fa-chevron-right text-[10px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredAlerts.length === 0 && (
            <div className={`text-center py-20 rounded-3xl border-2 border-dashed ${
              highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <i className="fa-solid fa-face-smile text-5xl text-slate-300 mb-4"></i>
              <h3 className="text-xl font-bold text-slate-400">No alerts in this category</h3>
              <p className="text-slate-500 text-sm mt-2">Roads are clear!</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <div className={`p-6 rounded-3xl border ${
            highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <h3 className={`text-lg font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
              <i className="fa-solid fa-cloud-sun mr-2 text-amber-500"></i>
              {ra.weather_title}
            </h3>
            <div className="space-y-4">
              {MOCK_WEATHER.map((weather, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl ${highContrast ? 'bg-zinc-800' : 'bg-slate-50'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                      {weather.region}
                    </span>
                    <i className={`fa-solid ${weather.icon} text-2xl text-amber-500`}></i>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`text-3xl font-black ${highContrast ? 'text-yellow-400' : 'text-slate-800'}`}>
                      {weather.temp}°
                    </span>
                    <div className="text-right text-xs text-slate-500">
                      <div>
                        <i className="fa-solid fa-wind mr-1"></i>
                        {weather.wind}
                      </div>
                      <div>
                        <i className="fa-solid fa-droplet mr-1"></i>
                        {weather.rain}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">{weather.condition}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe to Alerts */}
          <div className={`p-6 rounded-3xl border ${
            highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-gradient-to-br from-green-50 to-blue-50 border-green-100 shadow-sm'
          }`}>
            <h3 className={`text-lg font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
              <i className="fa-solid fa-bell mr-2 text-green-600"></i>
              {ra.subscribe_title}
            </h3>
            <p className="text-sm text-slate-500 mb-4">{ra.subscribe_desc}</p>

            <div className="space-y-3">
              <div>
                <label className={`block text-xs font-bold mb-1 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                  {ra.phone}
                </label>
                <input
                  type="tel"
                  placeholder="0XX XXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-green-500 outline-none ${
                    highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div className="text-center text-xs text-slate-400 font-bold">OR</div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                  {ra.email}
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-green-500 outline-none ${
                    highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                  {ra.frequency}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFrequency('immediate')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      frequency === 'immediate'
                        ? (highContrast ? 'bg-yellow-400 text-black' : 'bg-green-700 text-white')
                        : (highContrast ? 'bg-zinc-800 text-white' : 'bg-white text-slate-600')
                    }`}
                  >
                    {ra.immediate}
                  </button>
                  <button
                    onClick={() => setFrequency('daily')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      frequency === 'daily'
                        ? (highContrast ? 'bg-yellow-400 text-black' : 'bg-green-700 text-white')
                        : (highContrast ? 'bg-zinc-800 text-white' : 'bg-white text-slate-600')
                    }`}
                  >
                    {ra.daily}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSubscribe}
                disabled={!email && !phone}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  (email || phone)
                    ? (highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-green-700 text-white hover:bg-green-800')
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <i className="fa-solid fa-bell mr-2"></i>
                {ra.subscribe}
              </button>
            </div>
          </div>

          {/* Safety Tips Carousel */}
          <div className={`p-6 rounded-3xl border ${
            highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <h3 className={`text-lg font-bold mb-4 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
              <i className="fa-solid fa-lightbulb mr-2 text-yellow-500"></i>
              {ra.safety_title}
            </h3>
            <div className="space-y-3">
              {SAFETY_TIPS.map((tip) => (
                <div
                  key={tip.id}
                  className={`p-4 rounded-2xl ${highContrast ? 'bg-zinc-800' : 'bg-slate-50'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      highContrast ? 'bg-zinc-900' : 'bg-white'
                    }`}>
                      <i className={`fa-solid ${tip.icon} text-green-600`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold text-sm mb-1 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                        {tip.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadAlerts;
