
export type SocialLinks = {
  facebook?: string;
  whatsapp?: string;
  instagram?: string;
  website?: string;
};

export type Department = {
  name: string;
  subcategories?: string[];
};

export type UserType = "business" | "individual";

export type EmploymentStatus = "employed" | "unemployed" | "self-employed";

export type BusinessCategory = {
  name: string;
  subcategories?: string[];
};

export type Business = {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  location: string;
  province?: string;
  city?: string;
  contactPerson: string;
  phone: string;
  email: string;
  logo?: string;
  images?: string[];
  socialLinks: SocialLinks;
  department?: string;
  userType: UserType;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  employmentStatus?: EmploymentStatus;
  business?: Business;
  isLoggedIn: boolean;
};

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Product = {
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
};

export type CartItem = {
  productId: string;
  quantity: number;
  size: ProductSize;
  product: Product;
};

export type Cart = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};
