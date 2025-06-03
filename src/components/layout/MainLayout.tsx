
import { Navbar } from "./Navbar";
import { MobileNavbar } from "./MobileNavbar";
import { DesktopSidebar } from "./DesktopSidebar";
import { Footer } from "./Footer";
import { Toaster } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      {isMobile ? (
        <>
          <MobileNavbar />
          <main className="flex-1 pb-20">
            {children}
          </main>
        </>
      ) : (
        <>
          <DesktopSidebar />
          <main className="flex-1 ml-64">
            <div className="container py-6">
              {children}
            </div>
            <Footer />
          </main>
        </>
      )}
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}
