import React from 'react';
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { AppProvider } from "@/context/AppContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';

function App() {
  const router = createBrowserRouter(routes);

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <CartProvider>
            <RouterProvider router={router} />
            <Toaster />
          </CartProvider>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
