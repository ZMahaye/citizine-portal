import React, { useState } from "react";
import { Language } from "../types";

interface HeaderProps {
  currentLang: Language;
  setLang: (l: Language) => void;
  onNavigate: (page: string) => void;
  currentPage: string;
  t: any;
  highContrast: boolean;
}

const Header: React.FC<HeaderProps> = ({
  currentLang,
  setLang,
  onNavigate,
  currentPage,
  t,
  highContrast,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;