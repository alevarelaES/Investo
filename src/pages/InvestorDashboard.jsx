import React, { useState } from 'react';
import { 
  LayoutDashboard, PieChart, FileText, Settings, Bell, Search, 
  Filter, Download, ChevronRight, Lock, Eye, CheckCircle, XCircle, Menu, X,
  Target, TrendingUp, Layers, Tag, Bookmark, UserPlus, Send, FolderLock, ShieldCheck
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
        <ProfileSettings onClose={() => setShowProfileSettings(false)} lang={lang} />
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
        </header>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6 lg:mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-slate-900 mb-1 lg:mb-2">{t('inv_deal_flow')}</h1>
              <p className="text-sm lg:text-base text-slate-500 font-medium">{t('inv_deal_flow_desc')}</p>
            </div>
          </div>

          {/* FEED MODE - Remplacement du tableau pour un flux vertical immersif */}
          <div className="space-y-8 max-w-3xl mx-auto">
            {startups.map((startup) => (
              <div key={startup.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-xl transition-all">
                
                {/* Header Card : Info + Badges Confiance */}
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <img src={startup.ceo.photo} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" alt="CEO"/>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-slate-900 text-lg">{startup.name}</h3>
                        {/* Badge Vérifié */}
                        <span className="bg-blue-100 text-blue-700 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
                          <ShieldCheck size={10} /> {t('verified_badge') || 'VERIFIED'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{startup.vision[lang] || startup.vision.fr}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedStartup(startup)} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-emerald-600 transition-colors">
                    Voir Détails
                  </button>
                </div>

                {/* Zone Vidéo (Aperçu) */}
                <div className="relative aspect-video bg-black group cursor-pointer" onClick={() => setSelectedStartup(startup)}>
                  <video src={startup.video} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" muted loop onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100">
                  <div className="p-4 text-center">
                    <p className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">Target</p>
                    <p className="font-black text-emerald-600">{startup.kpis.amount}</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">Valuation</p>
                    <p className="font-black text-slate-900">{startup.kpis.valuation}</p>
                  </div>
                  <div className="p-4 text-center bg-slate-50">
                    <p className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">Risk</p>
                    <p className="font-bold text-xs text-blue-600 flex items-center justify-center gap-1">
                      <ShieldCheck size={12} /> Low
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* DETAIL PANEL (Overlay) */}
      {selectedStartup && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={handleClosePanel}>
          <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl overflow-hidden flex" onClick={e => e.stopPropagation()}>
            {/* Vidéo Player */}
            <div className="w-1/3 bg-black flex items-center justify-center">
               <video src={selectedStartup.video} controls className="max-h-full max-w-full" />
            </div>
            {/* Infos */}
            <div className="w-2/3 p-8 overflow-y-auto">
               <div className="flex justify-between items-start mb-6">
                 <div>
                    <h2 className="text-3xl font-black text-slate-900">{selectedStartup.name}</h2>
                    <p className="text-slate-500">{selectedStartup.vision[lang]}</p>
                 </div>
                 <button onClick={handleClosePanel}><X size={24} /></button>
               </div>
               <p className="text-lg leading-relaxed text-slate-700 mb-6">{selectedStartup.pitch[lang]}</p>
               <button className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl">Accéder à la Data Room (Sécurisé)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${active ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>
    <div className="flex items-center gap-3"><Icon size={18} /><span className="text-xs font-bold">{label}</span></div>
    {badge && <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[9px] font-bold rounded">{badge}</span>}
  </button>
);

export default InvestorDashboard;
