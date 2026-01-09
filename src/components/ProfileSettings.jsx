import React, { useState } from 'react';
import { User, Mail, Building2, MapPin, Phone, Save, X } from 'lucide-react';

const ProfileSettings = ({ onClose, lang = 'fr' }) => {
  const [formData, setFormData] = useState({
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    company: 'Family Office Dupont',
    location: 'Genève, Suisse',
    phone: '+41 22 123 45 67',
    bio: 'Investisseur expérimenté spécialisé dans les technologies durables et la santé.'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler la sauvegarde
    console.log('Profil mis à jour:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              {lang === 'fr' ? 'Modifier le profil' : 'Edit Profile'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {lang === 'fr' ? 'Mettez à jour vos informations personnelles' : 'Update your personal information'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="space-y-5">
            
            {/* Photo de profil */}
            <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-2xl">
                JD
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 mb-1">
                  {lang === 'fr' ? 'Photo de profil' : 'Profile picture'}
                </p>
                <button type="button" className="text-xs text-emerald-600 hover:text-emerald-700 font-bold">
                  {lang === 'fr' ? 'Changer' : 'Change'}
                </button>
              </div>
            </div>

            {/* Nom */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                {lang === 'fr' ? 'Nom complet' : 'Full name'}
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                {lang === 'fr' ? 'Email' : 'Email'}
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Entreprise */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                {lang === 'fr' ? 'Entreprise' : 'Company'}
              </label>
              <div className="relative">
                <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Localisation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                {lang === 'fr' ? 'Localisation' : 'Location'}
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                {lang === 'fr' ? 'Téléphone' : 'Phone'}
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                {lang === 'fr' ? 'Biographie' : 'Bio'}
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-white transition-colors"
          >
            {lang === 'fr' ? 'Annuler' : 'Cancel'}
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
          >
            <Save size={16} />
            {lang === 'fr' ? 'Enregistrer' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
