import React, { useState } from 'react';
import { UploadCloud, FileVideo, DollarSign, TrendingUp, Layers, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const UploadPitch = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    vision: '',
    sector: 'Fintech',
    stage: 'Seed',
    amount: '',
    valuation: '',
    videoFile: null
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, videoFile: e.target.files[0] });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Header Simple */}
      <header className="h-16 lg:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-7 lg:w-8 h-7 lg:h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 relative overflow-hidden">
            <svg viewBox="0 0 24 24" className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17l6-6 4 4 8-8" />
              <path d="M17 7h4v4" />
            </svg>
          </div>
          <span className="font-black tracking-tight uppercase text-sm lg:text-base">Investo <span className="text-slate-400 text-[10px] lg:text-xs ml-1 lg:ml-2 hidden sm:inline">Studio</span></span>
        </div>
        <div className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">
          Étape {step}/3
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 lg:p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl lg:rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          {/* Barre de progression */}
          <div className="h-1 lg:h-1.5 bg-slate-100 w-full">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500 ease-out" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          <div className="p-6 sm:p-8 md:p-10 lg:p-14">
            
            {/* ÉTAPE 1 : IDENTITÉ */}
            {step === 1 && (
              <div className="space-y-5 lg:space-y-6 animate-in slide-in-from-right duration-500">
                <div className="mb-6 lg:mb-8">
                  <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2">Commençons par les bases.</h2>
                  <p className="text-sm lg:text-base text-slate-500 font-medium">Présentez votre startup en quelques mots pour le sourcing.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nom de la Startup</label>
                    <input 
                      type="text" 
                      placeholder="Ex: PayFlow" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg lg:rounded-xl px-3 lg:px-4 py-2.5 lg:py-3 font-bold text-sm lg:text-base focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">La Vision (One-liner)</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Le Stripe de l'Afrique de l'Ouest" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg lg:rounded-xl px-3 lg:px-4 py-2.5 lg:py-3 font-bold text-sm lg:text-base focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={formData.vision}
                      onChange={(e) => setFormData({...formData, vision: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Secteur</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg lg:rounded-xl px-3 lg:px-4 py-2.5 lg:py-3 font-bold text-sm lg:text-base outline-none"
                        value={formData.sector}
                        onChange={(e) => setFormData({...formData, sector: e.target.value})}
                      >
                        <option>Fintech</option>
                        <option>PropTech</option>
                        <option>MedTech</option>
                        <option>GreenTech</option>
                        <option>DeepTech</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Stade</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg lg:rounded-xl px-3 lg:px-4 py-2.5 lg:py-3 font-bold text-sm lg:text-base outline-none"
                        value={formData.stage}
                        onChange={(e) => setFormData({...formData, stage: e.target.value})}
                      >
                        <option>Pre-Seed</option>
                        <option>Seed</option>
                        <option>Series A</option>
                        <option>Series B+</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ÉTAPE 2 : HARD DATA (FINANCIER) */}
            {step === 2 && (
              <div className="space-y-5 lg:space-y-6 animate-in slide-in-from-right duration-500">
                <div className="mb-6 lg:mb-8">
                  <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2">Les Chiffres Clés.</h2>
                  <p className="text-sm lg:text-base text-slate-500 font-medium">Ces données généreront votre "Smart Card" investisseur.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:gap-6">
                  <div className="p-4 lg:p-6 border border-emerald-100 bg-emerald-50/50 rounded-xl lg:rounded-2xl space-y-3 lg:space-y-4">
                    <div className="w-8 lg:w-10 h-8 lg:h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-2">
                      <DollarSign size={18} className="lg:w-5 lg:h-5" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-2">Montant Recherché</label>
                      <input 
                        type="text" 
                        placeholder="Ex: 500k CHF" 
                        className="w-full bg-white border border-emerald-200 rounded-lg lg:rounded-xl px-3 lg:px-4 py-2.5 lg:py-3 font-black text-base lg:text-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:font-medium placeholder:text-slate-300"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="p-4 lg:p-6 border border-slate-200 bg-slate-50 rounded-xl lg:rounded-2xl space-y-3 lg:space-y-4">
                    <div className="w-8 lg:w-10 h-8 lg:h-10 bg-slate-200 text-slate-600 rounded-lg flex items-center justify-center mb-2">
                      <TrendingUp size={18} className="lg:w-5 lg:h-5" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Valorisation (Pre-Money)</label>
                      <input 
                        type="text" 
                        placeholder="Ex: 4M CHF" 
                        className="w-full bg-white border border-slate-200 rounded-lg lg:rounded-xl px-3 lg:px-4 py-2.5 lg:py-3 font-black text-base lg:text-lg focus:ring-2 focus:ring-slate-400 outline-none transition-all placeholder:font-medium placeholder:text-slate-300"
                        value={formData.valuation}
                        onChange={(e) => setFormData({...formData, valuation: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-[10px] lg:text-xs text-slate-400 font-medium italic">
                  * Ces données seront vérifiées lors de la Due Diligence.
                </div>
              </div>
            )}

            {/* ÉTAPE 3 : MÉDIA (VIDÉO) */}
            {step === 3 && (
              <div className="space-y-5 lg:space-y-6 animate-in slide-in-from-right duration-500">
                <div className="mb-6 lg:mb-8">
                  <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2">Le Pitch Vidéo.</h2>
                  <p className="text-sm lg:text-base text-slate-500 font-medium">Format vertical (9:16) requis. Max 90 secondes.</p>
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-2xl lg:rounded-3xl p-6 lg:p-10 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 hover:border-emerald-400 transition-all cursor-pointer relative group">
                  <input type="file" accept="video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                  
                  {formData.videoFile ? (
                    <div className="flex flex-col items-center animate-in zoom-in duration-300">
                        <div className="w-12 lg:w-16 h-12 lg:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3 lg:mb-4">
                            <CheckCircle size={24} className="lg:w-8 lg:h-8" />
                        </div>
                        <p className="font-bold text-emerald-700 text-sm lg:text-base">{formData.videoFile.name}</p>
                        <p className="text-[10px] lg:text-xs text-emerald-500 font-medium mt-1">Prêt à l'envoi</p>
                    </div>
                  ) : (
                    <>
                        <div className="w-12 lg:w-16 h-12 lg:h-16 bg-white shadow-sm text-slate-400 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-4 group-hover:text-emerald-500 group-hover:scale-110 transition-all">
                            <UploadCloud size={24} className="lg:w-8 lg:h-8" />
                        </div>
                        <p className="font-bold text-slate-700 text-base lg:text-lg">Glissez votre vidéo ici</p>
                        <p className="text-[10px] lg:text-xs text-slate-400 font-medium mt-1 lg:mt-2">ou cliquez pour parcourir</p>
                        <div className="mt-4 lg:mt-6 flex gap-2 lg:gap-3 flex-wrap justify-center">
                            <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[9px] lg:text-[10px] font-bold text-slate-400">MP4</span>
                            <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[9px] lg:text-[10px] font-bold text-slate-400">MOV</span>
                            <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[9px] lg:text-[10px] font-bold text-slate-400">90s Max</span>
                        </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="mt-8 lg:mt-12 flex justify-between items-center pt-6 lg:pt-8 border-t border-slate-100">
              {step > 1 ? (
                <button onClick={prevStep} className="flex items-center gap-1.5 lg:gap-2 text-slate-400 hover:text-slate-600 font-bold text-xs lg:text-sm transition-colors">
                  <ArrowLeft size={14} className="lg:w-4 lg:h-4" /> Précédent
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button onClick={nextStep} className="bg-slate-900 text-white px-5 lg:px-8 py-2.5 lg:py-3 rounded-lg lg:rounded-xl font-bold text-xs lg:text-sm flex items-center gap-1.5 lg:gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-slate-900/20">
                  Suivant <ArrowRight size={14} className="lg:w-4 lg:h-4" />
                </button>
              ) : (
                <button className="bg-emerald-600 text-white px-6 lg:px-10 py-2.5 lg:py-3 rounded-lg lg:rounded-xl font-bold text-xs lg:text-sm flex items-center gap-1.5 lg:gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/30">
                  Soumettre <CheckCircle size={14} className="lg:w-4 lg:h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadPitch;