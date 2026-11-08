/**
 * Configuration globale de la marque fictive LAKOU ATELIER.
 * Centralise les paramètres de contact, monnaie et commande WhatsApp.
 */
export const SITE_CONFIG = {
  name: 'LAKOU ATELIER',
  baseline: "Artisanat d'Art & Décoration d'Intérieur",
  subheading: "L'élégance de la matière brute et du geste artisanal haïtien.",
  currency: 'USD',
  locale: 'fr-FR',
  
  // Paramètres WhatsApp centralisés
  whatsapp: {
    // Numéro de démonstration clairement identifiable (+509 est l'indicatif téléphonique d'Haïti)
    phoneNumber: '+50936964953',
    greeting: 'Bonjour LAKOU ATELIER, je souhaite commander les créations suivantes :',
    orderClosing: 'Pouvez-vous me confirmer la disponibilité et les modalités de livraison ? Merci !',
  },

  // Informations de contact fictives
  contact: {
    email: 'midleyjoseph45@gmail.com',
    address: 'Atelier de création & Galerie (Fictif), Port-au-Prince, Haïti',
    phoneDisplay: '+509 36 96 4953',
    schedule: 'Du lundi au samedi, de 9h00 à 18h00 (EST / UTC-5)',
  },

  // Image de secours standard (fallback SVG ou placeholder épuré)
  fallbackImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600' width='100%25' height='100%25'%3E%3Crect width='600' height='600' fill='%23F4EFE5'/%3E%3Ctext x='50%25' y='48%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='26' fill='%2325352D'%3ELAKOU ATELIER%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23D5A078'%3EPièce artisanale en cours de photographie%3C/text%3E%3C/svg%3E",
};
