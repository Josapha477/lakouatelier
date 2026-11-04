import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * Hook personnalisé pour consommer le contexte du panier d'achat.
 * Lève une exception explicite s'il est utilisé en dehors de <CartProvider>.
 * 
 * @returns {import('../context/CartContext').CartContextType}
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé à l\'intérieur d\'un <CartProvider>.');
  }
  return context;
}
