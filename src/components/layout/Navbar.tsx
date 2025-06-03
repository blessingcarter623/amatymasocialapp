
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, ShoppingCart, MessageCircle, Video, Bell, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { cart } = useCart();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    signOut();
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Businesses", path: "/businesses" },
    { name: "Merchandise", path: "/merchandise" },
    { name: "Back A Buddy", path: "/fundraising" },
    user ? { name: "Dashboard", path: "/dashboard" } : null,
  ].filter(Boolean);

  // For mobile, use original layout. For desktop, position on the top with left sidebar for navigation
  if (isMobile) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-amatyma-red/10 bg-background backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            {theme === "dark" ? (
              <img
                src="/lovable-uploads/68d1115e-2772-4423-97a7-0314869d7169.png"
                alt="Amatyma Logo"
                className="h-12 w-12 object-contain"
                style={{
                  background: "transparent",
                  padding: ".20rem",
                  borderRadius: "0.75rem",
                }}
              />
            ) : (
              <img 
                src="/lovable-uploads/f74a0cf6-4b5a-440b-8f7d-6143716f4c8a.png" 
                alt="Amatyma Logo" 
                className="h-12 w-12 object-contain"
                style={{
                  background: "transparent",
                  padding: ".20rem",
                  borderRadius: "0.75rem",
                }}
              />
            )}
            <span 
              className="hidden font-bold text-lg text-amatyma-red sm:inline-block"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              AMATYMA
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <Button
              variant="ghost"
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amatyma-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Button>
            
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className={cn(
            "container md:hidden pb-4 overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-96" : "max-h-0"
          )}>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => 
                item && (
                  <Button 
                    key={item.name} 
                    variant="ghost" 
                    className="justify-start text-foreground hover:text-amatyma-red"
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </Button>
                )
              )}
              
              {!user ? (
                <div className="flex flex-col space-y-2 pt-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    className="bg-amatyma-red text-white hover:bg-amatyma-red/80"
                    onClick={() => {
                      navigate("/register");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Register
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-muted-foreground">
                    Hello, {profile?.name || user.email}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
    );
  }

  // Desktop layout - navigation on top with left sidebar for navigation
  return (
    <>
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-amatyma-red/10 bg-background backdrop-blur-lg">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            {theme === "dark" ? (
              <img
                src="/lovable-uploads/68d1115e-2772-4423-97a7-0314869d7169.png"
                alt="Amatyma Logo"
                className="h-12 w-12 object-contain"
                style={{
                  background: "transparent",
                  padding: ".20rem",
                  borderRadius: "0.75rem",
                }}
              />
            ) : (
              <img 
                src="/lovable-uploads/f74a0cf6-4b5a-440b-8f7d-6143716f4c8a.png" 
                alt="Amatyma Logo" 
                className="h-12 w-12 object-contain"
                style={{
                  background: "transparent",
                  padding: ".20rem",
                  borderRadius: "0.75rem",
                }}
              />
            )}
            <span 
              className="font-bold text-lg text-amatyma-red cursor-pointer"
              onClick={() => navigate("/")}
            >
              AMATYMA
            </span>
          </div>

          {/* Top Navigation Items */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => 
              item && (
                <Button 
                  key={item.name} 
                  variant="ghost" 
                  className="text-foreground hover:text-amatyma-red"
                  onClick={() => navigate(item.path)}
                >
                  {item.name}
                </Button>
              )
            )}
          </nav>

          {/* Right side items */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amatyma-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Button>
            
            <ThemeToggle />
            
            {!user ? (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button 
                  className="bg-amatyma-red text-white hover:bg-amatyma-red/80"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Hello, {profile?.name || user.email}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Left sidebar for navigation */}
      <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-background border-r border-amatyma-red/10 backdrop-blur-lg z-30 hidden md:flex flex-col">
        <div className="p-4 border-b border-amatyma-red/10">
          <h2 className="font-bold text-lg text-amatyma-red">Navigation</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-foreground hover:text-amatyma-red hover:bg-amatyma-red/10"
            onClick={() => navigate('/messages')}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Messages
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-foreground hover:text-amatyma-red hover:bg-amatyma-red/10"
            onClick={() => navigate('/video-calls')}
          >
            <Video className="h-5 w-5 mr-2" />
            Video Calls
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-foreground hover:text-amatyma-red hover:bg-amatyma-red/10"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </Button>

          <Button 
            variant="ghost" 
            className="w-full justify-start text-foreground hover:text-amatyma-red hover:bg-amatyma-red/10"
            onClick={() => navigate('/profile')}
          >
            <User className="h-5 w-5 mr-2" />
            Profile
          </Button>
        </nav>
      </div>
    </>
  );
}
