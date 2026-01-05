import React from 'react';
import { 
  LayoutDashboard, BarChart3, FileText, Settings, Bell, 
  Eye, Users, Clock, MousePointerClick, ArrowUpRight
} from 'lucide-react';

const StartupDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* SIDEBAR (Navigation Gauche - Version Startup) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-black text-white shadow-lg shadow-emerald-200">I</div>
          <span className="text-lg font-black tracking-tight uppercase">Invest<span className="text-emerald-500">o</span></span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 mt-4">Mon Espace</div>
          <MenuItem icon={LayoutDashboard} label="Vue d'ensemble" active />
          <MenuItem icon={BarChart3} label="Analyses Détaillées" />
          <MenuItem icon={Bell} label="Notifications" badge="5" />
          
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 mt-8">Levée de Fonds</div>
          <MenuItem icon={FileText} label="Ma Data Room" />
          <MenuItem icon={Settings} label="Configuration Pitch" />
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
      <main className="flex-1 ml-64">
        
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
          <div>
            <h1 className="text-xl font-black text-slate-900">Bonjour, Clara 👋</h1>
            <p className="text-xs text-slate-500 font-medium">Votre pitch est en ligne depuis 12 jours.</p>
          </div>
          <div className="flex items-center gap-4">
             <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Live
             </span>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          {/* STATS CARDS */}
          <div className="grid grid-cols-4 gap-6">
            <StatCard icon={Eye} label="Vues Totales" value="1,240" trend="+12%" color="blue" />
            <StatCard icon={Users} label="Investisseurs Uniques" value="86" trend="+5%" color="purple" />
            <StatCard icon={Clock} label="Temps Moyen" value="1m 12s" sub="sur 1m 30s" color="orange" />
            <StatCard icon={MousePointerClick} label="Clics Profil" value="24" trend="+8%" color="emerald" />
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* GRAPHIQUE SIMULÉ (Engagement) */}
            <div className="col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900">Performance du Pitch</h3>
                <select className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-3 py-2 outline-none">
                  <option>7 derniers jours</option>
                </select>
              </div>
              {/* Simulation visuelle de graph */}
              <div className="h-64 flex items-end justify-between gap-2 px-4">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                   <div key={i} className="w-full bg-slate-100 rounded-t-xl relative group">
                      <div style={{height: `${h}%`}} className="absolute bottom-0 w-full bg-emerald-500 rounded-t-xl transition-all group-hover:bg-emerald-600"></div>
                   </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
                <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
              </div>
            </div>

            {/* ACTIVITÉ RÉCENTE */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6">Dernières Visites</h3>
              <div className="space-y-4">
                <ActivityItem name="Jean Dupont" role="Family Office" time="Il y a 2h" type="view" />
                <ActivityItem name="Tech Ventures" role="VC Fund" time="Il y a 5h" type="click" />
                <ActivityItem name="Sarah L." role="Business Angel" time="Il y a 1j" type="view" />
                <ActivityItem name="Marc O." role="Investisseur" time="Il y a 1j" type="match" />
              </div>
              <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50">Voir tout</button>
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
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colors[color]}`}><Icon size={20} /></div>
        {trend && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{trend}</span>}
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-black text-slate-900">{value}</p>
      {sub && <p className="text-xs font-medium text-slate-400 mt-1">{sub}</p>}
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