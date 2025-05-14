
import React from 'react';
import { Button } from "@/components/ui/button";
import { Banner } from "@/components/ui/banner";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useApp } from "@/context/AppContext";
import { useTheme } from "@/context/ThemeContext";
import { ArrowRight, UserCircle, Building, ShieldCheck, Info, Download, Megaphone, Tag, ListChecks } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { AdvertisementSection } from "@/components/business/AdvertisementSection";

const Index = () => {
  const navigate = useNavigate();
  const { businesses } = useApp();
  const { theme } = useTheme();
  
  // Display only 3 businesses on the homepage
  const featuredBusinesses = businesses.slice(0, 3);
  
  const handleProfileClick = () => {
    window.open("https://mgxjqujcsajvogaoqccz.supabase.co/storage/v1/object/public/pdf//Amatyma%20Profile%202025%20(1).pdf", "_blank");
  };
  
  const handleWhatsAppClick = () => {
    window.open("https://chat.whatsapp.com/E6RWhzKhGSnF7JvMphAs4O", "_blank");
  };
  
  // Featured merchandise items - using the updated T-shirt image
  const featuredMerchandise = [
    {
      id: "8", // Hoodie
      name: "MANCAVE Hoodie",
      price: "Coming Soon",
      image: "/lovable-uploads/997c51e1-52ef-4d03-b735-b857bdc68cef.png"
    },
    {
      id: "7", // Mug
      name: "MANCAVE Mug",
      price: "Coming Soon",
      image: "/lovable-uploads/c2bb04af-8b76-4043-9ca8-6b92f20aaa45.png"
    },
    {
      id: "12", // T-Shirt
      name: "MANCAVE T-Shirt",
      price: "Coming Soon",
      image: "/lovable-uploads/c91a9f23-ad10-45ef-8feb-7fd2bedf23b9.png" // Updated T-shirt image
    }
  ];
  
  return (
    <MainLayout>
      <section className="py-6 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 md:pr-8 animate-fade-in">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              <span className="text-amatyma-red">Amatyma</span> Brotherhood Circle
            </h1>
            <p className="text-xl text-muted-foreground">
              A community-focused organization dedicated to empowering men and addressing critical social issues in South Africa.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                className="bg-amatyma-red hover:bg-amatyma-red/80 text-lg px-6 py-6"
                onClick={() => navigate("/register")}
              >
                Register Your Business
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-amatyma-red/20 text-amatyma-red hover:bg-amatyma-red hover:text-white text-lg px-6 py-6"
                onClick={() => navigate("/about")}
              >
                About Us
                <Info className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* WhatsApp Join Button */}
            <button 
              onClick={handleWhatsAppClick}
              className="group flex items-center gap-3 px-6 py-4 text-lg font-medium text-white bg-green-500 rounded-xl shadow-lg 
                         hover:bg-green-600 transition-all duration-300 
                         relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center">
                <WhatsappIcon size={28} className="mr-2" />
                Join Our WhatsApp Group
              </span>
            </button>
          </div>
          
          <div className="relative">
            <div 
              className="neumorphic p-8 animate-fade-in cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center" 
              style={{ animationDelay: "0.3s", minHeight: "260px" }}
              onClick={handleProfileClick}
              title="Download Amatyma Profile"
            >
              <div className="relative flex items-center justify-center w-full h-full">
                <img 
                  src="/lovable-uploads/443b5d39-f791-45ba-822d-732d578e98e8.png"
                  alt="Amatyma Brotherhood Circle"
                  className="w-44 h-44 md:w-56 md:h-56 object-contain rounded-xl dark:opacity-90 dark:contrast-125 dark:brightness-90 transition-all duration-300"
                />
              </div>
            </div>
            <div className="text-center mt-2 text-sm text-muted-foreground flex items-center justify-center">
              <Download size={16} className="mr-1" />
              Click to download our profile
            </div>
          </div>
        </div>
      </section>
      
      {/* WhatsApp floating button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={handleWhatsAppClick}
          className="group flex items-center justify-center p-4 bg-green-500 rounded-full shadow-xl 
                    hover:bg-green-600 transition-all duration-300 
                    relative"
          aria-label="Join WhatsApp Group"
        >
          <WhatsappIcon size={36} className="text-white" />
        </button>
      </div>
      
      <section className="py-12">
        <Banner
          title="Join our growing network of businesses"
          description="Create an account to showcase your business and connect with government departments."
          ctaText="Register Now"
          ctaAction={() => navigate("/register")}
          dismissible
          className="mb-12"
        />
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Join Amatyma?</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Our platform connects businesses with government departments, creating opportunities for collaboration and growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Building />,
              title: "Business Visibility",
              description: "Showcase your business on a dedicated platform for government-focused opportunities",
            },
            {
              icon: <ListChecks />,
              title: "Department Liaison",
              description: "Access skilled intermediaries who connect your business with relevant government departments",
            },
            {
              icon: <UserCircle />,
              title: "Professional Network",
              description: "Build a network of contacts in both private and public sectors",
            },
            {
              icon: <ShieldCheck />,
              title: "Trusted Platform",
              description: "Join a secure and trusted business community focused on collaboration",
            },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="neumorphic p-6 text-center space-y-4 transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className="bg-amatyma-red/10 rounded-full p-3 inline-flex">
                <div className="bg-amatyma-red rounded-full p-2 text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-medium">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Advertise Here</h2>
          <Button 
            variant="outline" 
            onClick={() => navigate("/contact")}
            className="border-amatyma-red/20 text-amatyma-red hover:bg-amatyma-red hover:text-white"
          >
            Get Featured
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <AdvertisementSection />

        {/* Merchandise Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Merchandise</h2>
            <Button 
              variant="outline" 
              onClick={() => navigate("/merchandise")}
              className="border-amatyma-red/20 text-amatyma-red hover:bg-amatyma-red hover:text-white"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMerchandise.map((item) => (
              <div key={item.id} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-muted flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">Limited Edition Brotherhood Circle Merchandise</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amatyma-red">{item.price}</span>
                    <Button 
                      size="sm" 
                      onClick={() => navigate(`/merchandise/${item.id}`)}
                      className="bg-amatyma-red hover:bg-amatyma-red/80"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
