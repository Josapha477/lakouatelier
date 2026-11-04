import { SITE_CONFIG } from '../config/site.js';
import { formatCurrency } from './formatCurrency.js';

/**
 * Nettoie le numéro de téléphone pour l'URL wa.me (retire espaces, tirets, etc.).
 * 
 * @param {string} phone
 * @returns {string} Numéro nettoyé
 */
export function sanitizePhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') return '';
  return phone.replace(/[^\d+]/g, '').replace('+', '');
}

/**
 * Construit un lien WhatsApp direct avec un message optionnel pré-rempli.
 * Centralise l'accès WhatsApp pour l'ensemble du site.
 * 
 * @param {string} [customMessage] - Message optionnel pré-rempli
 * @returns {string} URL complète https://wa.me/...
 */
export function createDirectWhatsAppUrl(customMessage = '') {
  const phone = sanitizePhoneNumber(SITE_CONFIG.whatsapp.phoneNumber);
  if (!customMessage || !customMessage.trim()) {
    return `https://wa.me/${phone}`;
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(customMessage.trim())}`;
}

/**
 * Construit l'URL WhatsApp de commande à partir du contenu d'un panier.
 * 
 * @param {Array<{product: object, quantity: number}>} items - Articles du panier
 * @param {number} totalAmount - Total de la commande
 * @param {object} [customerInfo] - Informations optionnelles du client
 * @returns {string} URL WhatsApp complète pré-remplie
 */
export function createOrderWhatsAppUrl(items = [], totalAmount = 0, customerInfo = {}) {
  const phone = sanitizePhoneNumber(SITE_CONFIG.whatsapp.phoneNumber);
  
  if (!items || items.length === 0) {
    const defaultText = `${SITE_CONFIG.whatsapp.greeting}\n\n(Panier vide - demande de renseignements)`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(defaultText)}`;
  }

  const lines = [
    SITE_CONFIG.whatsapp.greeting,
    '',
    '--- DÉTAIL DU PANIER ---',
  ];

  items.forEach((item, index) => {
    const lineTotal = item.product.price * item.quantity;
    lines.push(
      `${index + 1}. ${item.product.name} (x${item.quantity}) — ${formatCurrency(lineTotal)}`
    );
  });

  lines.push('');
  lines.push(`*TOTAL ESTIMÉ : ${formatCurrency(totalAmount)}*`);
  lines.push('');
  lines.push('--- COORDONNÉES CLIENT ---');
  lines.push(`Nom : ${customerInfo.name || '[À renseigner]'}`);
  lines.push(`Ville / Région : ${customerInfo.city || '[À renseigner]'}`);
  if (customerInfo.note) {
    lines.push(`Remarques : ${customerInfo.note}`);
  }
  lines.push('');
  lines.push(SITE_CONFIG.whatsapp.orderClosing);

  const fullText = lines.join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(fullText)}`;
}

/**
 * Construit un lien WhatsApp pour demander des informations sur une création spécifique.
 * 
 * @param {object} product - Produit concerné
 * @returns {string}
 */
export function createProductInquiryUrl(product) {
  if (!product) return createDirectWhatsAppUrl();
  const text = `Bonjour LAKOU ATELIER, je souhaite en savoir plus sur la création "${product.name}" (${formatCurrency(product.price)} - Réf: ${product.id}). Est-elle disponible ?`;
  return createDirectWhatsAppUrl(text);
}
