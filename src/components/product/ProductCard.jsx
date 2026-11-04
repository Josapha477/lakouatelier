import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';
import { getProductImage } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { SITE_CONFIG } from '../../config/site';

/**
 * Carte produit réutilisable et responsive pour les grilles d'accueil et de catalogue.
 * 
 * @param {object} props
 * @param {object} props.product - Données complètes du produit
 * @param {string} [props.className] - Classes CSS additionnelles
 */
export default function ProductCard({ product, className = '' }) {
  const { addToCart } = useCart();
  const imageSrc = getProductImage(product, 0);

  // Recherche du libellé de catégorie lisible
  const categoryMeta = CATEGORIES.find((cat) => cat.id === product.category);
  const categoryName = categoryMeta ? categoryMeta.name : product.category;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock) {
      addToCart(product.id, 1);
    }
  };

  return (
    <article
      className={`group flex flex-col bg-white/70 hover:bg-white rounded-lg overflow-hidden border border-[#25352D]/10 hover:border-[#D5A078]/40 transition-all duration-300 shadow-sm hover:shadow-md ${className}`}
    >
      {/* Zone visuelle avec lien vers la fiche produit */}
      <Link
        to={`/produit/${product.id}`}
        className="relative block aspect-[4/5] bg-[#F4EFE5] overflow-hidden"
        aria-label={`Voir la fiche détaillée de ${product.name}`}
      >
        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = SITE_CONFIG.fallbackImage;
          }}
        />

        {/* Badge de catégorie */}
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-[#25352D]/85 backdrop-blur-sm text-[#F4EFE5] text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-sm font-medium">
            {categoryName}
          </span>
        </div>

        {/* Badge si hors stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-[#292725]/60 backdrop-blur-[1px] flex items-center justify-center p-2">
            <span className="bg-[#292725] text-white text-xs uppercase tracking-widest px-3 py-1.5 rounded font-medium">
              Rupture temporaire
            </span>
          </div>
        )}
      </Link>

      {/* Informations textuelles et actions */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-serif text-base sm:text-lg font-medium text-[#25352D] group-hover:text-[#D5A078] transition-colors line-clamp-1">
              <Link to={`/produit/${product.id}`}>
                {product.name}
              </Link>
            </h3>
            <span className="text-sm sm:text-base font-semibold text-[#25352D] whitespace-nowrap">
              {formatCurrency(product.price)}
            </span>
          </div>

          <p className="text-xs text-[#292725]/70 line-clamp-2 mt-1.5 leading-relaxed font-light">
            {product.shortDescription}
          </p>
        </div>

        {/* Ligne inférieure : Détail & Bouton d'ajout */}
        <div className="pt-3 border-t border-[#25352D]/10 flex items-center justify-between gap-2">
          <Link
            to={`/produit/${product.id}`}
            className="text-[11px] uppercase tracking-wider text-[#292725]/70 hover:text-[#25352D] font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
          >
            <span>Détails</span>
            <ArrowRight className="w-3 h-3 text-terracotta-dark" />
          </Link>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs uppercase tracking-wider font-medium transition-all ${
              product.inStock
                ? 'bg-[#25352D] text-[#F4EFE5] hover:bg-[#D5A078] active:scale-95 shadow-sm'
                : 'bg-[#292725]/10 text-[#292725]/40 cursor-not-allowed'
            }`}
            aria-label={`Ajouter ${product.name} au panier`}
            title={product.inStock ? "Ajouter au panier" : "Produit épuisé"}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ajouter</span>
          </button>
        </div>
      </div>
    </article>
  );
}
