
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
    <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{product.name}</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold">
            {product.price > 0 ? `R${product.price.toFixed(2)}` : "Coming Soon"}
          </span>
        </div>
        <div className="flex gap-1 flex-wrap">
          {product.availableSizes.slice(0, 2).map((size) => (
            <span key={size} className="inline-block px-1.5 py-0.5 text-xs bg-muted rounded">
              {size}
            </span>
          ))}
          {product.availableSizes.length > 2 && (
            <span className="inline-block px-1.5 py-0.5 text-xs bg-muted rounded">
              +{product.availableSizes.length - 2}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Button 
          className="w-full bg-amatyma-red hover:bg-amatyma-red/80 text-xs"
          onClick={() => navigate(`/merchandise/${product.id}`)}
          size="sm"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
