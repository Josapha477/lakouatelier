import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { createDirectWhatsAppUrl } from '../utils/whatsapp';

const FAQ_ITEMS = [
  {
    question: "Comment se déroule la commande d'une pièce ?",
    answer:
      "Sélectionnez vos pièces dans le catalogue pour composer votre panier, puis cliquez sur 'Commander via WhatsApp'. Un message pré-formaté récapitulant vos articles est généré pour que vous puissiez échanger directement avec l'atelier afin de confirmer les détails et l'expédition.",
  },
  {
    question: "Les pièces présentent-elles des variations ou irrégularités ?",
    answer:
      "Oui, absolument. Chaque création étant façonnée manuellement (au burin, au tour de potier ou à la gouge), de subtiles variations de teintes, d'aspérités et de dimensions témoignent de l'authenticité du travail artisanal et en font des pièces uniques.",
  },
  {
    question: "Est-il possible de demander des pièces sur-mesure ?",
    answer:
      "Oui. Selon la disponibilité des ateliers partenaires, certaines créations (notamment en métal ciselé et en bois massif) peuvent être adaptées à des dimensions particulières. Contactez-nous directement sur WhatsApp pour en discuter.",
  },
  {
    question: "Quels sont les délais d'échange et de réponse ?",
    answer:
      "L'atelier répond généralement aux messages WhatsApp sous 24h ouvrées, du lundi au samedi entre 9h et 18h (heure d'Haïti / EST).",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Renseignement sur une pièce',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Veuillez renseigner votre nom.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Veuillez renseigner votre adresse email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Adresse email invalide.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Veuillez saisir votre message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Le message doit contenir au moins 10 caractères.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'Renseignement sur une pièce',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const whatsappDirectUrl = createDirectWhatsAppUrl('Bonjour LAKOU ATELIER, je souhaite échanger directement avec vous.');

  return (
    <div className="flex-1 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* En-tête de la page */}
        <header className="max-w-2xl text-left space-y-3">
          <span className="text-xs uppercase tracking-widest text-terracotta-dark font-semibold">
            Contact & Échange
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#25352D] tracking-tight">
            Échangeons autour de votre projet
          </h1>
          <p className="text-sm sm:text-base text-[#292725]/80 font-light leading-relaxed">
            Une question sur une pièce, un projet de décoration d'intérieur ou une commande sur-mesure ? Nous sommes à votre écoute.
          </p>
        </header>

        {/* Grille principale : Contact direct à gauche, Formulaire à droite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Colonne gauche : Le canal direct WhatsApp et coordonnées */}
          <div className="lg:col-span-5 space-y-8 text-left">
            {/* Carte WhatsApp en vedette */}
            <div className="p-8 rounded-2xl bg-[#25352D] text-[#F4EFE5] space-y-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D5A078]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="w-12 h-12 rounded-full bg-[#F4EFE5]/10 flex items-center justify-center text-[#D5A078]">
                <MessageCircle className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#D5A078] font-semibold">
                  Canal Recommandé
                </span>
                <h2 className="font-serif text-2xl font-medium text-[#F4EFE5]">
                  Messagerie Directe WhatsApp
                </h2>
                <p className="text-xs text-[#F4EFE5]/80 leading-relaxed font-light">
                  Pour une réactivité maximale et un accompagnement sur-mesure, échangez directement avec notre responsable d'atelier.
                </p>
              </div>

              <div className="space-y-1 text-xs text-[#F4EFE5]/70 font-light">
                <p>• Réponse habituelle : sous 24h ouvrées</p>
                <p>• Numéro de démonstration : {SITE_CONFIG.whatsapp.phoneNumber}</p>
              </div>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#D5A078] text-[#25352D] text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#D5A078]/90 transition-all shadow-sm active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ouvrir WhatsApp</span>
              </a>
            </div>

            {/* Coordonnées institutionnelles fictives */}
            <div className="p-6 rounded-xl bg-white/70 border border-[#25352D]/10 space-y-4 text-xs">
              <h3 className="font-serif text-base font-medium text-[#25352D] pb-2 border-b border-[#25352D]/10">
                Coordonnées de l'Atelier
              </h3>

              <div className="flex items-start gap-3 text-[#292725]/80">
                <Mail className="w-4 h-4 text-[#D5A078] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#25352D]">Email :</p>
                  <p className="font-light">{SITE_CONFIG.contact.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#292725]/80 border-t border-[#25352D]/5 pt-3">
                <MapPin className="w-4 h-4 text-[#D5A078] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#25352D]">Adresse Galerie (Fictive) :</p>
                  <p className="font-light">{SITE_CONFIG.contact.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#292725]/80 border-t border-[#25352D]/5 pt-3">
                <Clock className="w-4 h-4 text-[#D5A078] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#25352D]">Horaires d'accueil :</p>
                  <p className="font-light">{SITE_CONFIG.contact.schedule}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite : Formulaire de contact */}
          <div className="lg:col-span-7 bg-white/70 p-8 sm:p-10 rounded-2xl border border-[#25352D]/10 shadow-sm text-left">
            <div className="mb-6 space-y-2">
              <h2 className="font-serif text-2xl font-medium text-[#25352D]">
                Formulaire de Message
              </h2>
              <p className="text-xs text-[#292725]/70 font-light">
                Transmettez-nous vos demandes générales ou propositions de collaboration.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#25352D]/10 text-[#25352D] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-[#D5A078]" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#25352D]">
                  Message transmis (Simulation)
                </h3>
                <div className="p-4 rounded-lg bg-[#D5A078]/15 border border-[#D5A078]/30 text-xs text-[#292725]/80 max-w-md mx-auto font-light leading-relaxed">
                  <p>
                    <strong>Note technique :</strong> Cette vitrine ne comporte aucun serveur backend actif ; votre message n'a donc pas été transmis par email. Pour un échange réel, veuillez utiliser le bouton <strong>WhatsApp</strong> ci-contre.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-[#25352D] text-[#F4EFE5] text-xs uppercase tracking-widest font-medium rounded hover:bg-[#25352D]/90 transition-all shadow-sm"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Champ Nom */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider text-[#25352D] font-semibold mb-1.5">
                    Votre nom complet *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Marie-Louise Valère"
                    className={`w-full text-xs px-4 py-3 bg-white border rounded-md text-[#292725] placeholder:text-[#292725]/40 focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-[#25352D]/20 focus:border-[#25352D]'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                </div>

                {/* Champ Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-[#25352D] font-semibold mb-1.5">
                    Votre adresse email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ex: marielouise@exemple.com"
                    className={`w-full text-xs px-4 py-3 bg-white border rounded-md text-[#292725] placeholder:text-[#292725]/40 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#25352D]/20 focus:border-[#25352D]'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>

                {/* Champ Objet */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs uppercase tracking-wider text-[#25352D] font-semibold mb-1.5">
                    Objet de votre demande
                  </label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-xs px-4 py-3 bg-white border border-[#25352D]/20 rounded-md text-[#25352D] focus:outline-none focus:border-[#25352D] cursor-pointer"
                  >
                    <option value="Renseignement sur une pièce">Renseignement sur une pièce du catalogue</option>
                    <option value="Création sur-mesure">Projet de création sur-mesure</option>
                    <option value="Presse & Partenariat">Presse & Partenariats décorateurs</option>
                    <option value="Autre demande">Autre question</option>
                  </select>
                </div>

                {/* Champ Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider text-[#25352D] font-semibold mb-1.5">
                    Votre message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Précisez votre demande, les pièces concernées ou votre projet..."
                    className={`w-full text-xs p-4 bg-white border rounded-md text-[#292725] placeholder:text-[#292725]/40 focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-[#25352D]/20 focus:border-[#25352D]'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
                </div>

                {/* Bouton d'envoi */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25352D] text-[#F4EFE5] text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#25352D]/90 transition-all shadow-sm active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4 text-[#D5A078]" />
                    <span>Envoyer le message</span>
                  </button>
                  <p className="text-[11px] text-[#292725]/50 text-center font-light mt-2.5">
                    Vitrine fictive de démonstration technique • Aucun envoi d'email réel
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Section FAQ concise */}
        <section className="pt-16 border-t border-[#25352D]/10 text-left space-y-8">
          <div className="max-w-xl space-y-2">
            <span className="text-xs uppercase tracking-widest text-terracotta-dark font-semibold">
              Questions Fréquentes
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#25352D]">
              Comprendre le fonctionnement d'atelier
            </h2>
            <p className="text-xs text-[#292725]/75 font-light">
              Les réponses essentielles sur notre mode d'échange et l'artisanat.
            </p>
          </div>

          <div className="max-w-3xl divide-y divide-[#25352D]/10 border-y border-[#25352D]/10">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left gap-4 py-1 text-sm font-serif font-medium text-[#25352D] hover:text-[#D5A078] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#D5A078] flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pt-2 pb-1 text-xs text-[#292725]/80 font-light leading-relaxed animate-in fade-in duration-150">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
