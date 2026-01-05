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
      {/* --- MENU DE DÉMO --- */}
      <div className="fixed top-4 left-4 md:top-4 md:left-4 bottom-auto md:bottom-auto z-[100] group max-md:top-auto max-md:bottom-4 max-md:left-1/2 max-md:-translate-x-1/2">
        <div className="bg-slate-900/90 backdrop-blur text-white text-[10px] font-bold p-1.5 rounded-xl shadow-2xl flex gap-1 opacity-60 hover:opacity-100 transition-opacity border border-white/10">
          <button 
            onClick={() => setCurrentPage('landing')} 
            className={`px-3 py-2 rounded-lg transition-all ${currentPage === 'landing' ? 'bg-emerald-600 text-white' : 'hover:bg-white/10 text-slate-300'}`}
          >
            {lang === 'fr' ? 'Vitrine' : 'Home'}
          </button>
          <div className="w-px bg-white/10 my-1"></div>
          <button 
            onClick={() => setCurrentPage('investor')} 
            className={`px-3 py-2 rounded-lg transition-all ${currentPage === 'investor' ? 'bg-emerald-600 text-white' : 'hover:bg-white/10 text-slate-300'}`}
          >
            {lang === 'fr' ? 'Investisseur' : 'Investor'}
          </button>
          <button 
            onClick={() => setCurrentPage('startup')} 
            className={`px-3 py-2 rounded-lg transition-all ${currentPage === 'startup' ? 'bg-emerald-600 text-white' : 'hover:bg-white/10 text-slate-300'}`}
          >
            Startup
          </button>
          {/* Nouveau bouton Upload */}
          <button 
            onClick={() => setCurrentPage('upload')} 
            className={`px-3 py-2 rounded-lg transition-all ${currentPage === 'upload' ? 'bg-emerald-600 text-white' : 'hover:bg-white/10 text-slate-300'}`}
          >
            + Upload
          </button>
        </div>
      </div>

      {renderPage()}
    </>
  );
};

export default App;