import React, { useState, useMemo } from 'react';
import ProductCard from '../components/product/ProductCard';
import ProductFilters from '../components/product/ProductFilters';
import { PRODUCTS } from '../data/products';
import { SearchX, Sparkles } from 'lucide-react';

/**
 * Normalise une chaîne de caractères pour une recherche fluide :
 * passage en minuscules, suppression des accents (diacritiques) et espacement propre.
 */
function normalizeSearchText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [sortBy, setSortBy] = useState('featured');

  // Filtrage et tri mémorisés
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // 1. Filtre par catégorie
    if (selectedCategory !== 'tous') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // 2. Recherche textuelle insensible à la casse et aux accents
    if (searchQuery.trim() !== '') {
      const q = normalizeSearchText(searchQuery);
      list = list.filter((p) => {
        const nameMatch = normalizeSearchText(p.name).includes(q);
        const materialsMatch = normalizeSearchText(p.materials).includes(q);
        const descMatch = normalizeSearchText(p.description).includes(q);
        const shortDescMatch = normalizeSearchText(p.shortDescription).includes(q);
        const artisanMatch = normalizeSearchText(p.artisan).includes(q);
        return nameMatch || materialsMatch || descMatch || shortDescMatch || artisanMatch;
      });
    }

    // 3. Tri
    list.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name, 'fr');
      // Par défaut : featured en premier
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    return list;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('tous');
    setSortBy('featured');
  };

  return (
    <div className="flex-1 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* En-tête éditorial de la collection */}
        <header className="max-w-2xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25352D]/5 border border-[#25352D]/10 text-xs text-[#25352D] uppercase tracking-widest font-medium">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-dark" />
            <span className="text-terracotta-dark font-semibold">Collection Permanente</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#25352D] tracking-tight">
            Catalogue des Objets d'Atelier
          </h1>

          <p className="text-sm sm:text-base text-[#292725]/80 font-light leading-relaxed">
            Chaque création est une pièce unique ou issue de séries limitées conçues par des maîtres artisans haïtiens. Explorez nos pièces en fer martelé, céramique de terre, bois d'acajou et fibres végétales.
          </p>
        </header>

        {/* Barre de recherche, filtres et tri */}
        <div className="pt-2">
          <ProductFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredProducts.length}
            onReset={handleResetFilters}
          />
        </div>

        {/* Grille de produits ou État vide */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white/40 rounded-xl border border-dashed border-[#25352D]/20 p-8 space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#25352D]/5 flex items-center justify-center text-[#25352D]/50">
              <SearchX className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#25352D]">
              Aucune pièce trouvée
            </h3>
            <p className="text-xs text-[#292725]/75 font-light leading-relaxed">
              Aucune création ne correspond aux critères recherchés ("{searchQuery}"). Essayez avec d'autres mots-clés ou réinitialisez les filtres.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-[#25352D] text-[#F4EFE5] text-xs uppercase tracking-widest font-medium rounded hover:bg-[#25352D]/90 transition-all shadow-sm"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
