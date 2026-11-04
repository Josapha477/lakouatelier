import React, { useEffect, useState, useId } from 'react';
import { useLocation } from 'react-router-dom';
import { X, ShoppingBag, MessageCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import { formatCurrency } from '../../utils/formatCurrency';
import { createOrderWhatsAppUrl } from '../../utils/whatsapp';

/**
 * Tiroir coulissant du panier d'achat.
 * Conforme aux exigences d'accessibilité (ESC, aria, focus trap naturel).
 */
export default function CartDrawer({ onNavigateCatalog }) {
  const {
    items,
    totalItems,
    subtotal,
    isOpen,
    hasUnavailableItems,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const titleId = useId();
  const location = useLocation();

  // Ferme automatiquement le panier lors d'un changement de route (ex: historique navigateur ou clic de lien)
  useEffect(() => {
    if (isOpen) {
      closeCart();
    }
  }, [location.pathname, closeCart]);

  // Gestion de la touche Échap et du verrouillage du défilement
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const whatsappUrl = createOrderWhatsAppUrl(items, subtotal, {
    name: customerName.trim(),
    city: customerCity.trim(),
  });

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Rideau sombre d'arrière-plan (Backdrop) */}
      <div
        className="fixed inset-0 bg-[#292725]/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panneau coulissant */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside className="w-screen max-w-md bg-[#F4EFE5] text-[#292725] shadow-2xl flex flex-col border-l border-[#25352D]/15">
          {/* En-tête du tiroir */}
          <header className="flex items-center justify-between px-6 py-5 border-b border-[#25352D]/10 bg-white/60 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#25352D]" />
              <h2 id={titleId} className="font-serif text-lg font-medium text-[#25352D]">
                Votre Panier
              </h2>
              {totalItems > 0 && (
                <span className="bg-[#D5A078] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {totalItems > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-[#292725]/60 hover:text-[#D5A078] px-2 py-1 rounded transition-colors"
                >
                  Vider
                </button>
              )}
              <button
                type="button"
                onClick={closeCart}
                className="p-2 text-[#292725]/70 hover:text-[#25352D] rounded-full hover:bg-[#25352D]/5 transition-colors"
                aria-label="Fermer le panier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Corps du tiroir : État Vide ou Liste des articles */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-[#25352D]/5 flex items-center justify-center mb-4 text-[#25352D]/60">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl text-[#25352D] font-medium mb-2">
                  Votre sélection est vide
                </h3>
                <p className="text-sm text-[#292725]/75 max-w-xs mb-6">
                  Prenez le temps d'explorer nos pièces uniques issues de nos ateliers d'artisanat haïtien.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    if (onNavigateCatalog) onNavigateCatalog();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25352D] text-[#F4EFE5] text-xs font-medium tracking-widest uppercase rounded hover:bg-[#25352D]/90 transition-all shadow-sm active:scale-95"
                >
                  <span>Découvrir la collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#25352D]/10">
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pied du tiroir : Récapitulatif et validation de commande */}
          {items.length > 0 && (
            <footer className="border-t border-[#25352D]/10 bg-white/70 px-6 py-5 backdrop-blur-sm space-y-4">
              {/* Alerte si un article est indisponible */}
              {hasUnavailableItems && (
                <div className="flex items-start gap-2.5 p-3 rounded bg-[#D5A078]/15 border border-[#D5A078]/30 text-xs text-[#292725]">
                  <AlertTriangle className="w-4 h-4 text-[#D5A078] flex-shrink-0 mt-0.5" />
                  <p>
                    Certains articles de votre panier sont en rupture de stock. Veuillez les retirer avant de commander.
                  </p>
                </div>
              )}

              {/* Champs de coordonnées facultatifs pour personnaliser le message WhatsApp */}
              <div className="space-y-2 pt-1">
                <p className="text-xs font-medium text-[#25352D] uppercase tracking-wider">
                  Pour votre commande
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#25352D]/20 rounded text-[#292725] placeholder:text-[#292725]/40 focus:outline-none focus:border-[#25352D]"
                    aria-label="Votre nom complet pour la commande"
                  />
                  <input
                    type="text"
                    placeholder="Ville / Région"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-[#25352D]/20 rounded text-[#292725] placeholder:text-[#292725]/40 focus:outline-none focus:border-[#25352D]"
                    aria-label="Votre ville de livraison"
                  />
                </div>
              </div>

              {/* Ligne sous-total */}
              <div className="flex items-baseline justify-between pt-2 border-t border-[#25352D]/10">
                <span className="text-xs uppercase tracking-wider text-[#292725]/75 font-medium">
                  Sous-total ({totalItems} {totalItems > 1 ? 'articles' : 'article'})
                </span>
                <span className="font-serif text-xl font-semibold text-[#25352D]">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <p className="text-[11px] text-[#292725]/60 leading-relaxed">
                Paiement et expédition convenus directement avec notre atelier par échange personnalisé.
              </p>

              {/* Bouton de finalisation via WhatsApp */}
              <a
                href={hasUnavailableItems ? undefined : whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={hasUnavailableItems}
                className={`w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded text-xs font-medium tracking-widest uppercase transition-all shadow-sm ${
                  hasUnavailableItems
                    ? 'bg-[#292725]/20 text-[#292725]/40 cursor-not-allowed'
                    : 'bg-[#25352D] text-[#F4EFE5] hover:bg-[#25352D]/90 active:scale-[0.98]'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-[#D5A078]" />
                <span>Commander via WhatsApp</span>
              </a>
            </footer>
          )}
        </aside>
      </div>
    </div>
  );
}
