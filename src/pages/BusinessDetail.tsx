
import { MainLayout } from "@/components/layout/MainLayout";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BusinessDetail as BusinessDetailComponent } from "@/components/business/BusinessDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader } from "lucide-react";
import { Business } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

// Type for the data returned directly from Supabase
type SupabaseBusiness = Database['public']['Tables']['businesses']['Row'];
type SupabaseSocialLink = Database['public']['Tables']['social_links']['Row'];

// Custom type combining business with its social links
type BusinessWithSocialLinks = SupabaseBusiness & {
  social_links: SupabaseSocialLink[] | null;
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

const BusinessDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      fetchBusinessById(id);
    }
  }, [id]);
  
  const fetchBusinessById = async (businessId: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          social_links(*)
        `)
        .eq('id', businessId)
        .single();
      
      if (error) {
        console.error("Error fetching business:", error);
        toast.error("Failed to load business details");
        return;
      }
      
      // Map Supabase data to our application's Business type
      const businessData = mapSupabaseBusinessToBusiness(data as BusinessWithSocialLinks);
      setBusiness(businessData);
    } catch (error) {
      console.error("Error in fetchBusinessById:", error);
      toast.error("An error occurred while loading business details");
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
  
  if (!business) {
    return (
      <MainLayout>
        <div className="py-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Business Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The business you're looking for doesn't exist or has been removed.
          </p>
          <Button 
            onClick={() => navigate("/businesses")}
            className="bg-amatyma-red hover:bg-amatyma-red/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Businesses
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6 py-6">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate("/businesses")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Businesses
        </Button>
        
        <BusinessDetailComponent business={business} />
      </div>
    </MainLayout>
  );
};

export default BusinessDetail;
