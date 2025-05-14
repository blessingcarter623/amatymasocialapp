
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { Business, Department } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

// Type for the data returned directly from Supabase
type SupabaseBusiness = Database['public']['Tables']['businesses']['Row'];
type SupabaseSocialLink = Database['public']['Tables']['social_links']['Row'];

// Custom type combining business with its social links
type BusinessWithSocialLinks = SupabaseBusiness & {
  social_links: SupabaseSocialLink[] | null;
  province?: string | null;
  city?: string | null;
};

// Helper function to convert Supabase data to our application's Business type
const mapSupabaseBusinessToBusiness = (data: BusinessWithSocialLinks): Business => {
  // Extract the first social link (if any)
  const socialLink = data.social_links && data.social_links.length > 0 ? data.social_links[0] : null;
  
  return {
    id: data.id,
    name: data.name,
    description: data.description || "",
    category: data.category || "",
    subcategory: data.subcategory || undefined,
    location: data.location || "",
    province: data.province || undefined,
    city: data.city || undefined,
    contactPerson: data.contact_person || "",
    phone: data.phone || "",
    email: data.email || "",
    logo: data.logo || undefined,
    images: data.images || [],
    socialLinks: {
      facebook: socialLink?.facebook || undefined,
      whatsapp: socialLink?.whatsapp || undefined,
      instagram: socialLink?.instagram || undefined,
      website: socialLink?.website || undefined,
    },
    department: data.department || undefined,
    userType: "business", // Default value since this isn't in the database
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

type AppContextType = {
  businesses: Business[];
  isLoading: boolean;
  departments: Department[];
  fetchBusinesses: () => Promise<void>;
};

const departmentsList: Department[] = [
  { name: "Agribusiness", subcategories: ["Farming", "Distribution", "Processing"] },
  { name: "Construction", subcategories: ["Residential", "Commercial", "Industrial"] },
  { name: "Education", subcategories: ["Primary", "Secondary", "Tertiary"] },
  { name: "Employment and Labour", subcategories: ["Recruitment", "HR Services", "Professional Training"] },
  { name: "Finance", subcategories: ["Banking", "Insurance", "Investment"] },
  { name: "Healthcare", subcategories: ["Medical", "Dental", "Pharmacy"] },
  { name: "Hospitality", subcategories: ["Hotels", "Restaurants", "Events"] },
  { name: "Information Technology", subcategories: ["Software", "Hardware", "Services"] },
  { name: "Legal Services", subcategories: ["Corporate", "Criminal", "Civil"] },
  { name: "Manufacturing", subcategories: ["Textiles", "Electronics", "Food"] },
  { name: "Retail", subcategories: ["Clothing", "Electronics", "Groceries"] },
  { name: "Transportation", subcategories: ["Logistics", "Public Transport", "Shipping"] },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBusinesses = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          social_links(*)
        `);
      
      if (error) {
        console.error("Error fetching businesses:", error);
        toast.error("Failed to load businesses");
        return;
      }
      
      console.log("Fetched business data:", data);
      
      // Map Supabase data to our application's Business type
      const businessData = (data as BusinessWithSocialLinks[]).map(item => 
        mapSupabaseBusinessToBusiness(item)
      );
      
      setBusinesses(businessData);
    } catch (error) {
      console.error("Error in fetchBusinesses:", error);
      toast.error("An error occurred while loading businesses");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  return (
    <AppContext.Provider
      value={{
        businesses,
        isLoading,
        departments: departmentsList,
        fetchBusinesses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
