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

// Add the ProductSize type export
export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";
