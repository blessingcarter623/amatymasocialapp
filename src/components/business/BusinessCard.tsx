
import { Button } from "@/components/ui/button";
import { Business } from "@/types";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const navigate = useNavigate();
  
  return (
    <div className="neumorphic overflow-hidden transition-all duration-300 hover:translate-y-[-5px]">
      <div className="relative aspect-video overflow-hidden">
        {business.logo || business.images?.length > 0 ? (
          <img
            src={business.logo || business.images?.[0]}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src="/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png"
            alt="Amatyma Logo"
            className="w-full h-full object-contain p-4 opacity-30"
          />
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-medium text-foreground line-clamp-1">
            {business.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {business.category}
            {business.subcategory ? ` › ${business.subcategory}` : ""}
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3">
          {business.description}
        </p>
        
        <div className="text-sm">
          <p className="flex items-center justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium text-foreground">{business.location}</span>
          </p>
          {business.department && (
            <p className="flex items-center justify-between mt-1">
              <span className="text-muted-foreground">Dept:</span>
              <span className="font-medium text-foreground line-clamp-1">{business.department}</span>
            </p>
          )}
        </div>
        
        <Button
          className="w-full bg-amatyma-red/80 hover:bg-amatyma-red"
          onClick={() => navigate(`/businesses/${business.id}`)}
        >
          <Info className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </div>
    </div>
  );
}
