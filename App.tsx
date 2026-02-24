
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ServiceCatalogue from './pages/ServiceCatalogue';
import TrafficMap from './pages/TrafficMap';
import ReportIssue from './pages/ReportIssue';
import PublicTransport from './pages/PublicTransport';
import PaymentGateway from './pages/PaymentGateway';
import TripPlanner from './pages/TripPlanner';
import RoadAlerts from './pages/RoadAlerts';
import OLApplication from './pages/OLApplication';
import FeedbackPortal from './pages/FeedbackPortal';
import DriversLicenseRenewal from './pages/DriversLicenseRenewal';
import VehicleLicenseDisc from './pages/VehicleLicenseDisc';
import LearnersLicenseTest from './pages/LearnersLicenseTest';
import VukuzakheRegistration from './pages/VukuzakheRegistration';
import ScholarTransport from './pages/ScholarTransport';
import PersonalisedNumberPlate from './pages/PersonalisedNumberPlate';
import A11yToolbar from './components/A11yToolbar';
import { Language } from './types';
import { translations } from './translations';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [lang, setLang] = useState<Language>(Language.ENGLISH);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [dyslexicFont, setDyslexicFont] = useState(false);

  const t = translations[lang === Language.ZULU ? 'zu' : 'en'];

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large': return 'text-lg';
      case 'xl': return 'text-xl';
      default: return 'text-base';
    }
  };

  const mainClasses = `
    min-h-screen flex flex-col transition-colors duration-300
    ${highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}
    ${getFontSizeClass()}
    ${dyslexicFont ? 'font-dyslexic' : 'font-sans'}
  `;

  const renderPage = () => {
    const props = { lang, t, highContrast };
    switch (currentPage) {
      case 'home': return <LandingPage onNavigate={setCurrentPage} {...props} />;
      case 'dashboard': return <Dashboard {...props} />;
      case 'services': return <ServiceCatalogue {...props} onNavigate={setCurrentPage} />;
      case 'transport': return <PublicTransport {...props} />;
      case 'traffic': return <TrafficMap {...props} />;
      case 'report': return <ReportIssue {...props} />;
      case 'payment': return <PaymentGateway {...props} />;
      case 'trip_planner': return <TripPlanner {...props} />;
      case 'road_alerts': return <RoadAlerts {...props} />;
      case 'ol_application': return <OLApplication {...props} onNavigate={setCurrentPage} />;
      case 'drivers_license_renewal': return <DriversLicenseRenewal {...props} onNavigate={setCurrentPage} />;
      case 'vehicle_license_disc': return <VehicleLicenseDisc {...props} onNavigate={setCurrentPage} />;
      case 'learners_license_test': return <LearnersLicenseTest {...props} onNavigate={setCurrentPage} />;
      case 'vukuzakhe_registration': return <VukuzakheRegistration {...props} onNavigate={setCurrentPage} />;
      case 'scholar_transport': return <ScholarTransport {...props} onNavigate={setCurrentPage} />;
      case 'personalised_number_plate': return <PersonalisedNumberPlate {...props} onNavigate={setCurrentPage} />;
      case 'feedback': return <FeedbackPortal {...props} />;
      default: return <LandingPage onNavigate={setCurrentPage} {...props} />;
    }
  };

  return (
    <div className={mainClasses}>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:z-[200] focus:absolute bg-yellow-400 px-4 py-2 outline-none focus:ring-4 focus:ring-black font-bold text-black"
      >
        Skip to main content
      </a>

      <Header 
        currentLang={lang} 
        setLang={setLang} 
        onNavigate={setCurrentPage} 
        currentPage={currentPage}
        t={t}
        highContrast={highContrast}
      />
      
      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        {renderPage()}
      </main>

      <footer 
        className={`${highContrast ? 'bg-zinc-900 border-t border-zinc-700 text-white' : 'bg-slate-900 text-slate-400'} pt-16 pb-8 px-4`}
        role="contentinfo"
      >
        <div className="space-y-12 mx-auto max-w-7xl">
          <div className="gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center bg-green-700 rounded-lg w-8 h-8 font-bold text-white">K</div>
                <h1 className="font-bold text-white text-xl">KZN DOT</h1>
              </div>
              <p className="text-sm leading-relaxed">
                {t.footer.desc}
              </p>
              <div className="flex space-x-4 pt-4">
                <button aria-label="Facebook" className="flex justify-center items-center hover:bg-slate-800 border border-slate-700 rounded-full w-10 h-10 transition"><i className="fa-brands fa-facebook-f"></i></button>
                <button aria-label="Twitter" className="flex justify-center items-center hover:bg-slate-800 border border-slate-700 rounded-full w-10 h-10 transition"><i className="fa-brands fa-twitter"></i></button>
              </div>
            </div>

            <div>
              <h3 className="mb-6 font-bold text-white">{t.footer.quick_links}</h3>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => setCurrentPage('services')} className="hover:text-white transition">{t.nav.services}</button></li>
                <li><button onClick={() => setCurrentPage('transport')} className="hover:text-white transition">{t.nav.transport}</button></li>
                <li><button onClick={() => setCurrentPage('report')} className="hover:text-white transition">{t.nav.report}</button></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 font-bold text-white">{t.footer.support}</h3>
              <ul className="space-y-4 text-sm">
                <li><button className="hover:text-white transition">FAQs</button></li>
                <li><button className="hover:text-white transition">DLTC Locations</button></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 font-bold text-white">{t.footer.contact}</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3"><i className="text-green-500 fa-solid fa-location-dot"></i> {t.footer.address}</li>
                <li className="flex gap-3"><i className="text-green-500 fa-solid fa-phone"></i> {t.footer.phone}</li>
              </ul>
            </div>
          </div>
          
          <div className="flex md:flex-row flex-col justify-between items-center gap-4 pt-8 border-slate-800 border-t text-xs">
            <p>{t.footer.rights}</p>
            <div className="flex gap-6">
              <button className="hover:text-white">{t.footer.privacy}</button>
              <button className="hover:text-white">{t.footer.terms}</button>
            </div>
          </div>
        </div>
      </footer>

      <A11yToolbar 
        highContrast={highContrast} 
        setHighContrast={setHighContrast}
        fontSize={fontSize}
        setFontSize={setFontSize}
        dyslexicFont={dyslexicFont}
        setDyslexicFont={setDyslexicFont}
        t={t}
      />
      
      <Chatbot lang={lang} t={t} />
      
      <style>{`
        @font-face {
          font-family: 'OpenDyslexic';
          src: url('https://fonts.cdnfonts.com/s/14890/OpenDyslexic-Regular.woff') format('woff');
        }
        .font-dyslexic { font-family: 'OpenDyslexic', sans-serif !important; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
};

export default App;
