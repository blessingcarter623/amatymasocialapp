
import { Footer } from "./Footer";
import { Toaster } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNavbar } from "./MobileNavbar";

interface MobileOnlyLayoutProps {
  children: React.ReactNode;
}

export function MobileOnlyLayout({ children }: MobileOnlyLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {isMobile && <MobileNavbar />}
      <main className={`flex-1 ${isMobile ? 'pb-20' : 'container py-6'}`}>
        {children}
      </main>
      {!isMobile && <Footer />}
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}
