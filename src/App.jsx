import React, { useState, useEffect } from 'react';
import { 
  Play, TrendingUp, Users, ArrowRight, Zap, Globe, ChevronUp, ChevronDown, 
  Eye, Target, CheckCircle, Clock, Lock, MessageCircle 
} from 'lucide-react';
import translations from './data/translations';
import VideoScreen from './components/VideoScreen';
import ProfileScreen from './components/ProfileScreen';
import { startups } from './data/startups';

const App = () => {
  const [lang, setLang] = useState('fr');
  const [scrolled, setScrolled] = useState(false);
  const [activeScreen, setActiveScreen] = useState('video');
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentStartup = startups[currentIndex];
  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  const nextStartup = () => setCurrentIndex((prev) => (prev + 1) % startups.length);
  const prevStartup = () => setCurrentIndex((prev) => (prev - 1 + startups.length) % startups.length);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans text-left">
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
            <button className="bg-slate-900 text-white px-7 py-3 rounded-xl hover:bg-emerald-600 transition-all font-bold tracking-widest text-[10px]">
              {t('nav_member')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 relative z-10 text-left">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
              <Zap size={12} className="animate-pulse" />
              {t('hero_badge')}
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter text-slate-900 uppercase">
              {t('hero_title_1')} <br />
              <span className="text-emerald-600">{t('hero_title_2')}</span> <br/>
              {t('hero_title_3')}
            </h1>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-medium">{t('hero_desc')}</p>
            <div className="flex gap-5 pt-4">
              <button className="bg-emerald-600 text-white font-black uppercase tracking-widest text-[10px] px-12 py-5 rounded-2xl flex items-center gap-3 shadow-2xl shadow-emerald-600/30 hover:bg-emerald-700 transition-colors">
                {t('btn_pitch')} <ArrowRight size={18} />
              </button>
              <button className="bg-white border-2 border-slate-100 text-slate-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-colors">
                {t('btn_sourcing')}
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[400px]">
             {/* Navigation Flèches */}
             <div className="absolute -right-20 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
              <button onClick={prevStartup} className="p-4 bg-white rounded-full shadow-xl hover:bg-slate-50 text-slate-400 hover:text-emerald-600 transition-all border border-slate-100 group">
                <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform"/>
              </button>
              <button onClick={nextStartup} className="p-4 bg-white rounded-full shadow-xl hover:bg-slate-50 text-slate-400 hover:text-emerald-600 transition-all border border-slate-100 group">
                <ChevronDown size={24} className="group-hover:translate-y-1 transition-transform"/>
              </button>
            </div>
            <div className="bg-[#050505] border-[14px] border-[#1a1a1a] rounded-[4rem] h-[780px] shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 w-full pt-12 pb-6 px-8 flex justify-center items-center z-50 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-xl p-1 rounded-2xl border border-white/10 flex pointer-events-auto">
                  <button onClick={() => setActiveScreen('video')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeScreen === 'video' ? 'bg-white text-black' : 'text-white/60'}`}>
                    {t('simulator_pitch')}
                  </button>
                  <button onClick={() => setActiveScreen('profile')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeScreen === 'profile' ? 'bg-white text-black' : 'text-white/60'}`}>
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

      {/* --- NOUVELLE SECTION : DUAL PROFILES (Startups vs Investisseurs) --- */}
      <section id="avantages" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
             <p className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">{t('dual_badge')}</p>
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">{t('dual_title')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Carte Startups (Blanche) */}
            <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start text-left">
               <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center text-white mb-8 shadow-lg shadow-emerald-200 rotate-3">
                 <Zap size={32} fill="white" />
               </div>
               <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">{t('dual_startup_title')}</h3>
               <div className="space-y-8 w-full">
                  <div className="flex gap-5">
                     <div className="mt-1 text-emerald-600"><Eye size={24} /></div>
                     <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 mb-1">{t('dual_s_1_title')}</h4>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed">{t('dual_s_1_desc')}</p>
                     </div>
                  </div>
                  <div className="flex gap-5">
                     <div className="mt-1 text-emerald-600"><TrendingUp size={24} /></div>
                     <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 mb-1">{t('dual_s_2_title')}</h4>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed">{t('dual_s_2_desc')}</p>
                     </div>
                  </div>
                  <div className="flex gap-5">
                     <div className="mt-1 text-emerald-600"><MessageCircle size={24} /></div>
                     <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 mb-1">{t('dual_s_3_title')}</h4>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed">{t('dual_s_3_desc')}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Carte Investisseurs (Sombre) */}
            <div className="bg-[#0A0F1C] p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 flex flex-col items-start text-left relative overflow-hidden">
               {/* Effet de fond subtil */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/20 blur-[100px] rounded-full pointer-events-none"></div>
               
               <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-slate-900 mb-8 shadow-lg -rotate-3 z-10">
                 <Target size={32} />
               </div>
               <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-8 z-10">{t('dual_investor_title')}</h3>
               <div className="space-y-8 w-full z-10">
                  <div className="flex gap-5">
                     <div className="mt-1 text-emerald-400"><CheckCircle size={24} /></div>
                     <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-1">{t('dual_i_1_title')}</h4>
                        <p className="text-slate-400 font-medium text-sm leading-relaxed">{t('dual_i_1_desc')}</p>
                     </div>
                  </div>
                  <div className="flex gap-5">
                     <div className="mt-1 text-emerald-400"><Clock size={24} /></div>
                     <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-1">{t('dual_i_2_title')}</h4>
                        <p className="text-slate-400 font-medium text-sm leading-relaxed">{t('dual_i_2_desc')}</p>
                     </div>
                  </div>
                  <div className="flex gap-5">
                     <div className="mt-1 text-emerald-400"><Lock size={24} /></div>
                     <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-1">{t('dual_i_3_title')}</h4>
                        <p className="text-slate-400 font-medium text-sm leading-relaxed">{t('dual_i_3_desc')}</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Pulse Stats */}
      <section id="stats" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
             {[
               { label: t('pulse_stat_1'), value: "450k CHF", icon: <TrendingUp size={20}/> },
               { label: t('pulse_stat_2'), value: "12", icon: <Play size={20}/> },
               { label: t('pulse_stat_3'), value: "86", icon: <Users size={20}/> },
               { label: t('pulse_stat_4'), value: "BioTech", icon: <Globe size={20}/> }
             ].map((stat, i) => (
               <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-4 text-left">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600">{stat.icon}</div>
                  <div>
                    <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{t('footer_copy')}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;