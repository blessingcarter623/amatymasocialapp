
import { MainLayout } from "@/components/layout/MainLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  if (isLoading) {
    return null;
  }
  
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-12">
        <LoginForm />
      </div>
    </MainLayout>
  );
};

export default Login;
