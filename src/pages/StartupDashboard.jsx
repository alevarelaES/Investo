import React, { useState } from 'react';
import { 
  LayoutDashboard, BarChart3, FileText, Settings, Bell, 
  Eye, Users, Clock, MousePointerClick, Menu, X, Play, Plus
} from 'lucide-react';
import translations from '../data/translations';
import ProfileSettings from '../components/ProfileSettings';

const StartupDashboard = ({ lang = 'fr' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

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

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 mt-4">{t('startup_my_space')}</div>
          <MenuItem icon={LayoutDashboard} label={t('startup_overview')} active />
          <MenuItem icon={BarChart3} label={t('startup_detailed_analytics')} />
          <MenuItem icon={Bell} label={t('inv_notifications')} badge="5" />
          
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 mt-8">{t('startup_fundraising')}</div>
          <MenuItem icon={FileText} label={t('startup_my_data_room')} />
          <MenuItem icon={Settings} label={t('startup_pitch_config')} onClick={() => setShowProfileSettings(true)} />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="CEO" className="w-8 h-8 rounded-full object-cover" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">Clara Dubuis</p>
              <p className="text-[10px] text-slate-500 truncate">ZenSpace CEO</p>
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
            <div>
              <h1 className="text-lg lg:text-xl font-black text-slate-900">{t('startup_hello')}, Clara 👋</h1>
              <p className="text-[10px] lg:text-xs text-slate-500 font-medium">{t('startup_pitch_online')} 12 {t('startup_days')}.</p>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8">
          
          {/* STATS CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            <StatCard icon={Eye} label={t('startup_total_views')} value="1,240" trend="+12%" color="blue" />
            <StatCard icon={Users} label={t('startup_investors')} value="86" trend="+5%" color="purple" />
            <StatCard icon={Clock} label={t('startup_avg_time')} value="1m 12s" sub="sur 1m 30s" color="orange" />
            <StatCard icon={MousePointerClick} label={t('startup_profile_clicks')} value="24" trend="+8%" color="emerald" />
          </div>

          {/* SECTION PUBLICATION (Documents & Vidéos) */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Publication Vidéo */}
            <div className="bg-white p-8 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-emerald-400 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Play size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Pitch Vidéo</h3>
              <p className="text-sm text-slate-500 mb-6 font-medium">Format vertical (9:16). Max 90 secondes.</p>
              <input type="file" accept="video/*" className="hidden" id="video-upload" />
              <label htmlFor="video-upload" className="block w-full text-center py-4 border-2 border-emerald-600 text-emerald-600 rounded-2xl font-black uppercase tracking-widest text-xs cursor-pointer hover:bg-emerald-600 hover:text-white transition-all">
                Remplacer la vidéo
              </label>
            </div>

            {/* Gestion Documents PDF/Word */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Documents (PDF/Word)</h3>
              <p className="text-sm text-slate-500 mb-4 font-medium">Ajoutez vos PDF (Business Plan, Deck) ou Word.</p>
              
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="doc-upload" />
              <label htmlFor="doc-upload" className="w-full mb-4 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-emerald-600 transition-all">
                <Plus size={16} /> Ajouter un document
              </label>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-2"><FileText size={14}/> Pitch_Deck_2024.pdf</span>
                  <button className="text-red-500 p-1 rounded hover:bg-red-50"><X size={14}/></button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

// Composants UI internes
const MenuItem = ({ icon: Icon, label, active, badge, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${active ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} />
      <span className="text-xs font-bold">{label}</span>
    </div>
    {badge && <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[9px] font-bold rounded-full">{badge}</span>}
  </button>
);

const StatCard = ({ icon: Icon, label, value, trend, sub, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    emerald: "bg-emerald-50 text-emerald-600"
  };
  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl lg:rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-3 lg:mb-4">
        <div className={`p-2 lg:p-3 rounded-lg lg:rounded-xl ${colors[color]}`}><Icon size={18} className="lg:w-5 lg:h-5" /></div>
        {trend && <span className="text-[10px] lg:text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-lg">{trend}</span>}
      </div>
      <p className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 lg:mb-1">{label}</p>
      <p className="text-xl lg:text-3xl font-black text-slate-900">{value}</p>
      {sub && <p className="text-[10px] lg:text-xs font-medium text-slate-400 mt-1">{sub}</p>}
    </div>
  );
};

export default StartupDashboard;
