import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, List, Settings, Bell, Search, 
  Filter, Play, ChevronRight, Lock, Eye, CheckCircle, Menu, X,
  Save, MapPin, Linkedin, User, Building2, Upload, Mail, Phone,
  Globe, ShieldCheck, Grid, MoreHorizontal, TrendingUp, DollarSign,
  PieChart, Download, Heart, Star, Bookmark, Briefcase, Share2, MessageCircle,
  Volume2, VolumeX, Pause
} from 'lucide-react';
import { startups } from '../data/startups';
import translations from '../data/translations';

const InvestorDashboard = ({ lang = 'fr' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('feed'); // 'feed', 'list', 'profile'
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // États pour le Feed TikTok
  const [isMuted, setIsMuted] = useState(true);
  const [playingId, setPlayingId] = useState(null);

  // Données du profil investisseur (inchangées)
  const [profileData, setProfileData] = useState({
    name: 'Jean Dupont',
    company: 'Family Office Dupont',
    role: 'Managing Partner',
    location: 'Genève, Suisse',
    linkedin: 'linkedin.com/in/jeandupont',
    website: 'www.dupont-invest.com',
    bio: 'Investisseur expérimenté spécialisé dans les technologies durables, la santé et l\'IA. Nous accompagnons les startups en phase Seed et Series A.',
    email: 'jean.dupont@example.com',
    phone: '+41 22 123 45 67'
  });

  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profil mis à jour !");
  };

  // Filtrage des startups
  const filteredStartups = startups.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof s.kpis.sector === 'string' && s.kpis.sector.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof s.kpis.sector === 'object' && s.kpis.sector.fr.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-screen bg-slate-50 flex font-sans text-slate-900 overflow-hidden">
      
      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* SIDEBAR */}
      <aside className={`w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20 relative overflow-hidden">
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
          
          <button 
            onClick={() => setActiveTab('feed')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'feed' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <LayoutDashboard size={18} />
            <span className="text-xs font-bold">Deal Flow (Live)</span>
          </button>

          <button 
            onClick={() => setActiveTab('list')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'list' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <List size={18} />
            <span className="text-xs font-bold">Annuaire Startups</span>
          </button>

          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 mt-8">Mon Compte</div>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Settings size={18} />
            <span className="text-xs font-bold">Mon Profil</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 shrink-0">
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
      <main className="flex-1 lg:ml-64 flex flex-col h-full overflow-hidden">
        
        {/* Header (Caché ou transparent sur le Feed pour immersion ?) - On le garde pour la navigation */}
        <header className={`h-16 lg:h-20 border-b flex items-center justify-between px-4 lg:px-8 shrink-0 z-20 transition-all ${activeTab === 'feed' ? 'bg-black border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
          <div className="flex items-center gap-3 flex-1">
            <button className="lg:hidden p-2 hover:bg-white/10 rounded-lg" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} className={activeTab === 'feed' ? "text-white" : "text-slate-600"} />
            </button>
            <div className="flex items-center gap-4 w-full">
              <h1 className="text-xl font-black whitespace-nowrap hidden md:block">
                {activeTab === 'feed' ? 'Live Opportunities' : activeTab === 'list' ? 'Annuaire' : 'Mon Profil'}
              </h1>
              
              {/* Search Bar */}
              {activeTab === 'list' && (
                <div className="flex items-center gap-4 text-slate-400 bg-slate-100 px-3 lg:px-4 py-2 rounded-xl w-full max-w-md ml-4 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                  <Search size={18} className="shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm font-medium w-full focus:outline-none text-slate-900 placeholder:text-slate-400" 
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 lg:gap-4 pl-4">
             {activeTab === 'feed' && (
                 <button onClick={() => setIsMuted(!isMuted)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                 </button>
             )}
             <button className="p-2 hover:text-emerald-500 transition-colors relative">
               <Bell size={20}/>
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white/20"></span>
             </button>
          </div>
        </header>

        <div className={`flex-1 overflow-hidden relative ${activeTab === 'feed' ? 'bg-black' : 'overflow-y-auto p-4 lg:p-8'}`}>
          
          {/* =======================
              ONGLET 1: FEED TIKTOK STYLE
             ======================= */}
          {activeTab === 'feed' && (
            <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
              {filteredStartups.map((startup, index) => (
                <div key={startup.id} className="h-full w-full snap-start relative flex items-center justify-center bg-slate-900">
                    
                    {/* VIDEO BACKGROUND */}
                    <div className="absolute inset-0">
                        <video 
                            src={startup.video} 
                            poster={startup.poster}
                            className="h-full w-full object-cover opacity-90"
                            loop
                            muted={isMuted}
                            autoPlay={true} // Dans une vraie app, gérer avec IntersectionObserver
                            playsInline
                        />
                        {/* Gradient Overlay pour lisibilité */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                    </div>

                    {/* INTERFACE OVERLAY */}
                    <div className="absolute inset-0 p-4 lg:p-8 flex flex-col justify-between z-10">
                        
                        {/* Top: Badges & Match */}
                        <div className="flex justify-between items-start mt-4">
                            <div className="flex flex-col gap-2">
                                <span className={`self-start px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md ${
                                    startup.color === 'emerald' ? 'bg-emerald-600/80' : 
                                    startup.color === 'purple' ? 'bg-purple-600/80' : 
                                    'bg-orange-600/80'
                                }`}>
                                    {typeof startup.kpis.sector === 'object' ? startup.kpis.sector.fr : startup.kpis.sector}
                                </span>
                                <span className="self-start px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white backdrop-blur-md border border-white/20">
                                    {startup.kpis.stage}
                                </span>
                            </div>
                            
                            {/* Match Score */}
                            <div className="flex flex-col items-center gap-1 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10">
                                <div className="radial-progress text-emerald-500 text-[10px] font-bold" style={{"--value": 98 - index * 3, "--size": "2.5rem"}}>
                                    {98 - index * 3}%
                                </div>
                                <span className="text-[9px] font-bold uppercase text-white/80 tracking-widest">Match</span>
                            </div>
                        </div>

                        {/* Right Sidebar: Actions */}
                        <div className="absolute right-4 bottom-28 lg:bottom-40 flex flex-col gap-6 items-center">
                            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-all">
                                    <div className="relative">
                                        <img src={startup.ceo.photo} className="w-10 h-10 rounded-full object-cover border-2 border-white" alt="CEO" />
                                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5"><CheckCircle size={10} className="text-white" /></div>
                                    </div>
                                </div>
                            </div>

                            <button className="flex flex-col items-center gap-1 group">
                                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform group-hover:bg-rose-500/80 group-hover:border-rose-500">
                                    <Heart size={24} className="text-white group-hover:fill-white" />
                                </div>
                                <span className="text-xs font-bold text-white shadow-black drop-shadow-md">Like</span>
                            </button>

                            <button className="flex flex-col items-center gap-1 group">
                                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform group-hover:bg-emerald-500/80">
                                    <MessageCircle size={24} className="text-white" />
                                </div>
                                <span className="text-xs font-bold text-white shadow-black drop-shadow-md">Contact</span>
                            </button>

                            <button className="flex flex-col items-center gap-1 group">
                                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                    <Share2 size={24} className="text-white" />
                                </div>
                                <span className="text-xs font-bold text-white shadow-black drop-shadow-md">Share</span>
                            </button>

                            <button onClick={() => setSelectedStartup(startup)} className="flex flex-col items-center gap-1 group">
                                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                    <MoreHorizontal size={24} className="text-white" />
                                </div>
                            </button>
                        </div>

                        {/* Bottom: Info Panel Rich */}
                        <div className="max-w-3xl pr-20 pb-4 lg:pb-0">
                            <h2 className="text-3xl lg:text-5xl font-black text-white mb-2 drop-shadow-lg">{startup.name}</h2>
                            <p className="text-sm lg:text-lg font-medium text-white/90 line-clamp-2 mb-6 max-w-2xl drop-shadow-md">
                                {startup.vision.fr || startup.vision}
                            </p>

                            {/* Data Bar (Glassmorphism) */}
                            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 lg:p-5">
                                {/* Progress Bar */}
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Soft Circle Sécurisé</span>
                                    <span className="text-sm font-black text-white">{(65 + index * 5)}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-6">
                                     <div 
                                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                                        style={{ width: `${65 + index * 5}%` }}
                                     ></div>
                                </div>

                                {/* KPIs & CTA Grid */}
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="grid grid-cols-3 gap-6 flex-1 w-full border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                                        <div>
                                            <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Valuation</p>
                                            <p className="text-lg font-black text-white">{startup.kpis.valuation}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Objectif</p>
                                            <p className="text-lg font-black text-emerald-400">{startup.kpis.amount}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Min. Ticket</p>
                                            <p className="text-lg font-black text-white">{startup.minTicket}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-3 w-full md:w-auto">
                                        <button className="flex-1 md:flex-initial px-6 py-3 bg-white hover:bg-emerald-50 text-slate-900 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
                                            <Eye size={16} /> Détails
                                        </button>
                                        <button className="flex-1 md:flex-initial px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black uppercase tracking-wider text-sm transition-all shadow-lg shadow-emerald-600/30">
                                            Investir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
              ))}
            </div>
          )}

          {/* =======================
              ONGLET 2: LISTE (TABLEAU) - INCHANGÉ
             ======================= */}
          {activeTab === 'list' && (
            <div className="animate-fadeIn max-w-[1600px] mx-auto space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-black text-slate-900">Annuaire Complet</h2>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
                        <Filter size={16} /> Filtres avancés
                    </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-widest text-slate-500">
                        <th className="p-5 font-bold text-left">Startup</th>
                        <th className="p-5 font-bold text-left">Secteur</th>
                        <th className="p-5 font-bold text-left">Stade</th>
                        <th className="p-5 font-bold text-right">Valuation</th>
                        <th className="p-5 font-bold text-right">Recherche</th>
                        <th className="p-5 font-bold text-center">Status</th>
                        <th className="p-5 font-bold text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStartups.map((startup) => (
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
                              <Lock size={10} /> Data Room
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
              </div>
            </div>
          )}

          {/* =======================
              ONGLET 3: PROFIL - INCHANGÉ
             ======================= */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="animate-fadeIn max-w-[1600px] mx-auto space-y-6">
              
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-0 z-10">
                 <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                    <ShieldCheck size={18} className="text-emerald-500" />
                    <span>Compte vérifié</span>
                 </div>
                 <button type="submit" className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg shadow-lg shadow-emerald-600/30 font-bold flex items-center gap-2 hover:bg-emerald-700 transition-transform active:scale-95 text-sm">
                   <Save size={16} /> Enregistrer
                 </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* COLONNE GAUCHE : Identité */}
                <div className="space-y-6">
                  {/* Photo de profil */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                    <div className="relative inline-block mb-4 group cursor-pointer">
                      <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-3xl border-4 border-slate-50 group-hover:border-emerald-200 transition-colors">
                        JD
                      </div>
                      <button type="button" className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full border-4 border-white hover:bg-emerald-600 transition-colors">
                        <Upload size={14} />
                      </button>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">{profileData.name}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">{profileData.company}</p>
                  </div>

                  {/* Coordonnées */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Contact Privé</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1.5">
                            <Mail size={12} /> Email
                        </label>
                        <input 
                          type="email" 
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1.5">
                            <Phone size={12} /> Téléphone
                        </label>
                        <input 
                          type="tel" 
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* COLONNE DROITE : Informations Publiques */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Informations Générales */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <User size={18} className="text-emerald-600" /> Informations Personnelles
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nom Complet</label>
                        <input 
                          type="text" 
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Rôle / Titre</label>
                        <input 
                          type="text" 
                          value={profileData.role}
                          onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" 
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Bio / Thèse d'investissement</label>
                        <textarea 
                          rows={4}
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none resize-none" 
                        />
                    </div>
                  </div>

                  {/* Organisation & Liens */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Building2 size={18} className="text-emerald-600" /> Organisation & Réseaux
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nom de l'entreprise / Fonds</label>
                            <div className="relative">
                                <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                type="text" 
                                value={profileData.company}
                                onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Localisation</label>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                type="text" 
                                value={profileData.location}
                                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">LinkedIn URL</label>
                                <div className="relative">
                                    <Linkedin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" />
                                    <input 
                                    type="text" 
                                    value={profileData.linkedin}
                                    onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" 
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Site Web</label>
                                <div className="relative">
                                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                    type="text" 
                                    value={profileData.website}
                                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

        </div>
      </main>

      {/* SIDE PANEL (Pour détails "extra" depuis la liste ou autre) */}
      {selectedStartup && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedStartup(null)}
        >
             <div 
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                 <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <img src={selectedStartup.ceo.photo} className="w-16 h-16 rounded-2xl object-cover shadow-md" alt="" />
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">{selectedStartup.name}</h2>
                                <p className="text-slate-500 font-medium">{selectedStartup.vision.fr || selectedStartup.vision}</p>
                            </div>
                        </div>
                        <button onClick={() => setSelectedStartup(null)} className="p-2 hover:bg-slate-100 rounded-full"><X size={24} /></button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                         <div className="aspect-video bg-black rounded-xl overflow-hidden relative">
                             <video src={selectedStartup.video} controls className="w-full h-full object-cover" />
                         </div>
                         <div className="space-y-4">
                             <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                 <h4 className="text-xs font-bold uppercase text-emerald-600 mb-2">Pourquoi investir ?</h4>
                                 <p className="text-sm text-slate-700 leading-relaxed">{selectedStartup.pitch[lang] || selectedStartup.pitch.fr}</p>
                             </div>
                             <div className="grid grid-cols-2 gap-3">
                                 <div className="p-3 bg-slate-50 rounded-lg text-center">
                                     <p className="text-[10px] font-bold uppercase text-slate-400">Valuation</p>
                                     <p className="text-lg font-black text-slate-900">{selectedStartup.kpis.valuation}</p>
                                 </div>
                                 <div className="p-3 bg-slate-50 rounded-lg text-center">
                                     <p className="text-[10px] font-bold uppercase text-slate-400">Objectif</p>
                                     <p className="text-lg font-black text-emerald-600">{selectedStartup.kpis.amount}</p>
                                 </div>
                             </div>
                         </div>
                    </div>
                    
                    <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors">
                        Accéder à la Data Room
                    </button>
                 </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default InvestorDashboard;
