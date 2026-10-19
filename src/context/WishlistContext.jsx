import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = 'veyra_wishlist_items';

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.warn('Failed to parse wishlist from localStorage', err);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn('Failed to save wishlist to localStorage', err);
    }
  }, [items]);

  const isInWishlist = (productId) => {
    return items.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setItems((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`"${product.name}" removed from wishlist.`);
    } else {
      setItems((prev) => [...prev, product]);
      addToast(`"${product.name}" saved to wishlist.`);
    }
  };

  const removeFromWishlist = (productId) => {
    const item = items.find((i) => i.id === productId);
    setItems((prev) => prev.filter((i) => i.id !== productId));
    if (item) {
      addToast(`"${item.name}" removed from wishlist.`);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        wishlistCount: items.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
