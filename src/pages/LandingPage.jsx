import React, { useState, useEffect } from 'react';
import { 
  Play, TrendingUp, Users, ArrowRight, Zap, Globe, ChevronUp, ChevronDown, 
  Eye, Target, CheckCircle, Clock, Lock, MessageCircle 
} from 'lucide-react';
import translations from './data/translations';
import VideoScreen from './components/VideoScreen';
import ProfileScreen from './components/ProfileScreen';
import WaitlistModal from './components/WaitlistModal'; // <--- 1. IMPORT
import { startups } from './data/startups';

const LandingPage = () => {
  const [lang, setLang] = useState('fr');
  const [scrolled, setScrolled] = useState(false);
  const [activeScreen, setActiveScreen] = useState('video');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // <--- 2. NOUVEAUX ÉTATS POUR LA MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('startup'); // 'startup' ou 'investor'

  const currentStartup = startups[currentIndex];
  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  const nextStartup = () => setCurrentIndex((prev) => (prev + 1) % startups.length);
  const prevStartup = () => setCurrentIndex((prev) => (prev - 1 + startups.length) % startups.length);

  // Fonction pour ouvrir la modal
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans text-left overflow-x-hidden">
      
      {/* <--- 3. LE COMPOSANT MODAL EST ICI (Invisible par défaut) */}
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type={modalType}
        t={t}
        lang={lang}
      />

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-200">
                <span className="text-white font-black">I</span>
            </div>
            <span className="text-xl font-black tracking-tight uppercase">Invest<span className="text-emerald-600">o</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mr-4">
              <a href="#avantages" className="hover:text-emerald-600 transition-colors">{t('nav_startups')}</a>
              <a href="#stats" className="hover:text-emerald-600 transition-colors">{t('nav_investors')}</a>
            </div>
            <div className="flex gap-2 mr-4">
               <button onClick={() => setLang('fr')} className={`text-[10px] font-bold ${lang === 'fr' ? 'text-emerald-600' : 'text-slate-300'}`}>FR</button>
               <span className="text-slate-200">|</span>
               <button onClick={() => setLang('en')} className={`text-[10px] font-bold ${lang === 'en' ? 'text-emerald-600' : 'text-slate-300'}`}>EN</button>
            </div>
            {/* Bouton Espace Membre -> Ouvre Modal Investor */}
            <button onClick={() => openModal('investor')} className="bg-slate-900 text-white px-7 py-3 rounded-xl hover:bg-emerald-600 transition-all font-bold tracking-widest text-[10px]">
              {t('nav_member')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 md:px-6 overflow-hidden min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="space-y-8 md:space-y-10 relative z-10 text-left order-1 lg:order-none">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
              <Zap size={12} className="animate-pulse" />
              {t('hero_badge')}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-slate-900 uppercase">
              {t('hero_title_1')} <br />
              <span className="text-emerald-600">{t('hero_title_2')}</span> <br/>
              {t('hero_title_3')}
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed font-medium">
              {t('hero_desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              
              {/* <--- 4. BRANCHEMENT DES BOUTONS HERO */}
              <button 
                onClick={() => openModal('startup')} // Clic -> Ouvre Startup
                className="bg-emerald-600 text-white font-black uppercase tracking-widest text-[10px] px-10 py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-emerald-600/30 active:scale-95 transition-transform"
              >
                {t('btn_pitch')} <ArrowRight size={18} />
              </button>
              
              <button 
                onClick={() => openModal('investor')} // Clic -> Ouvre Investisseur
                className="bg-white border-2 border-slate-100 text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 active:scale-95 transition-transform"
              >
                {t('btn_sourcing')}
              </button>

            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[400px] order-2 lg:order-none mt-8 lg:mt-0">
            <div className="absolute right-4 bottom-36 flex flex-col gap-3 z-30 lg:-right-20 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2">
              <button onClick={prevStartup} className="p-3 lg:p-4 bg-white/20 lg:bg-white backdrop-blur-md rounded-full shadow-md hover:shadow-lg text-slate-500 lg:text-slate-400 hover:text-emerald-600 transition-all border border-slate-200/60 lg:border-slate-100 group">
                <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform"/>
              </button>
              <button onClick={nextStartup} className="p-3 lg:p-4 bg-white/20 lg:bg-white backdrop-blur-md rounded-full shadow-md hover:shadow-lg text-slate-500 lg:text-slate-400 hover:text-emerald-600 transition-all border border-slate-200/60 lg:border-slate-100 group">
                <ChevronDown size={24} className="group-hover:translate-y-1 transition-transform"/>
              </button>
            </div>

            <div className="bg-[#050505] border-0 lg:border-[14px] border-[#1a1a1a] rounded-3xl lg:rounded-[4rem] h-[70vh] lg:h-[780px] shadow-2xl overflow-hidden relative transition-all duration-300">
              <div className="absolute top-0 w-full pt-6 lg:pt-12 pb-6 px-8 flex justify-center items-center z-50 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-xl p-1 rounded-2xl border border-white/10 flex pointer-events-auto shadow-lg">
                  <button onClick={() => setActiveScreen('video')} className={`px-4 lg:px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeScreen === 'video' ? 'bg-white text-black' : 'text-white/60'}`}>
                    {t('simulator_pitch')}
                  </button>
                  <button onClick={() => setActiveScreen('profile')} className={`px-4 lg:px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeScreen === 'profile' ? 'bg-white text-black' : 'text-white/60'}`}>
                    {t('simulator_data')}
                  </button>
                </div>
              </div>
              <VideoScreen isActive={activeScreen === 'video'} t={t} startup={currentStartup} lang={lang} />
              <ProfileScreen isActive={activeScreen === 'profile'} t={t} startup={currentStartup} lang={lang} />
            </div>
          </div>
        </div>
      </section>

      {/* Section Dual Profiles */}
      <section id="avantages" className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">{t('dual_badge')}</p>
             <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">{t('dual_title')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Carte Startups */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start text-left">
               <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center text-white mb-8 shadow-lg shadow-emerald-200 rotate-3">
                 <Zap size={32} fill="white" />
               </div>
               <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">{t('dual_startup_title')}</h3>
               <div className="space-y-8 w-full">
                  <div className="flex gap-5">
                     <div className="mt-1 text-emerald-600 shrink-0"><Eye size={24} /></div>
                     <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 mb-1">{t('dual_s_1_title')}</h4>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed">{t('dual_s_1_desc')}</p>
                     </div>
                  </div>
                  {/* ... Rest of content ... */}
               </div>
            </div>

            {/* Carte Investisseurs */}
            <div className="bg-[#0A0F1C] p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 flex flex-col items-start text-left relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/20 blur-[100px] rounded-full pointer-events-none"></div>
               <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-slate-900 mb-8 shadow-lg -rotate-3 z-10">
                 <Target size={32} />
               </div>
               <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-8 z-10">{t('dual_investor_title')}</h3>
               <div className="space-y-8 w-full z-10">
                  {/* ... Rest of content ... */}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - inchangé */}
      <section id="stats" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
             {[
               { label: t('pulse_stat_1'), value: "450k CHF", icon: <TrendingUp size={20}/> },
               { label: t('pulse_stat_2'), value: "12", icon: <Play size={20}/> },
               { label: t('pulse_stat_3'), value: "86", icon: <Users size={20}/> },
               { label: t('pulse_stat_4'), value: "BioTech", icon: <Globe size={20}/> }
             ].map((stat, i) => (
               <div key={i} className="p-6 md:p-8 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-4 text-left">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600">{stat.icon}</div>
                  <div>
                    <p className="text-2xl md:text-3xl font-black text-slate-900">{stat.value}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{t('footer_copy')}</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;