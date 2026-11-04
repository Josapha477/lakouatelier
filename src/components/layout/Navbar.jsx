import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, MessageCircle } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { createDirectWhatsAppUrl } from '../../utils/whatsapp';

const NAV_LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/a-propos', label: 'À Propos' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const location = useLocation();

  // Ferme automatiquement le menu mobile lors d'un changement d'URL
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-[#F4EFE5]/95 backdrop-blur-md border-b border-[#25352D]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Bouton Menu Mobile (Gauche sur mobile) */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="p-2 text-[#25352D] hover:text-[#D5A078] rounded-md transition-colors"
              aria-expanded={isMobileOpen}
              aria-label={isMobileOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo & Identité de marque (Centré sur mobile, à gauche sur desktop) */}
          <div className="flex-1 md:flex-initial text-center md:text-left">
            <Link
              to="/"
              className="inline-block group"
              aria-label="LAKOU ATELIER - Retour à l'accueil"
            >
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#25352D] group-hover:text-[#25352D]/80 transition-colors">
                LAKOU ATELIER
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-terracotta-dark font-semibold -mt-1">
                Artisanat Haïtien
              </span>
            </Link>
          </div>

          {/* Navigation Principale Desktop */}
          <nav
            aria-label="Navigation principale"
            className="hidden md:flex items-center space-x-8"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-widest transition-colors py-2 relative font-medium ${
                    isActive
                      ? 'text-[#25352D] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D5A078]'
                      : 'text-[#292725]/75 hover:text-[#25352D]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions Droite : WhatsApp direct & Bouton Panier */}
          <div className="flex items-center space-x-3">
            <a
              href={createDirectWhatsAppUrl('Bonjour LAKOU ATELIER, je souhaite échanger avec votre atelier.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs text-[#25352D] hover:text-[#D5A078] font-medium transition-colors px-3 py-1.5 rounded-full border border-[#25352D]/15 hover:border-[#D5A078]"
              title="Discuter avec l'atelier sur WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#D5A078]" />
              <span>Atelier</span>
            </a>

            <button
              type="button"
              onClick={openCart}
              className="relative p-2.5 text-[#25352D] hover:text-[#D5A078] hover:bg-[#25352D]/5 rounded-full transition-all active:scale-95"
              aria-label={`Panier (${totalItems} article${totalItems > 1 ? 's' : ''})`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#D5A078] text-[#F4EFE5] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Déroulant Mobile */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-[#25352D]/10 bg-[#F4EFE5] shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav
            aria-label="Navigation mobile"
            className="px-6 py-6 space-y-4"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `block text-sm uppercase tracking-widest py-2 transition-colors ${
                    isActive
                      ? 'text-[#25352D] font-bold border-l-2 border-[#D5A078] pl-3'
                      : 'text-[#292725]/80 hover:text-[#25352D] pl-3'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-4 mt-4 border-t border-[#25352D]/10">
              <a
                href={createDirectWhatsAppUrl('Bonjour LAKOU ATELIER, je souhaite échanger avec votre atelier.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded bg-[#25352D] text-[#F4EFE5] text-xs uppercase tracking-widest font-medium hover:bg-[#25352D]/90 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#D5A078]" />
                <span>Contacter l'atelier</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
