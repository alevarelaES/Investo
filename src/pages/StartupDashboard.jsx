import React, { useState } from 'react';
import { 
  LayoutDashboard, BarChart3, FileText, Settings, Bell, 
  Eye, Users, Clock, Heart, Share2, Upload, 
  Image as ImageIcon, Video, FileBarChart, Save, 
  Menu, X, TrendingUp, CheckCircle, AlertCircle
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
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 mt-4">Tableau de bord V2</div>
          
          <button 
            onClick={() => setActiveTab('performance')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'performance' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <BarChart3 size={18} />
            <span className="text-xs font-bold">Performance</span>
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
      <main className="flex-1 lg:ml-64">
        
        {/* Header */}
        <header className="h-16 lg:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} className="text-slate-600" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900">
                {activeTab === 'performance' ? 'Vue d\'ensemble' : 'Gestion du Profil'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors">
              <Eye size={16} /> Voir mon profil public
            </a>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-colors">
              Exporter
            </button>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-6xl mx-auto">
          
          {/* =======================
              ONGLET 1: PERFORMANCE
             ======================= */}
          {activeTab === 'performance' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* KPIs Principaux */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                  icon={Eye} label="Vues Totales" value="3,420" trend="+18%" 
                  color="blue" 
                />
                <StatCard 
                  icon={Clock} label="Durée Moyenne" value="1m 08s" sub="Vidéo de 1m 30s" 
                  color="orange" 
                />
                <StatCard 
                  icon={Heart} label="Likes & Intérêts" value="156" trend="+24%" 
                  color="rose" 
                />
                <StatCard 
                  icon={FileText} label="Data Room" value="42" sub="Accès demandés" 
                  color="emerald" 
                />
              </div>

              {/* Graphique Principal */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Engagement Visuel</h3>
                    <p className="text-sm text-slate-500">Performance de votre pitch vidéo sur 7 jours</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      <TrendingUp size={12} /> Tendance haussière
                    </span>
                  </div>
                </div>
                
                {/* Simulation de Graphique à Barres */}
                <div className="h-64 flex items-end justify-between gap-4 px-2">
                  {[45, 60, 35, 75, 50, 95, 80].map((h, i) => (
                    <div key={i} className="w-full flex flex-col justify-end group cursor-pointer">
                      <div className="relative w-full bg-slate-100 rounded-t-xl overflow-hidden h-full">
                         <div 
                           style={{height: `${h}%`}} 
                           className="absolute bottom-0 w-full bg-slate-900 transition-all duration-500 group-hover:bg-emerald-500"
                         ></div>
                      </div>
                      <p className="text-center text-[10px] font-bold text-slate-400 mt-3 uppercase">
                        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Détails complémentaires */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                     <Users size={18} className="text-slate-400"/> Investisseurs Récents
                   </h3>
                   <div className="space-y-4">
                     <InvestorRow name="Marc Simoncini" type="Business Angel" time="2h" />
                     <InvestorRow name="Kima Ventures" type="VC Fund" time="5h" />
                     <InvestorRow name="Sarah L." type="Family Office" time="1j" />
                   </div>
                </div>

                <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden relative">
                   <div className="relative z-10">
                     <h3 className="text-xl font-black mb-2">Boostez votre visibilité</h3>
                     <p className="text-emerald-100 text-sm mb-6 max-w-xs">
                       Votre profil performe bien. Passez en avant pour toucher 2x plus d'investisseurs qualifiés.
                     </p>
                     <button className="bg-white text-emerald-900 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-emerald-50 transition-colors">
                       Voir les options
                     </button>
                   </div>
                   {/* Decorative bubbles */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                   <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 rounded-full blur-2xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
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
const StatCard = ({ icon: Icon, label, value, trend, sub, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600"
  };
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colors[color]}`}><Icon size={20} /></div>
        {trend && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{trend}</span>}
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
      {sub && <p className="text-[10px] font-medium text-slate-400 mt-1">{sub}</p>}
    </div>
  );
};

const InvestorRow = ({ name, type, time }) => (
  <div className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs group-hover:bg-white group-hover:shadow-sm transition-all">
      {name.substring(0,2).toUpperCase()}
    </div>
    <div className="flex-1">
      <p className="text-sm font-bold text-slate-900">{name}</p>
      <p className="text-[10px] text-slate-500 uppercase font-bold">{type}</p>
    </div>
    <span className="text-xs text-slate-400 font-medium">il y a {time}</span>
  </div>
);

export default StartupDashboard;
