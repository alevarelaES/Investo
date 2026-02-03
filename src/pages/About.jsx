import React from 'react';
import { ArrowLeft, CheckCircle, Shield, FileText } from 'lucide-react';
import translations from '../data/translations';

const About = ({ onBack, lang = 'fr' }) => {
  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pt-20 pb-10 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 mb-8 font-bold text-xs uppercase tracking-widest">
          <ArrowLeft size={16} /> Retour
        </button>

        <h1 className="text-4xl font-black uppercase tracking-tighter mb-6">{t('about_title')}</h1>
        
        {/* Section Vidéo Explicative */}
        <div className="rounded-3xl overflow-hidden bg-slate-900 aspect-video shadow-2xl mb-12 relative group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80" alt="Cover" className="w-full h-full object-cover opacity-60" />
          <p className="absolute bottom-6 left-6 text-white font-bold text-xl">{t('about_video_title')}</p>
        </div>

        {/* Section Qui sommes-nous & Conditions */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
             <h2 className="text-2xl font-black mb-4">Investo SA</h2>
             <p className="text-slate-600 leading-relaxed mb-6">
               {t('about_desc')} Basée à Lausanne, notre plateforme sécurise les échanges entre startups à haut potentiel et investisseurs accrédités.
             </p>
             <ul className="space-y-4">
               <li className="flex items-start gap-3">
                 <Shield className="text-emerald-500 mt-1" size={20} />
                 <div>
                   <span className="font-bold block text-sm">Sécurité Maximale</span>
                   <span className="text-xs text-slate-500">Données cryptées et hébergées en Suisse.</span>
                 </div>
               </li>
               <li className="flex items-start gap-3">
                 <CheckCircle className="text-emerald-500 mt-1" size={20} />
                 <div>
                   <span className="font-bold block text-sm">Startups Vérifiées</span>
                   <span className="text-xs text-slate-500">Audit complet avant publication (KYB).</span>
                 </div>
               </li>
             </ul>
          </div>
          
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
             <h3 className="flex items-center gap-2 font-black text-lg mb-4">
               <FileText size={20} /> {t('about_conditions')}
             </h3>
             <p className="text-sm text-slate-600 mb-4">{t('about_conditions_txt')}</p>
             <button className="text-emerald-600 font-bold text-xs uppercase tracking-widest border-b border-emerald-600 pb-0.5 hover:text-emerald-700">
               Lire les CGU complètes
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
