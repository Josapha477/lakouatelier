
import { useEffect } from 'react';

const SITE_URL = 'https://www.lakouatelier.shop';

function updateMeta(attribute, key, content) {
  if (!content) return;

  let element = document.querySelector(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

export default function useSEO({
  title,
  description,
  path = '/',
  image = null,
}) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path}`;

    // Titre de la page
    document.title = title;

    // Description Google
    updateMeta('name', 'description', description);

    // URL canonique
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }

    canonical.href = canonicalUrl;

    // Open Graph (Facebook, WhatsApp...)
    updateMeta('property', 'og:title', title);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:type', 'website');
    updateMeta('property', 'og:url', canonicalUrl);

    if (image) {
      updateMeta('property', 'og:image', image);
    }

    // Twitter Cards
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:title', title);
    updateMeta('name', 'twitter:description', description);

    if (image) {
      updateMeta('name', 'twitter:image', image);
    }
  }, [title, description, path, image]);
}
