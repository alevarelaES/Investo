import React, { useRef, useState, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';

const VideoScreen = ({ image, isActive, t }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Fallback de traduction sécurisé pour éviter les crashs
  const translate = typeof t === 'function' ? t : (key) => key;

  // Gestion robuste de l'autoplay
  useEffect(() => {
    if (isActive && videoRef.current) {
      // Tente de lancer la vidéo. Si le navigateur bloque, on passe en "Pause" silencieusement.
      videoRef.current.play().catch(() => setIsPlaying(false));
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className={`absolute inset-0 transition-opacity duration-500 bg-black ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
      onClick={togglePlay}
    >
      {/* Lecteur Vidéo */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        // Lien haute performance (Google Storage) pour un chargement instantané
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        // Affiche l'image fournie ou le logo par défaut pendant le chargement
        poster={image || "/edited-image.png"} 
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay sombre pour la lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90 pointer-events-none"></div>

      {/* Bouton Play/Pause Central */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full pointer-events-none">
          {isPlaying ? <Pause fill="white" size={32} /> : <Play fill="white" size={32} className="ml-1" />}
        </div>
      </div>

      {/* Infos du bas */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white pb-12 text-left pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            {translate('pitch_status')}
          </span>
          <span className="text-xs font-medium opacity-80">
            {translate('pitch_vision')}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-1 tracking-tight">SolarPath AG</h3>
        <p className="text-sm text-emerald-300 font-medium mb-3">GreenTech • Seed • 750k CHF</p>
        <p className="text-sm line-clamp-2 opacity-90 leading-snug">
          "{translate('pitch_desc')}"
        </p>
      </div>
    </div>
  );
};

export default VideoScreen;