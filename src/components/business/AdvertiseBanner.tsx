
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';

export function AdvertiseBanner() {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Advertising Card */}
      <div className="neumorphic overflow-hidden transition-all duration-300 hover:translate-y-[-5px] md:col-span-2">
        <div className="relative aspect-video overflow-hidden">
          <img
            src="/lovable-uploads/bbc421c6-8651-44e6-b398-e3b56ea6973c.png"
            alt="Advertise Here"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-foreground">
              Premium Advertising Spot
            </h3>
            <p className="text-xs text-muted-foreground">
              Featured • High Visibility
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Get your business featured prominently on the Amatyma platform. 
            Connect with government departments and potential customers.
          </p>
          
          <Button
            className="w-full bg-amatyma-red/80 hover:bg-amatyma-red"
            onClick={() => navigate("/contact")}
          >
            <Info className="mr-2 h-4 w-4" />
            Contact Us To Advertise
          </Button>
        </div>
      </div>
      
      {/* Why Advertise Card */}
      <div className="neumorphic overflow-hidden transition-all duration-300 hover:translate-y-[-5px]">
        <div className="p-6 space-y-4 h-full flex flex-col">
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-foreground">
              Why Advertise With Us?
            </h3>
            <p className="text-xs text-muted-foreground">
              Benefits & Opportunities
            </p>
          </div>
          
          <div className="space-y-3 flex-grow">
            <p className="text-sm text-muted-foreground">
              • <span className="font-medium">Targeted Reach</span>: Connect with our network of businesses and government departments
            </p>
            <p className="text-sm text-muted-foreground">
              • <span className="font-medium">Brand Visibility</span>: Showcase your business to a focused audience
            </p>
            <p className="text-sm text-muted-foreground">
              • <span className="font-medium">Growth Opportunities</span>: Create new business connections and partnerships
            </p>
          </div>
          
          <Button
            variant="outline"
            className="w-full border-amatyma-red/20 text-amatyma-red hover:bg-amatyma-red hover:text-white"
            onClick={() => navigate("/contact")}
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
