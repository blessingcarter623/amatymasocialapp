
import { supabase } from "@/integrations/supabase/client";
import { Product, ProductSize } from "@/types";
import { MerchandiseItem, CreateMerchandiseItem, UpdateMerchandiseItem } from "@/types/merchandise";

// Convert database item to frontend Product type
const mapToProduct = (item: MerchandiseItem): Product => ({
  id: item.id,
  name: item.name,
  description: item.description,
  price: item.price,
  image: item.image,
  category: item.category,
  availableSizes: item.available_sizes,
  inStock: item.in_stock,
  createdAt: item.created_at,
  updatedAt: item.updated_at
});

// Convert frontend Product to database format
const mapToMerchandiseItem = (product: Product): MerchandiseItem => ({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  image: product.image,
  category: product.category,
  available_sizes: product.availableSizes,
  in_stock: product.inStock,
  created_at: product.createdAt,
  updated_at: product.updatedAt
});

// Fetch all products
export const getProducts = async (): Promise<Product[]> => {
  // Use raw SQL query instead of the .from() method to avoid TypeScript issues
  const { data, error } = await supabase
    .rpc('get_all_merchandise')
    .returns<MerchandiseItem[]>();
    
  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  
  return (data || []).map(mapToProduct);
};

// Fetch a product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  // Use raw SQL query
  const { data, error } = await supabase
    .rpc('get_merchandise_by_id', { item_id: id })
    .returns<MerchandiseItem | null>();
    
  if (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
  
  return data ? mapToProduct(data) : null;
};

// Create a new product
export const createProduct = async (product: CreateMerchandiseItem): Promise<Product> => {
  // Use raw SQL query
  const { data, error } = await supabase
    .rpc('create_merchandise', { 
      item_name: product.name,
      item_description: product.description,
      item_price: product.price,
      item_image: product.image,
      item_category: product.category,
      item_available_sizes: product.available_sizes,
      item_in_stock: product.in_stock
    })
    .returns<MerchandiseItem>();
    
  if (error) {
    console.error("Error creating product:", error);
    throw error;
  }
  
  return mapToProduct(data as MerchandiseItem);
};

// Update a product
export const updateProduct = async (product: UpdateMerchandiseItem): Promise<Product> => {
  // Use raw SQL query
  const { data, error } = await supabase
    .rpc('update_merchandise', { 
      item_id: product.id,
      item_name: product.name,
      item_description: product.description,
      item_price: product.price,
      item_image: product.image,
      item_category: product.category,
      item_available_sizes: product.available_sizes,
      item_in_stock: product.in_stock
    })
    .returns<MerchandiseItem>();
    
  if (error) {
    console.error("Error updating product:", error);
    throw error;
  }
  
  return mapToProduct(data as MerchandiseItem);
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  // Use raw SQL query
  const { error } = await supabase
    .rpc('delete_merchandise', { item_id: id });
    
  if (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Check if a user is an admin
export const isUserAdmin = async (userId: string): Promise<boolean> => {
  if (!userId) return false;
  
  // Use raw SQL query to check admin status
  const { data, error } = await supabase
    .rpc('check_user_admin_status', { user_id: userId })
    .returns<{is_admin: boolean}>();
    
  if (error || !data) {
    console.error("Error checking admin status:", error);
    return false;
  }
  
  return data.is_admin;
};

// Upload a product image to Supabase Storage
export const uploadProductImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `merchandise/${fileName}`;
  
  const { error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file);
    
  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
  
  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);
    
  return data.publicUrl;
};
