
import React from 'react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

export function AdvertiseBanner() {
  const handleAdvertiseClick = () => {
    window.open("https://chat.whatsapp.com/B4r7B9i6gdg3Uxs58hapbz", "_blank");
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Advertising Card */}
      <div className="neumorphic overflow-hidden transition-all duration-300 hover:translate-y-[-5px]">
        <div className="relative aspect-video overflow-hidden bg-black flex items-center justify-center">
          <img
            src="/lovable-uploads/8bdfeaeb-4269-4875-8231-882ceeded3f2.png"
            alt="Advertise Here"
            className="w-full h-full object-contain scale-110" // Added scale-110 to zoom the image by 10%
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
            onClick={handleAdvertiseClick}
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
