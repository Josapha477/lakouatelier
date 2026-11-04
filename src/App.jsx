import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NotificationBar from './components/layout/NotificationBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductPage from './pages/ProductPage';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/**
 * Réinitialise la position de défilement en haut de la page lors d'un changement de route.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

/**
 * Contenu principal de l'application avec accès au hook useNavigate pour le CartDrawer.
 */
function AppContent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EFE5] text-[#292725] selection:bg-[#D5A078] selection:text-[#25352D]">
      <ScrollToTop />
      
      {/* Bandeau d'annonce supérieur */}
      <NotificationBar />

      {/* Barre de navigation globale */}
      <Navbar />

      {/* Conteneur des pages et routes */}
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalog />} />
          <Route path="/produit/:id" element={<ProductPage />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Pied de page global */}
      <Footer />

      {/* Tiroir de panier global accessible depuis n'importe quelle page */}
      <CartDrawer onNavigateCatalog={() => navigate('/catalogue')} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}
