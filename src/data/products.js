import { SITE_CONFIG } from '../config/site.js';

/**
 * Catalogue des 8 créations artisanales d'exception de LAKOU ATELIER.
 * Toutes les données biographiques, d'ateliers et de créations sont fictives,
 * conçues dans le respect de l'esthétique et de la culture d'artisanat d'art haïtien.
 */
export const PRODUCTS = [
  {
    id: 'miroir-soleil-noailles',
    name: 'Miroir Solaire "Zetwal"',
    category: 'fer-cisele',
    price: 185,
    featured: true,
    inStock: true,
    leadTime: 'Pièce en stock (expédition sous 48h)',
    shortDescription: 'Miroir mural orné de rayons en tôle d’acier martelée et découpée au burin.',
    description: "Le miroir Zetwal est une célébration du travail d'orfèvre du métal découpé. Réalisé à partir de fûts métalliques réhabilités, chaque rayon est sculpté manuellement à l'aide d'un burin et d'un marteau, puis patiné à chaud pour révéler des reflets graphite et cuivrés subtils.",
    dimensions: 'Diamètre total : 72 cm | Diamètre miroir : 28 cm',
    materials: "Tôle d'acier recyclée patinée à froid, miroir biseauté, vernis végétal antirouille",
    artisan: 'Atelier Jean-Baptiste (Fictif)',
    origin: 'Quartier Métallique de Noailles, Haïti (Fictif)',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'vase-amphore-vallue',
    name: 'Amphore Terre d’Argile "Kòt"',
    category: 'ceramique',
    price: 140,
    featured: true,
    inStock: true,
    leadTime: 'Pièce unique façonnée main',
    shortDescription: 'Vase sculptural en grès chamotté aux pigments naturels terracotta et crème.',
    description: "Inspirée des jarres de conservation des hauteurs rurales, cette amphore contemporaine associe l'argile brute non émaillée à un jeu d'anses asymétriques. Sa texture minérale légèrement granuleuse apporte une douceur tactile et une présence sculpturale à tout intérieur contemporain.",
    dimensions: 'Hauteur : 36 cm | Largeur : 22 cm | Col : Ø 9 cm',
    materials: 'Argile naturelle de carrière locale, engobe d’ocre rouge et cendre de bois',
    artisan: 'Collectif Terres Sauvages (Fictif)',
    origin: 'Plateau des Terres Rouges, Haïti (Fictif)',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'plateau-acajou-ondoyant',
    name: 'Plateau d’Accueil en Acajou "Bwa"',
    category: 'bois-sculpte',
    price: 115,
    featured: true,
    inStock: true,
    leadTime: 'En stock (derniers exemplaires)',
    shortDescription: 'Plateau de service taillé dans une pièce monobloc d’acajou massif d’Haïti.',
    description: "Ce plateau présente des rebords sculptés aux courbes organiques rappelant le mouvement des vagues du canal du Sud. Chaque pièce est soigneusement poncée à l'eau puis nourrie d'un mélange traditionnel de cire d'abeille et d'huile de ricin qui rehausse le veinage rougeoyant du bois.",
    dimensions: 'Longueur : 46 cm | Largeur : 27 cm | Épaisseur : 3.5 cm',
    materials: 'Acajou massif de forêt certifiée éco-gérée, finition cire d’abeille bio',
    artisan: 'Maître Ébéniste Dorsinval (Fictif)',
    origin: 'Atelier de la Forêt des Pins, Haïti (Fictif)',
    images: [
      'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'panier-latanier-arche',
    name: 'Corbeille Architecturée "Pay"',
    category: 'vannerie',
    price: 75,
    featured: false,
    inStock: true,
    leadTime: 'Fabriqué à la commande sous 5 jours',
    shortDescription: 'Panier de rangement tressé en fibres végétales de latanier et brins de sisal.',
    description: "Héritière d'un savoir-faire de tressage transmis entre générations de femmes artisanes, la corbeille Pay allie souplesse et robustesse. Ses anses intégrées en arche et sa trame géométrique en font une corbeille d'appoint idéale pour le linge, les revues ou comme cache-pot éditorial.",
    dimensions: 'Diamètre à la base : 32 cm | Hauteur sans anses : 38 cm',
    materials: 'Feuilles séchées de latanier sauvage, cordelette de sisal naturel',
    artisan: 'Coopérative Tisseuses du Littoral (Fictif)',
    origin: 'Côte Sud de Jacmel, Haïti (Fictif)',
    images: [
      'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'applique-murale-feuillage',
    name: 'Panneau Mural Découpé "Fèy"',
    category: 'fer-cisele',
    price: 160,
    featured: true,
    inStock: true,
    leadTime: 'Pièce en stock',
    shortDescription: 'Bas-relief en fer bosselé évoquant les lianes et frondaisons tropicales.',
    description: "Ce bas-relief mural capture la luxuriance de la flore caribéenne. Chaque feuille est embossée à chaud pour lui conférer une tridimensionnalité et un jeu d'ombres portées remarquable sur un mur clair. La patine noire mate est rehaussée de légères touches brossées couleur terracotta.",
    dimensions: 'Hauteur : 65 cm | Largeur : 35 cm | Épaisseur : 4 cm',
    materials: "Fer martelé recyclé, patine minérale noire mate fixée au feu",
    artisan: 'Atelier Jean-Baptiste (Fictif)',
    origin: 'Quartier Métallique de Noailles, Haïti (Fictif)',
    images: [
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'coupelle-gre-volcanique',
    name: 'Coupelle Creuse "Wòch"',
    category: 'ceramique',
    price: 55,
    featured: false,
    inStock: true,
    leadTime: 'Pièce en stock',
    shortDescription: 'Coupelle en grès texturé, idéale comme vide-poche ou objet de contemplation.',
    description: "Chaque coupelle Wòch est tournée puis modelée à la main pour obtenir des contours subtilement irréguliers rappelant les galets des rivières de montagne. Sa surface extérieure brute contraste avec un cœur légèrement satiné de couleur crème douce.",
    dimensions: 'Diamètre : 19 cm | Hauteur : 5.5 cm',
    materials: 'Grès chamotté haute température (1260°C), émail sans plomb',
    artisan: 'Collectif Terres Sauvages (Fictif)',
    origin: 'Plateau des Terres Rouges, Haïti (Fictif)',
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'bougeoir-trois-branches-bois',
    name: 'Chandelier Sculptural "Limyè"',
    category: 'bois-sculpte',
    price: 85,
    featured: false,
    inStock: true,
    leadTime: 'Pièce en stock (dernières unités)',
    shortDescription: 'Bougeoir monobloc aux formes géométriques pures en bois de gaïac.',
    description: "Conçu pour accueillir 3 chandelles fines, le bougeoir Limyè met à l'honneur la densité exceptionnelle et les nuances mordorées du bois de gaïac. Sa silhouette équilibrée est conçue comme une micro-architecture de table, sobre et intemporelle.",
    dimensions: 'Longueur : 28 cm | Hauteur : 14 cm | Largeur : 7 cm',
    materials: 'Bois de gaïac poli à la main, inserts en laiton massif pour bougies standard (Ø 2.2 cm)',
    artisan: 'Maître Ébéniste Dorsinval (Fictif)',
    origin: 'Atelier de la Forêt des Pins, Haïti (Fictif)',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    id: 'set-de-table-fibres-soleil',
    name: 'Coffret Sets de Table "Solèy"',
    category: 'art-table',
    price: 65,
    featured: true,
    inStock: true,
    leadTime: 'Coffret de 4 pièces en stock',
    shortDescription: 'Ensemble de quatre sets de table tressés en cordelette de sisal écru.',
    description: "Ces sets de table circulaires rehaussent le rituel du repas partagé. La précision de leur motif spiralé témoigne de la régularité et de la patience du geste artisanal. Souples, résistants à la chaleur et lavables d'un simple chiffon humide, ils habillent le bois brut avec raffinement.",
    dimensions: 'Lot de 4 pièces | Diamètre de chaque set : 36 cm',
    materials: 'Sisal naturel non blanchi, fil de couture en coton biologique',
    artisan: 'Coopérative Tisseuses du Littoral (Fictif)',
    origin: 'Côte Sud de Jacmel, Haïti (Fictif)',
    images: [
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1000&q=80',
    ],
  },
];

/**
 * Récupère l'image principale d'un produit avec garantie de fallback si l'URL est indisponible.
 * 
 * @param {object} product
 * @param {number} [index=0]
 * @returns {string} URL valide
 */
export function getProductImage(product, index = 0) {
  if (!product || !product.images || product.images.length === 0) {
    return SITE_CONFIG.fallbackImage;
  }
  return product.images[index] || product.images[0] || SITE_CONFIG.fallbackImage;
}
