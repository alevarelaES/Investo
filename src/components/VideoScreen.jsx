import React, { useRef, useState, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';

const VideoScreen = ({ image, isActive, t }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const translate = typeof t === 'function' ? t : (key) => key;

  useEffect(() => {
    if (isActive && videoRef.current) videoRef.current.play().catch(() => setIsPlaying(false));
    else if (!isActive && videoRef.current) videoRef.current.pause();
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`absolute inset-0 transition-opacity duration-500 bg-black ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} onClick={togglePlay}>
      {/* VIDÉO LIFESTYLE (Google Fiable) */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
        poster={image || "/edited-image.png"} 
        autoPlay loop muted playsInline
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90 pointer-events-none"></div>

      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full pointer-events-none">
          {isPlaying ? <Pause fill="white" size={32} /> : <Play fill="white" size={32} className="ml-1" />}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white pb-12 text-left pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-purple-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{translate('pitch_status')}</span>
          <span className="text-xs font-medium opacity-80">Mental Health</span>
        </div>
        <h3 className="text-lg font-bold mb-1 tracking-tight">FitPulse</h3>
        <p className="text-sm text-purple-300 font-medium mb-3">HealthTech • Seed • 450k CHF</p>
        <p className="text-sm line-clamp-2 opacity-90 leading-snug">
          "Retrouvez l'équilibre vie pro / vie perso. Notre IA crée des programmes de déconnexion pour toute la famille."
        </p>
      </div>
    </div>
  );
};
export default VideoScreen;