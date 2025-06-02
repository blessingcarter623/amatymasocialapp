
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Settings, 
  Info, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Camera
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const Profile = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const menuItems = [
    {
      icon: <User className="h-5 w-5" />,
      title: "Edit Profile",
      description: "Update your personal information",
      action: () => navigate("/edit-profile")
    },
    {
      icon: <Info className="h-5 w-5" />,
      title: "About Amatyma",
      description: "Learn about our organization",
      action: () => navigate("/about-organization")
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: "Notifications",
      description: "Manage notification preferences",
      action: () => navigate("/notifications-settings")
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Privacy & Security",
      description: "Manage your privacy settings",
      action: () => navigate("/privacy-settings")
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      title: "Help & Support",
      description: "Get help and contact support",
      action: () => navigate("/help")
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-amatyma-red/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-amatyma-red" />
                </div>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amatyma-red hover:bg-amatyma-red/80"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{profile?.name || user?.email}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {profile?.gender || "Member"}
                  </Badge>
                  {profile?.employment_status && (
                    <Badge variant="outline" className="text-xs">
                      {profile.employment_status}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Menu */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-amatyma-red">{item.icon}</div>
                    <div className="text-left">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Theme Toggle */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-amatyma-red" />
                <div>
                  <h3 className="font-medium">Theme</h3>
                  <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card>
          <CardContent className="p-4">
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;
