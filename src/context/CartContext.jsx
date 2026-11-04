import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { PRODUCTS } from '../data/products';

export const CartContext = createContext(null);

const STORAGE_KEY = 'lakou_atelier_cart_v1';

/**
 * Lit l'état brut du panier depuis le localStorage avec gestion des erreurs de lecture.
 * 
 * @returns {Array<{productId: string, quantity: number}>}
 */
function getInitialRawItems() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    
    // Assainit les données lues : ne retient que les entrées valides avec quantité entière > 0
    return parsed
      .filter((item) => item && typeof item.productId === 'string' && Number.isInteger(item.quantity) && item.quantity > 0)
      .map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
  } catch (err) {
    console.warn('[LAKOU ATELIER] Erreur de lecture du panier dans localStorage:', err);
    return [];
  }
}

/**
 * Écrit l'état brut du panier dans le localStorage avec gestion des erreurs.
 * 
 * @param {Array<{productId: string, quantity: number}>} rawItems
 */
function saveRawItems(rawItems) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rawItems));
  } catch (err) {
    console.error('[LAKOU ATELIER] Impossible d\'enregistrer le panier dans localStorage (quota dépassé ou navigation privée):', err);
  }
}

export function CartProvider({ children }) {
  const [rawItems, setRawItems] = useState(getInitialRawItems);
  const [isOpen, setIsOpen] = useState(false);

  // Synchronisation avec localStorage dès modification de rawItems
  useEffect(() => {
    saveRawItems(rawItems);
  }, [rawItems]);

  // Réconciliation dynamique et stricte avec le catalogue officiel PRODUCTS
  // Les prix et métadonnées ne proviennent JAMAIS du client ou du stockage local
  const items = useMemo(() => {
    return rawItems
      .map((raw) => {
        const product = PRODUCTS.find((p) => p.id === raw.productId);
        if (!product) return null; // Produit obsolète ou supprimé du catalogue
        
        const validQuantity = Math.max(1, Math.floor(raw.quantity));
        const lineTotal = product.price * validQuantity;
        const isAvailable = Boolean(product.inStock);

        return {
          product,
          quantity: validQuantity,
          lineTotal,
          isAvailable,
        };
      })
      .filter(Boolean);
  }, [rawItems]);

  // Calcul centralisé du nombre total de pièces
  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  // Calcul centralisé du montant sous-total
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.lineTotal, 0);
  }, [items]);

  // Indicateur si des articles sont devenus indisponibles
  const hasUnavailableItems = useMemo(() => {
    return items.some((item) => !item.isAvailable);
  }, [items]);

  // Contrôles d'ouverture / fermeture du tiroir
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  /**
   * Ajoute un produit au panier.
   * Empêche l'ajout si le produit est en rupture de stock.
   */
  const addToCart = useCallback((productId, quantity = 1) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      console.warn(`[LAKOU ATELIER] Produit introuvable: ${productId}`);
      return false;
    }

    if (!product.inStock) {
      console.warn(`[LAKOU ATELIER] Le produit ${product.name} est en rupture de stock.`);
      return false;
    }

    const qtyToAdd = Math.max(1, Math.floor(quantity));

    setRawItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.productId === productId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      }
      return [...prev, { productId, quantity: qtyToAdd }];
    });

    setIsOpen(true);
    return true;
  }, []);

  /**
   * Modifie la quantité d'un article. Si la quantité est <= 0, supprime l'article.
   */
  const updateQuantity = useCallback((productId, nextQuantity) => {
    const parsedQty = Math.floor(nextQuantity);
    if (parsedQty <= 0) {
      removeFromCart(productId);
      return;
    }

    setRawItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: parsedQty } : item
      )
    );
  }, []);

  /**
   * Supprime un article du panier.
   */
  const removeFromCart = useCallback((productId) => {
    setRawItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  /**
   * Vide entièrement le panier.
   */
  const clearCart = useCallback(() => {
    setRawItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      totalItems,
      subtotal,
      isOpen,
      hasUnavailableItems,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      items,
      totalItems,
      subtotal,
      isOpen,
      hasUnavailableItems,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
