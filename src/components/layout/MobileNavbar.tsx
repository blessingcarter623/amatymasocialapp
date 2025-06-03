
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  ShoppingCart, 
  MessageCircle, 
  Video,
  Bell,
  Search,
  User,
  ShoppingBag,
  Heart
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

export function MobileNavbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const { theme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  // Routes that should hide the top header for full-screen experience
  const fullScreenRoutes = ['/messages', '/video-calls', '/notifications'];
  const isFullScreenRoute = fullScreenRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  const mainNavItems = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Users, path: "/businesses", label: "Business" },
    { icon: ShoppingBag, path: "/merchandise", label: "Shop" },
    { icon: Heart, path: "/fundraising", label: "Funding" },
    { icon: User, path: user ? "/profile" : "/login", label: "Profile" },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || 
           (path !== "/" && location.pathname.startsWith(path));
  };

  return (
    <>
      {/* Top Header - Only show if NOT in full-screen route */}
      {!isFullScreenRoute && (
        <div className="sticky top-0 z-50 bg-background border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <img
                  src="/lovable-uploads/68d1115e-2772-4423-97a7-0314869d7169.png"
                  alt="Amatyma"
                  className="h-8 w-8"
                />
              ) : (
                <img 
                  src="/lovable-uploads/f74a0cf6-4b5a-440b-8f7d-6143716f4c8a.png" 
                  alt="Amatyma" 
                  className="h-8 w-8"
                />
              )}
              <span className="font-bold text-lg text-amatyma-red">AMATYMA</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amatyma-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.totalItems}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => navigate('/messages')}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search Amatyma..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary border-none focus:outline-none focus:ring-2 focus:ring-amatyma-red"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border safe-area-bottom">
        <div className="flex justify-around items-center px-2 py-2">
          {mainNavItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-3 px-1 h-auto rounded-lg transition-colors",
                isActivePath(item.path) 
                  ? "text-amatyma-red bg-amatyma-red/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
