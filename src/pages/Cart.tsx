
import React from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/merchandise/CartItem';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Cart = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toast.success("This is a demo checkout. Payment integration would be implemented here.");
    // In a real implementation, you would redirect to a checkout page or process
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/merchandise')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>
      </div>

      {cart.items.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet</p>
          <Button 
            className="bg-amatyma-red hover:bg-amatyma-red/80"
            onClick={() => navigate('/merchandise')}
          >
            Browse Merchandise
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="rounded-lg border bg-card">
              <div className="p-4 flex items-center justify-between">
                <h2 className="font-medium">Cart Items ({cart.totalItems})</h2>
                <Button 
                  variant="ghost" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs h-8"
                  onClick={clearCart}
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  Clear Cart
                </Button>
              </div>
              <Separator />
              <div className="p-4">
                {cart.items.map((item) => (
                  <CartItem key={`${item.product.id}-${item.size}`} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="rounded-lg border bg-card p-6 sticky top-4">
              <h2 className="font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R{cart.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>R0.00</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>R{cart.totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-amatyma-red hover:bg-amatyma-red/80"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                Demo checkout only. No actual payment will be processed.
              </p>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Cart;
