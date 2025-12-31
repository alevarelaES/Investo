import React, { useState } from 'react';
import { X, Check, Loader2, Send } from 'lucide-react';

const WaitlistModal = ({ isOpen, onClose, type, t, lang }) => {
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulation d'envoi (Ici on branchera plus tard Supabase ou Tally)
    setTimeout(() => {
      setStatus('success');
      // Reset après 2 secondes et fermeture
      setTimeout(() => {
        setStatus('idle');
        setEmail('');
        setLinkedin('');
        onClose();
      }, 2000);
    }, 1500);
  };

  // Textes dynamiques selon le type (Startup ou Investisseur)
  const isInvestor = type === 'investor';
  
  const content = {
    fr: {
      title: isInvestor ? "Accédez au Deal Flow" : "Soumettez votre Pitch",
      desc: isInvestor 
        ? "Rejoignez les 50+ Business Angels suisses en attente. Accès sur validation uniquement." 
        : "Faites partie de la première cohorte 'Swiss Fintech'. Les places sont limitées.",
      label_email: "Email Professionnel",
      label_linkedin: "Lien Profil LinkedIn (Requis pour validation)",
      btn: isInvestor ? "Demander l'accès" : "Rejoindre la liste",
      success: "Demande reçue ! On vous recontacte sous 24h."
    },
    en: {
      title: isInvestor ? "Access Deal Flow" : "Submit your Pitch",
      desc: isInvestor 
        ? "Join 50+ Swiss Business Angels on the waitlist. Access upon validation only." 
        : "Be part of the first 'Swiss Fintech' cohort. Spots are limited.",
      label_email: "Professional Email",
      label_linkedin: "LinkedIn Profile Link (Required for validation)",
      btn: isInvestor ? "Request Access" : "Join Waitlist",
      success: "Request received! We'll be in touch within 24h."
    }
  };

  const text = content[lang] || content.fr;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Fond sombre et flou */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* La Fenêtre */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
        
        {/* Bandeau de couleur */}
        <div className={`h-2 w-full ${isInvestor ? 'bg-slate-900' : 'bg-emerald-600'}`}></div>

        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {status === 'success' ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-900">{text.success}</h3>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">{text.title}</h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{text.desc}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{text.label_email}</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="name@company.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{text.label_linkedin}</label>
                  <input 
                    type="url" 
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.1em] text-white flex items-center justify-center gap-2 shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] transition-all
                    ${isInvestor ? 'bg-slate-900 shadow-slate-900/20' : 'bg-emerald-600 shadow-emerald-600/30'}
                  `}
                >
                  {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <>{text.btn} <Send size={16} /></>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;