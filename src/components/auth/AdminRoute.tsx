
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { isUserAdmin } from '@/services/merchandiseService';
import { Loader } from 'lucide-react';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const userIsAdmin = await isUserAdmin(user.id);
        setIsAdmin(userIsAdmin);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-amatyma-red" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
