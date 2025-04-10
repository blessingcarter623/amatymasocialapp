
import { MainLayout } from "@/components/layout/MainLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
        <RegisterForm />
      </div>
    </MainLayout>
  );
};

export default Register;
