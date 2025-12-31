import React, { useRef, useState, useEffect } from 'react';
import { Pause, Play, Target, TrendingUp, Layers, Tag } from 'lucide-react';

const VideoScreen = ({ isActive, t, startup, lang }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const translate = typeof t === 'function' ? t : (key) => key;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isActive) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) playPromise.catch(() => setIsPlaying(false));
      }
    }
  }, [startup.id, isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const themes = {
    emerald: { badge: "bg-emerald-500", text: "text-emerald-400" },
    purple: { badge: "bg-purple-600", text: "text-purple-400" },
    orange: { badge: "bg-orange-500", text: "text-orange-400" },
  };
  
  const theme = themes[startup.color] || themes.emerald;

  // KPI Badge minimaliste sans boite
  const KpiItem = ({ icon: Icon, value, label }) => (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5 mb-0.5 opacity-80">
        <Icon size={12} className="text-white drop-shadow-md" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-white drop-shadow-md">{label}</span>
      </div>
      <span className="text-sm font-black tracking-wide text-white drop-shadow-lg">{value}</span>
    </div>
  );

  return (
    <div className={`absolute inset-0 transition-opacity duration-500 bg-black ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} onClick={togglePlay}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={startup.video}
        poster={startup.poster}
        loop muted playsInline
      />
      
      {/* 1. DÉGRADÉ RENFORCÉ : Indispensable pour lire le texte blanc sur fond clair */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90 pointer-events-none"></div>

      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full pointer-events-none">
          {isPlaying ? <Pause fill="white" size={32} /> : <Play fill="white" size={32} className="ml-1" />}
        </div>
      </div>

      {/* --- UI MINIMALISTE (TIKTOK STYLE) --- */}
      <div className="absolute bottom-0 left-0 right-0 p-5 pb-12 text-left pointer-events-none flex flex-col justify-end">
        
        {/* Zone de texte avec largeur max pour ne pas toucher les boutons à droite */}
        <div className="w-full pr-16">
          
          {/* Badge & Vision */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`${theme.badge} text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-lg`}>
              {translate('pitch_status')}
            </span>
            <span className="text-xs font-bold text-white drop-shadow-md">{startup.vision[lang] || startup.vision.fr}</span>
          </div>

          {/* Nom Startup */}
          <h3 className="text-3xl font-black mb-4 text-white drop-shadow-xl tracking-tighter">{startup.name}</h3>

          {/* 2. LA GRILLE INVISIBLE : Plus de fond, juste du texte */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-4 mb-4">
              <KpiItem icon={Target} label={lang === 'fr' ? 'Recherche' : 'Target'} value={startup.kpis.amount} />
              <KpiItem icon={TrendingUp} label={lang === 'fr' ? 'Valo.' : 'Valuation'} value={startup.kpis.valuation} />
              <KpiItem icon={Layers} label={lang === 'fr' ? 'Stade' : 'Stage'} value={startup.kpis.stage} />
              <KpiItem icon={Tag} label={lang === 'fr' ? 'Secteur' : 'Sector'} value={startup.kpis.sector[lang]} />
          </div>

          {/* Pitch */}
          <p className="text-xs line-clamp-2 text-white/90 leading-relaxed font-medium drop-shadow-md">
            "{startup.pitch[lang] || startup.pitch.fr}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoScreen;