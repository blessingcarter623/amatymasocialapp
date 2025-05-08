
import { ProductSize } from '@/types';

// Types for merchandise database operations
export interface MerchandiseItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available_sizes: ProductSize[];
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

// Type for creating a new product
export interface CreateMerchandiseItem {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available_sizes: ProductSize[];
  in_stock: boolean;
}

// Type for updating a product
export interface UpdateMerchandiseItem {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
  available_sizes?: ProductSize[];
  in_stock?: boolean;
}
