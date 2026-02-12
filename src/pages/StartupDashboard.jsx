import React, { useState } from 'react';
import { 
  LayoutDashboard, BarChart3, FileText, Settings, Bell, 
  Eye, Users, Clock, Heart, Share2, Upload, 
  Image as ImageIcon, Video, FileBarChart, Save, 
  Menu, X, TrendingUp, CheckCircle, MoreHorizontal, ChevronRight, DollarSign
} from 'lucide-react';
import translations from '../data/translations';

const StartupDashboard = ({ lang = 'fr' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('performance'); // 'performance' ou 'edit'
  
  // États simulés pour l'édition
  const [formData, setFormData] = useState({
    name: "ZenSpace",
    tagline: "Le bien-être au travail réinventé par l'IA",
    description: "ZenSpace utilise l'intelligence artificielle pour créer des environnements sonores adaptatifs qui réduisent le stress et augmentent la productivité des employés.",
    fundingGoal: "500,000",
    valuation: "2,500,000",
    videoName: "pitch_vfinal_2024.mp4",
    reportName: "financials_q3.pdf"
  });

  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profil mis à jour avec succès ! (Simulation)");
  };

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
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 relative overflow-hidden">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l6-6 4 4 8-8" />
                <path d="M17 7h4v4" />
              </svg>
            </div>
            <span className="text-lg font-black tracking-tight uppercase">Invest<span className="text-emerald-500">o</span></span>
          </div>
          <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg" onClick={() => setSidebarOpen(false)}>
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 mt-4">Tableau de bord</div>
          
          <button 
            onClick={() => setActiveTab('performance')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'performance' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <BarChart3 size={18} />
            <span className="text-xs font-bold">Vue d'ensemble</span>
          </button>

          <button 
            onClick={() => setActiveTab('edit')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'edit' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Settings size={18} />
            <span className="text-xs font-bold">Éditer le profil</span>
          </button>

          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 mt-8">Notifications</div>
          <button className="w-full flex items-center justify-between p-3 rounded-xl text-slate-500 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Bell size={18} />
              <span className="text-xs font-bold">Alertes</span>
            </div>
            <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[9px] font-bold rounded-full">3</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="CEO" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">Clara Dubuis</p>
              <p className="text-[10px] text-slate-500 truncate">ZenSpace CEO</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-64 bg-slate-100/50">
        
        {/* Header */}
        <header className="h-16 lg:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} className="text-slate-600" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900">
                {activeTab === 'performance' ? 'Dashboard' : 'Gestion du Profil'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold text-slate-500">En ligne</span>
             </div>
             <button className="bg-slate-900 text-white p-2 rounded-lg relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-slate-900"></span>
             </button>
          </div>
        </header>

        <div className="p-4 lg:p-6 max-w-[1600px] mx-auto">
          
          {/* =======================
              ONGLET 1: VUE D'ENSEMBLE (DASHBOARD)
             ======================= */}
          {activeTab === 'performance' && (
            <div className="flex flex-col xl:flex-row gap-6 animate-fadeIn">
              
              {/* COLONNE GAUCHE (GRAPHIQUES + TABLEAU) */}
              <div className="flex-1 space-y-6">
                
                {/* LIGNE 1 : GRAPHIQUES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Graphique Performance */}
                  <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                     {/* Background Glow */}
                     <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                     
                     <div className="flex justify-between items-start mb-6 relative z-10">
                        <div>
                           <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Performance Charts</p>
                           <h3 className="text-2xl font-black flex items-center gap-2">
                              $5,400 <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">+18.77%</span>
                           </h3>
                        </div>
                        <div className="flex gap-2">
                           <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                           <span className="text-[10px] text-slate-400 font-bold">Mois</span>
                        </div>
                     </div>
                     
                     {/* Courbe Simulé (SVG) */}
                     <div className="h-40 w-full relative z-10">
                        <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
                           <path d="M0,80 C50,80 50,40 100,40 C150,40 150,60 200,60 C250,60 250,20 300,10" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" className="drop-shadow-lg" />
                           <path d="M0,80 C50,80 50,40 100,40 C150,40 150,60 200,60 C250,60 250,20 300,10 V100 H0 Z" fill="url(#gradient)" opacity="0.2" />
                           <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                 <stop offset="0%" stopColor="#10b981" />
                                 <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                              </linearGradient>
                           </defs>
                        </svg>
                        <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-500 uppercase">
                           <span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Juin</span>
                        </div>
                     </div>
                  </div>

                  {/* Graphique Engagement/Compliance */}
                  <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                     <div className="flex justify-between items-start mb-6">
                        <div>
                           <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Engagement</p>
                           <h3 className="text-2xl font-black flex items-center gap-2">
                              84.5% <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">+13%</span>
                           </h3>
                        </div>
                        <div className="flex gap-2">
                           <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                           <span className="text-[10px] text-slate-400 font-bold">Actif</span>
                        </div>
                     </div>
                     
                     {/* Bar Chart Simulé */}
                     <div className="h-40 flex items-end justify-between gap-3 px-2">
                        {[40, 65, 30, 80, 55, 90, 45, 70].map((h, i) => (
                           <div key={i} className="w-full bg-slate-800 rounded-t-md relative group h-full flex flex-col justify-end">
                              <div style={{height: `${h}%`}} className="w-full bg-emerald-500 rounded-t-md transition-all group-hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]"></div>
                           </div>
                        ))}
                     </div>
                     <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-500 uppercase">
                        <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
                     </div>
                  </div>
                </div>

                {/* LISTE INVESTISSEURS */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                     <h3 className="font-bold text-slate-900">Liste des Investisseurs</h3>
                     <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700">Voir tout</button>
                  </div>
                  <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              <th className="p-4 pl-6">Nom</th>
                              <th className="p-4">Offre</th>
                              <th className="p-4">Ticket</th>
                              <th className="p-4">Intérêt</th>
                              <th className="p-4 text-right pr-6">Action</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                           <InvestorRow name="David Monson" img="https://i.pravatar.cc/150?u=1" offer="$3,500,000" ticket="$250,000" growth="+13.5%" />
                           <InvestorRow name="John Maren" img="https://i.pravatar.cc/150?u=2" offer="$3,200,000" ticket="$250,000" growth="+11.2%" />
                           <InvestorRow name="Joe Danelli" img="https://i.pravatar.cc/150?u=3" offer="$2,000,000" ticket="$250,000" growth="+11.75%" />
                           <InvestorRow name="Kahley Jorkan" img="https://i.pravatar.cc/150?u=4" offer="$2,000,000" ticket="$300,000" growth="+17.0%" />
                           <InvestorRow name="Mike Torson" img="https://i.pravatar.cc/150?u=5" offer="$1,800,000" ticket="$150,000" growth="+9.4%" />
                        </tbody>
                     </table>
                  </div>
                </div>
              </div>

              {/* COLONNE DROITE (PROFIL WIDGET) */}
              <div className="w-full xl:w-80 shrink-0 space-y-6">
                 
                 {/* Profil Card */}
                 <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 shadow-xl text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-emerald-900/50 to-transparent"></div>
                    
                    <div className="relative z-10 mb-4">
                       <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" alt="Profile" className="w-20 h-20 rounded-full mx-auto border-4 border-slate-800 object-cover shadow-lg" />
                       <h3 className="text-white font-bold text-lg mt-3">Clara Dubuis</h3>
                       <p className="text-xs font-medium text-slate-400">ZenSpace CEO</p>
                    </div>

                    <div className="space-y-4 text-sm">
                       <div className="flex justify-between items-center py-2 border-b border-slate-800">
                          <span className="text-slate-500">Profile status</span>
                          <span className="text-white font-bold">Vérifié</span>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-800">
                          <span className="text-slate-500">Inscription</span>
                          <span className="text-white font-bold">Mai 26, 2024</span>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-800">
                          <span className="text-slate-500">Opportunités</span>
                          <span className="text-emerald-400 font-bold">$50.00</span>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-800">
                          <span className="text-slate-500">Vues totales</span>
                          <span className="text-white font-bold">49</span>
                       </div>
                       <div className="flex justify-between items-center py-2">
                          <span className="text-slate-500">Investisseurs</span>
                          <span className="text-white font-bold">34</span>
                       </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800">
                       <button className="w-full flex justify-between items-center text-xs font-bold text-slate-400 hover:text-white transition-colors">
                          <span>Paramètres avancés</span>
                          <ChevronRight size={14} />
                       </button>
                    </div>
                 </div>

                 {/* Autre Widget (ex: Événements ou Paiements) */}
                 <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Derniers événements</h4>
                    <div className="space-y-4">
                       <div className="flex gap-3 items-start">
                          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs shrink-0">12</div>
                          <div>
                             <p className="text-xs font-bold text-slate-900">Pitch Session Live</p>
                             <p className="text-[10px] text-slate-500">Demain à 14:00</p>
                          </div>
                       </div>
                       <div className="flex gap-3 items-start">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">15</div>
                          <div>
                             <p className="text-xs font-bold text-slate-900">Appel Investisseur</p>
                             <p className="text-[10px] text-slate-500">15 Mars à 10:30</p>
                          </div>
                       </div>
                    </div>
                 </div>

              </div>

            </div>
          )}

          {/* =======================
              ONGLET 2: ÉDITION
             ======================= */}
          {activeTab === 'edit' && (
            <form onSubmit={handleSave} className="space-y-6 animate-fadeIn">
              
              {/* Header Actions */}
              <div className="flex justify-end sticky top-20 z-10 pointer-events-none">
                 <button type="submit" className="pointer-events-auto bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-xl shadow-emerald-600/30 font-bold flex items-center gap-2 hover:bg-emerald-700 transition-transform active:scale-95">
                   <Save size={18} /> Enregistrer les modifications
                 </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 -mt-12">
                
                {/* COLONNE GAUCHE : Identité */}
                <div className="space-y-6">
                  {/* Photo de profil */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <div className="relative inline-block mb-4 group cursor-pointer">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" alt="Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 group-hover:border-emerald-100 transition-colors" />
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ImageIcon className="text-white" />
                      </div>
                      <button type="button" className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full border-4 border-white">
                        <Upload size={14} />
                      </button>
                    </div>
                    <h3 className="font-bold text-slate-900">Photo de profil</h3>
                    <p className="text-xs text-slate-500 mt-1">Recommandé: 400x400px</p>
                  </div>

                  {/* Infos Financières */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <TrendingUp size={18} className="text-emerald-600"/> Levée de fonds
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Objectif (€)</label>
                        <input 
                          type="text" 
                          value={formData.fundingGoal}
                          onChange={(e) => setFormData({...formData, fundingGoal: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Valorisation (€)</label>
                        <input 
                          type="text" 
                          value={formData.valuation}
                          onChange={(e) => setFormData({...formData, valuation: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* COLONNE DROITE : Contenu Principal */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Informations Générales */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6">Informations Générales</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nom de la Startup</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phrase d'accroche (Tagline)</label>
                        <input 
                          type="text" 
                          value={formData.tagline}
                          onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description Complète</label>
                        <textarea 
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none resize-none" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Zone Médias (Vidéo & Rapport) */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Upload Vidéo */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2"><Video size={18} /> Pitch Vidéo</h3>
                        <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle size={10} /> En ligne</span>
                      </div>
                      <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-slate-400 group-hover:text-slate-900">
                          <Upload size={20} />
                        </div>
                        <p className="text-sm font-bold text-slate-900">Remplacer la vidéo</p>
                        <p className="text-xs text-slate-400 mt-1">MP4, MOV (max 500Mo)</p>
                      </div>
                      {formData.videoName && (
                        <div className="mt-4 flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white"><Video size={14}/></div>
                          <span className="text-xs font-bold text-slate-700 truncate flex-1">{formData.videoName}</span>
                          <button type="button" className="text-slate-400 hover:text-red-500"><X size={16}/></button>
                        </div>
                      )}
                    </div>

                    {/* Upload Rapport */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2"><FileBarChart size={18} /> Rapport / Deck</h3>
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">PDF requis</span>
                      </div>
                      <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-slate-400 group-hover:text-slate-900">
                          <Upload size={20} />
                        </div>
                        <p className="text-sm font-bold text-slate-900">Publier un rapport</p>
                        <p className="text-xs text-slate-400 mt-1">PDF uniquement</p>
                      </div>
                      {formData.reportName && (
                        <div className="mt-4 flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center text-red-600"><FileText size={14}/></div>
                          <span className="text-xs font-bold text-slate-700 truncate flex-1">{formData.reportName}</span>
                          <button type="button" className="text-slate-400 hover:text-red-500"><X size={16}/></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

        </div>
      </main>
    </div>
  );
};

// Composants UI Internes
const InvestorRow = ({ name, img, offer, ticket, growth }) => (
  <tr className="hover:bg-slate-50/80 transition-colors group cursor-pointer border-b border-slate-50 last:border-0">
    <td className="p-4 pl-6">
      <div className="flex items-center gap-3">
        <img src={img} alt="" className="w-9 h-9 rounded-full object-cover border border-slate-200" />
        <span className="text-sm font-bold text-slate-900">{name}</span>
      </div>
    </td>
    <td className="p-4 text-sm font-bold text-slate-600">{offer}</td>
    <td className="p-4 text-sm font-medium text-slate-500">{ticket}</td>
    <td className="p-4">
       <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{growth}</span>
    </td>
    <td className="p-4 pr-6 text-right">
       <button className="text-slate-400 hover:text-emerald-600 p-2 hover:bg-emerald-50 rounded-lg transition-colors border border-slate-200">
          <span className="text-xs font-bold px-2">Voir</span>
       </button>
    </td>
  </tr>
);

export default StartupDashboard;
