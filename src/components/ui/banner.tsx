
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { X } from "lucide-react";
import { useState, ReactNode } from "react";

interface BannerProps {
  title: string;
  description?: string;
  ctaText?: string;
  ctaAction?: () => void;
  className?: string;
  variant?: "default" | "dark";
  dismissible?: boolean;
  children?: ReactNode;
}

export function Banner({
  title,
  description,
  ctaText,
  ctaAction,
  className,
  variant = "default",
  dismissible = false,
  children,
}: BannerProps) {
  const [dismissed, setDismissed] = useState(false);
  
  if (dismissed) {
    return null;
  }
  
  return (
    <div
      className={cn(
        "relative px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between neumorphic",
        variant === "dark" && "bg-amatyma-dark",
        className
      )}
    >
      <div className="flex items-center">
        {children}
        <div>
          <p className="font-medium">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      
      <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center">
        {ctaText && ctaAction && (
          <Button
            variant="outline"
            className="border-amatyma-red/20 text-amatyma-red hover:bg-amatyma-red hover:text-white"
            onClick={ctaAction}
          >
            {ctaText}
          </Button>
        )}
        
        {dismissible && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => setDismissed(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
