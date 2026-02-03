import React, { useState } from 'react';
import { 
  LayoutDashboard, PieChart, FileText, Settings, Bell, Search, 
  Menu, X, ShieldCheck, Tag, Globe, Play 
} from 'lucide-react';
import { startups } from '../data/startups';
import translations from '../data/translations';
import ProfileSettings from '../components/ProfileSettings';

const InvestorDashboard = ({ lang = 'fr' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar et Header identiques au code précédent... */}
      
      <main className="flex-1 lg:ml-64">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          <h1 className="text-3xl font-black text-slate-900 mb-8">{t('inv_deal_flow')}</h1>

          {/* FEED MODE AGRANDI (Point 6) */}
          <div className="space-y-12 max-w-4xl mx-auto pb-20">
            {startups.map((startup) => (
              <div key={startup.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img src={startup.ceo.photo} className="w-14 h-14 rounded-2xl object-cover" alt="CEO"/>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-slate-900 text-2xl">{startup.name}</h3>
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-widest">
                          <ShieldCheck size={12} /> {t('verified_badge')}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-slate-500 font-bold text-xs uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Tag size={12} className="text-emerald-500"/> {startup.kpis.sector[lang] || startup.kpis.sector.fr}</span>
                        <span className="text-slate-300">|</span>
                        <span className="flex items-center gap-1"><Globe size={12} className="text-blue-500"/> {startup.location || 'Lausanne, CH'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-video bg-black group cursor-pointer" onClick={() => setSelectedStartup(startup)}>
                  <video src={startup.video} className="w-full h-full object-cover" muted loop />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play fill="white" className="text-white" size={48} />
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-3">À propos</p>
                  <p className="text-slate-600 leading-relaxed text-lg italic">
                    "{startup.pitch[lang] || startup.pitch.fr}"
                  </p>
                </div>

                <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50/50">
                  <div className="p-6 text-center">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Objectif</p>
                    <p className="text-2xl font-black text-emerald-600">{startup.kpis.amount}</p>
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Valorisation</p>
                    <p className="text-2xl font-black text-slate-900">{startup.kpis.valuation}</p>
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-xs font-black text-blue-600 flex items-center justify-center gap-1 bg-blue-50 py-2 rounded-xl mx-4 uppercase">
                      <ShieldCheck size={14} /> {t('audit_badge')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const MenuItem = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center p-3 rounded-xl ${active ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
    <Icon size={18} className="mr-3" />
    <span className="text-xs font-bold">{label}</span>
  </button>
);

export default InvestorDashboard;
