
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut();
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Businesses", path: "/businesses" },
    user ? { name: "Dashboard", path: "/dashboard" } : null,
  ].filter(Boolean);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amatyma-red/10 bg-background backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/d190220b-b318-44c6-9b9d-f0d7afa01a26.png" 
            alt="Amatyma Logo" 
            className="h-10 w-10"
          />
          <span 
            className="hidden font-bold text-lg text-amatyma-red sm:inline-block"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            AMATYMA
          </span>
        </div>

        {/* Desktop Navigation */}
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
          
          {!user ? (
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" onClick={() => navigate("/login")}>
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
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <span className="text-sm text-muted-foreground">
                Hello, {profile?.name || user.email}
              </span>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
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
    </header>
  );
}
