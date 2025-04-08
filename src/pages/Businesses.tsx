
import { MainLayout } from "@/components/layout/MainLayout";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { BusinessList } from "@/components/business/BusinessList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Business } from "@/types";

const Businesses = () => {
  const { businesses, departments } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(businesses);

  const handleSearch = () => {
    let filtered = businesses;
    
    if (searchTerm) {
      filtered = filtered.filter(
        (business) => 
          business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedDepartment) {
      filtered = filtered.filter(
        (business) => business.department === selectedDepartment
      );
    }
    
    setFilteredBusinesses(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment(null);
    setFilteredBusinesses(businesses);
  };

  return (
    <MainLayout>
      <div className="space-y-8 py-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h1 className="text-3xl font-bold">Business Directory</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-secondary border-amatyma-red/20"
              />
            </div>
            
            <Select
              value={selectedDepartment || ""}
              onValueChange={(value) => setSelectedDepartment(value || null)}
            >
              <SelectTrigger className="w-full sm:w-[200px] bg-secondary border-amatyma-red/20">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.name} value={dept.name}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleSearch}
                className="bg-amatyma-red hover:bg-amatyma-red/80"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="border-amatyma-red/20"
              >
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
        </div>
        
        <BusinessList businesses={filteredBusinesses} />
      </div>
    </MainLayout>
  );
};

export default Businesses;
