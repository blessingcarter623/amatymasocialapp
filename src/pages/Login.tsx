
import { MainLayout } from "@/components/layout/MainLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { useApp } from "@/context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.isLoggedIn) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-12">
        <LoginForm />
      </div>
    </MainLayout>
  );
};

export default Login;
