
export type UserType = "business" | "individual";
export type EmploymentStatus = "employed" | "unemployed" | "self-employed";

export interface Business {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  country: string;
  website: string;
  logo: string;
  userId: string;
  // Added missing properties
  category?: string;
  subcategory?: string;
  location?: string;
  contactPerson?: string;
  department?: string;
  images?: string[];
  socialLinks?: SocialLinks;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  availableSizes: ProductSize[];
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

// Updated ProductSize type to include all sizes used
export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "One Size" | "A4" | "A5";

// Add SocialLinks interface
export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  website?: string;
}

// Add CartItem interface
export interface CartItem {
  product: Product;
  quantity: number;
  size: ProductSize;
}

// Add Cart interface
export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Add Department interface
export interface Department {
  id: string;
  name: string;
  description?: string;
}
