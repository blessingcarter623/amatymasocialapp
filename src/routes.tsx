
import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminRoute } from '@/components/auth/AdminRoute';
import { AuthProvider } from '@/context/AuthContext';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import AboutUs from '@/pages/AboutUs';
import Businesses from '@/pages/Businesses';
import BusinessDetail from '@/pages/BusinessDetail';
import Merchandise from '@/pages/Merchandise';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import AdminMerchandise from '@/pages/admin/AdminMerchandise';
import NotFound from '@/pages/NotFound';

// Wrap components that need auth with AuthProvider
const withAuth = (Component: React.ComponentType) => {
  return (
    <AuthProvider>
      <Component />
    </AuthProvider>
  );
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: withAuth(Index)
  },
  {
    path: '/login',
    element: withAuth(Login)
  },
  {
    path: '/register',
    element: withAuth(Register)
  },
  {
    path: '/about',
    element: withAuth(AboutUs)
  },
  {
    path: '/businesses',
    element: withAuth(Businesses)
  },
  {
    path: '/businesses/:id',
    element: withAuth(BusinessDetail)
  },
  {
    path: '/merchandise',
    element: withAuth(Merchandise)
  },
  {
    path: '/merchandise/:id',
    element: withAuth(ProductDetail)
  },
  {
    path: '/cart',
    element: withAuth(Cart)
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />
  },
  {
    path: '/admin/merchandise',
    element: <AdminRoute><AdminMerchandise /></AdminRoute>
  },
  {
    path: '*',
    element: withAuth(NotFound)
  }
];

export const router = createBrowserRouter(routes);

export default routes;
