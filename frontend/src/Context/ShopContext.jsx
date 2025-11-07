import React, { createContext, useContext, useMemo, useState } from 'react';
import allProducts from '../Components/Assets/all_product';

const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const [cartItemsByProductId, setCartItemsByProductId] = useState({});

  const addToCart = (productId, quantity = 1) => {
    setCartItemsByProductId((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity,
    }));
  };

  const removeFromCart = (productId, quantity = 1) => {
    setCartItemsByProductId((prev) => {
      const currentQty = prev[productId] || 0;
      const nextQty = Math.max(0, currentQty - quantity);
      if (nextQty === 0) {
        const { [productId]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: nextQty };
    });
  };

  const setItemQuantity = (productId, quantity) => {
    setCartItemsByProductId((prev) => {
      if (!quantity || quantity <= 0) {
        const { [productId]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: quantity };
    });
  };

  const clearCart = () => setCartItemsByProductId({});

  const getCartCount = () =>
    Object.values(cartItemsByProductId).reduce((sum, qty) => sum + qty, 0);

  const getCartTotal = () => {
    return Object.entries(cartItemsByProductId).reduce((total, [id, qty]) => {
      const product = allProducts.find((p) => p.id === Number(id));
      if (!product) return total;
      return total + qty * (product.new_price ?? 0);
    }, 0);
  };

  const value = useMemo(
    () => ({
      products: allProducts,
      cartItemsByProductId,
      addToCart,
      removeFromCart,
      setItemQuantity,
      clearCart,
      getCartCount,
      getCartTotal,
    }),
    [cartItemsByProductId]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopContextProvider');
  return ctx;
};

export default ShopContext;


