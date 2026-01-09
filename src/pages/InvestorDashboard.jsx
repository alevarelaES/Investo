import React, { useState } from 'react';
import { 
  LayoutDashboard, PieChart, FileText, Settings, Bell, Search, 
  Filter, Download, ChevronRight, Lock, Eye, CheckCircle, XCircle, Menu, X,
  Target, TrendingUp, Layers, Tag, Bookmark, UserPlus, Send, FolderLock
} from 'lucide-react';
import { startups } from '../data/startups';
import translations from '../data/translations';
import VideoScreen from '../components/VideoScreen';
import ProfileSettings from '../components/ProfileSettings';

const InvestorDashboard = ({ lang = 'fr' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [activeTab, setActiveTab] = useState('pitch'); // 'pitch' ou 'data'
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  // Reset tab quand on ferme le panel
  const handleClosePanel = () => {
    setSelectedStartup(null);
    setActiveTab('pitch');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* Profile Settings Modal */}
      {showProfileSettings && (
        <ProfileSettings 
          onClose={() => setShowProfileSettings(false)} 
          lang={lang} 
        />
      )}
      
      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* SIDEBAR (Navigation Gauche) - Light Mode */}
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

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">onClick={() => setShowProfileSettings(true)} 
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 mt-4">{t('inv_sourcing')}</div>
          <MenuItem icon={LayoutDashboard} label="Deal Flow" active />
          <MenuItem icon={PieChart} label={t('inv_portfolio')} />
          <MenuItem icon={Bell} label={t('inv_notifications')} badge="3" />
          
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 mt-8">{t('inv_diligence')}</div>
          <MenuItem icon={FileText} label={t('inv_data_rooms')} />
          <MenuItem icon={Settings} label={t('inv_settings')} />
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

      {/* MAIN CONTENT (Zone Principale) */}
      <main className="flex-1 lg:ml-64">
        
        {/* Header */}
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
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6 lg:mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-slate-900 mb-1 lg:mb-2">{t('inv_deal_flow')}</h1>
              <p className="text-sm lg:text-base text-slate-500 font-medium">{t('inv_deal_flow_desc')}</p>
            </div>
            <div className="flex gap-2 lg:gap-3">
              <button className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs lg:text-sm font-bold text-slate-600 hover:bg-slate-50">
                <Filter size={16} /> <span className="hidden sm:inline">{t('inv_filters')}</span>
              </button>
              <button className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs lg:text-sm font-bold text-slate-600 hover:bg-slate-50">
                <Download size={16} /> <span className="hidden sm:inline">{t('inv_export')}</span>
              </button>
            </div>
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-10">
            <KpiCard label={t('inv_deals_reviewed')} value="124" trend="+12%" />
            <KpiCard label={t('inv_watchlist')} value="12" active />
            <KpiCard label={t('inv_data_rooms_open')} value="5" />
            <KpiCard label={t('inv_connections')} value="2" />
          </div>

          {/* TABLEAU "FINTECH STYLE" - VERSION MOBILE CARDS */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Version Desktop: Tableau */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-widest text-slate-500">
                    <th className="p-5 font-bold text-left">{t('inv_startup')}</th>
                    <th className="p-5 font-bold text-left">{t('inv_sector')}</th>
                    <th className="p-5 font-bold text-left">{t('inv_stage')}</th>
                    <th className="p-5 font-bold text-right">{t('inv_valuation')}</th>
                    <th className="p-5 font-bold text-right">{t('inv_target')}</th>
                    <th className="p-5 font-bold text-center">{t('inv_status')}</th>
                    <th className="p-5 font-bold text-center">{t('inv_action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {startups.map((startup) => (
                    <tr key={startup.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer" onClick={() => setSelectedStartup(startup)}>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <img src={startup.ceo.photo} alt="" className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                          <div>
                            <p className="font-bold text-slate-900">{startup.name}</p>
                            <p className="text-xs text-slate-500 truncate max-w-[150px]">{startup.vision.fr || startup.vision}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          startup.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 
                          startup.color === 'purple' ? 'bg-purple-100 text-purple-700' : 
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {typeof startup.kpis.sector === 'object' ? startup.kpis.sector.fr : startup.kpis.sector}
                        </span>
                      </td>
                      <td className="p-5 text-sm font-medium text-slate-600">{startup.kpis.stage}</td>
                      <td className="p-5 text-sm font-bold text-slate-900 text-right">{startup.kpis.valuation}</td>
                      <td className="p-5 text-sm font-medium text-emerald-600 text-right">{startup.kpis.amount}</td>
                      <td className="p-5 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold border border-slate-200">
                          <Lock size={10} /> {t('inv_data_room')}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors">
                          <ChevronRight size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Version Mobile: Cards améliorées */}
            <div className="lg:hidden divide-y divide-slate-100">
              {startups.map((startup) => (
                <div key={startup.id} className="p-4 hover:bg-slate-50/80 transition-colors cursor-pointer active:bg-slate-100" onClick={() => setSelectedStartup(startup)}>
                  {/* Header: Photo + Nom + Flèche */}
                  <div className="flex items-center gap-3 mb-3">
                    <img src={startup.ceo.photo} alt="" className="w-11 h-11 rounded-xl object-cover shadow-sm shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 text-[15px]">{startup.name}</p>
                      <p className="text-xs text-slate-500 truncate">{startup.vision[lang] || startup.vision.fr}</p>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 shrink-0" />
                  </div>
                  
                  {/* Badges: Secteur + Stage */}
                  <div className="flex gap-2 mb-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      startup.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 
                      startup.color === 'purple' ? 'bg-purple-100 text-purple-700' : 
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {startup.kpis.sector[lang] || startup.kpis.sector.fr}
                    </span>
                    <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                      {startup.kpis.stage}
                    </span>
                  </div>
                  
                  {/* KPIs: 2 colonnes bien alignées */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-lg p-2">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{lang === 'fr' ? 'Valorisation' : 'Valuation'}</p>
                      <p className="text-sm font-black text-slate-900">{startup.kpis.valuation}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-2">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-600/70">{lang === 'fr' ? 'Objectif' : 'Target'}</p>
                      <p className="text-sm font-black text-emerald-700">{startup.kpis.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* SIDE PANEL - Overlay (Desktop uniquement) */}
      {selectedStartup && (
        <div 
          className="hidden lg:block fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={handleClosePanel}
        />
      )}

      {/* ============================================= */}
      {/* MOBILE : Expérience Fullscreen avec Tabs */}
      {/* ============================================= */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black z-50 transform transition-transform duration-300 ease-out ${
          selectedStartup ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedStartup && (
          <div className="relative h-full w-full flex flex-col">
            
            {/* Header avec Tabs */}
            <div className="absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between">
              {/* Bouton fermer */}
              <button 
                onClick={handleClosePanel}
                className="p-2 bg-black/40 hover:bg-black/60 rounded-full transition-colors backdrop-blur-sm"
              >
                <X size={22} className="text-white" />
              </button>
              
              {/* Tabs Le Pitch / La Data */}
              <div className="flex bg-black/40 backdrop-blur-md rounded-full p-1">
                <button 
                  onClick={() => setActiveTab('pitch')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === 'pitch' 
                      ? 'bg-white text-slate-900' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {lang === 'fr' ? 'Le Pitch' : 'Pitch'}
                </button>
                <button 
                  onClick={() => setActiveTab('data')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === 'data' 
                      ? 'bg-white text-slate-900' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {lang === 'fr' ? 'La Data' : 'Data'}
                </button>
              </div>
              
              {/* Spacer pour équilibrer */}
              <div className="w-10"></div>
            </div>

            {/* CONTENU : Pitch (VideoScreen) */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'pitch' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
              <VideoScreen 
                isActive={activeTab === 'pitch'} 
                t={t} 
                startup={selectedStartup} 
                lang={lang} 
              />
            </div>

            {/* CONTENU : Data (Infos détaillées) */}
            <div className={`absolute inset-0 bg-slate-50 transition-opacity duration-300 ${activeTab === 'data' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
              <div className="h-full pt-16 pb-20 overflow-y-auto">
                <div className="p-5">
                  
                  {/* Header Startup */}
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={selectedStartup.ceo.photo} 
                      alt={selectedStartup.ceo.name} 
                      className="w-16 h-16 rounded-2xl object-cover shadow-lg" 
                    />
                    <div>
                      <h2 className="text-xl font-black text-slate-900">{selectedStartup.name}</h2>
                      <p className="text-sm text-slate-500">{selectedStartup.vision[lang] || selectedStartup.vision.fr}</p>
                    </div>
                  </div>

                  {/* KPIs Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600/70 mb-1">{lang === 'fr' ? 'Recherche' : 'Target'}</p>
                      <p className="text-xl font-black text-emerald-700">{selectedStartup.kpis.amount}</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{lang === 'fr' ? 'Valorisation' : 'Valuation'}</p>
                      <p className="text-xl font-black text-slate-900">{selectedStartup.kpis.valuation}</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{lang === 'fr' ? 'Stade' : 'Stage'}</p>
                      <p className="text-xl font-black text-slate-900">{selectedStartup.kpis.stage}</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-200">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{lang === 'fr' ? 'Ticket min.' : 'Min. Ticket'}</p>
                      <p className="text-xl font-black text-slate-900">{selectedStartup.minTicket}</p>
                    </div>
                  </div>

                  {/* Pitch Text */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{lang === 'fr' ? 'Le Pitch' : 'The Pitch'}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      "{selectedStartup.pitch[lang] || selectedStartup.pitch.fr}"
                    </p>
                  </div>

                  {/* CEO */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">{lang === 'fr' ? 'Le Fondateur' : 'The Founder'}</p>
                    <div className="flex items-center gap-3 mb-3">
                      <img 
                        src={selectedStartup.ceo.photo} 
                        alt={selectedStartup.ceo.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-md" 
                      />
                      <div>
                        <p className="font-bold text-slate-900">{selectedStartup.ceo.name}</p>
                        <p className="text-xs text-slate-500">{selectedStartup.ceo.role[lang] || selectedStartup.ceo.role.fr}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedStartup.ceo.bio[lang] || selectedStartup.ceo.bio.fr}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions TikTok Style - Colonne droite (visible sur tab Pitch) */}
            <div className={`absolute right-3 bottom-28 z-20 flex flex-col items-center gap-4 transition-opacity duration-300 ${activeTab === 'pitch' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              
              {/* 1. Data Room (CTA Principal - vert) */}
              <button className="flex flex-col items-center justify-center gap-0.5 group w-14">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center group-hover:bg-emerald-400 group-active:scale-90 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  <FolderLock size={24} className="text-white" />
                </div>
                <span className="text-[13px] font-bold text-white [text-shadow:_0_1px_4px_rgb(0_0_0_/_80%)] w-full text-center">24</span>
              </button>
              
              {/* 2. Demander Intro */}
              <button className="flex flex-col items-center justify-center gap-0.5 group w-14">
                <div className="w-12 h-12 flex items-center justify-center group-active:scale-90 transition-all">
                  <UserPlus size={28} fill="white" stroke="white" strokeWidth={0} className="translate-x-1 [filter:_drop-shadow(0_1px_3px_rgb(0_0_0_/_60%))]" />
                </div>
                <span className="text-[13px] font-bold text-white [text-shadow:_0_1px_4px_rgb(0_0_0_/_80%)] w-full text-center">8</span>
              </button>
              
              {/* 3. Bookmark/Watchlist */}
              <button className="flex flex-col items-center justify-center gap-0.5 group w-14">
                <div className="w-12 h-12 flex items-center justify-center group-active:scale-90 transition-all">
                  <Bookmark size={28} fill="white" stroke="white" strokeWidth={0} className="[filter:_drop-shadow(0_1px_3px_rgb(0_0_0_/_60%))]" />
                </div>
                <span className="text-[13px] font-bold text-white [text-shadow:_0_1px_4px_rgb(0_0_0_/_80%)] w-full text-center">156</span>
              </button>
              
              {/* 4. Envoyer/Partager */}
              <button className="flex flex-col items-center justify-center gap-0.5 group w-14">
                <div className="w-12 h-12 flex items-center justify-center group-active:scale-90 transition-all">
                  <Send size={26} fill="white" stroke="white" strokeWidth={0} className="[filter:_drop-shadow(0_1px_3px_rgb(0_0_0_/_60%))]" />
                </div>
                <span className="text-[13px] font-bold text-white [text-shadow:_0_1px_4px_rgb(0_0_0_/_80%)] w-full text-center">42</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============================================= */}
      {/* DESKTOP : Layout 2 colonnes */}
      {/* ============================================= */}
      <div 
        className={`hidden lg:block fixed inset-y-0 right-0 w-[800px] xl:w-[900px] bg-slate-100 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          selectedStartup ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedStartup && (
          <div className="h-full flex flex-row">
            
            {/* COLONNE GAUCHE : Vidéo TikTok (format vertical 9:16) */}
            <div className="relative bg-black w-[320px] xl:w-[360px] shrink-0 flex items-center justify-center">
              <div className="relative h-[90%] aspect-[9/16] max-w-full">
                <video
                  className="w-full h-full object-cover rounded-2xl"
                  src={selectedStartup.video}
                  poster={selectedStartup.poster}
                  controls
                  playsInline
                />
              </div>
            </div>

            {/* COLONNE DROITE : Infos */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
              
              {/* Header sticky */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedStartup.ceo.photo} 
                    alt={selectedStartup.ceo.name} 
                    className="w-10 h-10 rounded-lg object-cover shadow-sm" 
                  />
                  <div>
                    <h2 className="font-bold text-slate-900">{selectedStartup.name}</h2>
                    <p className="text-xs text-slate-500">{selectedStartup.ceo.name} • {selectedStartup.ceo.role[lang] || selectedStartup.ceo.role.fr}</p>
                  </div>
                </div>
                <button 
                  onClick={handleClosePanel}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              {/* Contenu scrollable */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-5">
                
                {/* Badge + Vision */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                    selectedStartup.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 
                    selectedStartup.color === 'purple' ? 'bg-purple-100 text-purple-700' : 
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {selectedStartup.kpis.sector[lang]}
                  </span>
                  <span className="text-xs font-medium text-slate-500">{selectedStartup.vision[lang] || selectedStartup.vision.fr}</span>
                </div>

                {/* Pitch */}
                <p className="text-sm text-slate-700 leading-relaxed mb-5">
                  "{selectedStartup.pitch[lang] || selectedStartup.pitch.fr}"
                </p>

                {/* KPIs - Grille 2x2 */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-600/70 mb-1">{lang === 'fr' ? 'Recherche' : 'Target'}</p>
                    <p className="text-lg font-black text-emerald-700">{selectedStartup.kpis.amount}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">{lang === 'fr' ? 'Valorisation' : 'Valuation'}</p>
                    <p className="text-lg font-black text-slate-900">{selectedStartup.kpis.valuation}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">{lang === 'fr' ? 'Stade' : 'Stage'}</p>
                    <p className="text-lg font-black text-slate-900">{selectedStartup.kpis.stage}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">{lang === 'fr' ? 'Ticket min.' : 'Min. Ticket'}</p>
                    <p className="text-lg font-black text-slate-900">{selectedStartup.minTicket}</p>
                  </div>
                </div>

                {/* CEO / À propos */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={selectedStartup.ceo.photo} 
                      alt={selectedStartup.ceo.name} 
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md" 
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{selectedStartup.ceo.name}</p>
                      <p className="text-xs text-slate-500">{selectedStartup.ceo.role[lang] || selectedStartup.ceo.role.fr}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedStartup.ceo.bio[lang] || selectedStartup.ceo.bio.fr}
                  </p>
                </div>
              </div>

              {/* Actions B2B - Sticky en bas */}
              <div className="p-4 border-t border-slate-200 bg-white shrink-0">
                {/* Action principale */}
                <button className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 mb-3">
                  <FolderLock size={18} />
                  {lang === 'fr' ? 'Demander accès Data Room' : 'Request Data Room Access'}
                </button>
                
                {/* Actions secondaires B2B */}
                <div className="grid grid-cols-3 gap-2">
                  <button className="flex flex-col items-center gap-1.5 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors group">
                    <Bookmark size={18} className="text-slate-400 group-hover:text-emerald-600" />
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-700">{lang === 'fr' ? 'Watchlist' : 'Watchlist'}</span>
                  </button>
                  <button className="flex flex-col items-center gap-1.5 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors group">
                    <UserPlus size={18} className="text-slate-400 group-hover:text-blue-600" />
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-700">{lang === 'fr' ? 'Demander Intro' : 'Request Intro'}</span>
                  </button>
                  <button className="flex flex-col items-center gap-1.5 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors group">
                    <Send size={18} className="text-slate-400 group-hover:text-purple-600" />
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-700">{lang === 'fr' ? 'Envoyer' : 'Share'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Petits composants internes pour alléger le code
const MenuItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${active ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200/30' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} />
      <span className="text-xs font-bold">{label}</span>
    </div>
    {badge && <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[9px] font-bold rounded">{badge}</span>}
  </button>
);

const KpiCard = ({ label, value, trend, active }) => (
  <div className={`p-4 lg:p-6 rounded-xl lg:rounded-2xl border ${active ? 'bg-slate-900 border-slate-900 text-white ring-2 lg:ring-4 ring-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
    <p className={`text-[9px] lg:text-[10px] font-bold uppercase tracking-widest mb-1 lg:mb-2 ${active ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
    <div className="flex items-end justify-between gap-2">
      <p className="text-2xl lg:text-3xl font-black">{value}</p>
      {trend && <span className="text-[10px] lg:text-xs font-bold text-emerald-500 bg-emerald-50 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded">{trend}</span>}
    </div>
  </div>
);

const SidePanelKpiCard = ({ icon: Icon, label, value, color }) => {
  const colors = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
  };
  
  return (
    <div className={`p-4 rounded-xl border ${colors[color]} bg-white`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className={colors[color].split(' ')[1]} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
      </div>
      <p className="text-lg font-black text-slate-900">{value}</p>
    </div>
  );
};

export default InvestorDashboard;