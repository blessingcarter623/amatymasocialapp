
import { supabase } from "@/integrations/supabase/client";
import { Product, ProductSize } from "@/types";

// Custom types for merchandise
export interface CreateMerchandiseItem {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available_sizes: ProductSize[];
  in_stock: boolean;
}

export interface UpdateMerchandiseItem {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
  available_sizes?: ProductSize[];
  in_stock?: boolean;
}

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase.rpc('get_all_merchandise');
    
    if (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
    
    // Map the database records to our Product type
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category,
      availableSizes: item.available_sizes as ProductSize[],
      inStock: item.in_stock,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }));
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase.rpc('get_merchandise_by_id', { item_id: id });
    
    if (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
    
    if (!data) return null;
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      category: data.category,
      availableSizes: data.available_sizes as ProductSize[],
      inStock: data.in_stock,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error("Error in getProductById:", error);
    throw error;
  }
};

// Create new product
export const createProduct = async (productData: CreateMerchandiseItem): Promise<Product> => {
  try {
    const { data, error } = await supabase.rpc(
      'create_merchandise',
      {
        item_name: productData.name,
        item_description: productData.description,
        item_price: productData.price,
        item_image: productData.image,
        item_category: productData.category,
        item_available_sizes: productData.available_sizes,
        item_in_stock: productData.in_stock
      }
    );
    
    if (error) {
      console.error("Error creating product:", error);
      throw error;
    }
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      category: data.category,
      availableSizes: data.available_sizes as ProductSize[],
      inStock: data.in_stock,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error("Error in createProduct:", error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id: string, productData: UpdateMerchandiseItem): Promise<Product> => {
  try {
    const { data, error } = await supabase.rpc(
      'update_merchandise',
      {
        item_id: id,
        item_name: productData.name,
        item_description: productData.description,
        item_price: productData.price,
        item_image: productData.image,
        item_category: productData.category,
        item_available_sizes: productData.available_sizes,
        item_in_stock: productData.in_stock
      }
    );
    
    if (error) {
      console.error("Error updating product:", error);
      throw error;
    }
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      category: data.category,
      availableSizes: data.available_sizes as ProductSize[],
      inStock: data.in_stock,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error("Error in updateProduct:", error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase.rpc('delete_merchandise', { item_id: id });
    
    if (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    throw error;
  }
};

// Check if user is admin
export const isUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('check_user_admin_status', { user_id: userId });
    
    if (error) {
      console.error("Error checking admin status:", error);
      throw error;
    }
    
    return data ? data.is_admin : false;
  } catch (error) {
    console.error("Error in isUserAdmin:", error);
    return false;
  }
};
