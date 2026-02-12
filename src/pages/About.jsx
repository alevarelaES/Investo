import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Target, Users, Shield, Globe, LogIn, Menu, X } from 'lucide-react';
import translations from '../data/translations';
import WaitlistModal from '../components/WaitlistModal';

const About = ({ onNavigate, onLogin, onLangChange, initialLang = 'fr' }) => {
  const [lang, setLang] = useState(initialLang);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  const handleLangChange = (newLang) => {
    setLang(newLang);
    if (onLangChange) onLangChange(newLang);
  };

  // Scroll en haut au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans text-left bg-slate-50 text-slate-900">
      
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type="investor"
        t={t}
        lang={lang}
      />

      {/* Navbar simplifiée pour la page About */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 relative overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M17 7h4v4" />
                </svg>
                <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
            </div>
            <span className="text-xl font-black tracking-tight uppercase text-slate-900">Invest<span className="text-emerald-500">o</span></span>
          </div>            

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => onNavigate('landing')} className="text-[10px] font-black uppercase tracking-widest hover:text-emerald-500 transition-colors flex items-center gap-2 text-slate-500">
               <ArrowLeft size={14} /> {t('back_home')}
            </button>
            
            <div className="flex gap-2 border-l border-r border-slate-200 px-4 mx-2">
               <button onClick={() => handleLangChange('fr')} className={`text-[10px] font-bold ${lang === 'fr' ? 'text-emerald-500' : 'text-slate-400'}`}>FR</button>
               <span className="text-slate-200">|</span>
               <button onClick={() => handleLangChange('en')} className={`text-[10px] font-bold ${lang === 'en' ? 'text-emerald-500' : 'text-slate-400'}`}>EN</button>
            </div>

            <button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-500 transition-all font-bold tracking-widest text-[10px] shadow-lg shadow-emerald-600/20">
              {t('nav_member')}
            </button>
          </div>

          {/* Mobile Button */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg transition-colors border border-slate-200 hover:bg-slate-100">
              {mobileMenuOpen ? <X size={20} className="text-slate-600" /> : <Menu size={20} className="text-slate-600" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="pt-32 pb-16 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-emerald-900/50 border border-emerald-800 text-emerald-400">
             <Target size={10} /> {t('about_badge')}
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            {t('about_header_title')}
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('about_header_desc')}
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-0 px-6 -mt-10 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-video bg-black rounded-2xl shadow-2xl shadow-emerald-900/20 border-4 border-white overflow-hidden relative group cursor-pointer">
            {/* Placeholder Vidéo (Remplacez l'image par votre iframe ou vidéo) */}
            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
               <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center pl-1 shadow-xl shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                 <Play size={32} fill="white" className="text-white" />
               </div>
               <p className="absolute bottom-8 text-white/50 text-xs font-bold uppercase tracking-widest">{t('about_watch_video')}</p>
            </div>
            {/* Exemple d'iframe (décommentez pour utiliser) */}
            {/* <iframe className="w-full h-full" src="https://www.youtube.com/embed/VOTRE_ID_VIDEO" title="Investo Story" allowFullScreen></iframe> */}
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600"><Users size={18} /></span>
              {t('about_story_title')}
            </h2>
            <p className="text-slate-600 leading-relaxed text-justify">
              {t('about_story_text_1')}
            </p>
            <p className="text-slate-600 leading-relaxed text-justify">
              {t('about_story_text_2')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <Globe className="text-emerald-500 mb-4" size={24} />
              <h3 className="font-bold text-slate-900 mb-2">{t('about_vision_title')}</h3>
              <p className="text-sm text-slate-500">{t('about_vision_desc')}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <Shield className="text-emerald-500 mb-4" size={24} />
              <h3 className="font-bold text-slate-900 mb-2">{t('about_values_title')}</h3>
              <p className="text-sm text-slate-500">{t('about_values_desc')}</p>
            </div>
          </div>

        </div>
      </section>

      <footer className="py-8 border-t bg-white border-slate-100 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-300">{t('footer_copy')}</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
