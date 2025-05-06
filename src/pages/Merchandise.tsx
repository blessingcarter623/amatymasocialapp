
import React, { useState, useEffect } from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductCard } from "@/components/merchandise/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';
import { Product, ProductSize } from '@/types';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

// Sample merchandise data
const MERCHANDISE_DATA: Product[] = [
  {
    id: "1",
    name: "Amatyma MANCAVE T-Shirt",
    description: "Official Amatyma MANCAVE T-shirt with logo on front",
    price: 349,
    image: "/lovable-uploads/716d6520-64ee-4990-bb0f-1cf7d5f82eaa.png",
    category: "Clothing",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Amatyma Cap",
    description: "Premium quality cap featuring the Amatyma Brotherhood logo",
    price: 199,
    image: "/lovable-uploads/716d6520-64ee-4990-bb0f-1cf7d5f82eaa.png",
    category: "Accessories",
    availableSizes: ["S", "M", "L"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Amatyma Hoodie",
    description: "Stay warm with our comfortable Amatyma Brotherhood hoodie",
    price: 599,
    image: "/lovable-uploads/716d6520-64ee-4990-bb0f-1cf7d5f82eaa.png",
    category: "Clothing",
    availableSizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    name: "Amatyma Mug",
    description: "Ceramic mug with the Amatyma Brotherhood logo",
    price: 129,
    image: "/lovable-uploads/716d6520-64ee-4990-bb0f-1cf7d5f82eaa.png",
    category: "Accessories",
    availableSizes: ["One Size"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "5",
    name: "Amatyma Notebook",
    description: "Premium hardcover notebook with the Amatyma logo embossed on the cover",
    price: 159,
    image: "/lovable-uploads/716d6520-64ee-4990-bb0f-1cf7d5f82eaa.png",
    category: "Stationery",
    availableSizes: ["A5", "A4"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "6",
    name: "Amatyma Polo Shirt",
    description: "Elegant polo shirt with embroidered Amatyma logo",
    price: 399,
    image: "/lovable-uploads/716d6520-64ee-4990-bb0f-1cf7d5f82eaa.png",
    category: "Clothing",
    availableSizes: ["S", "M", "L", "XL"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const Merchandise = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [products, setProducts] = useState<Product[]>(MERCHANDISE_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  // Categories extracted from products
  const categories = Array.from(new Set(MERCHANDISE_DATA.map(product => product.category)));

  // Filter products based on search query and category
  useEffect(() => {
    let filtered = MERCHANDISE_DATA;
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    setProducts(filtered);
  }, [searchQuery, category]);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Amatyma Merchandise</h1>
        <Button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 bg-amatyma-red hover:bg-amatyma-red/80"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Cart ({cart.totalItems})</span>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Search and filters */}
        <div className="w-full md:w-64 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search merchandise..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              <Button
                variant={category === null ? "default" : "outline"}
                className={category === null ? "bg-amatyma-red hover:bg-amatyma-red/80 w-full justify-start" : "w-full justify-start"}
                onClick={() => setCategory(null)}
              >
                All Categories
              </Button>
              
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  className={category === cat ? "bg-amatyma-red hover:bg-amatyma-red/80 w-full justify-start" : "w-full justify-start"}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Merchandise;
