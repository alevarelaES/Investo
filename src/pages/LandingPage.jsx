import React, { useState, useEffect } from 'react';
import { 
  Play, TrendingUp, Users, ArrowRight, Zap, Globe, ChevronUp, ChevronDown, 
  Eye, Target, CheckCircle, Clock, Lock, MessageCircle, LogIn, Sun, Moon, Menu, X,
  FolderLock, UserPlus, Bookmark, Send
} from 'lucide-react';
import translations from '../data/translations';
import VideoScreen from '../components/VideoScreen';
import ProfileScreen from '../components/ProfileScreen';
import WaitlistModal from '../components/WaitlistModal';
import { startups } from '../data/startups';

// On récupère la fonction 'onLogin' passée par App.jsx
const LandingPage = ({ onLogin, onLangChange, initialLang = 'fr' }) => {
  const [lang, setLang] = useState(initialLang);
  const [scrolled, setScrolled] = useState(false);
  const [activeScreen, setActiveScreen] = useState('video');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('startup');

  const currentStartup = startups[currentIndex];
  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  const handleLangChange = (newLang) => {
    setLang(newLang);
    if (onLangChange) onLangChange(newLang);
  };

  const nextStartup = () => setCurrentIndex((prev) => (prev + 1) % startups.length);
  const prevStartup = () => setCurrentIndex((prev) => (prev - 1 + startups.length) % startups.length);

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
    <div className={`min-h-screen font-sans text-left overflow-x-hidden transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-white' : 'bg-[#FDFDFD] text-slate-900'}`}>
      
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type={modalType}
        t={t}
        lang={lang}
      />

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? (darkMode ? 'bg-slate-800/95 backdrop-blur-md border-b border-slate-700 py-3' : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3') : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 relative overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M17 7h4v4" />
                </svg>
                <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
            </div>
            <span className={`text-xl font-black tracking-tight uppercase ${darkMode ? 'text-white' : 'text-slate-900'}`}>Invest<span className="text-emerald-500">o</span></span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <div className={`flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] mr-4 ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>
              <a href="#avantages" className="hover:text-emerald-500 transition-colors">{t('nav_startups')}</a>
              <a href="#stats" className="hover:text-emerald-500 transition-colors">{t('nav_investors')}</a>
            </div>
            
            <div className={`flex gap-2 border-r pr-4 mr-2 ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}>
               <button onClick={() => handleLangChange('fr')} className={`text-[10px] font-bold ${lang === 'fr' ? 'text-emerald-500' : (darkMode ? 'text-slate-500' : 'text-slate-300')}`}>FR</button>
               <span className={darkMode ? 'text-slate-600' : 'text-slate-200'}>|</span>
               <button onClick={() => handleLangChange('en')} className={`text-[10px] font-bold ${lang === 'en' ? 'text-emerald-500' : (darkMode ? 'text-slate-500' : 'text-slate-300')}`}>EN</button>
            </div>

            {/* Toggle Dark/Light Mode */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors border ${darkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-100'}`}
              title={darkMode ? 'Mode clair' : 'Mode sombre'}
            >
              {darkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-400" />}
            </button>

            {/* BOUTON CONNEXION (Pour accéder au Dashboard) */}
            <button 
              onClick={onLogin}
              className={`text-[10px] font-black uppercase tracking-widest hover:text-emerald-500 transition-colors flex items-center gap-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}
            >
              <LogIn size={14} /> {t('login')}
            </button>

            <button onClick={() => openModal('investor')} className="bg-emerald-600 text-white px-7 py-3 rounded-xl hover:bg-emerald-500 transition-all font-bold tracking-widest text-[10px]">
              {t('nav_member')}
            </button>
          </div>

          {/* Boutons Mobile */}
          <div className="flex md:hidden items-center gap-3">
            {/* Toggle Dark/Light Mode Mobile */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors border ${darkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-100'}`}
            >
              {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-400" />}
            </button>
            
            {/* Bouton Menu Hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors border ${darkMode ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-100'}`}
            >
              {mobileMenuOpen ? <X size={20} className={darkMode ? 'text-slate-300' : 'text-slate-600'} /> : <Menu size={20} className={darkMode ? 'text-slate-300' : 'text-slate-600'} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Déroulant */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className={`backdrop-blur-md border-t px-6 py-4 space-y-4 ${darkMode ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-slate-100'}`}>
            <div className={`flex flex-col gap-4 text-[11px] font-black uppercase tracking-[0.2em] ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              <a href="#avantages" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-500 transition-colors py-2">{t('nav_startups')}</a>
              <a href="#stats" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-500 transition-colors py-2">{t('nav_investors')}</a>
            </div>
            
            <div className={`flex gap-4 py-2 border-t ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}>
               <button onClick={() => handleLangChange('fr')} className={`text-[11px] font-bold ${lang === 'fr' ? 'text-emerald-500' : (darkMode ? 'text-slate-500' : 'text-slate-400')}`}>Français</button>
               <button onClick={() => handleLangChange('en')} className={`text-[11px] font-bold ${lang === 'en' ? 'text-emerald-500' : (darkMode ? 'text-slate-500' : 'text-slate-400')}`}>English</button>
            </div>

            <div className={`flex flex-col gap-3 pt-2 border-t ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}>
              <button 
                onClick={() => { onLogin(); setMobileMenuOpen(false); }}
                className={`text-[11px] font-black uppercase tracking-widest hover:text-emerald-500 transition-colors flex items-center gap-2 py-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}
              >
                <LogIn size={16} /> {t('login')}
              </button>

              <button 
                onClick={() => { openModal('investor'); setMobileMenuOpen(false); }} 
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-500 transition-all font-bold tracking-widest text-[11px] w-full"
              >
                {t('nav_member')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 px-4 md:px-6 overflow-hidden min-h-[85vh] flex items-center">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          <div className="space-y-6 lg:space-y-8 relative z-10 text-left order-1 lg:order-none">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${darkMode ? 'bg-emerald-900/30 border border-emerald-800 text-emerald-400' : 'bg-emerald-50 border border-emerald-100 text-emerald-700'}`}>
              <Zap size={10} className="animate-pulse" />
              {t('hero_badge')}
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] tracking-tighter uppercase ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {t('hero_title_1')} <br />
              <span className="text-emerald-500">{t('hero_title_2')}</span> <br/>
              {t('hero_title_3')}
            </h1>
            <p className={`text-base lg:text-lg max-w-md leading-relaxed font-medium ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>
              {t('hero_desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={() => openModal('startup')} className="bg-emerald-600 text-white font-black uppercase tracking-widest text-[9px] px-6 lg:px-8 py-3.5 lg:py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 active:scale-95 transition-transform hover:bg-emerald-500">
                {t('btn_pitch')} <ArrowRight size={14} />
              </button>
              <button onClick={() => openModal('investor')} className={`px-6 lg:px-8 py-3.5 lg:py-4 rounded-xl font-black uppercase tracking-widest text-[9px] active:scale-95 transition-transform ${darkMode ? 'bg-slate-800 border-2 border-slate-700 text-white hover:bg-slate-700' : 'bg-white border-2 border-slate-100 text-slate-900 hover:bg-slate-50'}`}>
                {t('btn_sourcing')}
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[340px] lg:max-w-[360px] order-2 lg:order-none mt-6 lg:mt-0">
            {/* Boutons Prev/Next - À droite sur desktop */}
            <div className="absolute right-2 bottom-28 flex flex-col gap-2 z-30 lg:-right-16 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2">
              <button onClick={prevStartup} className={`p-2.5 lg:p-3 backdrop-blur-md rounded-full shadow-md hover:shadow-lg hover:text-emerald-500 transition-all group ${darkMode ? 'bg-slate-800/80 lg:bg-slate-800 text-slate-400 border border-slate-700' : 'bg-white/20 lg:bg-white text-slate-500 lg:text-slate-400 border border-slate-200/60 lg:border-slate-100'}`}>
                <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform"/>
              </button>
              <button onClick={nextStartup} className={`p-2.5 lg:p-3 backdrop-blur-md rounded-full shadow-md hover:shadow-lg hover:text-emerald-500 transition-all group ${darkMode ? 'bg-slate-800/80 lg:bg-slate-800 text-slate-400 border border-slate-700' : 'bg-white/20 lg:bg-white text-slate-500 lg:text-slate-400 border border-slate-200/60 lg:border-slate-100'}`}>
                <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform"/>
              </button>
            </div>

            <div className="bg-[#050505] border-0 lg:border-[12px] border-[#1a1a1a] rounded-[2rem] lg:rounded-[3rem] h-[70vh] lg:h-[720px] shadow-2xl overflow-hidden relative transition-all duration-300">
              {/* Tabs en haut */}
              <div className="absolute top-0 w-full pt-4 lg:pt-8 pb-4 px-6 flex justify-center items-center z-50 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-xl p-1 rounded-xl border border-white/10 flex pointer-events-auto shadow-lg">
                  <button onClick={() => setActiveScreen('video')} className={`px-3 lg:px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeScreen === 'video' ? 'bg-white text-black' : 'text-white/60'}`}>
                    {t('simulator_pitch')}
                  </button>
                  <button onClick={() => setActiveScreen('profile')} className={`px-3 lg:px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeScreen === 'profile' ? 'bg-white text-black' : 'text-white/60'}`}>
                    {t('simulator_data')}
                  </button>
                </div>
              </div>

              {/* Actions TikTok Style - À DROITE dans le simulateur */}
              <div className={`absolute right-2 lg:right-3 bottom-32 lg:bottom-36 flex flex-col items-center gap-3 z-40 transition-opacity duration-300 ${activeScreen === 'video' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {/* Data Room */}
                <button className="flex flex-col items-center justify-center gap-0.5 group w-14">
                  <div className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center group-active:scale-90 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                    <FolderLock size={22} className="text-white" />
                  </div>
                  <span className="text-[13px] font-bold text-white [text-shadow:_0_1px_4px_rgb(0_0_0_/_80%)] w-full text-center">24</span>
                </button>
                
                {/* Intro */}
                <button className="flex flex-col items-center justify-center gap-0.5 group w-14">
                  <div className="w-11 h-11 flex items-center justify-center group-active:scale-90 transition-all">
                    <UserPlus size={28} fill="white" stroke="white" strokeWidth={0} className="translate-x-1 [filter:_drop-shadow(0_1px_3px_rgb(0_0_0_/_60%))]" />
                  </div>
                  <span className="text-[13px] font-bold text-white [text-shadow:_0_1px_4px_rgb(0_0_0_/_80%)] w-full text-center">8</span>
                </button>
                
                {/* Bookmark */}
                <button className="flex flex-col items-center justify-center gap-0.5 group w-14">
                  <div className="w-11 h-11 flex items-center justify-center group-active:scale-90 transition-all">
                    <Bookmark size={28} fill="white" stroke="white" strokeWidth={0} className="[filter:_drop-shadow(0_1px_3px_rgb(0_0_0_/_60%))]" />
                  </div>
                  <span className="text-[13px] font-bold text-white [text-shadow:_0_1px_4px_rgb(0_0_0_/_80%)] w-full text-center">156</span>
                </button>
                
                {/* Share */}
                <button className="flex flex-col items-center justify-center gap-0.5 group w-14">
                  <div className="w-11 h-11 flex items-center justify-center group-active:scale-90 transition-all">
                    <Send size={26} fill="white" stroke="white" strokeWidth={0} className="[filter:_drop-shadow(0_1px_3px_rgb(0_0_0_/_60%))]" />
                  </div>
                  <span className="text-[13px] font-bold text-white [text-shadow:_0_1px_4px_rgb(0_0_0_/_80%)] w-full text-center">42</span>
                </button>
              </div>

              <VideoScreen isActive={activeScreen === 'video'} t={t} startup={currentStartup} lang={lang} />
              <ProfileScreen isActive={activeScreen === 'profile'} t={t} startup={currentStartup} lang={lang} />
            </div>
          </div>
        </div>
      </section>

      {/* Section Dual Profiles (CONTENU COMPLET RESTAURÉ) */}
      <section id="avantages" className={`py-16 lg:py-20 px-6 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-3">
             <p className="text-emerald-500 font-black text-[9px] uppercase tracking-[0.3em]">{t('dual_badge')}</p>
             <h2 className={`text-2xl md:text-4xl font-black uppercase tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t('dual_title')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Carte Startups */}
            <div className={`p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-start text-left ${darkMode ? 'bg-slate-700 border border-slate-600' : 'bg-white shadow-slate-200/50 border border-slate-100'}`}>
               <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-200 rotate-3">
                 <Zap size={24} fill="white" />
               </div>
               <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t('dual_startup_title')}</h3>
               <div className="space-y-5 w-full">
                  <div className="flex gap-4">
                     <div className="mt-1 text-emerald-500 shrink-0"><Eye size={20} /></div>
                     <div>
                        <h4 className={`font-bold text-xs uppercase tracking-wider mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t('dual_s_1_title')}</h4>
                        <p className={`font-medium text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t('dual_s_1_desc')}</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="mt-1 text-emerald-500 shrink-0"><TrendingUp size={20} /></div>
                     <div>
                        <h4 className={`font-bold text-xs uppercase tracking-wider mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t('dual_s_2_title')}</h4>
                        <p className={`font-medium text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t('dual_s_2_desc')}</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="mt-1 text-emerald-500 shrink-0"><MessageCircle size={20} /></div>
                     <div>
                        <h4 className={`font-bold text-xs uppercase tracking-wider mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t('dual_s_3_title')}</h4>
                        <p className={`font-medium text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t('dual_s_3_desc')}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Carte Investisseurs */}
            <div className="bg-[#0A0F1C] p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-900/20 flex flex-col items-start text-left relative overflow-hidden">
               <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-900/20 blur-[80px] rounded-full pointer-events-none"></div>
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 mb-6 shadow-lg -rotate-3 z-10">
                 <Target size={24} />
               </div>
               <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-6 z-10">{t('dual_investor_title')}</h3>
               <div className="space-y-5 w-full z-10">
                  <div className="flex gap-4">
                     <div className="mt-1 text-emerald-400 shrink-0"><CheckCircle size={20} /></div>
                     <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-1">{t('dual_i_1_title')}</h4>
                        <p className="text-slate-400 font-medium text-xs leading-relaxed">{t('dual_i_1_desc')}</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="mt-1 text-emerald-400 shrink-0"><Clock size={20} /></div>
                     <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-1">{t('dual_i_2_title')}</h4>
                        <p className="text-slate-400 font-medium text-xs leading-relaxed">{t('dual_i_2_desc')}</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="mt-1 text-emerald-400 shrink-0"><Lock size={20} /></div>
                     <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-1">{t('dual_i_3_title')}</h4>
                        <p className="text-slate-400 font-medium text-xs leading-relaxed">{t('dual_i_3_desc')}</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className={`py-16 lg:py-20 px-6 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
             {[
               { label: t('pulse_stat_1'), value: "450k CHF", icon: <TrendingUp size={16}/> },
               { label: t('pulse_stat_2'), value: "12", icon: <Play size={16}/> },
               { label: t('pulse_stat_3'), value: "86", icon: <Users size={16}/> },
               { label: t('pulse_stat_4'), value: "BioTech", icon: <Globe size={16}/> }
             ].map((stat, i) => (
               <div key={i} className={`p-4 md:p-6 rounded-xl space-y-3 text-left ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-slate-50 border border-slate-100'}`}>
                  <div className={`w-8 h-8 rounded-lg shadow-sm flex items-center justify-center text-emerald-500 ${darkMode ? 'bg-slate-700' : 'bg-white'}`}>{stat.icon}</div>
                  <div>
                    <p className={`text-xl md:text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>{stat.value}</p>
                    <p className={`text-[9px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      <footer className={`py-8 border-t ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
            <p className={`text-[9px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-600' : 'text-slate-300'}`}>{t('footer_copy')}</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;