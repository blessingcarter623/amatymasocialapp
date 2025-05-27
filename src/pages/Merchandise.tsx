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

// Updated merchandise data with T-shirt variants
const MERCHANDISE_DATA: Product[] = [
  {
    id: "2",
    name: "MANCAVE Blazer",
    description: "Elegant black blazer with MANCAVE logo on the pocket",
    price: 0,
    image: "/lovable-uploads/19df1a0c-69d1-4c41-83b8-94645960f208.png",
    category: "Clothing",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "12",
    name: "MANCAVE T-Shirt",
    description: "Official MANCAVE T-shirt available in black and white with logo on front",
    price: 0,
    image: "/lovable-uploads/5e3ce7f4-c671-4702-abca-3425d6416308.png",
    category: "Clothing",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    variants: [
      {
        color: "Black",
        image: "/lovable-uploads/5e3ce7f4-c671-4702-abca-3425d6416308.png"
      },
      {
        color: "White",
        image: "/lovable-uploads/6ac85ce4-8f1b-41b3-a4bf-cde5f462299f.png"
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "MANCAVE Tie",
    description: "Classic black tie with MANCAVE logo",
    price: 0,
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
    description: "Premium hardcover notebook with the MANCAVE logo embossed on the cover",
    price: 0,
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
    description: "Stylish black socks with MANCAVE branding",
    price: 0,
    image: "/lovable-uploads/7d1f1feb-0d52-45bb-bd4b-5a360c2c8116.png",
    category: "Clothing",
    availableSizes: ["S", "M", "L"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "1",
    name: "MANCAVE Briefs Underwear",
    description: "Comfortable briefs underwear with MANCAVE branding",
    price: 0,
    image: "/lovable-uploads/99e072e9-3c20-4f08-8d50-912e8d987e03.png",
    category: "Clothing",
    availableSizes: ["S", "M", "L", "XL"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "6",
    name: "MANCAVE Bucket Hat",
    description: "Stylish black bucket hat with MANCAVE logo",
    price: 0,
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
    description: "Ceramic mug with the MANCAVE logo",
    price: 0,
    image: "/lovable-uploads/c2bb04af-8b76-4043-9ca8-6b92f20aaa45.png",
    category: "Accessories",
    availableSizes: ["One Size"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "8",
    name: "MANCAVE Hoodie",
    description: "Stay warm with our comfortable MANCAVE hoodie",
    price: 0,
    image: "/lovable-uploads/997c51e1-52ef-4d03-b735-b857bdc68cef.png",
    category: "Clothing",
    availableSizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "9",
    name: "MANCAVE Golf Shirt",
    description: "Elegant polo shirt with embroidered MANCAVE logo",
    price: 0,
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
    description: "Premium quality cap featuring the MANCAVE logo",
    price: 0,
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
    description: "Premium winter jacket with MANCAVE branding",
    price: 0,
    image: "/lovable-uploads/b8989981-ff7f-4b71-8cd4-5fb7224d0131.png",
    category: "Clothing",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
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
        <h1 className="text-3xl font-bold">MANCAVE Merchandise</h1>
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
