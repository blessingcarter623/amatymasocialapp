
import React from 'react';
import { Megaphone, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function AdvertisementSection() {
  const navigate = useNavigate();
  
  // Sample advertisement spots
  const adSpots = [
    {
      id: 1,
      title: "Premium Spot",
      description: "High visibility placement on our platform for maximum exposure to government departments and other businesses",
      price: "R999/month",
      color: "bg-gradient-to-br from-amatyma-red to-orange-500"
    },
    {
      id: 2,
      title: "Standard Spot",
      description: "Regular placement with good visibility to showcase your business to our network",
      price: "R499/month",
      color: "bg-gradient-to-br from-purple-600 to-blue-500"
    },
    {
      id: 3,
      title: "Basic Spot",
      description: "Affordable option to get your business in front of potential customers and partners",
      price: "R249/month",
      color: "bg-gradient-to-br from-green-500 to-teal-400"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {adSpots.map((spot) => (
        <div 
          key={spot.id} 
          className="neumorphic p-6 flex flex-col h-full transition-all duration-300 hover:translate-y-[-5px]"
        >
          <div className={`${spot.color} text-white p-3 rounded-md inline-flex w-fit mb-4`}>
            {spot.id === 1 ? (
              <Megaphone className="h-5 w-5" />
            ) : (
              <Tag className="h-5 w-5" />
            )}
          </div>
          
          <h3 className="text-xl font-medium mb-2">{spot.title}</h3>
          <p className="text-muted-foreground text-sm flex-grow mb-4">{spot.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-amatyma-red">{spot.price}</span>
            <Button 
              size="sm" 
              onClick={() => navigate("/contact")}
              variant="outline"
              className="border-amatyma-red/20 text-amatyma-red hover:bg-amatyma-red hover:text-white"
            >
              Inquire
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
