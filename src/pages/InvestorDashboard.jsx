import React, { useState } from 'react';
import { 
  LayoutDashboard, List, Settings, Bell, Search, 
  Filter, Play, ChevronRight, Lock, Eye, CheckCircle, Menu, X,
  Save, MapPin, Linkedin, User, Building2, Upload, Mail, Phone,
  Globe, ShieldCheck, Grid, MoreHorizontal
} from 'lucide-react';
import { startups } from '../data/startups';
import translations from '../data/translations';

const InvestorDashboard = ({ lang = 'fr' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('feed'); // 'feed', 'list', 'profile'
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Données du profil investisseur
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

  // Filtrage des startups pour la liste et le feed
  const filteredStartups = startups.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof s.kpis.sector === 'string' && s.kpis.sector.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof s.kpis.sector === 'object' && s.kpis.sector.fr.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* SIDEBAR */}
      <aside className={`w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
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
            <span className="text-xs font-bold">Deal Flow (Feed)</span>
          </button>

          <button 
            onClick={() => setActiveTab('list')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'list' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <List size={18} />
            <span className="text-xs font-bold">Liste Startups</span>
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
        
        {/* Header */}
        <header className="h-16 lg:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3 flex-1">
            <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} className="text-slate-600" />
            </button>
            <div className="flex items-center gap-4 w-full">
              <h1 className="text-xl font-black text-slate-900 whitespace-nowrap hidden md:block">
                {activeTab === 'feed' ? 'Deal Flow' : activeTab === 'list' ? 'Annuaire' : 'Mon Profil'}
              </h1>
              
              {/* Search Bar - Visible only on Feed and List tabs */}
              {activeTab !== 'profile' && (
                <div className="flex items-center gap-4 text-slate-400 bg-slate-100 px-3 lg:px-4 py-2 rounded-xl w-full max-w-md ml-4">
                  <Search size={18} className="shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Rechercher une startup, un secteur..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm font-medium w-full focus:outline-none text-slate-900 placeholder:text-slate-400" 
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 lg:gap-4 pl-4">
             <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors relative">
               <Bell size={20}/>
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
             </button>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-[1600px] mx-auto">
          
          {/* =======================
              ONGLET 1: FEED (VISUAL DEAL FLOW)
             ======================= */}
          {activeTab === 'feed' && (
            <div className="animate-fadeIn space-y-8">
              {/* KPIs Rapides */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Nouveaux Deals</p>
                    <p className="text-2xl font-black">12</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Matching</p>
                    <p className="text-2xl font-black text-emerald-600">85%</p>
                </div>
              </div>

              {/* Grille de Cartes */}
              <div>
                <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                    <Grid size={20} /> Récemment ajoutés
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredStartups.map((startup) => (
                        <div 
                            key={startup.id} 
                            onClick={() => setSelectedStartup(startup)}
                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                        >
                            {/* Image / Thumbnail Zone */}
                            <div className="relative h-48 bg-slate-900 overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/50">
                                        <Play size={20} fill="currentColor" />
                                    </div>
                                </div>
                                <img src={startup.poster || startup.ceo.photo} alt={startup.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 left-3 z-10">
                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                                      startup.color === 'emerald' ? 'bg-emerald-500 text-white' : 
                                      startup.color === 'purple' ? 'bg-purple-500 text-white' : 
                                      'bg-orange-500 text-white'
                                    }`}>
                                      {typeof startup.kpis.sector === 'object' ? startup.kpis.sector.fr : startup.kpis.sector}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg">{startup.name}</h3>
                                        <p className="text-xs text-slate-500 line-clamp-1">{startup.vision.fr || startup.vision}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Valuation</p>
                                        <p className="font-black text-slate-900">{startup.kpis.valuation}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                                    <img src={startup.ceo.photo} alt={startup.ceo.name} className="w-8 h-8 rounded-full object-cover" />
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-slate-900">{startup.ceo.name}</p>
                                        <p className="text-[10px] text-slate-500">{startup.ceo.role.fr || startup.ceo.role}</p>
                                    </div>
                                    <button className="p-2 bg-slate-50 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* =======================
              ONGLET 2: LISTE (TABLEAU)
             ======================= */}
          {activeTab === 'list' && (
            <div className="animate-fadeIn space-y-6">
              
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
              ONGLET 3: ÉDITION PROFIL (ÉPURÉ)
             ======================= */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="animate-fadeIn space-y-6">
              
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-24 z-10">
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

      {/* SIDE PANEL (Desktop uniquement) - Accessible depuis le Feed ou la Liste */}
      {selectedStartup && (activeTab === 'feed' || activeTab === 'list') && (
        <div 
          className="hidden lg:block fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
          onClick={() => setSelectedStartup(null)}
        >
             <div 
                className="fixed inset-y-0 right-0 w-[800px] xl:w-[900px] bg-slate-100 shadow-2xl z-50 flex h-full animate-slideInRight"
                onClick={(e) => e.stopPropagation()}
            >
                 <div className="relative bg-black w-[320px] shrink-0 flex items-center justify-center">
                    <video 
                        className="w-full h-full object-cover" 
                        src={selectedStartup.video} 
                        poster={selectedStartup.poster}
                        controls 
                        autoPlay 
                    />
                 </div>
                 <div className="flex-1 bg-white p-6 overflow-y-auto">
                    <button onClick={() => setSelectedStartup(null)} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20}/></button>
                    
                    <div className="mt-8">
                        <div className="flex items-center gap-2 mb-2">
                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                                      selectedStartup.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 
                                      selectedStartup.color === 'purple' ? 'bg-purple-100 text-purple-700' : 
                                      'bg-orange-100 text-orange-700'
                                    }`}>
                                      {typeof selectedStartup.kpis.sector === 'object' ? selectedStartup.kpis.sector.fr : selectedStartup.kpis.sector}
                             </span>
                        </div>
                        <h2 className="text-3xl font-black mb-2 text-slate-900">{selectedStartup.name}</h2>
                        <p className="text-lg font-medium text-slate-500 mb-6">{selectedStartup.pitch[lang] || selectedStartup.pitch.fr}</p>
                        
                        {/* KPIs Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <p className="text-xs font-bold uppercase text-slate-400 mb-1">Valuation</p>
                                <p className="text-xl font-black text-slate-900">{selectedStartup.kpis.valuation}</p>
                            </div>
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                <p className="text-xs font-bold uppercase text-emerald-600 mb-1">Recherche</p>
                                <p className="text-xl font-black text-emerald-700">{selectedStartup.kpis.amount}</p>
                            </div>
                        </div>

                        <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-slate-800 transition-colors">
                            Entrer en contact
                        </button>
                    </div>
                 </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default InvestorDashboard;
