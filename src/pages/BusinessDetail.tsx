
import { MainLayout } from "@/components/layout/MainLayout";
import { useApp } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BusinessDetail as BusinessDetailComponent } from "@/components/business/BusinessDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Business } from "@/types";

const BusinessDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { businesses } = useApp();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundBusiness = businesses.find((b) => b.id === id);
      setBusiness(foundBusiness || null);
    }
  }, [id, businesses]);
  
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
