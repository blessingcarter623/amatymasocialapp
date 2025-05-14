
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
import { Building, User, Loader, AlertCircle } from "lucide-react";
import { Banner } from "@/components/ui/banner";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Business } from "@/types";
import { toast } from "sonner";

// Type for the data returned directly from Supabase
type SupabaseBusiness = Database['public']['Tables']['businesses']['Row'];

// Helper function to convert Supabase data to our application's Business type
const mapSupabaseBusinessToBusiness = (data: SupabaseBusiness | null): Business | null => {
  if (!data) return null;
  
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
    facebook: data.facebook as string | undefined,
    instagram: data.instagram as string | undefined,
    whatsapp: data.whatsapp as string | undefined,
    website: data.website as string | undefined,
    department: data.department || undefined,
    userType: "business", // Default value since this isn't in the database
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
      setError(null);
      
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq("user_id", user?.id || '')
        .single();
      
      if (error) {
        if (error.code !== "PGRST116") {
          console.error("Error fetching business:", error);
          setError("Could not fetch business data. Please try again later.");
          toast.error("Error loading business data");
        }
      }
      
      // Map to our application's Business type
      setBusiness(mapSupabaseBusinessToBusiness(data as SupabaseBusiness));
    } catch (error) {
      console.error("Error in fetchUserBusiness:", error);
      setError("An unexpected error occurred. Please try again later.");
      toast.error("Error loading business data");
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
  
  return (
    <MainLayout>
      <div className="space-y-6 py-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        {error && (
          <Banner
            title="Connection Error"
            description={error}
            ctaText="Try Again"
            ctaAction={fetchUserBusiness}
            variant="dark"
            className="mb-6"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
          </Banner>
        )}
        
        {!business && !error && (
          <Banner
            title="Complete Your Business Profile"
            description="Add your business information to showcase your services to potential partners."
            ctaText="Add Business Info"
            ctaAction={() => setActiveTab("business")}
            variant="dark"
            className="mb-6"
          />
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
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
              
              {/* Gender options are hidden but not removed */}
              <div className="space-y-1 hidden">
                <p className="text-sm text-muted-foreground">Employment Status</p>
                <p className="font-medium capitalize">{profile?.employment_status}</p>
              </div>
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
