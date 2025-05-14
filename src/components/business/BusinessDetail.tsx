import { Business } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Globe, Phone, Mail, MapPin, Send, ExternalLink } from "lucide-react";
import { WhatsappIcon } from "../icons/WhatsappIcon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

interface BusinessDetailProps {
  business: Business;
}

export function BusinessDetail({ business }: BusinessDetailProps) {
  const hasSocialLinks = business.facebook ||
    business.instagram ||
    business.whatsapp ||
    business.website;
  
  const locationDisplay = [
    business.location,
    business.city,
    business.province
  ].filter(Boolean).join(", ");
  
  return (
    <div className="space-y-6">
      <div className="neumorphic overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-amatyma-red/10 to-amatyma-red/30 relative">
          {business.logo && (
            <div className="absolute left-6 -bottom-16 w-32 h-32 rounded-full border-4 border-background overflow-hidden neumorphic-inset bg-gray-800">
              <img 
                src={business.logo} 
                alt={business.name} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
        </div>
        
        <div className="p-6 pt-20">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {business.category && (
                  <Badge variant="outline" className="bg-amatyma-red/10 text-amatyma-red border-amatyma-red/20">
                    {business.category}
                  </Badge>
                )}
                
                {business.subcategory && (
                  <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
                    {business.subcategory}
                  </Badge>
                )}
                
                {business.department && (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900">
                    {business.department}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-start gap-1 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{locationDisplay}</span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300">{business.description}</p>
            </div>
            
            {hasSocialLinks && (
              <div className="flex gap-2 mt-4 md:mt-0">
                <TooltipProvider>
                  {business.facebook && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a 
                          href={business.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Facebook</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  
                  {business.instagram && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a 
                          href={business.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Instagram</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  
                  {business.whatsapp && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a 
                          href={business.whatsapp} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          <WhatsappIcon className="h-5 w-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>WhatsApp</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  
                  {business.website && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a 
                          href={business.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 text-white hover:bg-gray-800 transition-colors"
                        >
                          <Globe className="h-5 w-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Website</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Display business images if available */}
      {business.images && business.images.length > 0 && (
        <div className="neumorphic p-6 space-y-4">
          <h3 className="text-lg font-medium">Business Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {business.images.map((image, index) => (
              <div key={index} className="aspect-square">
                <img 
                  src={image} 
                  alt={`${business.name} image ${index + 1}`} 
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="neumorphic p-6 space-y-4">
          <h3 className="text-lg font-medium">Contact Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amatyma-red/10 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-amatyma-red" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{business.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amatyma-red/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-amatyma-red" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{business.email}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amatyma-red/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-amatyma-red" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{locationDisplay}</p>
              </div>
            </div>
          </div>
          
          <Separator color="red" className="my-4" />
          
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Contact {business.contactPerson} directly
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="w-full border-amatyma-red/20"
                onClick={() => window.location.href = `tel:${business.phone}`}
              >
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
              
              <Button 
                className="w-full bg-amatyma-red hover:bg-amatyma-red/80"
                onClick={() => window.location.href = `mailto:${business.email}`}
              >
                <Send className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>
          </div>
        </div>
        
        <div className="neumorphic p-6 space-y-4">
          {business.website ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Website</h3>
                <a 
                  href={business.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amatyma-red hover:underline flex items-center text-sm"
                >
                  Visit <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
              
              <div className="aspect-video rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <img 
                  src={business.logo || "/placeholder.svg"} 
                  alt={`${business.name} website preview`} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <p className="text-sm text-muted-foreground">
                Visit the official website for more information about {business.name}
              </p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium">Business Hours</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Monday - Friday</span>
                  <span className="text-sm font-medium">08:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Saturday</span>
                  <span className="text-sm font-medium">09:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sunday</span>
                  <span className="text-sm font-medium">Closed</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Business hours may vary on holidays
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
