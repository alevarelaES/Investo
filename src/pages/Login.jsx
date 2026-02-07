import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import translations from '../data/translations';
import logo from '../assets/Logo.jpg';

const Login = ({ onLogin, onLangChange, initialLang = 'fr' }) => {
  const [lang, setLang] = useState(initialLang);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    userType: 'investor' // 'investor' ou 'startup'
  });

  const t = (key) => translations[lang]?.[key] || translations['fr'][key] || key;

  const handleLangChange = (newLang) => {
    setLang(newLang);
    if (onLangChange) onLangChange(newLang);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation de connexion - redirige vers le dashboard approprié
    if (onLogin) onLogin(formData.userType);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      
      {/* Logo & Langue en haut */}
      <div className="fixed top-6 left-0 right-0 flex justify-between items-center px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          {/* REMPLACEZ L'ANCIEN BLOC DIV SVG PAR L'IMAGE */}
          <img 
              src={logo} 
              alt="Logo Investo" 
              className="w-9 h-9 rounded-xl shadow-lg shadow-emerald-200 object-cover" 
          />
          <span className="text-xl font-black tracking-tight uppercase text-slate-900">Invest<span className="text-emerald-500">o</span></span>
        </div>

      {/* Formulaire Principal */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
          
          {/* Titre */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">
              {isLogin ? t('login') : (lang === 'fr' ? 'Inscription' : 'Sign Up')}
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              {isLogin 
                ? (lang === 'fr' ? 'Connectez-vous pour accéder à votre espace' : 'Sign in to access your workspace')
                : (lang === 'fr' ? 'Créez votre compte en quelques secondes' : 'Create your account in seconds')
              }
            </p>
          </div>

          {/* Toggle Investisseur / Startup */}
          <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, userType: 'investor' })}
              className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                formData.userType === 'investor'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t('nav_investors')}
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, userType: 'startup' })}
              className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                formData.userType === 'startup'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t('nav_startups')}
            </button>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  {lang === 'fr' ? 'Nom complet' : 'Full name'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder={lang === 'fr' ? 'Votre nom' : 'Your name'}
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                {lang === 'fr' ? 'Email' : 'Email'}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="vous@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                {lang === 'fr' ? 'Mot de passe' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-slate-600 font-medium">{lang === 'fr' ? 'Se souvenir' : 'Remember me'}</span>
                </label>
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-bold">
                  {lang === 'fr' ? 'Mot de passe oublié ?' : 'Forgot password?'}
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 active:scale-95 transition-all mt-6"
            >
              {isLogin ? (
                <>
                  <LogIn size={16} />
                  {t('login')}
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  {lang === 'fr' ? 'Créer mon compte' : 'Create account'}
                </>
              )}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-slate-600 hover:text-emerald-600 font-medium transition-colors"
            >
              {isLogin 
                ? (lang === 'fr' ? 'Pas encore de compte ? ' : "Don't have an account? ")
                : (lang === 'fr' ? 'Déjà inscrit ? ' : 'Already have an account? ')
              }
              <span className="font-bold text-emerald-600">
                {isLogin 
                  ? (lang === 'fr' ? "S'inscrire" : 'Sign up')
                  : (lang === 'fr' ? 'Se connecter' : 'Sign in')
                }
              </span>
            </button>
          </div>

          {/* Démo Note */}
          <div className="mt-6 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
            <p className="text-[10px] text-emerald-700 font-medium text-center leading-relaxed">
              {lang === 'fr' 
                ? '🚀 Mode démo : utilisez n\'importe quel email/mot de passe pour tester'
                : '🚀 Demo mode: use any email/password to test'
              }
            </p>
          </div>
        </div>

        {/* Lien retour */}
        <div className="text-center mt-6">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.location.reload(); }}
            className="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors"
          >
            ← {lang === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
