import React, { useState } from 'react';
import { MOCK_TRIP_ROUTES, MOCK_SCHEDULES } from '../constants';
import type { TripRoute } from '../types';

interface TripPlannerProps {
  lang: string;
  t: any;
  highContrast?: boolean;
}

const TripPlanner: React.FC<TripPlannerProps> = ({ t, highContrast }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mode, setMode] = useState('all');
  const [showResults, setShowResults] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<TripRoute | null>(null);

  const tp = t.trip_planner;

  const handlePlanTrip = () => {
    if (origin.trim() && destination.trim()) {
      setShowResults(true);
    }
  };

  const modes = [
    { id: 'all', label: tp.all, icon: 'fa-location-dot' },
    { id: 'bus', label: 'Bus', icon: 'fa-bus' },
    { id: 'taxi', label: 'Taxi', icon: 'fa-taxi' },
    { id: 'rail', label: 'Rail', icon: 'fa-train' },
  ];

  const getModeIcon = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'bus': return 'fa-bus';
      case 'taxi': return 'fa-taxi';
      case 'rail': return 'fa-train';
      case 'walk': return 'fa-person-walking';
      default: return 'fa-route';
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'bus': return highContrast ? 'text-yellow-400' : 'text-blue-600';
      case 'taxi': return highContrast ? 'text-yellow-400' : 'text-green-600';
      case 'rail': return highContrast ? 'text-yellow-400' : 'text-purple-600';
      case 'walk': return 'text-slate-400';
      default: return highContrast ? 'text-yellow-400' : 'text-green-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className={`text-4xl font-extrabold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
          {tp.title}
        </h1>
        <p className="text-slate-500 leading-relaxed">{tp.subtitle}</p>
      </div>

      {/* Trip Planning Form */}
      <div className={`max-w-4xl mx-auto p-8 rounded-3xl border ${
        highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-lg'
      }`}>
        <div className="space-y-6">
          {/* Origin & Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                <i className="fa-solid fa-location-dot mr-2 text-green-600"></i>
                {tp.origin}
              </label>
              <input
                type="text"
                placeholder="e.g. Warwick Avenue"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                  highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                <i className="fa-solid fa-location-crosshairs mr-2 text-red-600"></i>
                {tp.destination}
              </label>
              <input
                type="text"
                placeholder="e.g. Gateway Mall"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                  highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>

          {/* Date/Time & Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                <i className="fa-solid fa-clock mr-2"></i>
                {tp.date_time}
              </label>
              <input
                type="datetime-local"
                defaultValue="2026-02-22T08:00"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                  highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                <i className="fa-solid fa-bus mr-2"></i>
                {tp.mode}
              </label>
              <div className="flex gap-2">
                {modes.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`flex-1 py-3 px-3 rounded-xl border-2 font-bold text-sm transition-all ${
                      mode === m.id
                        ? (highContrast ? 'border-yellow-400 bg-zinc-800 text-yellow-400' : 'border-green-700 bg-green-50 text-green-700')
                        : (highContrast ? 'border-zinc-700 text-zinc-400 hover:border-zinc-600' : 'border-slate-200 text-slate-500 hover:border-slate-300')
                    }`}
                  >
                    <i className={`fa-solid ${m.icon} mb-1 block`}></i>
                    <span className="text-xs">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Plan Trip Button */}
          <button
            onClick={handlePlanTrip}
            disabled={!origin.trim() || !destination.trim()}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              origin.trim() && destination.trim()
                ? (highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-green-700 text-white hover:bg-green-800 shadow-lg')
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <i className="fa-solid fa-route mr-2"></i>
            {tp.plan_trip}
          </button>
        </div>
      </div>

      {/* Route Results */}
      {showResults && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <h2 className={`text-2xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
            {tp.results}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {MOCK_TRIP_ROUTES.map((route) => (
              <div
                key={route.id}
                className={`p-6 rounded-3xl border cursor-pointer transition-all ${
                  selectedRoute?.id === route.id
                    ? (highContrast ? 'border-yellow-400 bg-zinc-900' : 'border-green-700 bg-green-50')
                    : (highContrast ? 'bg-zinc-900 border-zinc-700 hover:border-zinc-600' : 'bg-white border-slate-100 hover:shadow-lg hover:border-slate-200')
                }`}
                onClick={() => setSelectedRoute(route)}
              >
                {/* Route Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    route.mode === 'Bus' 
                      ? 'bg-blue-100 text-blue-700' 
                      : route.mode === 'Taxi' 
                        ? 'bg-green-100 text-green-700' 
                        : route.mode === 'Rail'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-slate-100 text-slate-700'
                  }`}>
                    <i className={`fa-solid ${getModeIcon(route.mode)} mr-1`}></i>
                    {route.mode}
                  </div>
                  <div className={`text-2xl font-black ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>
                    R{route.fare}
                  </div>
                </div>

                {/* Duration & Distance */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-clock text-slate-400"></i>
                    <span className={`font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{route.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-road text-slate-400"></i>
                    <span className={`font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{route.distance}</span>
                  </div>
                </div>

                {/* Times */}
                <div className={`flex items-center justify-between mb-4 pb-4 border-b ${highContrast ? 'border-zinc-800' : 'border-slate-100'}`}>
                  <div>
                    <div className="text-xs text-slate-500">{tp.departs}</div>
                    <div className={`font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{route.departureTime}</div>
                  </div>
                  <i className="fa-solid fa-arrow-right text-slate-300"></i>
                  <div>
                    <div className="text-xs text-slate-500">{tp.arrives}</div>
                    <div className={`font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{route.arrivalTime}</div>
                  </div>
                </div>

                {/* Route Steps */}
                <div className="space-y-3">
                  {route.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        highContrast ? 'bg-zinc-800' : 'bg-slate-50'
                      }`}>
                        <i className={`fa-solid ${getModeIcon(step.type)} text-sm ${getModeColor(step.type)}`}></i>
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                          {step.description}
                        </div>
                        <div className="text-xs text-slate-500">{step.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Select Button */}
                <button
                  className={`w-full mt-6 py-3 rounded-xl font-bold text-sm transition-all ${
                    selectedRoute?.id === route.id
                      ? (highContrast ? 'bg-yellow-400 text-black' : 'bg-green-700 text-white')
                      : (highContrast ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200')
                  }`}
                >
                  {tp.select_route}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Schedules & Fare Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Live Departures */}
        <div className={`p-8 rounded-3xl border ${
          highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>
              <i className="fa-solid fa-clock mr-2 text-green-600"></i>
              {tp.live_schedules}
            </h3>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-green-600">LIVE</span>
            </div>
          </div>

          <div className="space-y-3">
            {MOCK_SCHEDULES.slice(0, 6).map((schedule) => (
              <div
                key={schedule.id}
                className={`p-4 rounded-2xl border transition-colors ${
                  highContrast ? 'bg-zinc-800 border-zinc-700' : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-bold text-sm ${highContrast ? 'text-white' : 'text-slate-800'}`}>
                    {schedule.route}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    schedule.status === 'on_time' 
                      ? 'bg-green-100 text-green-700' 
                      : schedule.status === 'delayed' 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'bg-red-100 text-red-700'
                  }`}>
                    {schedule.status === 'on_time' ? tp.on_time : schedule.status === 'delayed' ? tp.delayed : tp.cancelled}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    <i className="fa-solid fa-clock mr-1"></i>
                    {schedule.departure}
                  </span>
                  <span className="text-slate-500">
                    <i className="fa-solid fa-location-dot mr-1"></i>
                    {schedule.platform}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fare Calculator */}
        <div className={`p-8 rounded-3xl border ${
          highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100 shadow-sm'
        }`}>
          <h3 className={`text-xl font-bold mb-6 ${highContrast ? 'text-white' : 'text-slate-800'}`}>
            <i className="fa-solid fa-calculator mr-2 text-green-600"></i>
            {tp.fare_calc}
          </h3>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                {tp.from}
              </label>
              <select
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                  highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <option>Warwick Avenue</option>
                <option>Durban Station</option>
                <option>Bridge City Mall</option>
                <option>Gateway Mall</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-bold mb-2 ${highContrast ? 'text-white' : 'text-slate-700'}`}>
                {tp.to}
              </label>
              <select
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none ${
                  highContrast ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <option>Gateway Mall</option>
                <option>Warwick Avenue</option>
                <option>Durban Station</option>
                <option>Bridge City Mall</option>
              </select>
            </div>

            <button
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-green-700 text-white hover:bg-green-800'
              }`}
            >
              {tp.calculate}
            </button>

            {/* Result */}
            <div className={`p-6 rounded-2xl text-center ${highContrast ? 'bg-zinc-800' : 'bg-green-50'}`}>
              <div className="text-sm text-slate-500 mb-2">{tp.fare}</div>
              <div className={`text-4xl font-black ${highContrast ? 'text-yellow-400' : 'text-green-700'}`}>
                R12.00
              </div>
              <div className="text-xs text-slate-400 mt-2">Estimated Bus Fare</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
