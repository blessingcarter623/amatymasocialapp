
import React, { createContext, useContext, useState, useEffect } from "react";
import { Business, User, Department, EmploymentStatus } from "@/types";
import { toast } from "sonner";

type AppContextType = {
  user: User | null;
  businesses: Business[];
  departments: Department[];
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, employmentStatus?: EmploymentStatus) => Promise<void>;
  logout: () => void;
  addBusiness: (business: Omit<Business, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateBusiness: (id: string, business: Partial<Business>) => Promise<void>;
  isLoading: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "TechSolutions SA",
    description: "IT solutions provider specializing in government systems",
    category: "Technology",
    subcategory: "IT Services",
    location: "Pretoria, Gauteng",
    contactPerson: "John Khumalo",
    phone: "+27 82 123 4567",
    email: "info@techsolutionssa.co.za",
    logo: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
    images: [],
    socialLinks: {
      facebook: "https://facebook.com/techsolutionssa",
      whatsapp: "https://wa.me/27821234567",
      instagram: "https://instagram.com/techsolutionssa",
      website: "https://techsolutionssa.co.za",
    },
    department: "Communications and Digital Technologies",
    userType: "business",
    createdAt: "2023-01-15",
    updatedAt: "2023-12-20",
  },
  {
    id: "2",
    name: "Green Earth Farming",
    description: "Sustainable agricultural solutions for modern farming",
    category: "Agriculture",
    subcategory: "Sustainable Farming",
    location: "Stellenbosch, Western Cape",
    contactPerson: "Sarah van der Merwe",
    phone: "+27 83 987 6543",
    email: "contact@greenearthfarming.co.za",
    logo: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
    images: [],
    socialLinks: {
      facebook: "https://facebook.com/greenearthfarming",
      whatsapp: "https://wa.me/27839876543",
      instagram: "https://instagram.com/greenearthfarming",
      website: "https://greenearthfarming.co.za",
    },
    department: "Agriculture",
    userType: "business",
    createdAt: "2022-06-10",
    updatedAt: "2023-11-05",
  },
  {
    id: "3",
    name: "BuildRight Construction",
    description: "Government infrastructure and construction specialists",
    category: "Construction",
    subcategory: "Government Infrastructure",
    location: "Johannesburg, Gauteng",
    contactPerson: "Michael Naidoo",
    phone: "+27 84 111 2222",
    email: "projects@buildright.co.za",
    logo: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
    images: [],
    socialLinks: {
      facebook: "https://facebook.com/buildrightconstruction",
      whatsapp: "https://wa.me/27841112222",
      instagram: "https://instagram.com/buildrightconstruction",
      website: "https://buildright.co.za",
    },
    department: "Public Works and Infrastructure",
    userType: "business",
    createdAt: "2021-08-22",
    updatedAt: "2023-10-15",
  },
];

export const departmentsList: Department[] = [
  {
    name: "Economic Services and Infrastructure Development",
    subcategories: [
      "Agriculture",
      "Land Reform and Rural Development",
      "Trade, Industry and Competition",
    ],
  },
  {
    name: "Justice and Protection Services",
    subcategories: ["Correctional Services", "Defence", "Police"],
  },
  {
    name: "Social Services",
    subcategories: ["Basic Education", "Health", "Social Development"],
  },
  {
    name: "Financial and Administration Services",
    subcategories: [
      "National Treasury",
      "Public Service and Administration",
      "Public Works and Infrastructure",
    ],
  },
  {
    name: "Central Government Administration",
    subcategories: [
      "Cooperative Governance and Traditional Affairs",
      "International Relations and Cooperation",
    ],
  },
  {
    name: "Communications and Digital Technologies",
    subcategories: [],
  },
  {
    name: "Correctional Services",
    subcategories: [],
  },
  {
    name: "Defence",
    subcategories: [],
  },
  {
    name: "Employment and Labour",
    subcategories: [],
  },
  {
    name: "Forestry, Fisheries and the Environment",
    subcategories: [],
  },
  {
    name: "Health",
    subcategories: [],
  },
  {
    name: "Higher Education and Training",
    subcategories: [],
  },
  {
    name: "Home Affairs",
    subcategories: [],
  },
  {
    name: "Human Settlements",
    subcategories: [],
  },
  {
    name: "Independent Police Investigative Directorate",
    subcategories: [],
  },
  {
    name: "International Relations and Cooperation",
    subcategories: [],
  },
  {
    name: "Justice and Constitutional Development",
    subcategories: [],
  },
  {
    name: "Military Veterans",
    subcategories: [],
  },
  {
    name: "Mineral Resources and Energy",
    subcategories: [],
  },
  {
    name: "National School of Government",
    subcategories: [],
  },
  {
    name: "National Treasury",
    subcategories: [],
  },
  {
    name: "Small Business Development",
    subcategories: [],
  },
  {
    name: "Sport, Arts and Culture",
    subcategories: [],
  },
  {
    name: "State Security Agency",
    subcategories: [],
  },
  {
    name: "Transport",
    subcategories: [],
  },
  {
    name: "Water and Sanitation",
    subcategories: [],
  },
  {
    name: "Women, Youth and Persons with Disabilities",
    subcategories: [],
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("amatyma_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simple validation for demo purposes
      if (email === "demo@amatyma.com" && password === "password") {
        const newUser: User = {
          id: "user1",
          email,
          name: "Demo User",
          employmentStatus: "employed",
          isLoggedIn: true,
        };
        setUser(newUser);
        localStorage.setItem("amatyma_user", JSON.stringify(newUser));
        toast.success("Login successful!");
      } else {
        toast.error("Invalid credentials. Try 'demo@amatyma.com / password'");
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, employmentStatus: EmploymentStatus = "employed") => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `user${Math.floor(Math.random() * 1000)}`,
        email,
        name,
        employmentStatus,
        isLoggedIn: true,
      };
      
      setUser(newUser);
      localStorage.setItem("amatyma_user", JSON.stringify(newUser));
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("An error occurred during registration");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("amatyma_user");
    toast.success("Logged out successfully");
  };

  const addBusiness = async (businessData: Omit<Business, "id" | "createdAt" | "updatedAt">) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newBusiness: Business = {
        ...businessData,
        id: `business${Math.floor(Math.random() * 10000)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setBusinesses((prevBusinesses) => [...prevBusinesses, newBusiness]);
      
      // Update user with business info
      if (user) {
        const updatedUser = { ...user, business: newBusiness };
        setUser(updatedUser);
        localStorage.setItem("amatyma_user", JSON.stringify(updatedUser));
      }
      
      toast.success("Business added successfully!");
      return Promise.resolve();
    } catch (error) {
      toast.error("Failed to add business");
      console.error(error);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBusiness = async (id: string, businessUpdate: Partial<Business>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setBusinesses((prevBusinesses) =>
        prevBusinesses.map((business) =>
          business.id === id
            ? { ...business, ...businessUpdate, updatedAt: new Date().toISOString() }
            : business
        )
      );
      
      // Update user business if it's the user's business
      if (user && user.business && user.business.id === id) {
        const updatedBusiness = { ...user.business, ...businessUpdate, updatedAt: new Date().toISOString() };
        const updatedUser = { ...user, business: updatedBusiness };
        setUser(updatedUser);
        localStorage.setItem("amatyma_user", JSON.stringify(updatedUser));
      }
      
      toast.success("Business updated successfully!");
      return Promise.resolve();
    } catch (error) {
      toast.error("Failed to update business");
      console.error(error);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        businesses,
        departments: departmentsList,
        login,
        register,
        logout,
        addBusiness,
        updateBusiness,
        isLoading,
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
