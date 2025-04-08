
import { MainLayout } from "@/components/layout/MainLayout";
import { useApp } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BusinessForm } from "@/components/business/BusinessForm";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Building, User } from "lucide-react";
import { Banner } from "@/components/ui/banner";

const Dashboard = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  
  useEffect(() => {
    if (!user?.isLoggedIn) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  if (!user) {
    return null;
  }
  
  return (
    <MainLayout>
      <div className="space-y-6 py-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        {!user.business && (
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
                <p className="font-medium">{user.name}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="business" className="mt-6">
            <BusinessForm business={user.business} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
