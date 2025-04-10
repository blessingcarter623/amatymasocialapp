
import { Business } from "@/types";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Globe, Phone, Mail, MapPin, Send, ExternalLink } from "lucide-react";
import { WhatsappIcon } from "../icons/WhatsappIcon";

interface BusinessDetailProps {
  business: Business;
}

export function BusinessDetail({ business }: BusinessDetailProps) {
  return (
    <div className="space-y-8">
      <div className="neumorphic p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              {business.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {business.category}
              {business.subcategory ? ` › ${business.subcategory}` : ""}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {business.socialLinks.facebook && (
              <a 
                href={business.socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon bg-secondary/50"
              >
                <Facebook size={20} />
              </a>
            )}
            
            {business.socialLinks.instagram && (
              <a 
                href={business.socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon bg-secondary/50"
              >
                <Instagram size={20} />
              </a>
            )}
            
            {business.socialLinks.whatsapp && (
              <a 
                href={business.socialLinks.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon bg-secondary/50"
              >
                <WhatsappIcon size={20} />
              </a>
            )}
            
            {business.socialLinks.website && (
              <a 
                href={business.socialLinks.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon bg-secondary/50"
              >
                <Globe size={20} />
              </a>
            )}
          </div>
        </div>
        
        <div className="border-t border-amatyma-red/10 pt-6">
          <h3 className="text-lg font-medium mb-3">About</h3>
          <p className="text-muted-foreground">{business.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="neumorphic p-6 space-y-4">
          <h3 className="text-lg font-medium">Contact Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-secondary/50 p-2 rounded-full">
                <Phone size={18} className="text-amatyma-red" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{business.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-secondary/50 p-2 rounded-full">
                <Mail size={18} className="text-amatyma-red" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{business.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-secondary/50 p-2 rounded-full">
                <MapPin size={18} className="text-amatyma-red" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{business.location}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="neumorphic p-6 space-y-4">
          <h3 className="text-lg font-medium">Department Information</h3>
          
          <div className="flex items-center gap-3">
            <div className="bg-secondary/50 p-2 rounded-full">
              <ExternalLink size={18} className="text-amatyma-red" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="font-medium">{business.department || "Not specified"}</p>
            </div>
          </div>
          
          <div className="border-t border-amatyma-red/10 pt-4 mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Contact {business.contactPerson} directly
            </p>
            
            <Button className="w-full bg-amatyma-red hover:bg-amatyma-red/80">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
