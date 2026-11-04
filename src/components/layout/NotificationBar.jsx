import React from 'react';

/**
 * Bandeau d'information supérieur discret.
 * Met en valeur l'authenticité artisanale et le mode de commande via WhatsApp.
 */
export default function NotificationBar() {
  return (
    <aside
      aria-label="Annonce boutique"
      className="bg-[#25352D] text-[#F4EFE5] text-[11px] sm:text-xs py-2 px-4 text-center tracking-wider font-light border-b border-[#F4EFE5]/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D5A078] animate-pulse" />
        <span>
          Créations artisanales façonnées à la main en Haïti • Commandes directes & personnalisées via WhatsApp
        </span>
      </div>
    </aside>
  );
}
