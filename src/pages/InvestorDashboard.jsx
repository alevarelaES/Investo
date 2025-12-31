import React from 'react';
import { 
  LayoutDashboard, PieChart, FileText, Settings, Bell, Search, 
  Filter, Download, ChevronRight, Lock, Eye, CheckCircle, XCircle 
} from 'lucide-react';
import { startups } from '../data/startups';

const InvestorDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* SIDEBAR (Navigation Gauche) */}
      <aside className="w-64 bg-[#0A0F1C] text-white flex flex-col fixed h-full border-r border-slate-800">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-black shadow-lg shadow-emerald-900/50">I</div>
          <span className="text-lg font-black tracking-tight uppercase">Invest<span className="text-emerald-500">o</span></span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2 mt-4">Sourcing</div>
          <MenuItem icon={LayoutDashboard} label="Deal Flow" active />
          <MenuItem icon={PieChart} label="Portfolio" />
          <MenuItem icon={Bell} label="Notifications" badge="3" />
          
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2 mt-8">Diligence</div>
          <MenuItem icon={FileText} label="Data Rooms" />
          <MenuItem icon={Settings} label="Paramètres" />
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-400 font-bold text-xs">JD</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">Jean Dupont</p>
              <p className="text-[10px] text-slate-400 truncate">Family Office</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT (Zone Principale) */}
      <main className="flex-1 ml-64">
        
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4 text-slate-400 bg-slate-100 px-4 py-2 rounded-xl w-96">
            <Search size={18} />
            <input type="text" placeholder="Rechercher une startup, un secteur..." className="bg-transparent text-sm font-medium w-full focus:outline-none text-slate-900" />
          </div>
          <div className="flex gap-4">
             <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"><Bell size={20}/></button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-2">Deal Flow Actif</h1>
              <p className="text-slate-500 font-medium">Vos startups sélectionnées ("Watchlist") en attente d'analyse.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
                <Filter size={16} /> Filtres
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
                <Download size={16} /> Export CSV
              </button>
            </div>
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-4 gap-6 mb-10">
            <KpiCard label="Deals Revus" value="124" trend="+12%" />
            <KpiCard label="Watchlist" value="12" active />
            <KpiCard label="Data Rooms Ouvertes" value="5" />
            <KpiCard label="Mises en Relation" value="2" />
          </div>

          {/* TABLEAU "FINTECH STYLE" */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="p-5 font-bold">Startup</th>
                  <th className="p-5 font-bold">Secteur</th>
                  <th className="p-5 font-bold">Stade</th>
                  <th className="p-5 font-bold text-right">Valuation</th>
                  <th className="p-5 font-bold text-right">Objectif</th>
                  <th className="p-5 font-bold text-center">Status</th>
                  <th className="p-5 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {startups.map((startup) => (
                  <tr key={startup.id} className="hover:bg-slate-50/80 transition-colors group">
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
      </main>
    </div>
  );
};

// Petits composants internes pour alléger le code
const MenuItem = ({ icon: Icon, label, active, badge }) => (
  <button className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${active ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
    <div className="flex items-center gap-3">
      <Icon size={18} />
      <span className="text-xs font-bold">{label}</span>
    </div>
    {badge && <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded">{badge}</span>}
  </button>
);

const KpiCard = ({ label, value, trend, active }) => (
  <div className={`p-6 rounded-2xl border ${active ? 'bg-slate-900 border-slate-900 text-white ring-4 ring-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
    <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${active ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
    <div className="flex items-end justify-between">
      <p className="text-3xl font-black">{value}</p>
      {trend && <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded">{trend}</span>}
    </div>
  </div>
);

export default InvestorDashboard;