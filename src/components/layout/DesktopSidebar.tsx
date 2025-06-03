
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  MessageCircle, 
  Video, 
  Bell, 
  User, 
  Home, 
  Building, 
  ShoppingBag, 
  Heart,
  LayoutDashboard,
  LogOut
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export function DesktopSidebar() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const mainNavItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Businesses", path: "/businesses", icon: Building },
    { name: "Merchandise", path: "/merchandise", icon: ShoppingBag },
    { name: "Back A Buddy", path: "/fundraising", icon: Heart },
    ...(user ? [{ name: "Dashboard", path: "/dashboard", icon: LayoutDashboard }] : []),
  ];

  const communicationItems = [
    { name: "Messages", path: "/messages", icon: MessageCircle },
    { name: "Video Calls", path: "/video-calls", icon: Video },
    { name: "Notifications", path: "/notifications", icon: Bell },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || 
           (path !== "/" && location.pathname.startsWith(path));
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-background border-r border-amatyma-red/10 flex flex-col z-40">
      {/* Logo Section */}
      <div className="p-6 border-b border-amatyma-red/10">
        <div className="flex items-center gap-2">
          {theme === "dark" ? (
            <img
              src="/lovable-uploads/68d1115e-2772-4423-97a7-0314869d7169.png"
              alt="Amatyma Logo"
              className="h-10 w-10 object-contain"
            />
          ) : (
            <img 
              src="/lovable-uploads/f74a0cf6-4b5a-440b-8f7d-6143716f4c8a.png" 
              alt="Amatyma Logo" 
              className="h-10 w-10 object-contain"
            />
          )}
          <span 
            className="font-bold text-lg text-amatyma-red cursor-pointer"
            onClick={() => navigate("/")}
          >
            AMATYMA
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">Navigation</h3>
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-foreground hover:text-amatyma-red hover:bg-amatyma-red/10",
                  isActivePath(item.path) && "bg-amatyma-red/10 text-amatyma-red"
                )}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Button>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">Communications</h3>
          <nav className="space-y-1">
            {communicationItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-foreground hover:text-amatyma-red hover:bg-amatyma-red/10",
                  isActivePath(item.path) && "bg-amatyma-red/10 text-amatyma-red"
                )}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-amatyma-red/10">
        {!user ? (
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button 
              className="w-full bg-amatyma-red text-white hover:bg-amatyma-red/80"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-foreground hover:text-amatyma-red hover:bg-amatyma-red/10",
                isActivePath("/profile") && "bg-amatyma-red/10 text-amatyma-red"
              )}
              onClick={() => navigate("/profile")}
            >
              <User className="h-5 w-5 mr-3" />
              Profile
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-red-600"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
            <div className="px-2 py-1">
              <p className="text-xs text-muted-foreground truncate">
                {profile?.name || user.email}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
