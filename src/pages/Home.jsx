import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Hammer,
  MessageCircle,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { PRODUCTS, getProductImage } from '../data/products';
import { SITE_CONFIG } from '../config/site';
import { createDirectWhatsAppUrl } from '../utils/whatsapp';
import useSEO from '../hooks/useSEO';



export default function Home() {
  useSEO({
    title: 'Artisanat haïtien | LAKOU ATELIER',
    description: 'Découvrez notre vitrine conceptuelle dédiée à l’artisanat et à la décoration d’inspiration haïtienne.',
    path: '/',
  });

  // Sélectionne exactement 4 produits vedettes définis dans le catalogue
  const featuredProducts = PRODUCTS.filter((product) => product.featured).slice(0, 4);

  // Visuel d'illustration pour le Hero (amphore ou céramique texturée)
  const heroImage = PRODUCTS.find((p) => p.id === 'vase-amphore-vallue');
  const heroImageSrc = heroImage
    ? getProductImage(heroImage, 0)
    : SITE_CONFIG.fallbackImage;

  return (
    <div className="flex-1 flex flex-col">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION : Éditoriale, Chaleureuse & Épurée             */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:py-24 border-b border-[#25352D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Colonne gauche : Narration et Titres */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25352D]/5 border border-[#25352D]/10 text-xs text-[#25352D] uppercase tracking-widest font-medium">
                <span className="w-2 h-2 rounded-full bg-[#D5A078]" />
                <span>Maison d'Artisanat Haïtien</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#25352D] font-normal leading-[1.15] tracking-tight">
                La noblesse de la matière brute et du geste patient.
              </h1>

              <p className="text-base sm:text-lg text-[#292725]/80 max-w-xl font-light leading-relaxed">
                LAKOU ATELIER célèbre le patrimoine vivant d’Haïti à travers une collection confidentielle d’objets d’intérieur façonnés à la main : fer ciselé, céramique de terre et essences d'acajou.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/catalogue"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#25352D] text-[#F4EFE5] text-xs uppercase tracking-widest font-medium rounded hover:bg-[#25352D]/90 transition-all shadow-sm active:scale-95"
                >
                  <span>Explorer le catalogue</span>
                  <ArrowRight className="w-4 h-4 text-[#D5A078]" />
                </Link>

                <Link
                  to="/a-propos"
                  className="inline-flex items-center justify-center px-7 py-4 border border-[#25352D]/25 text-[#25352D] text-xs uppercase tracking-widest font-medium rounded hover:bg-white/80 transition-colors"
                >
                  <span>Notre démarche</span>
                </Link>
              </div>

              {/* Indicateur discret de provenance */}
              <div className="pt-4 flex items-center gap-6 text-xs text-[#292725]/60 border-t border-[#25352D]/10 font-light">
                <span>• Ateliers de Noailles & Jacmel</span>
                <span>• Séries limitées & pièces uniques</span>
              </div>
            </div>

            {/* Colonne droite : Photographie Éditoriale */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Cadre arrière décoratif terracotta */}
                <div className="absolute -inset-2 rounded-2xl bg-[#D5A078]/20 -rotate-1 pointer-events-none" />

                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F4EFE5] shadow-xl border border-[#25352D]/10">
                  <img
                    src={heroImageSrc}
                    alt="Amphore artisanale façonnée en terre cuite chez LAKOU ATELIER"
                    className="w-full h-full object-cover"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = SITE_CONFIG.fallbackImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#25352D]/60 via-transparent to-transparent" />

                  {/* Cartouche d'information en bas d'image */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-white/90 backdrop-blur-md border border-[#25352D]/10 text-left">
                    <p className="text-[10px] uppercase tracking-widest text-[#D5A078] font-semibold">
                      Pièce Iconique
                    </p>
                    <p className="font-serif text-sm font-medium text-[#25352D] mt-0.5">
                      Amphore Terre d’Argile "Kòt"
                    </p>
                    <p className="text-[11px] text-[#292725]/70 font-light">
                      Argile naturelle locale & engobe de cendre
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. RÉASSURANCE : Les 3 Piliers d'Artisanat d'Art              */}
      {/* ------------------------------------------------------------- */}
      <section className="py-14 bg-white/60 border-b border-[#25352D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-4 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#25352D]/5 flex items-center justify-center text-[#D5A078] flex-shrink-0">
                <Sparkles className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div className="text-left space-y-1">
                <h2 className="font-serif text-base font-medium text-[#25352D]">
                  Matières Brutes & Nobles
                </h2>
                <p className="text-xs text-[#292725]/75 font-light leading-relaxed">
                  Fer martelé réhabilité, argiles locales et acajou issu de forêts gérées. Chaque composant est choisi pour sa sincérité texturale.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#25352D]/5 flex items-center justify-center text-[#D5A078] flex-shrink-0">
                <Hammer className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div className="text-left space-y-1">
                <h2 className="font-serif text-base font-medium text-[#25352D]">
                  Façonnage Manuel Lent
                </h2>
                <p className="text-xs text-[#292725]/75 font-light leading-relaxed">
                  Aucune fabrication en chaîne. Le burin, le tour de potier et le rabot d’ébéniste donnent naissance à des pièces singulières.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#25352D]/5 flex items-center justify-center text-[#D5A078] flex-shrink-0">
                <MessageCircle className="w-5 h-5 stroke-[1.75]" />
              </div>
              <div className="text-left space-y-1">
                <h2 className="font-serif text-base font-medium text-[#25352D]">
                  Échange Direct & Personnalisé
                </h2>
                <p className="text-xs text-[#292725]/75 font-light leading-relaxed">
                  Votre commande s'établit en lien direct via WhatsApp : confirmation des disponibilités, devis d'expédition et conseils d'entretien.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. SÉLECTION VEDETTE : Exactement 4 créations phares          */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 lg:py-24 border-b border-[#25352D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 text-left">
            <div>
              <span className="text-xs uppercase tracking-widest text-terracotta-dark font-semibold">
                Curation de Saison
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#25352D] mt-1.5">
                Sélection de Créations Vedettes
              </h2>
              <p className="text-sm text-[#292725]/75 max-w-xl font-light mt-2">
                Quatre pièces d'exception représentatives de la maîtrise technique et de la sensibilité artistique de nos ateliers partenaires.
              </p>
            </div>

            <Link
              to="/catalogue"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#25352D] hover:text-[#D5A078] font-semibold transition-colors pb-1 border-b border-[#25352D]/20 hover:border-[#D5A078]"
            >
              <span>Voir tout le catalogue ({PRODUCTS.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Grille responsive des 4 créations vedettes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. SAVOIR-FAIRE : Immersion dans les ateliers                 */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 lg:py-24 bg-white/40 border-b border-[#25352D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-terracotta-dark font-semibold">
              Héritage & Métiers d'Art
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#25352D]">
              Trois expressions du geste haïtien
            </h2>
            <p className="text-sm text-[#292725]/75 font-light leading-relaxed">
              Chaque univers artisanal s’ancre dans un territoire, une matière première et un dialogue intime avec la forme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Atelier 1 : Métal découpé */}
            <div className="bg-[#F4EFE5] p-8 rounded-xl border border-[#25352D]/10 flex flex-col justify-between text-left space-y-6 shadow-sm">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-terracotta-dark font-semibold">
                  Atelier I • Tradition de Noailles
                </span>
                <h3 className="font-serif text-xl font-medium text-[#25352D]">
                  Le Fer Ciselé & Découpé
                </h3>
                <p className="text-xs text-[#292725]/80 font-light leading-relaxed">
                  Issu d'une tradition unique au monde, le métal recyclé est aplati, tracé puis sculpté feuille par feuille au burin et au marteau à froid pour révéler une dentelle d'acier expressive.
                </p>
              </div>
              <div className="pt-4 border-t border-[#25352D]/10 flex items-center justify-between text-xs text-[#25352D]/70 font-light">
                <span>Finition patine graphite</span>
                <span className="font-serif italic">Noailles</span>
              </div>
            </div>

            {/* Atelier 2 : Terre & Céramique */}
            <div className="bg-[#F4EFE5] p-8 rounded-xl border border-[#25352D]/10 flex flex-col justify-between text-left space-y-6 shadow-sm">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-terracotta-dark font-semibold">
                  Atelier II • Collines du Sud
                </span>
                <h3 className="font-serif text-xl font-medium text-[#25352D]">
                  L'Argile & le Grès Minéral
                </h3>
                <p className="text-xs text-[#292725]/80 font-light leading-relaxed">
                  Tirée des carrières des hauteurs, l’argile est façonnée selon les silhouettes ancestrales de jarres et d'amphores, enrichie d'engobes de terres ocres et cuite au bois.
                </p>
              </div>
              <div className="pt-4 border-t border-[#25352D]/10 flex items-center justify-between text-xs text-[#25352D]/70 font-light">
                <span>Texture minérale brute</span>
                <span className="font-serif italic">Vallue</span>
              </div>
            </div>

            {/* Atelier 3 : Ébénisterie */}
            <div className="bg-[#F4EFE5] p-8 rounded-xl border border-[#25352D]/10 flex flex-col justify-between text-left space-y-6 shadow-sm">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-terracotta-dark font-semibold">
                  Atelier III • Ébénisterie d'Art
                </span>
                <h3 className="font-serif text-xl font-medium text-[#25352D]">
                  L'Acajou & le Gaïac Massif
                </h3>
                <p className="text-xs text-[#292725]/80 font-light leading-relaxed">
                  Travaillé dans le respect du veinage naturel, le bois tropical est sculpté monobloc puis nourri à la cire d’abeille et à l'huile végétale pour un toucher soyeux et chaleureux.
                </p>
              </div>
              <div className="pt-4 border-t border-[#25352D]/10 flex items-center justify-between text-xs text-[#25352D]/70 font-light">
                <span>Finition cire naturelle</span>
                <span className="font-serif italic">Forêt des Pins</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. INVITATION WHATSAPP : Échange direct avec l'atelier        */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-[#25352D] text-[#F4EFE5] relative overflow-hidden">
        {/* Motif d'ambiance discret */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D5A078_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#F4EFE5]/10 flex items-center justify-center text-[#D5A078]">
            <MessageCircle className="w-7 h-7 stroke-[1.5]" />
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D5A078] font-semibold">
              Dialogue Direct & Sans Intermédiaire
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F4EFE5] leading-tight">
              Une création sur-mesure ou un conseil pour votre intérieur ?
            </h2>
            <p className="text-sm sm:text-base text-[#F4EFE5]/80 font-light leading-relaxed">
              Nous répondons directement à vos questions, validons les dimensions idéales et organisons l'expédition sécurisée de votre commande.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={createDirectWhatsAppUrl('Bonjour LAKOU ATELIER, je souhaite échanger sur une création ou un projet de décoration.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D5A078] text-[#25352D] text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#D5A078]/90 transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Démarrer un échange WhatsApp</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-[#F4EFE5]/25 text-[#F4EFE5] text-xs uppercase tracking-widest font-medium rounded hover:bg-[#F4EFE5]/10 transition-colors"
            >
              <span>Autres coordonnées</span>
            </Link>
          </div>

          <p className="text-[11px] text-[#F4EFE5]/50 font-light pt-2">
            Réponse habituelle sous 24h ouvrées • Numéro d'atelier fictif de démonstration : {SITE_CONFIG.whatsapp.phoneNumber}
          </p>
        </div>
      </section>
    </div>
  );
}
