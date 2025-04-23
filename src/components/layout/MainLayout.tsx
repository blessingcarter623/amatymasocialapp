
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "sonner";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-6">
        {children}
      </main>
      <Footer />
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}
