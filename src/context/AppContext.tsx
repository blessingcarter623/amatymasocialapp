import { createContext, useContext, useState, useEffect } from "react";
import { Business, Department } from "@/types";
import { supabase } from "@/integrations/supabase/client";

interface AppContextType {
  businesses: Business[];
  setBusinesses: React.Dispatch<React.SetStateAction<Business[]>>;
  filteredBusinesses: Business[];
  setFilteredBusinesses: React.Dispatch<React.SetStateAction<Business[]>>;
  departments: Department[];
  featuredBusinesses: Business[];
  isLoading: boolean;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  businesses: [],
  setBusinesses: () => {},
  filteredBusinesses: [],
  setFilteredBusinesses: () => {},
  departments: [],
  featuredBusinesses: [],
  isLoading: false,
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: "1",
      name: "Zulu Traditional Attire",
      description: "Authentic Zulu clothing and accessories for cultural events",
      email: "info@zuluattire.co.za",
      phone: "+27 31 123 4567",
      address: "123 Smith Street",
      city: "Durban",
      province: "KwaZulu-Natal",
      country: "South Africa",
      website: "https://www.zuluattire.co.za",
      logo: "/lovable-uploads/443b5d39-f791-45ba-822d-732d578e98e8.png",
      userId: "user1",
      category: "Clothing",
      subcategory: "Traditional",
      location: "Durban CBD",
      contactPerson: "Sipho Ndlovu",
      department: "Arts & Culture",
      createdAt: "2023-01-15T08:30:00Z",
      updatedAt: "2023-04-20T14:45:00Z",
      images: [
        "/lovable-uploads/68d1115e-2772-4423-97a7-0314869d7169.png",
        "/lovable-uploads/69238652-423e-4efe-9ad4-405b5760b70f.png",
      ],
      socialLinks: {
        facebook: "https://facebook.com/zuluattire",
        instagram: "https://instagram.com/zuluattire",
        whatsapp: "https://wa.me/27311234567",
      },
      userType: "business",
    },
    {
      id: "2",
      name: "Ndebele Home Decor",
      description: "Hand-painted Ndebele-inspired home decor items",
      email: "sales@ndbeledecor.com",
      phone: "+27 12 987 6543",
      address: "456 Church Street",
      city: "Pretoria",
      province: "Gauteng",
      country: "South Africa",
      website: "https://www.ndbeledecor.com",
      logo: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
      userId: "user2",
      category: "Home Decor",
      subcategory: "Wall Art",
      location: "Menlyn",
      contactPerson: "Thembi Khoza",
      department: "Arts & Culture",
      createdAt: "2023-02-28T16:00:00Z",
      updatedAt: "2023-05-01T11:15:00Z",
      images: [
        "/lovable-uploads/70e99f6d-9a6a-4b9a-8f1a-8e3a2b5a7b9c.png",
        "/lovable-uploads/719c8e8a-5a5a-4b5a-8a5a-5a5a5a5a5a5a.png",
      ],
      socialLinks: {
        facebook: "https://facebook.com/ndbeledecor",
        instagram: "https://instagram.com/ndbeledecor",
        whatsapp: "https://wa.me/27129876543",
      },
      userType: "business",
    },
    {
      id: "3",
      name: "Xhosa Beaded Jewelry",
      description: "Traditional Xhosa beaded necklaces, bracelets, and earrings",
      email: "orders@xosajewelry.co.za",
      phone: "+27 43 555 1212",
      address: "789 Oxford Street",
      city: "East London",
      province: "Eastern Cape",
      country: "South Africa",
      website: "https://www.xosajewelry.co.za",
      logo: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
      userId: "user3",
      category: "Jewelry",
      subcategory: "Beaded",
      location: "Vincent",
      contactPerson: "Nomusa Dlamini",
      department: "Arts & Culture",
      createdAt: "2023-03-10T09:45:00Z",
      updatedAt: "2023-06-05T17:00:00Z",
      images: [
        "/lovable-uploads/72b8b3b2-7b8b-4b8b-8b8b-8b8b8b8b8b8b.png",
        "/lovable-uploads/73a7a7a7-7a7a-4a7a-8a7a-7a7a7a7a7a7a.png",
      ],
      socialLinks: {
        facebook: "https://facebook.com/xosajewelry",
        instagram: "https://instagram.com/xosajewelry",
        whatsapp: "https://wa.me/27435551212",
      },
      userType: "business",
    },
    {
      id: "4",
      name: "Swazi Candles",
      description: "Handcrafted candles with unique Swazi-inspired designs",
      email: "info@swazicandles.com",
      phone: "+27 13 777 8989",
      address: "101 Kruger Street",
      city: "Mbombela",
      province: "Mpumalanga",
      country: "South Africa",
      website: "https://www.swazicandles.com",
      logo: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
      userId: "user4",
      category: "Home Decor",
      subcategory: "Candles",
      location: "Nelspruit",
      contactPerson: "Thando Nkosi",
      department: "Arts & Culture",
      createdAt: "2023-04-01T14:20:00Z",
      updatedAt: "2023-07-10T10:30:00Z",
      images: [
        "/lovable-uploads/74c6c6c6-6c6c-4c6c-8c6c-6c6c6c6c6c6c.png",
        "/lovable-uploads/75b5b5b5-5b5b-4b5b-8b5b-5b5b5b5b5b5b.png",
      ],
      socialLinks: {
        facebook: "https://facebook.com/swazicandles",
        instagram: "https://instagram.com/swazicandles",
        whatsapp: "https://wa.me/27137778989",
      },
      userType: "business",
    },
    {
      id: "5",
      name: "Basotho Blankets",
      description: "Traditional Basotho blankets with vibrant patterns and colors",
      email: "sales@basothoblankets.co.za",
      phone: "+27 51 444 5656",
      address: "222 Aliwal Street",
      city: "Bloemfontein",
      province: "Free State",
      country: "South Africa",
      website: "https://www.basothoblankets.co.za",
      logo: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
      userId: "user5",
      category: "Clothing",
      subcategory: "Textiles",
      location: "CBD",
      contactPerson: "Refiloe Sefatsa",
      department: "Arts & Culture",
      createdAt: "2023-05-12T11:55:00Z",
      updatedAt: "2023-08-15T15:10:00Z",
      images: [
        "/lovable-uploads/76a4a4a4-4a4a-4a4a-8a4a-4a4a4a4a4a4a.png",
        "/lovable-uploads/77939393-3939-4939-8939-393939393939.png",
      ],
      socialLinks: {
        facebook: "https://facebook.com/basothoblankets",
        instagram: "https://instagram.com/basothoblankets",
        whatsapp: "https://wa.me/27514445656",
      },
      userType: "business",
    },
    {
      id: "6",
      name: "Venda Pottery",
      description: "Authentic Venda pottery with traditional designs and techniques",
      email: "orders@vendapottery.com",
      phone: "+27 15 962 3434",
      address: "333 Thohoyandou Street",
      city: "Thohoyandou",
      province: "Limpopo",
      country: "South Africa",
      website: "https://www.vendapottery.com",
      logo: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
      userId: "user6",
      category: "Home Decor",
      subcategory: "Pottery",
      location: "Sibasa",
      contactPerson: "Livhuwani Rambuda",
      department: "Arts & Culture",
      createdAt: "2023-06-20T08:10:00Z",
      updatedAt: "2023-09-20T12:45:00Z",
      images: [
        "/lovable-uploads/78828282-2828-4828-8828-282828282828.png",
        "/lovable-uploads/79717171-1717-4717-8717-717171717171.png",
      ],
      socialLinks: {
        facebook: "https://facebook.com/vendapottery",
        instagram: "https://instagram.com/vendapottery",
        whatsapp: "https://wa.me/27159623434",
      },
      userType: "business",
    },
  ]);

  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const departments: Department[] = [
    {
      id: "1",
      name: "Arts & Culture",
      description: "Arts, Culture and Heritage",
      subcategories: ["Visual Arts", "Music", "Dance", "Theatre", "Literature", "Film", "Museums", "Heritage Sites"],
    },
    {
      id: "2",
      name: "Economic Development",
      description: "Economic Development and Planning",
      subcategories: ["Business Development", "Investment Promotion", "Trade", "Industry Support", "Tourism", "Strategic Planning"],
    },
    {
      id: "3",
      name: "Education",
      subcategories: ["Primary Education", "Secondary Education", "Higher Education", "Special Education", "Adult Education", "Early Childhood Development"],
    },
    {
      id: "4",
      name: "Environmental Affairs",
      description: "Environmental Management",
      subcategories: ["Conservation", "Pollution Control", "Waste Management", "Environmental Education", "Climate Change", "Sustainable Development"],
    },
    {
      id: "5",
      name: "Health",
      subcategories: ["Primary Healthcare", "Hospitals", "Clinics", "Mental Health", "Public Health", "Disease Control"],
    },
    {
      id: "6",
      name: "Housing",
      subcategories: ["Social Housing", "Affordable Housing", "Property Development", "Human Settlements", "Land Reform"],
    },
    {
      id: "7",
      name: "Social Services",
      description: "Social Development",
      subcategories: ["Child Welfare", "Youth Development", "Women Empowerment", "Disability Services", "Elderly Care", "Poverty Alleviation"],
    },
    {
      id: "8",
      name: "Sports & Recreation",
      description: "Sports, Recreation, and Leisure",
      subcategories: ["Team Sports", "Individual Sports", "Parks & Recreation", "Youth Sports Programs", "Sports Facilities", "Outdoor Activities"],
    },
    {
      id: "9",
      name: "Transport",
      subcategories: ["Public Transport", "Road Infrastructure", "Logistics", "Maritime", "Aviation", "Transport Planning"],
    },
    {
      id: "10",
      name: "Utilities",
      subcategories: ["Water", "Electricity", "Gas", "Waste Management", "Telecommunications"],
    },
    {
      id: "11",
      name: "ICT",
      subcategories: ["Software Development", "IT Services", "Telecommunications", "Digital Innovation", "Tech Infrastructure"],
    },
    {
      id: "12",
      name: "Professional Services",
      subcategories: ["Legal", "Accounting", "Consulting", "Marketing", "Human Resources", "Financial Services"],
    },
  ];

  const featuredBusinesses = businesses.slice(0, 6);

  useEffect(() => {
    setFilteredBusinesses(businesses);
  }, [businesses]);

  return (
    <AppContext.Provider
      value={{
        businesses,
        setBusinesses,
        filteredBusinesses,
        setFilteredBusinesses,
        departments,
        featuredBusinesses,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
