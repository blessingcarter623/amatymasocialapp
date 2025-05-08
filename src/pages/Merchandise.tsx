import React, { useState, useEffect } from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductCard } from "@/components/merchandise/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import { Search, ShoppingCart, Loader } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getProducts } from '@/services/merchandiseService';
import { toast } from 'sonner';

const Merchandise = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load merchandise");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query and category
  useEffect(() => {
    let filtered = products;
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, category, products]);

  // Extract unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <Loader className="h-8 w-8 animate-spin text-amatyma-red" />
        </div>
      </MainLayout>
    );
  }

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
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
