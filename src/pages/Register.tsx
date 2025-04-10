
import { MainLayout } from "@/components/layout/MainLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useApp } from "@/context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
        <RegisterForm />
      </div>
    </MainLayout>
  );
};

export default Register;
