
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';

export function AdvertiseBanner() {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Advertising Card */}
      <div className="neumorphic overflow-hidden transition-all duration-300 hover:translate-y-[-5px]">
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
              Advertise Your Business
            </h3>
            <p className="text-xs text-muted-foreground">
              Premium Visibility
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Get your business featured prominently on the Amatyma platform.
          </p>
          
          <Button
            className="w-full bg-amatyma-red/80 hover:bg-amatyma-red"
            onClick={() => navigate("/contact")}
          >
            <Info className="mr-2 h-4 w-4" />
            Click Here to Advertise!
          </Button>
        </div>
      </div>
      
      {/* Placeholder slots for future business advertisements */}
      {/* These empty divs maintain the grid structure but don't display anything */}
      <div className="hidden md:block"></div>
      <div className="hidden md:block"></div>
    </div>
  );
}
