
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductSize, Cart } from '@/types';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity: number, size: ProductSize, color?: string) => void;
  removeFromCart: (productId: string, size: ProductSize, color?: string) => void;
  updateQuantity: (productId: string, size: ProductSize, quantity: number, color?: string) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from local storage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('amatyma_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('amatyma_cart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotals = (items: CartItem[]): Cart => {
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    return {
      items,
      totalItems,
      totalPrice
    };
  };

  const addToCart = (product: Product, quantity: number, size: ProductSize, color?: string) => {
    setCart(prevCart => {
      // Check if product with the same size and color already exists in the cart
      const existingItemIndex = prevCart.items.findIndex(
        item => item.productId === product.id && item.size === size && item.color === color
      );

      let newItems;
      
      if (existingItemIndex >= 0) {
        // Update quantity if the product already exists
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new item to cart
        newItems = [
          ...prevCart.items,
          {
            productId: product.id,
            quantity,
            size,
            color,
            product
          }
        ];
      }

      const colorText = color ? ` - ${color}` : '';
      toast.success(`${product.name}${colorText} (${size}) added to cart`);
      
      // Return updated cart with new totals
      return calculateTotals(newItems);
    });
  };

  const removeFromCart = (productId: string, size: ProductSize, color?: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(
        item => !(item.productId === productId && item.size === size && item.color === color)
      );
      
      toast.info("Item removed from cart");
      
      return calculateTotals(newItems);
    });
  };

  const updateQuantity = (productId: string, size: ProductSize, quantity: number, color?: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.map(item => {
        if (item.productId === productId && item.size === size && item.color === color) {
          return { ...item, quantity };
        }
        return item;
      });
      
      return calculateTotals(newItems);
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      totalItems: 0,
      totalPrice: 0
    });
    toast.info("Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
