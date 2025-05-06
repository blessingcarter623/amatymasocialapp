
import React from 'react';
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, size } = item;

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="h-20 w-20 rounded-md overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-muted-foreground">Size: {size}</p>
        <p className="font-bold mt-1">R{product.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          size="icon" 
          variant="outline"
          className="h-8 w-8" 
          onClick={() => {
            if (quantity > 1) {
              updateQuantity(product.id, size, quantity - 1);
            } else {
              removeFromCart(product.id, size);
            }
          }}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <span className="w-8 text-center">{quantity}</span>
        
        <Button 
          size="icon"
          variant="outline"
          className="h-8 w-8" 
          onClick={() => updateQuantity(product.id, size, quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="w-24 text-right">
        <p className="font-bold">R{(product.price * quantity).toFixed(2)}</p>
      </div>
      
      <Button 
        size="icon" 
        variant="ghost" 
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={() => removeFromCart(product.id, size)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
