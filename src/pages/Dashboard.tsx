import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusinessForm } from "@/components/business/BusinessForm";
import { BusinessList } from "@/components/business/BusinessList";
import { toast } from "sonner";
import { PlusCircle, Building2 } from "lucide-react";
import { Business, SocialLinks } from "@/types";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("businesses");
  const [showForm, setShowForm] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserBusinesses();
    }
  }, [user]);

  const fetchUserBusinesses = async () => {
    setLoading(true);
    try {
      // Fetch user's businesses
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", user?.id);

      if (error) throw error;

      // For demo purposes, adding a sample business if none exist
      if (!data || data.length === 0) {
        const mockBusiness: Business = {
          id: "sample-" + Date.now(),
          name: "Sample Business",
          description: "This is a sample business to get you started",
          email: user?.email || "sample@example.com",
          phone: "+27 123 456 7890",
          address: "123 Sample Street",
          city: "Cape Town",
          province: "Western Cape",
          country: "South Africa",
          website: "https://www.samplebusiness.com",
          logo: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
          userId: user?.id || "unknown",
          category: "Services",
          subcategory: "Professional Services",
          location: "Cape Town CBD",
          contactPerson: user?.user_metadata?.name || "Business Owner",
          department: "Professional Services",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userType: "business",
          socialLinks: {
            facebook: "https://facebook.com/sample",
            instagram: "https://instagram.com/sample",
            whatsapp: "https://wa.me/27123456789",
            website: "https://www.samplebusiness.com",
          },
          images: [
            "/lovable-uploads/5809bcfb-e855-4eef-8ddb-86825cf1f329.png",
            "/lovable-uploads/f74a0cf6-4b5a-440b-8f7d-6143716f4c8a.png"
          ]
        };

        setBusinesses([mockBusiness]);
      } else {
        // Transform the database records to match our Business type
        const formattedBusinesses = await Promise.all(
          data.map(async (business) => {
            // Fetch social links for each business
            const { data: socialData } = await supabase
              .from("social_links")
              .select("*")
              .eq("business_id", business.id)
              .single();

            const socialLinks: SocialLinks = socialData || {};

            return {
              id: business.id,
              name: business.name,
              description: business.description || "",
              email: business.email || "",
              phone: business.phone || "",
              address: business.address || "",
              city: business.city || "",
              province: business.province || "",
              country: business.country || "South Africa",
              website: business.website || "",
              logo: business.logo || "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
              userId: business.user_id,
              category: business.category || "",
              subcategory: business.subcategory || "",
              location: business.location || "",
              contactPerson: business.contact_person || "",
              department: business.department || "",
              createdAt: business.created_at,
              updatedAt: business.updated_at,
              images: business.images || [],
              socialLinks: socialLinks,
              userType: "business" as const,
            };
          })
        );

        setBusinesses(formattedBusinesses);
      }
    } catch (error) {
      console.error("Error fetching businesses:", error);
      toast.error("Failed to load your businesses");
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          onClick={() => {
            setSelectedBusiness(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-amatyma-red hover:bg-amatyma-red/80"
        >
          <PlusCircle size={16} />
          <span>Add Business</span>
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          setShowForm(false);
        }}
        className="w-full"
      >
        <TabsList className="w-full justify-start mb-8 bg-transparent border-b rounded-none p-0">
          <TabsTrigger
            value="businesses"
            className="data-[state=active]:border-b-2 data-[state=active]:border-amatyma-red rounded-none px-6 py-2 data-[state=active]:shadow-none bg-transparent"
          >
            Your Businesses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="businesses" className="pt-4 mt-0">
          {showForm ? (
            <BusinessForm
              business={selectedBusiness}
              onSuccess={() => {
                setShowForm(false);
                fetchUserBusinesses();
                toast.success(
                  selectedBusiness
                    ? "Business updated successfully"
                    : "Business added successfully"
                );
              }}
            />
          ) : loading ? (
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg border bg-card animate-pulse h-48"
                ></div>
              ))}
            </div>
          ) : businesses.length === 0 ? (
            <div className="text-center py-16 neumorphic p-8">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-medium mb-2">No businesses yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't added any businesses to your profile yet. Get started
                by adding your first business.
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-amatyma-red hover:bg-amatyma-red/80"
              >
                Add Your First Business
              </Button>
            </div>
          ) : (
            <BusinessList businesses={businesses} />
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Dashboard;
