import { Pause } from 'lucide-react';

const VideoScreen = ({ image, isActive, t }) => {
  // SÉCURITÉ CRITIQUE : Fallback si t n'est pas passé correctement
  const translate = typeof t === 'function' ? t : (key) => key;

  return (
    <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
      {/* Utilisation prioritaire de l'image locale si fournie via props ou fallback hardcodé */}
      <img 
        src={image || "/edited-image.png"} 
        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'; }}
        alt="Pitch Startup" 
        className="w-full h-full object-cover" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
          <Pause fill="white" size={32} />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white pb-12 text-left">
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