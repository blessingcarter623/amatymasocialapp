
import { Navbar } from "./Navbar";
import { MobileNavbar } from "./MobileNavbar";
import { Footer } from "./Footer";
import { Toaster } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {isMobile ? <MobileNavbar /> : <Navbar />}
      <main className={`flex-1 ${isMobile ? 'pb-20' : 'container py-6 pl-72'}`}>
        {children}
      </main>
      {!isMobile && <Footer />}
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}
