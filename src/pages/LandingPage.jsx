import React, { useState, useEffect } from 'react';
import { 
  Play, TrendingUp, Users, ArrowRight, Zap, Globe, ChevronUp, ChevronDown, 
  Eye, Target, CheckCircle, Clock, Lock, MessageCircle, LogIn, Menu, X,
  FolderLock, UserPlus, Bookmark, Send, BarChart3, Rocket, Building2, Shield, 
  Award, PieChart, LineChart
} from 'lucide-react';
import translations from '../data/translations';
import VideoScreen from '../components/VideoScreen';
import ProfileScreen from '../components/ProfileScreen';
import WaitlistModal from '../components/WaitlistModal';
import { startups } from '../data/startups';

const LandingPage = ({ onLogin, onLangChange, initialLang = 'fr' }) => {
  const [lang, setLang] = useState(initialLang);
  const [scrolled, setScrolled] = useState(false);
  const [activeScreen, setActiveScreen] = useState('video');
  const [currentIndex, setCurrentIndex] = useState(0);
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
    <div className="min-h-screen font-sans text-left overflow-x-hidden bg-slate-50 text-slate-900">
      
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type={modalType}
        t={t}
        lang={lang}
      />

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 relative overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M17 7h4v4" />
                </svg>
                <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
            </div>
            <span className="text-xl font-black tracking-tight uppercase text-slate-900">Invest<span className="text-emerald-500">o</span></span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] mr-4 text-slate-500">
              <a href="#deal-flow" className="hover:text-emerald-500 transition-colors">{t('nav_startups')}</a>
              <a href="#market-trends" className="hover:text-emerald-500 transition-colors">{t('nav_investors')}</a>
            </div>
            
            <div className="flex gap-2 border-r border-slate-200 pr-4 mr-2">
               <button onClick={() => handleLangChange('fr')} className={`text-[10px] font-bold ${lang === 'fr' ? 'text-emerald-500' : 'text-slate-400'}`}>FR</button>
               <span className="text-slate-200">|</span>
               <button onClick={() => handleLangChange('en')} className={`text-[10px] font-bold ${lang === 'en' ? 'text-emerald-500' : 'text-slate-400'}`}>EN</button>
            </div>

            <button onClick={onLogin} className="text-[10px] font-black uppercase tracking-widest hover:text-emerald-500 transition-colors flex items-center gap-2 text-slate-500">
              <LogIn size={14} /> {t('login')}
            </button>
            <button onClick={() => openModal('investor')} className="bg-emerald-600 text-white px-7 py-3 rounded-xl hover:bg-emerald-500 transition-all font-bold tracking-widest text-[10px] shadow-lg shadow-emerald-600/20">
              {t('nav_member')}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg transition-colors border border-slate-200 hover:bg-slate-100">
              {mobileMenuOpen ? <X size={20} className="text-slate-600" /> : <Menu size={20} className="text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="backdrop-blur-md border-t px-6 py-4 space-y-4 bg-white/95 border-slate-200">
            <div className="flex flex-col gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
              <a href="#deal-flow" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-500 transition-colors py-2">{t('nav_startups')}</a>
              <a href="#market-trends" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-500 transition-colors py-2">{t('nav_investors')}</a>
            </div>
            <div className="flex gap-4 py-2 border-t border-slate-100">
               <button onClick={() => handleLangChange('fr')} className={`text-[11px] font-bold ${lang === 'fr' ? 'text-emerald-500' : 'text-slate-400'}`}>Français</button>
               <button onClick={() => handleLangChange('en')} className={`text-[11px] font-bold ${lang === 'en' ? 'text-emerald-500' : 'text-slate-400'}`}>English</button>
            </div>
            <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
              <button onClick={() => { onLogin(); setMobileMenuOpen(false); }} className="text-[11px] font-black uppercase tracking-widest hover:text-emerald-500 transition-colors flex items-center gap-2 py-2 text-slate-600">
                <LogIn size={16} /> {t('login')}
              </button>
              <button onClick={() => { openModal('investor'); setMobileMenuOpen(false); }} className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-500 transition-all font-bold tracking-widest text-[11px] w-full shadow-lg shadow-emerald-600/20">
                {t('nav_member')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 px-4 md:px-6 overflow-hidden min-h-[85vh] flex items-center bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 relative z-10 text-left order-1 lg:order-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-emerald-50 border border-emerald-100 text-emerald-700">
              <Zap size={10} className="animate-pulse" /> {t('hero_badge')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] tracking-tighter uppercase text-slate-900">
              {t('hero_title_1')} <br /> <span className="text-emerald-500">{t('hero_title_2')}</span> <br/> {t('hero_title_3')}
            </h1>
            <p className="text-base lg:text-lg max-w-md leading-relaxed font-medium text-slate-500">{t('hero_desc')}</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={() => openModal('startup')} className="bg-emerald-600 text-white font-black uppercase tracking-widest text-[9px] px-6 lg:px-8 py-3.5 lg:py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 active:scale-95 transition-transform hover:bg-emerald-500">
                {t('btn_pitch')} <ArrowRight size={14} />
              </button>
              <button onClick={() => openModal('investor')} className="px-6 lg:px-8 py-3.5 lg:py-4 rounded-xl font-black uppercase tracking-widest text-[9px] active:scale-95 transition-transform bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50">
                {t('btn_sourcing')}
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[340px] lg:max-w-[360px] order-2 lg:order-none mt-6 lg:mt-0">
            <div className="absolute right-2 bottom-28 flex flex-col gap-2 z-30 lg:-right-16 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2">
              <button onClick={prevStartup} className="p-2.5 lg:p-3 backdrop-blur-md rounded-full shadow-md hover:shadow-lg hover:text-emerald-500 transition-all group bg-white text-slate-400 border border-slate-200">
                <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform"/>
              </button>
              <button onClick={nextStartup} className="p-2.5 lg:p-3 backdrop-blur-md rounded-full shadow-md hover:shadow-lg hover:text-emerald-500 transition-all group bg-white text-slate-400 border border-slate-200">
                <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform"/>
              </button>
            </div>
            <div className="bg-[#050505] border-0 lg:border-[12px] border-[#1a1a1a] rounded-[2rem] lg:rounded-[3rem] h-[70vh] lg:h-[720px] shadow-2xl overflow-hidden relative transition-all duration-300">
              <div className="absolute top-0 w-full pt-4 lg:pt-8 pb-4 px-6 flex justify-center items-center z-50 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-xl p-1 rounded-xl border border-white/10 flex pointer-events-auto shadow-lg">
                  <button onClick={() => setActiveScreen('video')} className={`px-3 lg:px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeScreen === 'video' ? 'bg-white text-black' : 'text-white/60'}`}>{t('simulator_pitch')}</button>
                  <button onClick={() => setActiveScreen('profile')} className={`px-3 lg:px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeScreen === 'profile' ? 'bg-white text-black' : 'text-white/60'}`}>{t('simulator_data')}</button>
                </div>
              </div>
              <div className={`absolute right-2 lg:right-3 bottom-32 lg:bottom-36 flex flex-col items-center gap-3 z-40 transition-opacity duration-300 ${activeScreen === 'video' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <button className="flex flex-col items-center justify-center gap-0.5 group w-14">
                  <div className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center group-active:scale-90 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.3)]"><FolderLock size={22} className="text-white" /></div>
                  <span className="text-[13px] font-bold text-white [text-shadow:_0_1px_4px_rgb(0_0_0_/_80%)] w-full text-center">24</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-0.5 group w-14">
                  <div className="w-11 h-11 flex items-center justify-center group-active:scale-90 transition-all"><UserPlus size={28} fill="white" stroke="white" strokeWidth={0} className="translate-x-1 [filter:_drop-shadow(0_1px_3px_rgb(0_0_0_/_60%))]" /></div>
                  <span className="text-[13px] font-bold text-white [text-shadow:_0_1px_4px_rgb(0_0_0_/_80%)] w-full text-center">8</span>
                </button>
              </div>
              <VideoScreen isActive={activeScreen === 'video'} t={t} startup={currentStartup} lang={lang} />
              <ProfileScreen isActive={activeScreen === 'profile'} t={t} startup={currentStartup} lang={lang} />
            </div>
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section id="market-trends" className="py-16 lg:py-20 px-6 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-3">
             <p className="text-emerald-500 font-black text-[9px] uppercase tracking-[0.3em]">{lang === 'fr' ? 'Données Marché' : 'Market Data'}</p>
             <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-slate-900">{lang === 'fr' ? 'Tendances du Marché Suisse' : 'Swiss Market Trends'}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center"><TrendingUp size={16} className="text-emerald-600" /></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{lang === 'fr' ? 'Levées 2026' : 'Fundraising 2026'}</span>
              </div>
              <p className="text-2xl font-black text-slate-900">2.4 Mds CHF</p>
              <p className="text-xs text-emerald-600 font-bold mt-1">+18% vs 2025</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><Rocket size={16} className="text-blue-600" /></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{lang === 'fr' ? 'Startups actives' : 'Active Startups'}</span>
              </div>
              <p className="text-2xl font-black text-slate-900">1,240</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deal Flow */}
      <section id="deal-flow" className="py-16 lg:py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-3">
             <p className="text-emerald-500 font-black text-[9px] uppercase tracking-[0.3em]">{lang === 'fr' ? 'Deal Flow' : 'Deal Flow'}</p>
             <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-slate-900">{lang === 'fr' ? 'Opportunités Actuelles' : 'Current Opportunities'}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startups.map((startup) => (
              <div key={startup.id} className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 group cursor-pointer">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img src={startup.poster} alt={startup.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-black px-2 py-1 rounded uppercase tracking-wider bg-white text-slate-900 border border-slate-200">{startup.kpis.sector[lang]}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-black text-lg text-slate-900 mb-1">{startup.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{startup.vision[lang]}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOUVEAU : Testimonials Section */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-emerald-400 font-black text-[9px] uppercase tracking-[0.3em] mb-4">Trust</p>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-12">{t('testi_title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-left">
              <div className="text-emerald-400 text-4xl font-serif mb-4">"</div>
              <p className="text-lg font-medium leading-relaxed mb-6">{t('testi_1_msg')}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold">TL</div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('testi_1_author')}</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-left">
              <div className="text-emerald-400 text-4xl font-serif mb-4">"</div>
              <p className="text-lg font-medium leading-relaxed mb-6">{t('testi_2_msg')}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-bold">SM</div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('testi_2_author')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t bg-white border-slate-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-300">{t('footer_copy')}</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
