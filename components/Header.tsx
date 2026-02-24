import React, { useState } from "react";
import { Language } from "../types";

interface HeaderProps {
  currentLang: Language;
  setLang: (l: Language) => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  t: any;
  highContrast: boolean;
  currentUser?: { name: string; email: string; role: string } | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentLang,
  setLang,
  onNavigate,
  currentPage,
  t,
  highContrast,
  currentUser,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { label: t.nav.home, id: "home" },
    { label: t.nav.dashboard, id: "dashboard" },
    {
      label: t.nav_groups?.services_group || "Services",
      id: "services_group",
      items: [
        { label: t.nav.services, id: "services" },
        { label: t.nav.payment, id: "payment" },
      ],
    },
    {
      label: t.nav_groups?.transport_group || "Transport",
      id: "transport_group",
      items: [
        { label: t.nav.transport, id: "transport" },
        { label: t.nav.trip_planner, id: "trip_planner" },
      ],
    },
    {
      label: t.nav_groups?.safety_group || "Safety",
      id: "safety_group",
      items: [
        { label: t.nav.traffic, id: "traffic" },
        { label: t.nav.road_alerts, id: "road_alerts" },
        { label: t.nav.report, id: "report" },
      ],
    },
    { label: t.nav.feedback, id: "feedback" },
  ];

  return (
    <header
      className={`${highContrast ? "bg-black border-zinc-700" : "bg-white"
        } border-b sticky top-0 z-50 shadow-sm`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Top Row */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <div className="flex justify-center items-center bg-green-700 shadow-inner rounded-lg w-10 h-10 font-bold text-white text-xl">
              K
            </div>
            <div className="hidden sm:block">
              <h1
                className={`text-lg font-bold leading-tight ${highContrast ? "text-white" : "text-green-800"
                  }`}
              >
                KZN DOT
              </h1>
              <p className="font-semibold text-[10px] text-slate-400 uppercase tracking-widest">
                Citizen Portal
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex space-x-6">
            {navItems.map((item) => {
              const isActive =
                item.id === currentPage ||
                (item.items &&
                  item.items.some((sub: any) => sub.id === currentPage));

              if (item.items) {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={`text-sm font-semibold relative py-5 flex items-center gap-1 ${isActive
                        ? highContrast
                          ? "text-yellow-400"
                          : "text-green-700"
                        : highContrast
                          ? "text-zinc-300 hover:text-white"
                          : "text-slate-500 hover:text-green-700"
                        }`}
                    >
                      {item.label}
                      <i
                        className={`fa-solid fa-chevron-down text-[10px] transition-transform ${openDropdown === item.id ? "rotate-180" : ""
                          }`}
                      />
                      {isActive && (
                        <span
                          className={`absolute bottom-0 left-0 w-full h-1 rounded-full ${highContrast ? "bg-yellow-400" : "bg-green-700"
                            }`}
                        />
                      )}
                    </button>

                    {openDropdown === item.id && (
                      <div
                        className={`absolute top-full left-0 mt-1 w-56 rounded-2xl border shadow-lg py-2 z-50 ${highContrast
                          ? "bg-zinc-900 border-zinc-700"
                          : "bg-white border-slate-100"
                          }`}
                      >
                        {item.items.map((subItem: any) => (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onNavigate(subItem.id);
                              setOpenDropdown(null);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm font-medium ${currentPage === subItem.id
                              ? highContrast
                                ? "bg-zinc-800 text-yellow-400"
                                : "bg-green-50 text-green-700"
                              : highContrast
                                ? "text-white hover:bg-zinc-800"
                                : "text-slate-700 hover:bg-slate-50"
                              }`}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-sm font-semibold relative py-5 ${currentPage === item.id
                    ? highContrast
                      ? "text-yellow-400"
                      : "text-green-700"
                    : highContrast
                      ? "text-zinc-300 hover:text-white"
                      : "text-slate-500 hover:text-green-700"
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            <select
              value={currentLang}
              onChange={(e) => setLang(e.target.value as Language)}
              className={`rounded-lg text-xs font-bold py-1.5 px-2 ${highContrast
                ? "bg-zinc-800 text-white border-zinc-600"
                : "bg-slate-50 border border-slate-200"
                }`}
            >
              <option value={Language.ENGLISH}>English</option>
              <option value={Language.ZULU}>isiZulu</option>
            </select>

            {/* Auth Controls */}
            {currentUser ? (
              <div className="relative hidden xl:block">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-semibold transition ${
                    highContrast
                      ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-green-700 text-white flex items-center justify-center text-xs font-black">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                  <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${showUserMenu ? 'rotate-180' : ''}`}></i>
                </button>
                {showUserMenu && (
                  <div
                    className={`absolute right-0 top-full mt-2 w-56 rounded-2xl border shadow-xl py-2 z-50 ${
                      highContrast ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-slate-100'
                    }`}
                  >
                    <div className={`px-4 py-3 border-b ${highContrast ? 'border-zinc-800' : 'border-slate-100'}`}>
                      <p className={`text-sm font-bold ${highContrast ? 'text-white' : 'text-slate-800'}`}>{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 mt-0.5 block">{currentUser.role}</span>
                    </div>
                    <button
                      onClick={() => { onNavigate('dashboard'); setShowUserMenu(false); }}
                      className={`w-full text-left px-4 py-3 text-sm font-medium ${highContrast ? 'text-white hover:bg-zinc-800' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <i className="fa-solid fa-gauge mr-2 text-slate-400"></i>
                      My Dashboard
                    </button>
                    <button
                      onClick={() => { onNavigate('ol_application'); setShowUserMenu(false); }}
                      className={`w-full text-left px-4 py-3 text-sm font-medium ${highContrast ? 'text-white hover:bg-zinc-800' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      <i className="fa-solid fa-file-certificate mr-2 text-slate-400"></i>
                      Operating License
                    </button>
                    <div className={`border-t my-1 ${highContrast ? 'border-zinc-800' : 'border-slate-100'}`}></div>
                    <button
                      onClick={() => { onLogout && onLogout(); setShowUserMenu(false); }}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className={`hidden xl:flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition ${
                  highContrast
                    ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                    : 'bg-green-700 text-white hover:bg-green-800'
                }`}
              >
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                Sign In
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-lg"
            >
              <i
                className={`fa-solid ${isOpen ? "fa-times" : "fa-bars"
                  } text-xl ${highContrast ? "text-white" : "text-slate-700"}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className={`xl:hidden border-t py-4 ${highContrast
              ? "border-zinc-700 bg-zinc-900"
              : "border-slate-100"
              }`}
          >
            <nav className="space-y-2">
              {navItems.map((item) =>
                item.items ? (
                  <div key={item.id}>
                    <div className="px-4 py-2 font-bold text-xs uppercase">
                      {item.label}
                    </div>
                    {item.items.map((subItem: any) => (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          onNavigate(subItem.id);
                          setIsOpen(false);
                        }}
                        className="px-6 py-3 w-full text-left"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className="px-4 py-3 w-full font-semibold text-left"
                  >
                    {item.label}
                  </button>
                )
              )}
              <div className={`px-4 pt-2 border-t ${highContrast ? 'border-zinc-800' : 'border-slate-100'}`}>
                {currentUser ? (
                  <div className="space-y-1">
                    <div className={`px-2 py-2 text-sm ${highContrast ? 'text-zinc-300' : 'text-slate-600'}`}>
                      Signed in as <span className="font-bold">{currentUser.name}</span>
                    </div>
                    <button
                      onClick={() => { onLogout && onLogout(); setIsOpen(false); }}
                      className="w-full text-left px-2 py-3 text-sm font-semibold text-red-600"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { onNavigate('login'); setIsOpen(false); }}
                    className={`w-full py-3 rounded-xl font-bold text-sm text-center mt-1 ${
                      highContrast ? 'bg-yellow-400 text-black' : 'bg-green-700 text-white'
                    }`}
                  >
                    <i className="fa-solid fa-arrow-right-to-bracket mr-2"></i>
                    Sign In
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
