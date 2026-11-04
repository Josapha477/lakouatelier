import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

/**
 * Composant de filtres, recherche textuelle et tri pour le catalogue.
 * 
 * @param {object} props
 * @param {string} props.searchQuery - Texte de recherche saisi
 * @param {function} props.onSearchChange - Callback de mise à jour de la recherche
 * @param {string} props.selectedCategory - Identifiant de la catégorie active
 * @param {function} props.onCategoryChange - Callback de changement de catégorie
 * @param {string} props.sortBy - Critère de tri sélectionné
 * @param {function} props.onSortChange - Callback de changement de tri
 * @param {number} props.totalResults - Nombre de résultats correspondants
 * @param {function} props.onReset - Réinitialisation des filtres
 */
export default function ProductFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalResults,
  onReset,
}) {
  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'tous';

  return (
    <div className="space-y-6">
      {/* Barre de recherche et sélecteur de tri */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Champ de recherche */}
        <div className="relative flex-1 max-w-md">
          <label htmlFor="catalog-search" className="sr-only">
            Rechercher une pièce ou une matière
          </label>
          <Search className="w-4 h-4 text-[#292725]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="catalog-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher par nom, matière, fer, argile..."
            className="w-full text-xs pl-10 pr-9 py-3 bg-white/90 border border-[#25352D]/15 rounded-md text-[#292725] placeholder:text-[#292725]/45 focus:outline-none focus:border-[#25352D] focus:ring-1 focus:ring-[#25352D] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#292725]/40 hover:text-[#25352D] p-1"
              aria-label="Effacer la recherche"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sélecteur de tri et indicateur de résultat */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
          <span className="text-[#292725]/60 font-light">
            <strong className="font-semibold text-[#25352D]">{totalResults}</strong> {totalResults > 1 ? 'créations' : 'création'}
          </span>

          <div className="flex items-center gap-2">
            <label htmlFor="catalog-sort" className="text-[#292725]/70 whitespace-nowrap hidden sm:inline">
              Trier par :
            </label>
            <select
              id="catalog-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-xs bg-white/90 border border-[#25352D]/15 rounded-md px-3 py-2.5 text-[#25352D] focus:outline-none focus:border-[#25352D] cursor-pointer"
            >
              <option value="featured">Sélection vedette</option>
              <option value="price-asc">Prix : croissant</option>
              <option value="price-desc">Prix : décroissant</option>
              <option value="name-asc">Nom : A à Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Boutons pilules de catégories d'artisanat */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`text-xs uppercase tracking-wider px-4 py-2 rounded-full whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-[#25352D] text-[#F4EFE5] border-[#25352D] font-medium shadow-sm'
                  : 'bg-white/60 hover:bg-white text-[#292725]/75 border-[#25352D]/10 hover:border-[#25352D]/30'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-terracotta-dark hover:text-[#25352D] underline underline-offset-4 whitespace-nowrap px-2 py-1 font-semibold transition-colors"
          >
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
}
