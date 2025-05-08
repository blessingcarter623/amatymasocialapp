
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "lucide-react";
import { AuthProvider } from "@/context/AuthContext";
import Dashboard from "@/pages/Dashboard";

export const ProtectedRoute = () => {
  const navigate = useNavigate();

  return (
    <AuthProvider>
      <ProtectedRouteContent />
    </AuthProvider>
  );
};

const ProtectedRouteContent = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-amatyma-red" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Dashboard />;
};
