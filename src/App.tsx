
import React from 'react';
import { ThemeProvider } from "@/context/ThemeContext";
import { AppProvider } from "@/context/AppContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster />
        </CartProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
