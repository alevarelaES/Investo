import React, { useState } from 'react';
import {
  LayoutDashboard, List, Settings, Bell, Search,
  Filter, Eye, CheckCircle, Menu, X,
  Save, MapPin, Linkedin, User, Building2, Upload, Mail, Phone,
  Globe, ShieldCheck, Heart, Star, Share2, MessageCircle,
  Volume2, VolumeX, MoreHorizontal, ChevronRight, Lock,
  Grid, BarChart2, TrendingUp, Zap, ArrowUpRight, Award
} from 'lucide-react';
import { startups } from '../data/startups';
import translations from '../data/translations';

// ─── Helpers ────────────────────────────────────────────────────────────────

const SECTOR_COLORS = {
  emerald: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', dot: 'bg-emerald-400', border: 'border-emerald-500/30' },
  purple:  { bg: 'bg-purple-500/15',  text: 'text-purple-400',  dot: 'bg-purple-400',  border: 'border-purple-500/30'  },
  orange:  { bg: 'bg-orange-500/15',  text: 'text-orange-400',  dot: 'bg-orange-400',  border: 'border-orange-500/30'  },
  blue:    { bg: 'bg-blue-500/15',    text: 'text-blue-400',    dot: 'bg-blue-400',    border: 'border-blue-500/30'    },
  teal:    { bg: 'bg-teal-500/15',    text: 'text-teal-400',    dot: 'bg-teal-400',    border: 'border-teal-500/30'    },
  green:   { bg: 'bg-green-500/15',   text: 'text-green-400',   dot: 'bg-green-400',   border: 'border-green-500/30'   },
};

const STAGE_STYLE = {
  'Pre-Seed': 'bg-slate-100 text-slate-600',
  'Seed':     'bg-emerald-50 text-emerald-700',
  'Series A': 'bg-indigo-50 text-indigo-700',
};

const getSector = (s) => (typeof s.kpis.sector === 'object' ? s.kpis.sector.fr : s.kpis.sector);
const getVision = (s) => (typeof s.vision === 'object' ? s.vision.fr : s.vision);
const getColors = (s) => SECTOR_COLORS[s.color] || SECTOR_COLORS.emerald;
const MATCH_SCORES = [98, 94, 91, 87, 83, 78];

// ─── Stats Bar ──────────────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, label, value, sub, accent = 'emerald' }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-${accent}-50`}>
      <Icon size={20} className={`text-${accent}-600`} />
    </div>
    <div>
      <p className="text-2xl font-black text-slate-900 leading-none">{value}</p>
      <p className="text-xs font-semibold text-slate-500 mt-1">{label}</p>
      {sub && <p className="text-[10px] text-emerald-600 font-bold mt-0.5">{sub}</p>}
    </div>
  </div>
);

// ─── Startup Card (Grid) ─────────────────────────────────────────────────────

const StartupCard = ({ startup, index, onSelect }) => {
  const c = getColors(startup);
  const match = MATCH_SCORES[index] ?? 75;
  const progress = 65 + index * 5;

  return (
    <div
      onClick={() => onSelect(startup)}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Card Header — poster */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={startup.poster}
          alt={startup.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Sector badge top-left */}
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border ${c.bg} ${c.text} ${c.border}`}>
          {getSector(startup)}
        </span>

        {/* Match top-right */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
          <Zap size={10} className="text-emerald-400" />
          <span className="text-[10px] font-black text-white">{match}% match</span>
        </div>

        {/* CEO avatar bottom-left */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="relative">
            <img src={startup.ceo.photo} alt={startup.ceo.name} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
            <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full p-0.5">
              <CheckCircle size={8} className="text-white" />
            </div>
          </div>
          <span className="text-xs font-semibold text-white drop-shadow">{startup.ceo.name}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-base font-black text-slate-900">{startup.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{getVision(startup)}</p>
          </div>
          <span className={`mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold ${STAGE_STYLE[startup.kpis.stage] || 'bg-slate-100 text-slate-600'}`}>
            {startup.kpis.stage}
          </span>
        </div>

        {/* KPIs row */}
        <div className="grid grid-cols-3 gap-2 my-4">
          {[
            { label: 'Valuation', value: startup.kpis.valuation },
            { label: 'Levée', value: startup.kpis.amount, highlight: true },
            { label: 'Min. Ticket', value: startup.minTicket },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
              <p className={`text-xs font-black mt-0.5 ${highlight ? 'text-emerald-600' : 'text-slate-800'}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Soft Circle</span>
            <span className="text-xs font-black text-emerald-600">{progress}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5">
            <Eye size={13} /> Détails
          </button>
          <button className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-lg shadow-emerald-600/20">
            Investir
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Enhanced Table Row ──────────────────────────────────────────────────────

const TableRow = ({ startup, index, onSelect }) => {
  const c = getColors(startup);
  const match = MATCH_SCORES[index] ?? 75;
  const progress = 65 + index * 5;

  return (
    <tr
      onClick={() => onSelect(startup)}
      className="hover:bg-slate-50/80 transition-colors cursor-pointer group border-b border-slate-100 last:border-0"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img src={startup.poster} alt="" className="w-10 h-10 rounded-xl object-cover shadow-sm" />
            <img src={startup.ceo.photo} alt="" className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white object-cover" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">{startup.name}</p>
            <p className="text-xs text-slate-400 truncate max-w-[160px]">{getVision(startup)}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${c.bg} ${c.text} ${c.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
          {getSector(startup)}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${STAGE_STYLE[startup.kpis.stage] || 'bg-slate-100 text-slate-600'}`}>
          {startup.kpis.stage}
        </span>
      </td>
      <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">{startup.kpis.valuation}</td>
      <td className="px-6 py-4 text-sm font-bold text-emerald-600 text-right">{startup.kpis.amount}</td>
      <td className="px-6 py-4">
        <div className="flex flex-col items-end gap-1 min-w-[80px]">
          <span className="text-xs font-black text-slate-700">{progress}%</span>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="inline-flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full">
          <Zap size={10} className="text-emerald-600" />
          <span className="text-[10px] font-black text-emerald-700">{match}%</span>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <button className="p-2 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors group-hover:text-emerald-500">
          <ArrowUpRight size={16} />
        </button>
      </td>
    </tr>
  );
};

// ─── Detail Modal ────────────────────────────────────────────────────────────

const DetailModal = ({ startup, onClose, lang = 'fr' }) => {
  const [tab, setTab] = useState('pitch');
  const c = getColors(startup);
  const getPitch = (s) => (typeof s.pitch === 'object' ? s.pitch[lang] || s.pitch.fr : s.pitch);
  const getCeoRole = (s) => (typeof s.ceo.role === 'object' ? s.ceo.role[lang] || s.ceo.role.fr : s.ceo.role);
  const getCeoBio = (s) => (typeof s.ceo.bio === 'object' ? s.ceo.bio[lang] || s.ceo.bio.fr : s.ceo.bio);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative h-48 overflow-hidden rounded-t-3xl">
          <img src={startup.poster} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-sm transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
            <div>
              <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-sm mb-2 ${c.bg} ${c.text} ${c.border}`}>
                {getSector(startup)}
              </span>
              <h2 className="text-3xl font-black text-white">{startup.name}</h2>
              <p className="text-white/70 text-sm font-medium">{getVision(startup)}</p>
            </div>
            <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${STAGE_STYLE[startup.kpis.stage] || 'bg-white/20 text-white'}`}>
              {startup.kpis.stage}
            </span>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-3 border-b border-slate-100">
          {[
            { label: 'Valuation', value: startup.kpis.valuation },
            { label: 'Levée', value: startup.kpis.amount, highlight: true },
            { label: 'Min. Ticket', value: startup.minTicket },
          ].map(({ label, value, highlight }, i) => (
            <div key={label} className={`p-5 text-center ${i < 2 ? 'border-r border-slate-100' : ''}`}>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
              <p className={`text-xl font-black mt-1 ${highlight ? 'text-emerald-600' : 'text-slate-900'}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-6">
          {['pitch', 'team', 'dataroom'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors -mb-px ${
                tab === t
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {t === 'pitch' ? 'Pitch' : t === 'team' ? 'Équipe' : 'Data Room'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {tab === 'pitch' && (
            <div className="space-y-5">
              <div className="aspect-video bg-black rounded-2xl overflow-hidden">
                <video src={startup.video} controls className="w-full h-full object-cover" />
              </div>
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                <h4 className="text-xs font-black text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <TrendingUp size={13} /> Pourquoi investir ?
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">{getPitch(startup)}</p>
              </div>
            </div>
          )}
          {tab === 'team' && (
            <div className="space-y-4">
              <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <img src={startup.ceo.photo} alt="" className="w-20 h-20 rounded-2xl object-cover shadow-md shrink-0" />
                <div>
                  <p className="font-black text-slate-900 text-lg">{startup.ceo.name}</p>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">{getCeoRole(startup)}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{getCeoBio(startup)}</p>
                </div>
              </div>
            </div>
          )}
          {tab === 'dataroom' && (
            <div className="space-y-4">
              <div className="p-8 rounded-2xl border-2 border-dashed border-slate-200 text-center">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock size={24} className="text-slate-400" />
                </div>
                <p className="font-bold text-slate-900 mb-1">Accès Data Room</p>
                <p className="text-sm text-slate-500 mb-5">Financials, pitch deck, KPIs détaillés et documents légaux.</p>
                <button className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-colors">
                  Demander l'accès
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="px-6 pb-6">
          <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-colors shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2">
            <Zap size={16} /> Manifester mon intérêt
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

const InvestorDashboard = ({ lang = 'fr' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isMuted, setIsMuted] = useState(true);

  const [profileData, setProfileData] = useState({
    name: 'Jean Dupont',
    company: 'Family Office Dupont',
    role: 'Managing Partner',
    location: 'Genève, Suisse',
    linkedin: 'linkedin.com/in/jeandupont',
    website: 'www.dupont-invest.com',
    bio: "Investisseur expérimenté spécialisé dans les technologies durables, la santé et l'IA. Nous accompagnons les startups en phase Seed et Series A.",
    email: 'jean.dupont@example.com',
    phone: '+41 22 123 45 67',
  });

  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  const sectors = ['all', ...Array.from(new Set(startups.map(getSector)))];

  const filteredStartups = startups.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getSector(s).toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = activeFilter === 'all' || getSector(s) === activeFilter;
    return matchSearch && matchFilter;
  });

  const totalRaising = startups.reduce((acc, s) => {
    const n = parseFloat(s.kpis.amount.replace(/[^0-9.]/g, ''));
    return acc + (isNaN(n) ? 0 : n);
  }, 0);

  const handleSave = (e) => {
    e.preventDefault();
    alert('Profil mis à jour !');
  };

  const NAV_ITEMS = [
    { id: 'feed', icon: LayoutDashboard, label: 'Deal Flow (Live)' },
    { id: 'list', icon: List, label: 'Annuaire Startups' },
  ];

  return (
    <div className="h-screen flex font-sans text-slate-900 overflow-hidden bg-slate-50">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── SIDEBAR (dark premium) ── */}
      <aside className={`w-64 bg-slate-900 flex flex-col fixed h-full z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

        {/* Logo */}
        <div className="p-6 flex items-center justify-between shrink-0 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l6-6 4 4 8-8" />
                <path d="M17 7h4v4" />
              </svg>
            </div>
            <span className="text-lg font-black tracking-tight text-white uppercase">Invest<span className="text-emerald-400">o</span></span>
          </div>
          <button className="lg:hidden p-1.5 hover:bg-white/10 rounded-lg" onClick={() => setSidebarOpen(false)}>
            <X size={18} className="text-white/60" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-3 py-2">Sourcing</p>
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold ${
                activeTab === id
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}

          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-3 py-2 mt-6">Compte</p>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold ${
              activeTab === 'profile'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            <Settings size={16} />
            Mon Profil
          </button>
        </nav>

        {/* User card */}
        <div className="p-4 border-t border-white/5 shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-black text-xs shrink-0">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Jean Dupont</p>
              <div className="flex items-center gap-1 mt-0.5">
                <ShieldCheck size={10} className="text-emerald-400" />
                <p className="text-[10px] text-emerald-400 font-semibold">Investisseur Vérifié</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 lg:ml-64 flex flex-col h-full overflow-hidden">

        {/* Header */}
        <header className={`h-16 border-b flex items-center justify-between px-4 lg:px-8 shrink-0 z-20 transition-all ${
          activeTab === 'feed' ? 'bg-black border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="flex items-center gap-3 flex-1">
            <button className="lg:hidden p-2 hover:bg-white/10 rounded-lg" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-black hidden md:block">
              {activeTab === 'feed' ? 'Live Opportunities' : activeTab === 'list' ? 'Annuaire Startups' : 'Mon Profil'}
            </h1>
            {activeTab === 'list' && (
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl w-full max-w-xs ml-4 focus-within:ring-2 focus-within:ring-emerald-400/30 transition-all">
                <Search size={15} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Rechercher une startup…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm font-medium w-full focus:outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 pl-4">
            {activeTab === 'feed' && (
              <button onClick={() => setIsMuted(!isMuted)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            )}
            <button className="p-2 hover:text-emerald-500 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white/20" />
            </button>
          </div>
        </header>

        {/* Content area */}
        <div className={`flex-1 overflow-hidden relative ${activeTab === 'feed' ? 'bg-black' : 'overflow-y-auto'}`}>

          {/* ── FEED TAB ── */}
          {activeTab === 'feed' && (
            <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
              {filteredStartups.map((startup, index) => (
                <div key={startup.id} className="h-full w-full snap-start relative flex items-center justify-center bg-slate-900">
                  <div className="absolute inset-0">
                    <video
                      src={startup.video}
                      poster={startup.poster}
                      className="h-full w-full object-cover opacity-90"
                      loop muted={isMuted} autoPlay playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                  </div>

                  <div className="absolute inset-0 p-4 lg:p-8 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start mt-4">
                      <div className="flex flex-col gap-2">
                        <span className={`self-start px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md ${
                          startup.color === 'emerald' ? 'bg-emerald-600/80' :
                          startup.color === 'purple' ? 'bg-purple-600/80' : 'bg-orange-600/80'
                        }`}>{getSector(startup)}</span>
                        <span className="self-start px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white backdrop-blur-md border border-white/20">
                          {startup.kpis.stage}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10">
                        <span className="text-xl font-black text-emerald-400">{MATCH_SCORES[index] ?? 75}%</span>
                        <span className="text-[9px] font-bold uppercase text-white/60 tracking-widest">Match</span>
                      </div>
                    </div>

                    <div className="absolute right-4 bottom-28 lg:bottom-40 flex flex-col gap-5 items-center">
                      <div className="relative cursor-pointer">
                        <img src={startup.ceo.photo} className="w-11 h-11 rounded-full object-cover border-2 border-white" alt="CEO" />
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5"><CheckCircle size={10} className="text-white" /></div>
                      </div>
                      {[
                        { icon: Heart, label: 'Like', hoverBg: 'group-hover:bg-rose-500/80' },
                        { icon: MessageCircle, label: 'Contact', hoverBg: 'group-hover:bg-emerald-500/80' },
                        { icon: Share2, label: 'Share', hoverBg: 'group-hover:bg-white/20' },
                      ].map(({ icon: Icon, label, hoverBg }) => (
                        <button key={label} className="flex flex-col items-center gap-1 group">
                          <div className={`w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-all ${hoverBg}`}>
                            <Icon size={22} className="text-white" />
                          </div>
                          <span className="text-xs font-bold text-white drop-shadow">{label}</span>
                        </button>
                      ))}
                      <button onClick={() => setSelectedStartup(startup)} className="group">
                        <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                          <MoreHorizontal size={22} className="text-white" />
                        </div>
                      </button>
                    </div>

                    <div className="max-w-3xl pr-20 pb-4 lg:pb-0">
                      <h2 className="text-3xl lg:text-5xl font-black text-white mb-2 drop-shadow-lg">{startup.name}</h2>
                      <p className="text-sm lg:text-lg font-medium text-white/90 line-clamp-2 mb-6 max-w-2xl drop-shadow-md">
                        {getVision(startup)}
                      </p>
                      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 lg:p-5">
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Soft Circle Sécurisé</span>
                          <span className="text-sm font-black text-white">{65 + index * 5}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-5">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${65 + index * 5}%` }} />
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-5">
                          <div className="grid grid-cols-3 gap-5 flex-1 w-full border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                            {[
                              { label: 'Valuation', value: startup.kpis.valuation },
                              { label: 'Objectif', value: startup.kpis.amount, em: true },
                              { label: 'Min. Ticket', value: startup.minTicket },
                            ].map(({ label, value, em }) => (
                              <div key={label}>
                                <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">{label}</p>
                                <p className={`text-lg font-black ${em ? 'text-emerald-400' : 'text-white'}`}>{value}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-initial px-5 py-3 bg-white hover:bg-emerald-50 text-slate-900 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
                              <Eye size={15} /> Détails
                            </button>
                            <button className="flex-1 md:flex-initial px-7 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black uppercase tracking-wider text-sm transition-all shadow-lg shadow-emerald-600/30">
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

          {/* ── ANNUAIRE TAB ── */}
          {activeTab === 'list' && (
            <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">

              {/* Stats row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={BarChart2}  label="Startups disponibles" value={startups.length}       sub="+2 cette semaine"   accent="emerald" />
                <StatCard icon={TrendingUp} label="Total en levée"       value={`${totalRaising / 1000 | 0}k+ CHF`} sub="6 rounds actifs" accent="emerald" />
                <StatCard icon={Award}      label="Secteurs couverts"    value={sectors.length - 1}   sub="PropTech · HealthTech…" accent="indigo" />
                <StatCard icon={Zap}        label="Match moyen"          value="91%"                  sub="Basé sur votre profil" accent="amber" />
              </div>

              {/* Filters + view toggle */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {sectors.map((s) => (
                    <button
                      key={s}
                      onClick={() => setActiveFilter(s)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        activeFilter === s
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-200'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
                      }`}
                    >
                      {s === 'all' ? 'Tous' : s}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg border transition-colors ${viewMode === 'grid' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300'}`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-lg border transition-colors ${viewMode === 'table' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>

              {/* Results count */}
              <p className="text-xs text-slate-400 font-semibold -mt-2">
                {filteredStartups.length} résultat{filteredStartups.length !== 1 ? 's' : ''}
              </p>

              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredStartups.map((s, i) => (
                    <StartupCard key={s.id} startup={s} index={i} onSelect={setSelectedStartup} />
                  ))}
                </div>
              )}

              {/* Table View */}
              {viewMode === 'table' && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          {['Startup', 'Secteur', 'Stade', 'Valuation', 'Levée', 'Soft Circle', 'Match', ''].map((h) => (
                            <th key={h} className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 ${h === 'Valuation' || h === 'Levée' ? 'text-right' : ''}`}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStartups.map((s, i) => (
                          <TableRow key={s.id} startup={s} index={i} onSelect={setSelectedStartup} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── PROFILE TAB ── */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-0 z-10">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>Compte vérifié</span>
                </div>
                <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg shadow-md shadow-emerald-600/20 font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors text-sm">
                  <Save size={14} /> Enregistrer
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                    <div className="relative inline-block mb-4 group cursor-pointer">
                      <div className="w-28 h-28 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-black text-2xl border-4 border-slate-50 shadow-lg shadow-emerald-200">
                        JD
                      </div>
                      <button type="button" className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full border-4 border-white hover:bg-emerald-600 transition-colors">
                        <Upload size={12} />
                      </button>
                    </div>
                    <h3 className="font-black text-slate-900 text-lg">{profileData.name}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">{profileData.company}</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-4">Contact Privé</h3>
                    <div className="space-y-3">
                      {[
                        { icon: Mail, label: 'Email', key: 'email', type: 'email' },
                        { icon: Phone, label: 'Téléphone', key: 'phone', type: 'tel' },
                      ].map(({ icon: Icon, label, key, type }) => (
                        <div key={key}>
                          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-1.5"><Icon size={11} />{label}</label>
                          <input type={type} value={profileData[key]} onChange={(e) => setProfileData({ ...profileData, [key]: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-400 outline-none" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2 text-sm"><User size={16} className="text-emerald-600" /> Informations Personnelles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {[
                        { label: 'Nom Complet', key: 'name', type: 'text' },
                        { label: 'Rôle / Titre', key: 'role', type: 'text' },
                      ].map(({ label, key, type }) => (
                        <div key={key}>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
                          <input type={type} value={profileData[key]} onChange={(e) => setProfileData({ ...profileData, [key]: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-400 outline-none text-sm" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bio / Thèse d'investissement</label>
                      <textarea rows={4} value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-400 outline-none resize-none text-sm" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2 text-sm"><Building2 size={16} className="text-emerald-600" /> Organisation & Réseaux</h3>
                    <div className="space-y-4">
                      {[
                        { label: "Entreprise / Fonds", key: 'company', icon: Building2, type: 'text' },
                        { label: "Localisation", key: 'location', icon: MapPin, type: 'text' },
                      ].map(({ label, key, icon: Icon, type }) => (
                        <div key={key}>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
                          <div className="relative">
                            <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type={type} value={profileData[key]} onChange={(e) => setProfileData({ ...profileData, [key]: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-3 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-400 outline-none text-sm" />
                          </div>
                        </div>
                      ))}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { label: "LinkedIn", key: 'linkedin', icon: Linkedin },
                          { label: "Site Web", key: 'website', icon: Globe },
                        ].map(({ label, key, icon: Icon }) => (
                          <div key={key}>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
                            <div className="relative">
                              <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input type="text" value={profileData[key]} onChange={(e) => setProfileData({ ...profileData, [key]: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-3 font-medium text-slate-900 focus:ring-2 focus:ring-emerald-400 outline-none text-sm" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* ── DETAIL MODAL ── */}
      {selectedStartup && (
        <DetailModal startup={selectedStartup} onClose={() => setSelectedStartup(null)} lang={lang} />
      )}
    </div>
  );
};

export default InvestorDashboard;
