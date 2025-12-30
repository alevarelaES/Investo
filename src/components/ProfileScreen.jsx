import { CheckCircle, Share2, Linkedin } from 'lucide-react';

const ProfileScreen = ({ image, isActive, t }) => {
  const translate = typeof t === 'function' ? t : (key) => key;

  return (
    <div className={`absolute inset-0 bg-white transition-opacity duration-500 overflow-y-auto ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
      <div className="h-24 bg-slate-50 border-b border-slate-100"></div>
      <div className="p-6 -mt-10 text-left">
        <div className="flex justify-between items-end mb-6">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80" alt="CEO" className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-xl" />
            <div className="absolute -bottom-1 -right-1 bg-purple-600 border-2 border-white w-6 h-6 rounded-full flex items-center justify-center text-white"><CheckCircle size={12} /></div>
          </div>
          <div className="flex gap-2 pb-2 text-slate-400">
              <div className="p-2 bg-slate-100 rounded-lg"><Share2 size={16} /></div>
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Linkedin size={16} /></div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Sophie M.</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Co-Fondatrice • FitPulse</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{translate('data_executive')}</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              La santé mentale est le défi de 2025. FitPulse a séduit 30k familles en 6 mois avec son approche ludique et bienveillante.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
              <p className="text-[9px] text-purple-600 font-black uppercase mb-1">{translate('data_funding')}</p>
              <p className="text-lg font-black text-purple-700">450k CHF</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-[9px] text-slate-400 font-black uppercase mb-1">{translate('data_min')}</p>
              <p className="text-lg font-black text-slate-900">25k+</p>
            </div>
          </div>
          <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/20 active:scale-95 transition-transform">{translate('data_btn')}</button>
        </div>
      </div>
    </div>
  );
};
export default ProfileScreen;