
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useApp } from "@/context/AppContext";
import { useTheme } from "@/context/ThemeContext";
import { ArrowRight, UserCircle, Building, ShieldCheck, Tag } from "lucide-react";
import { AdvertiseBanner } from "@/components/business/AdvertiseBanner";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const navigate = useNavigate();
  const { businesses } = useApp();
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  // Display only 3 businesses on the homepage
  const featuredBusinesses = businesses.slice(0, 3);
  
  // Featured merchandise items
  const featuredMerchandise = [
    {
      id: "8",
      name: "MANCAVE Hoodie",
      price: "Coming Soon",
      image: "/lovable-uploads/997c51e1-52ef-4d03-b735-b857bdc68cef.png"
    },
    {
      id: "7",
      name: "MANCAVE Mug",
      price: "Coming Soon", 
      image: "/lovable-uploads/c2bb04af-8b76-4043-9ca8-6b92f20aaa45.png"
    },
    {
      id: "12",
      name: "MANCAVE T-Shirt",
      price: "Coming Soon",
      image: "/lovable-uploads/c91a9f23-ad10-45ef-8feb-7fd2bedf23b9.png"
    }
  ];
  
  return (
    <MainLayout>
      {/* Hero Section - Mobile Optimized */}
      <section className={`${isMobile ? 'px-4 py-8' : 'py-6 md:py-12'}`}>
        <div className={`${isMobile ? 'space-y-8' : 'grid md:grid-cols-2 gap-8 items-center'}`}>
          {/* Mobile: Logo and Branding First */}
          {isMobile && (
            <div className="text-center animate-fade-in">
              <div className="mb-6">
                <img 
                  src={theme === "dark" ? "/lovable-uploads/68d1115e-2772-4423-97a7-0314869d7169.png" : "/lovable-uploads/f74a0cf6-4b5a-440b-8f7d-6143716f4c8a.png"}
                  alt="Amatyma Brotherhood Circle"
                  className="w-32 h-32 object-contain mx-auto rounded-xl"
                />
              </div>
              <h1 className="text-3xl font-bold leading-tight mb-4">
                Welcome to <span className="text-amatyma-red">Amatyma</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Connect with the brotherhood, discover local businesses, and access exclusive merchandise.
              </p>
            </div>
          )}

          {/* Desktop Layout */}
          {!isMobile && (
            <>
              <div className="space-y-6 md:pr-8 animate-fade-in">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                  Welcome to <span className="text-amatyma-red">Amatyma</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Connect with the brotherhood, discover local businesses, and access exclusive merchandise.
                </p>
              </div>
              
              <div className="relative">
                <div 
                  className="neumorphic p-8 animate-fade-in flex items-center justify-center" 
                  style={{ animationDelay: "0.3s", minHeight: "260px" }}
                >
                  <div className="relative flex items-center justify-center w-full h-full">
                    <img 
                      src="/lovable-uploads/443b5d39-f791-45ba-822d-732d578e98e8.png"
                      alt="Amatyma Brotherhood Circle"
                      className="w-44 h-44 md:w-56 md:h-56 object-contain rounded-xl dark:opacity-90 dark:contrast-125 dark:brightness-90 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons - Mobile Optimized */}
          <div className={`${isMobile ? 'space-y-4' : 'flex flex-wrap gap-4 pt-2'}`}>
            <Button 
              className={`${isMobile ? 'w-full' : ''} bg-amatyma-red hover:bg-amatyma-red/80 ${isMobile ? 'py-4 text-lg' : 'text-lg px-6 py-6'}`}
              onClick={() => navigate("/register")}
            >
              Join the Brotherhood
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className={`${isMobile ? 'w-full' : ''} border-amatyma-red/20 text-amatyma-red hover:bg-amatyma-red hover:text-white ${isMobile ? 'py-4 text-lg' : 'text-lg px-6 py-6'}`}
              onClick={() => navigate("/businesses")}
            >
              Discover Businesses
              <Building className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section - Mobile Optimized */}
      <section className={`${isMobile ? 'px-4 py-8' : 'py-12'}`}>
        <div className={`text-center ${isMobile ? 'mb-8' : 'mb-12'}`}>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`}>Why Join Amatyma?</h2>
          <p className={`text-muted-foreground mt-3 ${isMobile ? 'text-base' : ''} max-w-2xl mx-auto`}>
            Connect with a community of like-minded men, discover local businesses, and access exclusive content and merchandise.
          </p>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'md:grid-cols-2 lg:grid-cols-4 gap-6'}`}>
          {[
            {
              icon: <UserCircle />,
              title: "Brotherhood Network",
              description: "Connect with men who share your values and aspirations",
            },
            {
              icon: <Building />,
              title: "Local Businesses",
              description: "Discover and support businesses within our community",
            },
            {
              icon: <Tag />,
              title: "Exclusive Merchandise",
              description: "Access limited edition Amatyma Brotherhood merchandise",
            },
            {
              icon: <ShieldCheck />,
              title: "Trusted Platform",
              description: "Join a secure community focused on positive impact",
            },
          ].map((feature, index) => (
            <div 
              key={index} 
              className={`neumorphic ${isMobile ? 'p-4' : 'p-6'} text-center space-y-4 transition-all duration-300 hover:translate-y-[-5px]`}
            >
              <div className="bg-amatyma-red/10 rounded-full p-3 inline-flex">
                <div className="bg-amatyma-red rounded-full p-2 text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium`}>{feature.title}</h3>
              <p className={`text-muted-foreground ${isMobile ? 'text-sm' : 'text-sm'}`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Featured Businesses Section - Mobile Optimized */}
      <section className={`${isMobile ? 'px-4 py-8' : 'py-12'}`}>
        <div className={`flex ${isMobile ? 'flex-col gap-4' : 'justify-between items-center'} mb-8`}>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`}>Featured Businesses</h2>
          <Button 
            variant="outline" 
            onClick={() => navigate("/businesses")}
            className={`${isMobile ? 'w-full' : ''} border-amatyma-red/20 text-amatyma-red hover:bg-amatyma-red hover:text-white`}
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <AdvertiseBanner />

        {/* Merchandise Section - Mobile Optimized */}
        <div className={`${isMobile ? 'mt-12' : 'mt-16'}`}>
          <div className={`flex ${isMobile ? 'flex-col gap-4' : 'justify-between items-center'} mb-8`}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`}>Featured Merchandise</h2>
            <Button 
              variant="outline" 
              onClick={() => navigate("/merchandise")}
              className={`${isMobile ? 'w-full' : ''} border-amatyma-red/20 text-amatyma-red hover:bg-amatyma-red hover:text-white`}
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
            {featuredMerchandise.map((item) => (
              <div key={item.id} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className={`${isMobile ? 'h-40' : 'h-48'} bg-muted flex items-center justify-center`}>
                  <img src={item.image} alt={item.name} className="h-full object-cover" />
                </div>
                <div className={`${isMobile ? 'p-3' : 'p-4'}`}>
                  <h3 className={`font-medium ${isMobile ? 'text-base' : 'text-lg'} mb-1`}>{item.name}</h3>
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
