
import { MobileNavbar } from "./MobileNavbar";
import { Toaster } from "sonner";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MobileNavbar />
      <main className="flex-1 pb-20">
        {children}
      </main>
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}
