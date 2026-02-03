import React, { useState } from 'react';
import { 
  LayoutDashboard, PieChart, FileText, Settings, Bell, Search, 
  Filter, Download, ChevronRight, Lock, Eye, CheckCircle, XCircle, Menu, X,
  Target, TrendingUp, Layers, Tag, Bookmark, UserPlus, Send, FolderLock,
  Globe, ShieldCheck, Play
} from 'lucide-react';
import { startups } from '../data/startups';
import translations from '../data/translations';
import VideoScreen from '../components/VideoScreen';
import ProfileSettings from '../components/ProfileSettings';

const InvestorDashboard = ({ lang = 'fr' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [activeTab, setActiveTab] = useState('pitch'); 
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  const handleClosePanel = () => {
    setSelectedStartup(null);
    setActiveTab('pitch');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {showProfileSettings && (
        <ProfileSettings 
          onClose={() => setShowProfileSettings(false)} 
          lang={lang} 
        />
      )}
      
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* SIDEBAR */}
      <aside className={`w-64 bg-white text-slate-900 flex flex-col fixed h-full border-r border-slate-200 z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/50 relative overflow-hidden">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l6-6 4 4 8-8" />
                <path d="M17 7h4v4" />
              </svg>
            </div>
            <span className="text-lg font-black tracking-tight uppercase">Invest<span className="text-emerald-500">o</span></span>
          </div>
          <button className="lg:hidden p-2 hover:bg-white/10 rounded-lg" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 mt-4">{t('inv_sourcing')}</div>
          <MenuItem icon={LayoutDashboard} label="Deal Flow" active />
          <MenuItem icon={PieChart} label={t('inv_portfolio')} />
          <MenuItem icon={Bell} label={t('inv_notifications')} badge="3" />
          
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 mt-8">{t('inv_diligence')}</div>
          <MenuItem icon={FileText} label={t('inv_data_rooms')} />
          <MenuItem icon={Settings} label={t('inv_settings')} onClick={() => setShowProfileSettings(true)} />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xs">JD</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate text-slate-900">Jean Dupont</p>
              <p className="text-[10px] text-slate-500 truncate">Family Office</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-64">
        <header className="h-16 lg:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} className="text-slate-600" />
            </button>
            <div className="flex items-center gap-4 text-slate-400 bg-slate-100 px-3 lg:px-4 py-2 rounded-xl w-full max-w-[200px] lg:max-w-[384px]">
              <Search size={18} className="shrink-0" />
              <input type="text" placeholder={t('search_placeholder')} className="bg-transparent text-sm font-medium w-full focus:outline-none text-slate-900" />
            </div>
          </div>
          <div className="flex gap-2 lg:gap-4">
             <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"><Bell size={20}/></button>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 lg:mb-12">
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-slate-900 mb-1 lg:mb-2">{t('inv_deal_flow')}</h1>
              <p className="text-sm lg:text-base text-slate-500 font-medium">{t('inv_deal_flow_desc')}</p>
            </div>
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-10">
            <KpiCard label={t('inv_deals_reviewed')} value="124" trend="+12%" />
            <KpiCard label={t('inv_watchlist')} value="12" active />
            <KpiCard label={t('inv_data_rooms_open')} value="5" />
            <KpiCard label={t('inv_connections')} value="2" />
          </div>

          {/* FEED MODE AGRANDI - LARGE CARDS */}
          <div className="space-y-12 max-w-4xl mx-auto pb-20">
            {startups.map((startup) => (
              <div key={startup.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl transition-all hover:shadow-2xl">
                
                {/* Header Card */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                  <div className="flex items-center gap-4">
                    <img src={startup.ceo.photo} className="w-14 h-14 rounded-2xl object-cover shadow-md" alt="CEO"/>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-black text-slate-900 text-2xl tracking-tight">{startup.name}</h3>
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-widest">
                          <ShieldCheck size={12} /> {t('verified_badge')}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-slate-500 font-bold text-xs uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Tag size={12} className="text-emerald-500"/> {typeof startup.kpis.sector === 'object' ? startup.kpis.sector[lang] : startup.kpis.sector}</span>
                        <span className="text-slate-300">|</span>
                        <span className="flex items-center gap-1"><Globe size={12} className="text-blue-500"/> {startup.location || 'Lausanne, CH'}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedStartup(startup)} className="hidden sm:block bg-emerald-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-emerald-600/20">
                    Détails complets
                  </button>
                </div>

                {/* Zone Vidéo */}
                <div className="relative aspect-video bg-black group cursor-pointer" onClick={() => setSelectedStartup(startup)}>
                  <video src={startup.video} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" muted loop onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-xl p-5 rounded-full border border-white/30">
                      <Play fill="white" className="text-white ml-1" size={32} />
                    </div>
                  </div>
                </div>

                {/* Description Startup */}
                <div className="p-8 bg-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-3">À propos</p>
                  <p className="text-slate-600 leading-relaxed text-lg italic">
                    "{startup.pitch[lang] || startup.pitch.fr}"
                  </p>
                </div>

                {/* Metrics Footer */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50/50">
                  <div className="p-6 text-center">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Objectif</p>
                    <p className="text-2xl font-black text-emerald-600">{startup.kpis.amount}</p>
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Valorisation</p>
                    <p className="text-2xl font-black text-slate-900">{startup.kpis.valuation}</p>
                  </div>
                  <div className="p-6 text-center flex flex-col items-center justify-center">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Status</p>
                    <p className="text-xs font-black text-blue-600 flex items-center justify-center gap-1 bg-blue-50 py-2 px-3 rounded-xl uppercase">
                      <ShieldCheck size={14} /> {t('audit_badge')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* SIDE PANEL (DETAIL) */}
      {selectedStartup && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={handleClosePanel}>
          <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl overflow-hidden flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
            <div className="w-full md:w-1/3 bg-black flex items-center justify-center">
               <video src={selectedStartup.video} controls className="max-h-full max-w-full" />
            </div>
            <div className="flex-1 p-8 overflow-y-auto">
               <div className="flex justify-between items-start mb-6">
                 <div>
                    <h2 className="text-3xl font-black text-slate-900">{selectedStartup.name}</h2>
                    <p className="text-slate-500">{selectedStartup.vision[lang]}</p>
                 </div>
                 <button onClick={handleClosePanel} className="p-2 hover:bg-slate-100 rounded-full"><X size={24} /></button>
               </div>
               <p className="text-lg leading-relaxed text-slate-700 mb-6">{selectedStartup.pitch[lang]}</p>
               
               <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase">Secteur</p>
                    <p className="font-bold text-slate-900">{typeof selectedStartup.kpis.sector === 'object' ? selectedStartup.kpis.sector[lang] : selectedStartup.kpis.sector}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase">Stade</p>
                    <p className="font-bold text-slate-900">{selectedStartup.kpis.stage}</p>
                  </div>
               </div>

               <button className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-colors">
                 Accéder à la Data Room (Sécurisé)
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Petits composants
const MenuItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${active ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} />
      <span className="text-xs font-bold">{label}</span>
    </div>
    {badge && <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[9px] font-bold rounded">{badge}</span>}
  </button>
);

const KpiCard = ({ label, value, trend, active }) => (
  <div className={`p-4 lg:p-6 rounded-xl border ${active ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
    <p className={`text-[9px] font-bold uppercase tracking-widest mb-2 ${active ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
    <div className="flex items-end justify-between gap-2">
      <p className="text-3xl font-black">{value}</p>
      {trend && <span className="text-xs font-bold text-emerald-500 bg-emerald-50/10 px-2 py-1 rounded">{trend}</span>}
    </div>
  </div>
);

export default InvestorDashboard;
