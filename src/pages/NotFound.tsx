
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12">
        <div className="neumorphic p-12 text-center space-y-6 max-w-md">
          <h1 className="text-7xl font-bold text-amatyma-red">404</h1>
          <p className="text-2xl font-medium text-foreground mb-4">Page Not Found</p>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Button 
            className="bg-amatyma-red hover:bg-amatyma-red/80"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
