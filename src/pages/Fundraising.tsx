
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { HandHeart } from "lucide-react";
import { useEffect } from "react";

export default function Fundraising() {
  const fundraisingUrl = "https://www.backabuddy.co.za/organization/amatyma-brotherhood-circle";
  
  // Track page view
  useEffect(() => {
    console.log("Fundraising page viewed");
  }, []);

  const handleDonateClick = () => {
    window.open(fundraisingUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold mb-6 text-amatyma-red">Support Our Cause</h1>
        
        <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
          <HandHeart className="w-16 h-16 mx-auto mb-6 text-amatyma-red" />
          
          <h2 className="text-2xl font-semibold mb-4">Help AMATYMA Make a Difference</h2>
          
          <p className="text-muted-foreground mb-6">
            Your contribution to AMATYMA Brotherhood Circle helps us support communities, 
            develop business initiatives, and make a positive impact across South Africa. 
            Every donation, no matter the size, brings us closer to our goals.
          </p>
          
          <Button 
            onClick={handleDonateClick}
            size="lg" 
            className="bg-amatyma-red hover:bg-amatyma-red/80 text-white px-8 py-6 text-lg"
          >
            <HandHeart className="mr-2 h-5 w-5" />
            Donate Now
          </Button>
        </div>

        <div className="space-y-6 text-left">
          <div>
            <h3 className="text-xl font-medium mb-2">Why Donate?</h3>
            <p className="text-muted-foreground">
              Your donations help fund community outreach programs, business development 
              initiatives, and support for aspiring entrepreneurs within our network.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">How We Use Your Donations</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Community development projects</li>
              <li>Business incubation programs</li>
              <li>Educational workshops</li>
              <li>Support for small businesses</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
