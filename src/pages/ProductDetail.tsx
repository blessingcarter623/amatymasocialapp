import React, { useState, useEffect } from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product, ProductSize } from '@/types';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ArrowLeft, Plus, Minus, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { getProductById, getProducts } from '@/services/merchandiseService';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // Fetch the product based on the ID
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await getProductById(id);
        
        if (productData) {
          setProduct(productData);
          // Set default selected size if available
          if (productData.availableSizes.length > 0) {
            setSelectedSize(productData.availableSizes[0]);
          }
          
          // Fetch related products
          fetchRelatedProducts(productData.category);
        } else {
          toast.error("Product not found");
          navigate('/merchandise');
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
        navigate('/merchandise');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate]);
  
  // Fetch related products by category
  const fetchRelatedProducts = async (category: string) => {
    try {
      const allProducts = await getProducts();
      const filtered = allProducts.filter(p => p.id !== id && p.category === category);
      setRelatedProducts(filtered.slice(0, 4)); // Limit to 4 related products
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };
  
  const handleAddToCart = () => {
    if (!product || !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    toast.success(`${product.name} added to cart`);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <Loader className="h-8 w-8 animate-spin text-amatyma-red" />
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p>Product not found</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Button 
        variant="ghost" 
        onClick={() => navigate('/merchandise')}
        className="mb-6 pl-0 hover:pl-0"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Merchandise
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <Card className="overflow-hidden">
          <div className="aspect-square overflow-hidden bg-muted">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-cover"
            />
          </div>
        </Card>
        
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-medium text-amatyma-red mt-2">
              R{product.price.toFixed(2)}
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          {/* Size Selection */}
          <div>
            <h3 className="text-lg font-medium mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.availableSizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className={selectedSize === size ? "bg-amatyma-red hover:bg-amatyma-red/80" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Quantity Selection */}
          <div>
            <h3 className="text-lg font-medium mb-2">Quantity</h3>
            <div className="flex items-center gap-4">
              <Button 
                size="icon" 
                variant="outline" 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="text-xl w-8 text-center">{quantity}</span>
              
              <Button 
                size="icon" 
                variant="outline" 
                onClick={() => setQuantity(prev => prev + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            className="w-full py-6 text-lg bg-amatyma-red hover:bg-amatyma-red/80"
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            <ShoppingCart className="mr-2 h-5 w-5" /> 
            Add to Cart
          </Button>
        </div>
      </div>
      
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card 
                key={relatedProduct.id} 
                className="overflow-hidden cursor-pointer hover:shadow-md" 
                onClick={() => navigate(`/merchandise/${relatedProduct.id}`)}
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate">{relatedProduct.name}</h3>
                  <p className="font-bold mt-1">R{relatedProduct.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ProductDetail;
