import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

export default function Footer() {
  return (
    <footer className="bg-[#25352D] text-[#F4EFE5] border-t border-[#F4EFE5]/10 mt-auto">
      {/* Section principale du Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Colonne 1 : Identité et Récit de marque */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-[#F4EFE5]">
                LAKOU ATELIER
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-[#D5A078] font-medium mt-0.5">
                Artisanat d'Art Haïtien
              </p>
            </div>
            <p className="text-xs text-[#F4EFE5]/75 leading-relaxed font-light">
              Maison de création dédiée à la valorisation des matières brutes et des techniques manuelles transmises au cœur des ateliers d'Haïti : fer ciselé, céramique de terre, essences d'acajou et tressages végétaux.
            </p>
          </div>

          {/* Colonne 2 : Liens de navigation */}
          <div>
            <h3 className="font-serif text-sm tracking-wider uppercase text-[#D5A078] font-semibold mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="text-[#F4EFE5]/80 hover:text-[#D5A078] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="text-[#F4EFE5]/80 hover:text-[#D5A078] transition-colors">
                  Catalogue des Pièces
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-[#F4EFE5]/80 hover:text-[#D5A078] transition-colors">
                  À Propos de la Démarche
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#F4EFE5]/80 hover:text-[#D5A078] transition-colors">
                  Contact & Commandes
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Matières & Savoir-faire */}
          <div>
            <h3 className="font-serif text-sm tracking-wider uppercase text-[#D5A078] font-semibold mb-4">
              Savoir-Faire
            </h3>
            <ul className="space-y-2.5 text-xs text-[#F4EFE5]/75 font-light">
              <li>Fer ciselé & métal martelé</li>
              <li>Argile locale & grès chamotté</li>
              <li>Acajou massif d'ébénisterie</li>
              <li>Vannerie de latanier & sisal</li>
              <li>Art de la table & luminaires</li>
            </ul>
          </div>

          {/* Colonne 4 : Contact & Commande WhatsApp */}
          <div>
            <h3 className="font-serif text-sm tracking-wider uppercase text-[#D5A078] font-semibold mb-4">
              Échange Direct
            </h3>
            <div className="space-y-3 text-xs">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp.phoneNumber.replace(/[^\d+]/g, '').replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#D5A078] hover:text-[#D5A078]/80 font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span>Commander via WhatsApp</span>
              </a>

              <div className="flex items-center gap-2 text-[#F4EFE5]/70">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#D5A078]" />
                <span>{SITE_CONFIG.contact.email}</span>
              </div>

              <div className="flex items-start gap-2 text-[#F4EFE5]/70">
                <MapPin className="w-4 h-4 flex-shrink-0 text-[#D5A078] mt-0.5" />
                <span>{SITE_CONFIG.contact.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne inférieure : Avertissement de projet fictif & copyright */}
        <div className="mt-12 pt-8 border-t border-[#F4EFE5]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#F4EFE5]/60 font-light">
          <p>
            © {new Date().getFullYear()} LAKOU ATELIER. Marque fictive à vocation artistique et pédagogique.
          </p>
          <p className="text-center sm:text-right">
            Conception & Architecture React 18 • Aucune transaction financière réelle
          </p>
        </div>
      </div>
    </footer>
  );
}
