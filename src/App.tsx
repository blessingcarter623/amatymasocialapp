import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Businesses from "./pages/Businesses";
import BusinessDetail from "./pages/BusinessDetail";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Merchandise from "./pages/Merchandise";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Fundraising from "./pages/Fundraising";
import Messages from "./pages/Messages";
import ChatRoom from "./pages/ChatRoom";
import VideoCalls from "./pages/VideoCalls";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <AppProvider>
              <CartProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<AboutUs />} />
                  
                  {/* Merchandise Routes */}
                  <Route path="/merchandise" element={<Merchandise />} />
                  <Route path="/merchandise/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  
                  {/* Fundraising Route */}
                  <Route path="/fundraising" element={<Fundraising />} />
                  
                  {/* Social Media Routes */}
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/messages/:id" element={<ChatRoom />} />
                  <Route path="/video-calls" element={<VideoCalls />} />
                  
                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>
                  
                  <Route path="/businesses" element={<Businesses />} />
                  <Route path="/businesses/:id" element={<BusinessDetail />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </CartProvider>
            </AppProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
