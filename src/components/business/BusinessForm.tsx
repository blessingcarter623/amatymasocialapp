
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Business, SocialLinks } from "@/types";
import { Loader2, Save } from "lucide-react";

interface BusinessFormProps {
  business?: Business;
  onSuccess?: () => void;
}

export function BusinessForm({ business, onSuccess }: BusinessFormProps) {
  const { addBusiness, updateBusiness, isLoading, departments } = useApp();
  
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    category: string;
    subcategory?: string;
    location: string;
    contactPerson: string;
    phone: string;
    email: string;
    department?: string;
    socialLinks: SocialLinks;
  }>({
    name: business?.name || "",
    description: business?.description || "",
    category: business?.category || "",
    subcategory: business?.subcategory || "",
    location: business?.location || "",
    contactPerson: business?.contactPerson || "",
    phone: business?.phone || "",
    email: business?.email || "",
    department: business?.department || "",
    socialLinks: business?.socialLinks || {
      facebook: "",
      whatsapp: "",
      instagram: "",
      website: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialLinks: { ...formData.socialLinks, [name]: value },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (business?.id) {
        await updateBusiness(business.id, formData);
      } else {
        await addBusiness({
          ...formData,
          userType: "business",
        });
      }
      
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to save business information");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="neumorphic p-6 space-y-4">
        <h3 className="text-lg font-medium">Business Information</h3>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Business Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-background border-amatyma-red/20"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Business Category
            </label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="bg-background border-amatyma-red/20"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subcategory" className="text-sm font-medium">
              Subcategory (Optional)
            </label>
            <Input
              id="subcategory"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="bg-background border-amatyma-red/20"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="bg-background border-amatyma-red/20"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="description" className="text-sm font-medium">
              Business Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="bg-background border-amatyma-red/20 min-h-[100px]"
            />
          </div>
        </div>
      </div>
      
      <div className="neumorphic p-6 space-y-4">
        <h3 className="text-lg font-medium">Department Information</h3>
        
        <div className="space-y-2">
          <label htmlFor="department" className="text-sm font-medium">
            Related Department
          </label>
          <Select
            value={formData.department}
            onValueChange={(value) => setFormData({ ...formData, department: value })}
          >
            <SelectTrigger className="bg-background border-amatyma-red/20">
              <SelectValue placeholder="Select a department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.name} value={dept.name}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="neumorphic p-6 space-y-4">
        <h3 className="text-lg font-medium">Contact Information</h3>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="contactPerson" className="text-sm font-medium">
              Contact Person
            </label>
            <Input
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
              className="bg-background border-amatyma-red/20"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-background border-amatyma-red/20"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-background border-amatyma-red/20"
            />
          </div>
        </div>
      </div>
      
      <div className="neumorphic p-6 space-y-4">
        <h3 className="text-lg font-medium">Social Media Links</h3>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="facebook" className="text-sm font-medium">
              Facebook
            </label>
            <Input
              id="facebook"
              name="facebook"
              value={formData.socialLinks.facebook}
              onChange={handleSocialChange}
              placeholder="https://facebook.com/yourbusiness"
              className="bg-background border-amatyma-red/20"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="instagram" className="text-sm font-medium">
              Instagram
            </label>
            <Input
              id="instagram"
              name="instagram"
              value={formData.socialLinks.instagram}
              onChange={handleSocialChange}
              placeholder="https://instagram.com/yourbusiness"
              className="bg-background border-amatyma-red/20"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="whatsapp" className="text-sm font-medium">
              WhatsApp
            </label>
            <Input
              id="whatsapp"
              name="whatsapp"
              value={formData.socialLinks.whatsapp}
              onChange={handleSocialChange}
              placeholder="https://wa.me/yournumber"
              className="bg-background border-amatyma-red/20"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="website" className="text-sm font-medium">
              Website
            </label>
            <Input
              id="website"
              name="website"
              value={formData.socialLinks.website}
              onChange={handleSocialChange}
              placeholder="https://yourbusiness.com"
              className="bg-background border-amatyma-red/20"
            />
          </div>
        </div>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-amatyma-red hover:bg-amatyma-red/80"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        {business ? "Update Business Information" : "Save Business Information"}
      </Button>
    </form>
  );
}
