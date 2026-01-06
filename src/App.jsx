import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import InvestorDashboard from './pages/InvestorDashboard';
import StartupDashboard from './pages/StartupDashboard';
import UploadPitch from './pages/UploadPitch';
import translations from './data/translations';

const App = () => {
  // 4 états possibles : 'landing', 'investor', 'startup', 'upload'
  const [currentPage, setCurrentPage] = useState('landing');
  const [lang, setLang] = useState('fr');
  
  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  const handleLogin = () => {
    setCurrentPage('investor'); 
    window.scrollTo(0, 0);
  };

  const handleLangChange = (newLang) => {
    setLang(newLang);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'investor': return <InvestorDashboard lang={lang} />;
      case 'startup': return <StartupDashboard lang={lang} />;
      case 'upload': return <UploadPitch lang={lang} />;
      default: return <LandingPage onLogin={handleLogin} onLangChange={handleLangChange} initialLang={lang} />;
    }
  };

  return (
    <>
      {/* --- MENU DE DÉMO (Compact & Discret) --- */}
      <div className="fixed bottom-3 right-3 z-[100] flex items-center gap-1 bg-violet-600/90 backdrop-blur-sm text-white text-[9px] font-bold px-1 py-1 rounded-lg shadow-lg border border-violet-400/30">
        <span className="px-2 py-1 text-violet-200 hidden sm:block">DEMO</span>
        <button 
          onClick={() => setCurrentPage('landing')} 
          className={`px-2 py-1 rounded transition-all ${currentPage === 'landing' ? 'bg-white text-violet-700' : 'hover:bg-violet-500 text-white'}`}
        >
          Vitrine
        </button>
        <button 
          onClick={() => setCurrentPage('investor')} 
          className={`px-2 py-1 rounded transition-all ${currentPage === 'investor' ? 'bg-white text-violet-700' : 'hover:bg-violet-500 text-white'}`}
        >
          Invest.
        </button>
        <button 
          onClick={() => setCurrentPage('startup')} 
          className={`px-2 py-1 rounded transition-all ${currentPage === 'startup' ? 'bg-white text-violet-700' : 'hover:bg-violet-500 text-white'}`}
        >
          Startup
        </button>
        <button 
          onClick={() => setCurrentPage('upload')} 
          className={`px-2 py-1 rounded transition-all ${currentPage === 'upload' ? 'bg-white text-violet-700' : 'hover:bg-violet-500 text-white'}`}
        >
          +
        </button>
      </div>

      {renderPage()}
    </>
  );
};

export default App;