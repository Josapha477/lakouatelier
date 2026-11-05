import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Check,
  Minus,
  Plus,
  Compass,
  AlertCircle,
  Truck,
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { PRODUCTS, getProductImage } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { SITE_CONFIG } from '../config/site';
import { formatCurrency } from '../utils/formatCurrency';
import { createProductInquiryUrl } from '../utils/whatsapp';
import ProductCard from '../components/product/ProductCard';
import useSEO from '../hooks/useSEO';



export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Réinitialise la galerie et la quantité lors du changement de produit (navigation entre pièces)
  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
    setJustAdded(false);
  }, [id]);

  // Recherche du produit dans le catalogue centralisé
  const product = PRODUCTS.find((p) => p.id === id);
  
  useSEO({
  title: product
    ? `${product.name} | LAKOU ATELIER`
    : 'Produit introuvable | LAKOU ATELIER',

  description: product
    ? product.shortDescription
    : 'Cette création est introuvable dans notre catalogue.',

  path: product ? `/produit/${product.id}` : '/catalogue',

  image: product?.images?.[0] ?? null,
});
   
  // Si le produit n'existe pas
  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-5 bg-white/60 p-8 rounded-xl border border-[#25352D]/10">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#25352D]/5 flex items-center justify-center text-[#D5A078]">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-medium text-[#25352D]">
            Création introuvable
          </h1>
          <p className="text-xs text-[#292725]/75 leading-relaxed font-light">
            La pièce d'artisanat que vous recherchez n'est pas ou plus répertoriée dans notre catalogue.
          </p>
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25352D] text-[#F4EFE5] text-xs uppercase tracking-widest font-medium rounded hover:bg-[#25352D]/90 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retourner au catalogue</span>
          </Link>
        </div>
      </div>
    );
  }

  // Métadonnées de catégorie
  const categoryMeta = CATEGORIES.find((c) => c.id === product.category);
  const categoryName = categoryMeta ? categoryMeta.name : product.category;

  // Galerie d'images
  const mainImageSrc = getProductImage(product, selectedImageIndex);
  const imagesList = product.images && product.images.length > 0 ? product.images : [mainImageSrc];

  // URL WhatsApp pour demande spécifique sur cette création
  const whatsappInquiryUrl = createProductInquiryUrl(product);

  // Produits suggérés (3 autres pièces excluant la courante)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    const success = addToCart(product.id, quantity);
    if (success) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  return (
    <div className="flex-1 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Fil d'Ariane & Bouton retour */}
        <nav aria-label="Fil d'ariane" className="flex items-center justify-between text-xs text-[#292725]/60 font-light">
          <div className="flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-[#25352D] transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link to="/catalogue" className="hover:text-[#25352D] transition-colors">
              Catalogue
            </Link>
            <span>/</span>
            <span className="text-[#25352D] font-medium truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </div>

          <Link
            to="/catalogue"
            className="hidden sm:inline-flex items-center gap-1.5 text-[#25352D] hover:text-[#D5A078] font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Toutes les créations</span>
          </Link>
        </nav>

        {/* Grille principale : Galerie à gauche, Fiche détaillée à droite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Colonne gauche : Galerie Photo */}
          <div className="lg:col-span-7 space-y-4">
            {/* Visuel principal avec ratio éditorial */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F4EFE5] border border-[#25352D]/10 shadow-sm">
              <img
                src={mainImageSrc}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = SITE_CONFIG.fallbackImage;
                }}
              />

              {!product.inStock && (
                <div className="absolute inset-0 bg-[#292725]/60 backdrop-blur-[2px] flex items-center justify-center p-4">
                  <span className="bg-[#292725] text-white text-xs uppercase tracking-widest px-4 py-2 rounded font-medium">
                    Rupture temporaire
                  </span>
                </div>
              )}
            </div>

            {/* Miniatures cliquables si plusieurs visuels */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden bg-[#F4EFE5] border-2 transition-all flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#25352D] ring-2 ring-[#D5A078]/40'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`Afficher la vue ${idx + 1} de ${product.name}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - Vue ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = SITE_CONFIG.fallbackImage;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colonne droite : Récit, Spécifications, Panier et WhatsApp */}
          <div className="lg:col-span-5 space-y-8 text-left">
            {/* En-tête du produit */}
            <div className="space-y-3 pb-6 border-b border-[#25352D]/10">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] uppercase tracking-widest text-terracotta-dark font-semibold">
                  {categoryName}
                </span>
                <span className="text-xs text-[#292725]/60 font-light">
                  Réf. {product.id}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#25352D] leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 pt-1">
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#25352D]">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-xs text-[#292725]/60 font-light">
                  TVA incluse • Expédition sur devis
                </span>
              </div>
            </div>

            {/* Récit et description de la création */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest text-[#25352D] font-semibold">
                L'Histoire de la Pièce
              </h2>
              <p className="text-sm text-[#292725]/85 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Tableau de spécifications artisanales */}
            <div className="bg-white/70 p-5 rounded-lg border border-[#25352D]/10 space-y-3 text-xs">
              <h3 className="font-serif text-sm font-medium text-[#25352D] pb-2 border-b border-[#25352D]/10">
                Fiche Technique & Savoir-Faire
              </h3>
              
              <div className="grid grid-cols-3 gap-2 py-1">
                <span className="text-[#292725]/60 font-light">Matériaux :</span>
                <span className="col-span-2 text-[#25352D] font-medium">{product.materials}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1 border-t border-[#25352D]/5">
                <span className="text-[#292725]/60 font-light">Dimensions :</span>
                <span className="col-span-2 text-[#25352D] font-medium">{product.dimensions}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1 border-t border-[#25352D]/5">
                <span className="text-[#292725]/60 font-light">Atelier :</span>
                <span className="col-span-2 text-[#25352D] font-medium">{product.artisan}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1 border-t border-[#25352D]/5">
                <span className="text-[#292725]/60 font-light">Origine :</span>
                <span className="col-span-2 text-[#25352D] font-medium">{product.origin}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1 border-t border-[#25352D]/5">
                <span className="text-[#292725]/60 font-light">Disponibilité :</span>
                <span className="col-span-2 text-[#25352D] font-medium">{product.leadTime}</span>
              </div>
            </div>

            {/* Sélecteur de Quantité et Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-[#292725]/70 font-medium">
                  Quantité :
                </span>
                <div className="inline-flex items-center border border-[#25352D]/20 rounded bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1 || !product.inStock}
                    className="p-2 text-[#25352D] hover:bg-[#F4EFE5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Diminuer la quantité"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 py-1 text-sm font-semibold text-[#292725] min-w-[2.5rem] text-center select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    disabled={!product.inStock}
                    className="p-2 text-[#25352D] hover:bg-[#F4EFE5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Augmenter la quantité"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bouton d'ajout au panier */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded text-xs uppercase tracking-widest font-semibold transition-all shadow-sm ${
                  !product.inStock
                    ? 'bg-[#292725]/20 text-[#292725]/40 cursor-not-allowed'
                    : justAdded
                    ? 'bg-[#25352D] text-[#F4EFE5]'
                    : 'bg-[#25352D] text-[#F4EFE5] hover:bg-[#25352D]/90 active:scale-[0.99]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-[#D5A078]" />
                    <span>Ajouté au panier !</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#D5A078]" />
                    <span>Ajouter à ma sélection • {formatCurrency(product.price * quantity)}</span>
                  </>
                )}
              </button>

              {/* Bouton secondaire : Demande de renseignements directe via WhatsApp */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded border border-[#25352D]/20 bg-white/80 hover:bg-white text-[#25352D] hover:text-[#25352D] text-xs uppercase tracking-widest font-medium transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#D5A078]" />
                <span>Poser une question sur WhatsApp</span>
              </a>
            </div>

            {/* Note de réassurance de transport et fabrication */}
            <div className="pt-4 border-t border-[#25352D]/10 grid grid-cols-2 gap-4 text-[11px] text-[#292725]/70 font-light">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D5A078] flex-shrink-0" />
                <span>Emballage renforcé sur-mesure</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D5A078] flex-shrink-0" />
                <span>Certificat d'artisanat d'art</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section de créations associées / suggestions */}
        {relatedProducts.length > 0 && (
          <section className="pt-16 border-t border-[#25352D]/10 text-left space-y-8">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-terracotta-dark font-semibold">
                  Pour Compléter Votre Intérieur
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#25352D] mt-1">
                  Autres Pièces de la Maison
                </h2>
              </div>
              <Link
                to="/catalogue"
                className="text-xs uppercase tracking-widest text-[#25352D] hover:text-[#D5A078] font-medium hidden sm:inline"
              >
                Tout voir →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
