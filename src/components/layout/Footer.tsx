
import { Facebook, Instagram, Globe, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-amatyma-red/10 bg-background/95 backdrop-blur-lg">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/d190220b-b318-44c6-9b9d-f0d7afa01a26.png" 
                alt="Amatyma Logo" 
                className="h-8 w-8"
              />
              <span className="font-bold text-lg text-amatyma-red">AMATYMA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The Amatyma Brotherhood Circle business platform connects government departments 
              with trusted business partners.
            </p>
            <div className="flex items-center space-x-3">
              <a href="#" className="social-icon">
                <Facebook size={18} />
              </a>
              <a href="#" className="social-icon">
                <Instagram size={18} />
              </a>
              <a href="#" className="social-icon">
                <Globe size={18} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-amatyma-red">Home</a>
              </li>
              <li>
                <a href="/businesses" className="hover:text-amatyma-red">Businesses</a>
              </li>
              <li>
                <a href="/register" className="hover:text-amatyma-red">Register</a>
              </li>
              <li>
                <a href="/login" className="hover:text-amatyma-red">Login</a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Stay updated with the latest business opportunities.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-secondary border-amatyma-red/20"
              />
              <Button size="sm" className="bg-amatyma-red hover:bg-amatyma-red/80">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-amatyma-red/10 pt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Amatyma Brotherhood Circle. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
