
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
  category?: string;
  subcategory?: string;
  location?: string;
  contactPerson?: string;
  department?: string;
  images?: string[];
  socialLinks?: SocialLinks;
  userType?: UserType;
}

// E-commerce related types - separate from Business
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

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "One Size" | "A4" | "A5";

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  website?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: ProductSize;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface Department {
  id?: string;
  name: string;
  description?: string;
  subcategories?: string[];
}
