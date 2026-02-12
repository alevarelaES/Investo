import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import InvestorDashboard from './pages/InvestorDashboard';
import StartupDashboard from './pages/StartupDashboard';
import UploadPitch from './pages/UploadPitch';
import translations from './data/translations';

const App = () => {
  // Pages: 'landing', 'login', 'investor', 'startup', 'upload', 'about'
  const [currentPage, setCurrentPage] = useState('landing');
  const [lang, setLang] = useState('fr');
  
  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  const handleLogin = (userType) => {
    if (userType === 'startup') {
      setCurrentPage('startup');
    } else {
      setCurrentPage('investor');
    }
    window.scrollTo(0, 0);
  };

  const handleGoToLogin = () => {
    setCurrentPage('login');
    window.scrollTo(0, 0);
  };

  // NOUVEAU : Gestionnaire de navigation générique
  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLangChange = (newLang) => {
    setLang(newLang);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'login': 
        return <Login onLogin={handleLogin} onLangChange={handleLangChange} initialLang={lang} />;
      case 'investor': 
        return <InvestorDashboard lang={lang} />;
      case 'startup': 
        return <StartupDashboard lang={lang} />;
      case 'upload': 
        return <UploadPitch lang={lang} />;
      case 'about':
        // Placeholder pour la page About Us (à créer ou remplacer par votre composant)
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900">
            <h1 className="text-4xl font-black mb-4">About Us</h1>
            <p className="mb-8">Page en construction...</p>
            <button onClick={() => handleNavigate('landing')} className="text-emerald-600 font-bold underline">
              Retour à l'accueil
            </button>
          </div>
        );
      default: 
        return (
          <LandingPage 
            onLogin={handleGoToLogin} 
            onLangChange={handleLangChange} 
            onNavigate={handleNavigate} // Passage de la prop de navigation
            initialLang={lang} 
          />
        );
    }
  };

  return (
    <>
      {/* ... Menu de démo existant ... */}
      <div className="fixed bottom-3 right-3 z-[100] flex items-center gap-1 bg-slate-900/90 backdrop-blur-sm text-white text-[9px] font-bold px-1 py-1 rounded-lg shadow-lg border border-slate-700/30">
        <span className="px-2 py-1 text-slate-400 hidden sm:block">DEMO</span>
        <button onClick={() => setCurrentPage('landing')} className={`px-2 py-1 rounded transition-all ${currentPage === 'landing' ? 'bg-white text-slate-900' : 'hover:bg-slate-700 text-white'}`}>Home</button>
        <button onClick={() => setCurrentPage('login')} className={`px-2 py-1 rounded transition-all ${currentPage === 'login' ? 'bg-white text-slate-900' : 'hover:bg-slate-700 text-white'}`}>Login</button>
        <button onClick={() => setCurrentPage('investor')} className={`px-2 py-1 rounded transition-all ${currentPage === 'investor' ? 'bg-white text-slate-900' : 'hover:bg-slate-700 text-white'}`}>Invest.</button>
        <button onClick={() => setCurrentPage('startup')} className={`px-2 py-1 rounded transition-all ${currentPage === 'startup' ? 'bg-white text-slate-900' : 'hover:bg-slate-700 text-white'}`}>Startup</button>
        <button onClick={() => setCurrentPage('upload')} className={`px-2 py-1 rounded transition-all ${currentPage === 'upload' ? 'bg-white text-slate-900' : 'hover:bg-slate-700 text-white'}`}>+</button>
        {/* Bouton démo pour About */}
        <button onClick={() => setCurrentPage('about')} className={`px-2 py-1 rounded transition-all ${currentPage === 'about' ? 'bg-white text-slate-900' : 'hover:bg-slate-700 text-white'}`}>?</button>
      </div>

      {renderPage()}
    </>
  );
};

export default App;
