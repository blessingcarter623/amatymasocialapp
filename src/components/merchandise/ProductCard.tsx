
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from '@/types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-lg font-bold">R{product.price.toFixed(2)}</span>
          <div className="flex gap-1">
            {product.availableSizes.slice(0, 3).map((size) => (
              <span key={size} className="inline-block px-2 py-1 text-xs bg-muted rounded">
                {size}
              </span>
            ))}
            {product.availableSizes.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs bg-muted rounded">
                +{product.availableSizes.length - 3}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-amatyma-red hover:bg-amatyma-red/80"
          onClick={() => navigate(`/merchandise/${product.id}`)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
