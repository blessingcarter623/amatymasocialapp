
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { BusinessForm } from "@/components/business/BusinessForm";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Building, User, Loader } from "lucide-react";
import { Banner } from "@/components/ui/banner";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Business, SocialLinks } from "@/types";

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
const mapSupabaseBusinessToBusiness = (data: BusinessWithSocialLinks | null): Business | null => {
  if (!data) return null;
  
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

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [supabaseBusiness, setSupabaseBusiness] = useState<BusinessWithSocialLinks | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      fetchUserBusiness();
    } else {
      setLoading(false);
    }
  }, [user]);
  
  const fetchUserBusiness = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          social_links(*)
        `)
        .eq("user_id", user?.id || '')
        .single();
      
      if (error && error.code !== "PGRST116") {
        console.error("Error fetching business:", error);
      }
      
      // Store the raw Supabase data
      const businessData = data as BusinessWithSocialLinks | null;
      setSupabaseBusiness(businessData);
      
      // Map to our application's Business type
      setBusiness(mapSupabaseBusinessToBusiness(businessData));
    } catch (error) {
      console.error("Error in fetchUserBusiness:", error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-amatyma-red" />
        </div>
      </MainLayout>
    );
  }
  
  // Use a clientside tab change without causing a page refresh
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6 py-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        {!business && (
          <Banner
            title="Complete Your Business Profile"
            description="Add your business information to showcase your services to potential partners."
            ctaText="Add Business Info"
            ctaAction={() => setActiveTab("business")}
            variant="dark"
            className="mb-6"
          />
        )}
        
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="neumorphic w-full justify-start">
            <TabsTrigger value="profile" className="data-[state=active]:text-amatyma-red">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="business" className="data-[state=active]:text-amatyma-red">
              <Building className="mr-2 h-4 w-4" />
              Business
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <div className="neumorphic p-6 space-y-4">
              <h2 className="text-xl font-medium">Personal Information</h2>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{profile?.name || user?.email}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              
              {profile?.employment_status && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Employment Status</p>
                  <p className="font-medium capitalize">{profile.employment_status}</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="business" className="mt-6">
            <BusinessForm business={business} onSuccess={fetchUserBusiness} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
