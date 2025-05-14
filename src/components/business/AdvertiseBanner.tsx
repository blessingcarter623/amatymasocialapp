
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function AdvertiseBanner() {
  const navigate = useNavigate();
  
  return (
    <div className="neumorphic overflow-hidden mb-8 relative">
      <div className="flex flex-col md:flex-row items-center bg-amatyma-dark text-white rounded-xl overflow-hidden">
        {/* Left side - Image */}
        <div className="w-full md:w-1/3 p-4 flex justify-center items-center">
          <img 
            src="/lovable-uploads/bbc421c6-8651-44e6-b398-e3b56ea6973c.png"
            alt="Advertise Here"
            className="w-full max-h-72 object-contain"
          />
        </div>
        
        {/* Right side - Content */}
        <div className="w-full md:w-2/3 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Promote Your Business</h3>
            <p className="text-lg mb-6">
              Get your business in front of potential customers and government departments. 
              Increase your visibility in the Amatyma Brotherhood Circle network.
            </p>
          </div>
          
          <div className="flex justify-center md:justify-start">
            <Button 
              onClick={() => navigate("/contact")}
              className="bg-amatyma-red hover:bg-amatyma-red/80 text-white px-8 py-6 text-lg"
              size="lg"
            >
              Click Here to Advertise!
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
