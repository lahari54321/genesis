import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useToast } from './ToastContext';

const ProductsContext = createContext(null);
const CUSTOM_PRODUCTS_KEY = 'veyra_custom_products';

export const ProductsProvider = ({ children }) => {
  const { addToast } = useToast();
  const [customProducts, setCustomProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(customProducts));
    } catch (e) {
      console.warn('Failed to save custom products to localStorage', e);
    }
  }, [customProducts]);

  const allProducts = [...customProducts, ...PRODUCTS];

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: 'custom-' + Date.now(),
      rating: 5.0,
      featured: false,
      inStock: true
    };
    setCustomProducts((prev) => [newProduct, ...prev]);
    addToast(`"${newProduct.name}" listed successfully in the catalog.`);
    return newProduct;
  };

  return (
    <ProductsContext.Provider
      value={{
        products: allProducts,
        categories: CATEGORIES,
        customProducts,
        addProduct
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
