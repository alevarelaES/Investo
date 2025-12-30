import React, { useRef, useState, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';

const VideoScreen = ({ image, isActive, t }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasError, setHasError] = useState(false);

  const translate = typeof t === 'function' ? t : (key) => key;

  useEffect(() => {
    if (isActive && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setIsPlaying(false));
      }
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
        setHasError(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className={`absolute inset-0 transition-opacity duration-500 bg-black ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
      onClick={togglePlay}
    >
      {/* VIDÉO : Running / Sport (Souvent plus léger à charger) */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-500 ${hasError ? 'opacity-0' : 'opacity-100'}`}
        // Source Mixkit : Coureur sur piste (très visuel)
        src="https://assets.mixkit.co/videos/preview/mixkit-legs-of-a-runner-on-a-track-40893-large.mp4"
        poster="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
        autoPlay
        loop
        muted
        playsInline
        onError={() => setHasError(true)}
      />

      {/* Image de secours (Gym) */}
      {hasError && (
        <img 
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Sport Tech"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90 pointer-events-none"></div>

      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full pointer-events-none">
          {isPlaying ? <Pause fill="white" size={32} /> : <Play fill="white" size={32} className="ml-1" />}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white pb-12 text-left pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-orange-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            {translate('pitch_status')}
          </span>
          <span className="text-xs font-medium opacity-80">
            {translate('pitch_vision')}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-1 tracking-tight">Stride Analytics</h3>
        <p className="text-sm text-orange-300 font-medium mb-3">SportTech • Seed • 400k CHF</p>
        <p className="text-sm line-clamp-2 opacity-90 leading-snug">
          "Optimisez chaque foulée grâce à nos semelles connectées et notre IA biomécanique en temps réel..."
        </p>
      </div>
    </div>
  );
};

export default VideoScreen;