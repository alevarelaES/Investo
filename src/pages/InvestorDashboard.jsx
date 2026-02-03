{/* FEED MODE AGRANDI */}
<div className="space-y-12 max-w-4xl mx-auto pb-20">
  {startups.map((startup) => (
    <div key={startup.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl transition-all hover:shadow-2xl">
      
      {/* Header enrichi */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
        <div className="flex items-center gap-4">
          <img src={startup.ceo.photo} className="w-14 h-14 rounded-2xl object-cover shadow-md" alt="CEO"/>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-black text-slate-900 text-2xl tracking-tight">{startup.name}</h3>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-widest">
                <ShieldCheck size={12} /> {t('verified_badge')}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1 text-slate-500 font-bold text-xs uppercase tracking-widest">
              <span className="flex items-center gap-1"><Tag size={12} className="text-emerald-500"/> {startup.kpis.sector[lang]}</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1"><Globe size={12} className="text-blue-500"/> {startup.location || 'Lausanne, CH'}</span>
            </div>
          </div>
        </div>
        <button onClick={() => setSelectedStartup(startup)} className="bg-emerald-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-emerald-600/20">
          Détails complets
        </button>
      </div>

      {/* Zone Vidéo Plus Grande */}
      <div className="relative aspect-video bg-black group cursor-pointer" onClick={() => setSelectedStartup(startup)}>
        <video src={startup.video} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" muted loop onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <div className="bg-white/20 backdrop-blur-xl p-5 rounded-full border border-white/30">
             <Play fill="white" className="text-white ml-1" size={32} />
           </div>
        </div>
      </div>

      {/* Zone Description Startup */}
      <div className="p-8 bg-white">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-3">À propos de nous</p>
        <p className="text-slate-600 leading-relaxed text-lg italic">
          "{startup.pitch[lang] || startup.pitch.fr}"
        </p>
      </div>

      {/* Metrics Row Agrandie */}
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
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Status</p>
           <p className="text-xs font-black text-blue-600 flex items-center justify-center gap-1 bg-blue-50 py-2 rounded-xl mx-4">
             <ShieldCheck size={14} /> AUDITÉ
           </p>
        </div>
      </div>
    </div>
  ))}
</div>
