import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import InvestorDashboard from './pages/InvestorDashboard';

const App = () => {
  // État simple pour naviguer (Pour le MVP)
  // 'landing' = Site Public | 'dashboard' = Espace Investisseur
  const [currentPage, setCurrentPage] = useState('landing');

  // Fonction pour simuler la connexion
  const handleLogin = () => {
    setCurrentPage('dashboard');
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Bouton secret temporaire pour switcher (en haut à gauche) */}
      <div className="fixed top-2 left-2 z-[100] opacity-0 hover:opacity-100 transition-opacity bg-black/80 text-white text-[10px] p-2 rounded cursor-pointer flex gap-2">
        <button onClick={() => setCurrentPage('landing')} className="hover:text-emerald-400">Landing</button>
        <span>|</span>
        <button onClick={() => setCurrentPage('dashboard')} className="hover:text-emerald-400">Dashboard</button>
      </div>

      {currentPage === 'landing' ? (
        // On passe la fonction de "login" à la Landing Page si besoin
        <LandingPage onLogin={handleLogin} /> 
      ) : (
        <InvestorDashboard />
      )}
    </>
  );
};

export default App;