
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
import NotFound from "./pages/NotFound";
import Merchandise from "./pages/Merchandise";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Fundraising from "./pages/Fundraising";
import Messages from "./pages/Messages";
import ChatRoom from "./pages/ChatRoom";
import VideoCalls from "./pages/VideoCalls";
import Profile from "./pages/Profile";
import AboutOrganization from "./pages/AboutOrganization";

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
                  
                  {/* App Routes */}
                  <Route path="/merchandise" element={<Merchandise />} />
                  <Route path="/merchandise/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/fundraising" element={<Fundraising />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/messages/:id" element={<ChatRoom />} />
                  <Route path="/video-calls" element={<VideoCalls />} />
                  <Route path="/businesses" element={<Businesses />} />
                  <Route path="/businesses/:id" element={<BusinessDetail />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/about-organization" element={<AboutOrganization />} />
                  
                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>
                  
                  {/* Catch-all route */}
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
