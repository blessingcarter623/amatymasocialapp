import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { BusinessDetail as BusinessDetailComponent } from "@/components/business/BusinessDetail";
import { useApp } from "@/context/AppContext";
import { Business } from "@/types";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const BusinessDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { businesses } = useApp();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the business with the matching ID
    const foundBusiness = businesses.find((b) => b.id === id);

    if (foundBusiness) {
      setBusiness(foundBusiness);
    }

    setLoading(false);
  }, [id, businesses]);

  // For demonstration - in a real app, these would come from the database
  const similarBusinesses: Business[] = [
    {
      id: "similar1",
      name: "Similar Business 1",
      description: "Another business in the same category",
      email: "info@similar1.co.za",
      phone: "+27 11 222 3333",
      address: "456 Main Road",
      city: "Johannesburg",
      province: "Gauteng",
      country: "South Africa",
      website: "https://www.similar1.co.za",
      logo: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
      userId: "user2",
      category: business?.category,
      createdAt: "2023-02-10T10:25:00Z",
      updatedAt: "2023-05-15T09:30:00Z",
      userType: "business",
    },
    {
      id: "similar2",
      name: "Similar Business 2",
      description: "A related business offering comparable services",
      email: "info@similar2.co.za",
      phone: "+27 12 444 5555",
      address: "789 Church Street",
      city: "Pretoria",
      province: "Gauteng",
      country: "South Africa",
      website: "https://www.similar2.co.za",
      logo: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
      userId: "user3",
      category: business?.category,
      createdAt: "2023-03-01T14:00:00Z",
      updatedAt: "2023-06-01T11:15:00Z",
      userType: "business",
    },
    {
      id: "similar3",
      name: "Similar Business 3",
      description: "A local business with a similar focus",
      email: "info@similar3.co.za",
      phone: "+27 21 666 7777",
      address: "321 Long Street",
      city: "Cape Town",
      province: "Western Cape",
      country: "South Africa",
      website: "https://www.similar3.co.za",
      logo: "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
      userId: "user4",
      category: business?.category,
      createdAt: "2023-04-05T16:30:00Z",
      updatedAt: "2023-07-20T13:45:00Z",
      userType: "business",
    },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 animate-spin text-amatyma-red" />
        </div>
      </MainLayout>
    );
  }

  if (!business) {
    return (
      <MainLayout>
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Business Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The business you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/businesses">View All Businesses</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <BusinessDetailComponent business={business} similarBusinesses={similarBusinesses} />
    </MainLayout>
  );
};

export default BusinessDetail;
