
import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminRoute } from '@/components/auth/AdminRoute';

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

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/about',
    element: <AboutUs />
  },
  {
    path: '/businesses',
    element: <Businesses />
  },
  {
    path: '/businesses/:id',
    element: <BusinessDetail />
  },
  {
    path: '/merchandise',
    element: <Merchandise />
  },
  {
    path: '/merchandise/:id',
    element: <ProductDetail />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  },
  {
    path: '/admin/merchandise',
    element: <AdminRoute><AdminMerchandise /></AdminRoute>
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
