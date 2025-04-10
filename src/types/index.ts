
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
  contactPerson: string;
  phone: string;
  email: string;
  logo?: string;
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
  business?: Business;
  isLoggedIn: boolean;
};
