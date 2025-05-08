
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity, size } = item;

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(product.id, size, newQuantity);
    } else {
      removeFromCart(product.id, size);
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      <div className="w-20 h-20 rounded overflow-hidden bg-muted flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-muted-foreground">Size: {size}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-sm font-medium">R{product.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="outline" 
              className="h-7 w-7" 
              onClick={() => handleUpdateQuantity(quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-5 text-center">{quantity}</span>
            
            <Button 
              size="icon" 
              variant="outline" 
              className="h-7 w-7" 
              onClick={() => handleUpdateQuantity(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button 
            size="icon" 
            variant="ghost"
            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => removeFromCart(product.id, size)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="text-right font-medium">
        R{(product.price * quantity).toFixed(2)}
      </div>
    </div>
  );
};
