
import { Business } from "@/types";
import { BusinessCard } from "./BusinessCard";

interface BusinessListProps {
  businesses: Business[];
}

export function BusinessList({ businesses }: BusinessListProps) {
  if (businesses.length === 0) {
    return (
      <div className="neumorphic-inset p-8 text-center">
        <p className="text-muted-foreground">No businesses found</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
}
