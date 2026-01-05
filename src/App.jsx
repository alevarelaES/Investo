import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import InvestorDashboard from './pages/InvestorDashboard';
import StartupDashboard from './pages/StartupDashboard';
import UploadPitch from './pages/UploadPitch'; // <--- 1. Import

const App = () => {
  // 4 états possibles : 'landing', 'investor', 'startup', 'upload'
  const [currentPage, setCurrentPage] = useState('landing');

  const handleLogin = () => {
    setCurrentPage('investor'); 
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'investor': return <InvestorDashboard />;
      case 'startup': return <StartupDashboard />;
      case 'upload': return <UploadPitch />; // <--- 2. Case
      default: return <LandingPage onLogin={handleLogin} />;
    }
  };

  return (
    <>
      {/* --- MENU DE DÉMO --- */}
      <div className="fixed top-4 left-4 z-[100] group">
        <div className="bg-slate-900/90 backdrop-blur text-white text-[10px] font-bold p-1.5 rounded-xl shadow-2xl flex gap-1 opacity-40 hover:opacity-100 transition-opacity border border-white/10">
          <button 
            onClick={() => setCurrentPage('landing')} 
            className={`px-3 py-2 rounded-lg transition-all ${currentPage === 'landing' ? 'bg-emerald-600 text-white' : 'hover:bg-white/10 text-slate-300'}`}
          >
            Vitrine
          </button>
          <div className="w-px bg-white/10 my-1"></div>
          <button 
            onClick={() => setCurrentPage('investor')} 
            className={`px-3 py-2 rounded-lg transition-all ${currentPage === 'investor' ? 'bg-emerald-600 text-white' : 'hover:bg-white/10 text-slate-300'}`}
          >
            Investisseur
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