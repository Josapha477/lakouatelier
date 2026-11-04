/**
 * Formate un montant numérique en devise USD via l'API standard Intl.NumberFormat.
 * 
 * @param {number} amount - Montant à formater
 * @returns {string} Montant formaté (ex: "$185.00" ou "$185")
 */
const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    return '$0';
  }
  return usdFormatter.format(amount);
}
