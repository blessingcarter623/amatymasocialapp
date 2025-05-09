
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
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

// Updated merchandise data with new images and removed "Amatyma" from product names
const MERCHANDISE_DATA: Product[] = [
  {
    id: "1",
    name: "MANCAVE Boxer Shorts",
    description: "Comfortable boxer shorts with MANCAVE branding. Made from premium quality cotton for maximum comfort and durability. These boxer shorts feature the iconic MANCAVE logo on the waistband. Perfect for everyday comfort and style.",
    price: 179,
    image: "/lovable-uploads/99e072e9-3c20-4f08-8d50-912e8d987e03.png",
    category: "Clothing",
    availableSizes: ["S", "M", "L", "XL"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "MANCAVE Blazer",
    description: "Elegant black blazer with MANCAVE logo on the pocket. Crafted from high-quality fabric for a sophisticated look, this blazer is perfect for formal and semi-formal occasions. The subtle logo on the pocket adds an exclusive touch to this classic piece.",
    price: 1299,
    image: "/lovable-uploads/19df1a0c-69d1-4c41-83b8-94645960f208.png",
    category: "Clothing",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "MANCAVE Tie",
    description: "Classic black tie with MANCAVE logo. Made from premium quality silk for a luxurious feel and appearance. This tie features a subtle logo pattern, making it perfect for formal occasions and business meetings while showcasing your connection.",
    price: 249,
    image: "/lovable-uploads/6164bfcb-707e-4da7-b662-7a87de855f2c.png",
    category: "Accessories",
    availableSizes: ["One Size"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    name: "MANCAVE Notebook",
    description: "Premium hardcover notebook with the MANCAVE logo embossed on the cover. 120 pages of high-quality paper ideal for writing, sketching, or jotting down ideas. The elegant logo on the cover makes this notebook both practical and stylish for professional and personal use.",
    price: 159,
    image: "/lovable-uploads/6ed76b8d-10f4-4a4b-9805-2ad0391c5da4.png",
    category: "Stationery",
    availableSizes: ["A5", "A4"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "5",
    name: "MANCAVE Socks",
    description: "Stylish black socks with MANCAVE branding. Made from premium cotton blend for comfort and durability. These socks feature the MANCAVE logo and are perfect for both casual and formal wear. The cushioned sole provides extra comfort for all-day wear.",
    price: 99,
    image: "/lovable-uploads/7d1f1feb-0d52-45bb-bd4b-5a360c2c8116.png",
    category: "Clothing",
    availableSizes: ["S", "M", "L"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "6",
    name: "MANCAVE Bucket Hat",
    description: "Stylish black bucket hat with MANCAVE logo. This premium quality bucket hat is perfect for outdoor activities and casual wear. The embroidered logo adds a touch of style, while the durable material ensures protection from the elements.",
    price: 219,
    image: "/lovable-uploads/3f81020a-c705-496f-af05-53425492fb41.png",
    category: "Accessories",
    availableSizes: ["S", "M", "L"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "7",
    name: "MANCAVE Mug",
    description: "Ceramic mug with the MANCAVE logo. This high-quality ceramic mug is perfect for your morning coffee or tea. Dishwasher and microwave safe, featuring the iconic logo that won't fade with use. The perfect gift for members or supporters.",
    price: 129,
    image: "/lovable-uploads/24128ffb-5cf2-4301-a9ca-8bb45a98737f.png",
    category: "Accessories",
    availableSizes: ["One Size"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "8",
    name: "MANCAVE Hoodie",
    description: "Stay warm with our comfortable MANCAVE hoodie. Made from premium quality material with a soft inner lining for maximum comfort. Features the MANCAVE logo on the front and a large print on the back. Perfect for casual wear and colder weather.",
    price: 599,
    image: "/lovable-uploads/a4a6aec3-9199-4694-8d4c-b9805ff69def.png",
    category: "Clothing",
    availableSizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "9",
    name: "MANCAVE Golf Shirt",
    description: "Elegant polo shirt with embroidered MANCAVE logo. Made from premium quality cotton for maximum comfort and breathability. The subtle logo on the chest adds a touch of sophistication to this classic polo. Perfect for casual and semi-formal occasions.",
    price: 399,
    image: "/lovable-uploads/85015cb9-1247-41a3-b9fe-140d05a3b662.png",
    category: "Clothing",
    availableSizes: ["S", "M", "L", "XL"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "10",
    name: "MANCAVE Cap",
    description: "Premium quality cap featuring the MANCAVE logo embroidered on the front. This adjustable cap ensures a comfortable fit for everyone. The durable materials and quality construction make this cap perfect for outdoor activities and casual wear.",
    price: 199,
    image: "/lovable-uploads/cdaa9501-0c24-44c0-8698-031ef73331b3.png",
    category: "Accessories",
    availableSizes: ["S", "M", "L"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "11",
    name: "MANCAVE Winter Jacket",
    description: "Premium winter jacket with MANCAVE branding. This high-quality winter jacket is designed to keep you warm during the coldest days. Featuring the logo on the chest and a full lining for maximum insulation. Water-resistant outer material helps keep you dry in all weather conditions.",
    price: 1499,
    image: "/lovable-uploads/b8989981-ff7f-4b71-8cd4-5fb7224d0131.png",
    category: "Clothing",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "12",
    name: "MANCAVE T-Shirt",
    description: "Official MANCAVE T-shirt with logo on front. Made from premium quality cotton for maximum comfort and durability. This T-shirt features the iconic logo on the front chest area. Perfect for casual wear and showing your support.",
    price: 349,
    image: "/lovable-uploads/4d8cf362-9bf7-4e02-95d0-3a874e7bfd8d.png",
    category: "Clothing",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  // Find the product based on the ID
  useEffect(() => {
    const foundProduct = MERCHANDISE_DATA.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Set default selected size if available
      if (foundProduct.availableSizes.length > 0) {
        setSelectedSize(foundProduct.availableSizes[0]);
      }
    } else {
      toast.error("Product not found");
      navigate('/merchandise');
    }
  }, [id, navigate]);
  
  const handleAddToCart = () => {
    if (!product || !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    
    // Optional: Navigate to cart or stay on page
    // navigate('/cart');
  };

  if (!product) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading product...</p>
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
            <p className="text-2xl font-bold text-amatyma-red mt-2">
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
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MERCHANDISE_DATA
            .filter(p => p.id !== product.id && p.category === product.category)
            .slice(0, 4)
            .map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden cursor-pointer hover:shadow-md" 
                    onClick={() => navigate(`/merchandise/${relatedProduct.id}`)}>
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
    </MainLayout>
  );
};

export default ProductDetail;
