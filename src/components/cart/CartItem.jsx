import React from 'react';
import { Minus, Plus, Trash2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { getProductImage } from '../../data/products';

/**
 * Composant de ligne d'article dans le panier.
 * 
 * @param {object} props
 * @param {object} props.item
 * @param {function} props.onUpdateQuantity
 * @param {function} props.onRemove
 */
export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { product, quantity, lineTotal, isAvailable } = item;
  const imageSrc = getProductImage(product, 0);

  return (
    <div className="flex gap-4 py-4 border-b border-[#25352D]/10 last:border-b-0">
      {/* Visuel du produit avec coin arrondi doux */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-[#F4EFE5] rounded-md overflow-hidden border border-[#25352D]/10">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getProductImage(null);
          }}
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-[#292725]/75 flex items-center justify-center p-1 text-center">
            <span className="text-[10px] uppercase tracking-wider text-white font-medium">
              Rupture
            </span>
          </div>
        )}
      </div>

      {/* Informations et contrôles */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h4 className="font-serif text-sm sm:text-base font-medium text-[#25352D] truncate">
              {product.name}
            </h4>
            <p className="text-xs text-[#292725]/70 mt-0.5">
              {formatCurrency(product.price)} l'unité
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(product.id)}
            className="p-1.5 text-[#292725]/50 hover:text-[#D5A078] transition-colors rounded hover:bg-[#25352D]/5"
            aria-label={`Supprimer ${product.name} du panier`}
            title="Supprimer cet article"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Message d'indisponibilité si applicable */}
        {!isAvailable && (
          <div className="flex items-center gap-1.5 text-xs text-[#D5A078] mt-1">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Cet article n'est plus en stock</span>
          </div>
        )}

        {/* Contrôles de quantité et sous-total de la ligne */}
        <div className="flex items-center justify-between mt-3 pt-1">
          <div className="inline-flex items-center border border-[#25352D]/20 rounded bg-white">
            <button
              type="button"
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              className="p-1.5 text-[#25352D] hover:bg-[#F4EFE5] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label={`Diminuer la quantité de ${product.name}`}
              title="Diminuer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 py-1 text-xs font-semibold text-[#292725] min-w-[2rem] text-center select-none">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              disabled={!isAvailable}
              className="p-1.5 text-[#25352D] hover:bg-[#F4EFE5] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label={`Augmenter la quantité de ${product.name}`}
              title="Augmenter"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-sm font-semibold text-[#25352D]">
            {formatCurrency(lineTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
