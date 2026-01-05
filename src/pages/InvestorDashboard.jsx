import React, { useState } from 'react';
import { 
  LayoutDashboard, PieChart, FileText, Settings, Bell, Search, 
  Filter, Download, ChevronRight, Lock, Eye, CheckCircle, XCircle, Menu, X 
} from 'lucide-react';
import { startups } from '../data/startups';
import translations from '../data/translations';

const InvestorDashboard = ({ lang = 'fr' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* SIDEBAR (Navigation Gauche) */}
      <aside className={`w-64 bg-[#0A0F1C] text-white flex flex-col fixed h-full border-r border-slate-800 z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 flex items-center justify-between border-b border-white/10">
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
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2 mt-4">{t('inv_sourcing')}</div>
          <MenuItem icon={LayoutDashboard} label="Deal Flow" active />
          <MenuItem icon={PieChart} label={t('inv_portfolio')} />
          <MenuItem icon={Bell} label={t('inv_notifications')} badge="3" />
          
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2 mt-8">{t('inv_diligence')}</div>
          <MenuItem icon={FileText} label={t('inv_data_rooms')} />
          <MenuItem icon={Settings} label={t('inv_settings')} />
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

            {/* Version Mobile: Cards */}
            <div className="lg:hidden divide-y divide-slate-100">
              {startups.map((startup) => (
                <div key={startup.id} className="p-4 hover:bg-slate-50/80 transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <img src={startup.ceo.photo} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-slate-900">{startup.name}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{startup.vision.fr || startup.vision}</p>
                        </div>
                        <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors shrink-0">
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      startup.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 
                      startup.color === 'purple' ? 'bg-purple-100 text-purple-700' : 
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {typeof startup.kpis.sector === 'object' ? startup.kpis.sector.fr : startup.kpis.sector}
                    </span>
                    <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                      {startup.kpis.stage}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-slate-500 text-xs">{t('inv_valuation')}:</span>
                      <span className="font-bold text-slate-900 ml-1">{startup.kpis.valuation}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs">{t('inv_target')}:</span>
                      <span className="font-bold text-emerald-600 ml-1">{startup.kpis.amount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
  <div className={`p-4 lg:p-6 rounded-xl lg:rounded-2xl border ${active ? 'bg-slate-900 border-slate-900 text-white ring-2 lg:ring-4 ring-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
    <p className={`text-[9px] lg:text-[10px] font-bold uppercase tracking-widest mb-1 lg:mb-2 ${active ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
    <div className="flex items-end justify-between gap-2">
      <p className="text-2xl lg:text-3xl font-black">{value}</p>
      {trend && <span className="text-[10px] lg:text-xs font-bold text-emerald-500 bg-emerald-50 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded">{trend}</span>}
    </div>
  </div>
);

export default InvestorDashboard;