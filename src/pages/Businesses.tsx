
import { MainLayout } from "@/components/layout/MainLayout";
import { useApp } from "@/context/AppContext";
import { useState, useEffect } from "react";
import { BusinessList } from "@/components/business/BusinessList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, X, Loader } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Business, Department } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

const Businesses = () => {
  const { businesses, departments, isLoading, fetchBusinesses } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [departmentSearchTerm, setDepartmentSearchTerm] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>(departments);

  // Refetch businesses when component mounts
  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  // Initialize filtered businesses when businesses load
  useEffect(() => {
    setFilteredBusinesses(businesses);
  }, [businesses]);

  // Filter departments based on search term
  useEffect(() => {
    if (departmentSearchTerm) {
      const filtered = departments.filter(dept => 
        dept.name.toLowerCase().includes(departmentSearchTerm.toLowerCase())
      );
      setFilteredDepartments(filtered);
    } else {
      setFilteredDepartments(departments);
    }
  }, [departmentSearchTerm, departments]);

  const handleSearch = () => {
    console.log("Filtering with:", { searchTerm, selectedDepartment });
    console.log("Total businesses before filter:", businesses.length);
    
    let filtered = [...businesses];
    
    if (searchTerm) {
      filtered = filtered.filter(
        (business) => 
          (business.name && business.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (business.description && business.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (business.category && business.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedDepartment && selectedDepartment !== "all") {
      filtered = filtered.filter(
        (business) => business.department === selectedDepartment
      );
    }
    
    console.log("Filtered businesses count:", filtered.length);
    setFilteredBusinesses(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment(null);
    setDepartmentSearchTerm("");
    setFilteredBusinesses(businesses);
  };

  return (
    <MainLayout>
      <div className="space-y-8 py-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png" 
              alt="Amatyma Brotherhood Circle" 
              className="h-10 w-10 mr-3"
            />
            <h1 className="text-3xl font-bold">Business Directory</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-9 bg-secondary border-amatyma-red/20"
              />
            </div>
            
            <Select
              value={selectedDepartment || ""}
              onValueChange={(value) => setSelectedDepartment(value === "all" ? null : value)}
            >
              <SelectTrigger className="w-full sm:w-[200px] bg-secondary border-amatyma-red/20">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    placeholder="Search departments..."
                    value={departmentSearchTerm}
                    onChange={(e) => setDepartmentSearchTerm(e.target.value)}
                    className="mb-2 bg-secondary border-amatyma-red/20"
                  />
                </div>
                <SelectItem value="all">All Departments</SelectItem>
                <ScrollArea className="h-[200px]">
                  {filteredDepartments.map((dept) => (
                    <SelectItem key={dept.name} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </ScrollArea>
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
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader className="h-8 w-8 animate-spin text-amatyma-red" />
          </div>
        ) : (
          <BusinessList businesses={filteredBusinesses} />
        )}
      </div>
    </MainLayout>
  );
};

export default Businesses;
