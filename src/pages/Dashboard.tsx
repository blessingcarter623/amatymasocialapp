
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

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      fetchUserBusiness();
    }
  }, [user]);
  
  const fetchUserBusiness = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("businesses")
        .select(`
          *,
          social_links(*)
        `)
        .eq("user_id", user.id)
        .single();
      
      if (error && error.code !== "PGRST116") {
        console.error("Error fetching business:", error);
      }
      
      setBusiness(data || null);
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
