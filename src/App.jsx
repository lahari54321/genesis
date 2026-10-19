import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuctionProvider } from './context/AuctionContext';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';

import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Auctions } from './pages/Auctions';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Sell } from './pages/Sell';

// Scroll to top helper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <WishlistProvider>
              <AuctionProvider>
                <ScrollToTop />
                <AnnouncementBar />
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/auctions" element={<Auctions />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/sell" element={<Sell />} />
                    {/* Fallback */}
                    <Route path="*" element={<Home />} />
                  </Routes>
                </main>
                <Footer />
                <ToastContainer />
              </AuctionProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
