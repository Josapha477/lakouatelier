
const SITE_URL = 'https://www.lakouatelier.shop';

export function getProductSEO(product) {
  if (!product) {
    return {
      title: 'Produit introuvable | LAKOU ATELIER',
      description: 'Cette page produit est indisponible.',
      canonical: `${SITE_URL}/catalogue`,
      image: null,
    };
  }

  return {
    title: `${product.name} | LAKOU ATELIER`,
    description: product.shortDescription.slice(0, 155),
    canonical: `${SITE_URL}/produit/${product.id}`,
    image: product.images?.[0] ?? null,
  };
}
