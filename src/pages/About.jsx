import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Heart, Feather, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export default function About() {
  return (
    <div className="flex-1 py-12 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* En-tête éditorial */}
        <header className="max-w-3xl text-left space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25352D]/5 border border-[#25352D]/10 text-xs text-[#25352D] uppercase tracking-widest font-medium">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-dark" />
            <span className="text-terracotta-dark font-semibold">Récit de Marque & Manifeste</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#25352D] font-normal tracking-tight leading-[1.15]">
            L'esprit du Lakou : le rassemblement autour de la matière et du geste.
          </h1>

          <p className="text-base sm:text-lg text-[#292725]/80 font-light leading-relaxed">
            Dans la culture haïtienne, le <em>Lakou</em> désigne la cour partagée, l'espace où la communauté vit, échange et transmet ses rituels. LAKOU ATELIER est né d'une vision : prolonger cette philosophie collective en créant une passerelle entre l'artisanat traditionnel d'Haïti et les intérieurs contemporains.
          </p>

          <div className="p-4 rounded-lg bg-[#D5A078]/15 border border-[#D5A078]/30 text-xs text-[#292725]/80 font-light">
            <p>
              <strong>Notice éditoriale :</strong> LAKOU ATELIER est une marque fictive conçue pour illustrer l'élégance du design d'artisanat d'intérieur. Les récits, ateliers et noms de créations sont des œuvres de fiction rendant hommage à la créativité des artistes et artisans haïtiens.
            </p>
          </div>
        </header>

        {/* Photographie d'ambiance éditoriale */}
        <section className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-[#25352D] shadow-md border border-[#25352D]/10">
          <img
            src="https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1600&q=80"
            alt="Atelier d'artisanat d'art, travail du bois et des matières brutes"
            className="w-full h-full object-cover opacity-85"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = SITE_CONFIG.fallbackImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#25352D]/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-left text-white max-w-xl">
            <span className="text-[10px] uppercase tracking-widest text-[#D5A078] font-semibold">
              Philosophie de l'Atelier
            </span>
            <p className="font-serif text-lg sm:text-xl font-medium mt-1">
              "Honorer le temps long du travail manuel et la beauté des imperfections singulières."
            </p>
          </div>
        </section>

        {/* Les 3 Engagements de la Marque */}
        <section className="space-y-10 text-left">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-terracotta-dark font-semibold">
              Nos Piliers Fondateurs
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#25352D] mt-1.5">
              Trois principes qui guident chaque création
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/70 rounded-xl border border-[#25352D]/10 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#25352D]/5 flex items-center justify-center text-[#D5A078]">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#25352D]">
                1. La Matière dans sa Vérité
              </h3>
              <p className="text-xs text-[#292725]/75 font-light leading-relaxed">
                Nous privilégions les textures brutes non dénaturées : la tôle d'acier façonnée au burin, l'argile chamottée et les bois massifs simplement nourris à la cire. Aucun placage plastique ni artifice de production industrielle.
              </p>
            </div>

            <div className="p-6 bg-white/70 rounded-xl border border-[#25352D]/10 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#25352D]/5 flex items-center justify-center text-[#D5A078]">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#25352D]">
                2. Le Geste et la Transmission
              </h3>
              <p className="text-xs text-[#292725]/75 font-light leading-relaxed">
                Derrière chaque objet se trouve le savoir-faire d'ateliers familiaux et de collectifs d'artisans. Chaque pièce est signée d'une empreinte manuelle, faisant de chaque exemplaire un objet de collection unique.
              </p>
            </div>

            <div className="p-6 bg-white/70 rounded-xl border border-[#25352D]/10 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#25352D]/5 flex items-center justify-center text-[#D5A078]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#25352D]">
                3. La Proximité d'Échange
              </h3>
              <p className="text-xs text-[#292725]/75 font-light leading-relaxed">
                Plutôt qu'un tunnel d'achat impersonnel, nous favorisons le dialogue direct via messagerie instantanée, permettant de vous conseiller, de vérifier les dimensions et de convenir d'expéditions soignées.
              </p>
            </div>
          </div>
        </section>

        {/* Appel à l'action final */}
        <section className="bg-white/50 p-8 sm:p-12 rounded-2xl border border-[#25352D]/10 text-center space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#25352D]">
            Envie de faire entrer ces pièces dans votre intérieur ?
          </h2>
          <p className="text-sm text-[#292725]/80 font-light max-w-lg mx-auto leading-relaxed">
            Découvrez nos créations actuelles ou contactez notre équipe pour un conseil personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25352D] text-[#F4EFE5] text-xs uppercase tracking-widest font-medium rounded hover:bg-[#25352D]/90 transition-all shadow-sm"
            >
              <span>Découvrir la collection</span>
              <ArrowRight className="w-4 h-4 text-[#D5A078]" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-7 py-3.5 border border-[#25352D]/20 text-[#25352D] text-xs uppercase tracking-widest font-medium rounded hover:bg-white transition-colors"
            >
              <span>Nous contacter</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
