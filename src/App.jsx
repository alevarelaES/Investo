import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import InvestorDashboard from './pages/InvestorDashboard';
import StartupDashboard from './pages/StartupDashboard';
import UploadPitch from './pages/UploadPitch';
import About from './pages/About'; 
import translations from './data/translations';

const App = () => {
  // Pages: 'landing', 'login', 'investor', 'startup', 'upload', 'about'
  const [currentPage, setCurrentPage] = useState('landing');
  const [lang, setLang] = useState('fr');
  
  // Simule un rôle pour "l'authentification"
  const [userRole, setUserRole] = useState(null); 

  const handleLogin = (userType) => {
    setUserRole(userType);
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

  const handleLangChange = (newLang) => {
    setLang(newLang);
  };

  const renderPage = () => {
    switch(currentPage) {
case 'login': 
  return (
    <Login 
      onLogin={handleLogin} 
      onLangChange={handleLangChange} 
      initialLang={lang} 
      onBack={() => setCurrentPage('landing')} // <--- AJOUTER CETTE LIGNE
    />
    );
      case 'investor': 
        return <InvestorDashboard lang={lang} />;
      case 'startup': 
        return <StartupDashboard lang={lang} />;
      case 'upload': 
        return <UploadPitch lang={lang} />;
      case 'about': 
        return <About onBack={() => setCurrentPage('landing')} lang={lang} />;
      default: 
        return <LandingPage onLogin={handleGoToLogin} onLangChange={handleLangChange} initialLang={lang} />;
    }
  };

  return (
    <>
      {/* --- MENU DE DÉMO (Compact & Discret) --- */}
      <div className="fixed bottom-3 right-3 z-[100] flex items-center gap-1 bg-slate-900/90 backdrop-blur-sm text-white text-[9px] font-bold px-1 py-1 rounded-lg shadow-lg border border-slate-700/30">
        <span className="px-2 py-1 text-slate-400 hidden sm:block">DEMO</span>
        <button 
          onClick={() => setCurrentPage('landing')} 
          className={`px-2 py-1 rounded transition-all ${currentPage === 'landing' ? 'bg-white text-slate-900' : 'hover:bg-slate-700 text-white'}`}
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentPage('about')} 
          className={`px-2 py-1 rounded transition-all ${currentPage === 'about' ? 'bg-white text-slate-900' : 'hover:bg-slate-700 text-white'}`}
        >
          About
        </button>
        <button 
          onClick={() => setCurrentPage('investor')} 
          className={`px-2 py-1 rounded transition-all ${currentPage === 'investor' ? 'bg-white text-slate-900' : 'hover:bg-slate-700 text-white'}`}
        >
          Invest.
        </button>
        <button 
          onClick={() => setCurrentPage('startup')} 
          className={`px-2 py-1 rounded transition-all ${currentPage === 'startup' ? 'bg-white text-slate-900' : 'hover:bg-slate-700 text-white'}`}
        >
          Startup
        </button>
      </div>

      {renderPage()}
    </>
  );
};

export default App;
