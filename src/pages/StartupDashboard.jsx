import React, { useState } from 'react';
import { 
  LayoutDashboard, BarChart3, FileText, Settings, Bell, 
  Eye, Users, Clock, MousePointerClick, ArrowUpRight, Menu, X
} from 'lucide-react';
import translations from '../data/translations';

const StartupDashboard = ({ lang = 'fr' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* SIDEBAR (Navigation Gauche - Version Startup) */}
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
          <MenuItem icon={Settings} label={t('startup_pitch_config')} />
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
        
        {/* Header */}
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
          <div className="flex items-center gap-2 lg:gap-4">
             <span className="bg-emerald-100 text-emerald-700 px-2 lg:px-3 py-1 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 lg:gap-2">
                <span className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Live
             </span>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 lg:space-y-8">
          
          {/* STATS CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            <StatCard icon={Eye} label={t('startup_total_views')} value="1,240" trend="+12%" color="blue" />
            <StatCard icon={Users} label={t('startup_investors')} value="86" trend="+5%" color="purple" />
            <StatCard icon={Clock} label={t('startup_avg_time')} value="1m 12s" sub="sur 1m 30s" color="orange" />
            <StatCard icon={MousePointerClick} label={t('startup_profile_clicks')} value="24" trend="+8%" color="emerald" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* GRAPHIQUE SIMULÉ (Engagement) */}
            <div className="lg:col-span-2 bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                <h3 className="font-bold text-slate-900">{t('startup_pitch_performance')}</h3>
                <select className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-3 py-2 outline-none w-full sm:w-auto">
                  <option>{t('startup_last_7_days')}</option>
                </select>
              </div>
              {/* Simulation visuelle de graph */}
              <div className="h-48 lg:h-64 flex items-end justify-between gap-1 lg:gap-2 px-2 lg:px-4">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                   <div key={i} className="w-full bg-slate-100 rounded-t-lg lg:rounded-t-xl relative group">
                      <div style={{height: `${h}%`}} className="absolute bottom-0 w-full bg-emerald-500 rounded-t-lg lg:rounded-t-xl transition-all group-hover:bg-emerald-600"></div>
                   </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 lg:mt-4 text-[9px] lg:text-xs text-slate-400 font-bold uppercase tracking-widest">
                <span>{t('day_mon')}</span><span>{t('day_tue')}</span><span>{t('day_wed')}</span><span>{t('day_thu')}</span><span>{t('day_fri')}</span><span>{t('day_sat')}</span><span>{t('day_sun')}</span>
              </div>
            </div>

            {/* ACTIVITÉ RÉCENTE */}
            <div className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 lg:mb-6">{t('startup_recent_visits')}</h3>
              <div className="space-y-3 lg:space-y-4">
                <ActivityItem name="Jean Dupont" role="Family Office" time={`${t('startup_ago')} 2${t('startup_hours')}`} type="view" />
                <ActivityItem name="Tech Ventures" role="VC Fund" time={`${t('startup_ago')} 5${t('startup_hours')}`} type="click" />
                <ActivityItem name="Sarah L." role="Business Angel" time={`${t('startup_ago')} 1${t('startup_day')}`} type="view" />
                <ActivityItem name="Marc O." role={t('startup_investors').slice(0, -1)} time={`${t('startup_ago')} 1${t('startup_day')}`} type="match" />
              </div>
              <button className="w-full mt-4 lg:mt-6 py-2.5 lg:py-3 border border-slate-200 rounded-xl text-[10px] lg:text-xs font-bold uppercase tracking-widest hover:bg-slate-50">{t('startup_view_all')}</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// Composants UI internes
const MenuItem = ({ icon: Icon, label, active, badge }) => (
  <button className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${active ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
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

const ActivityItem = ({ name, role, time, type }) => (
  <div className="flex items-center gap-3">
    <div className={`w-2 h-2 rounded-full ${type === 'match' ? 'bg-emerald-500' : type === 'click' ? 'bg-purple-500' : 'bg-slate-300'}`}></div>
    <div className="flex-1">
      <p className="text-sm font-bold text-slate-900">{name}</p>
      <p className="text-[10px] text-slate-500 uppercase font-bold">{role}</p>
    </div>
    <span className="text-xs text-slate-400 font-medium">{time}</span>
  </div>
);

export default StartupDashboard;