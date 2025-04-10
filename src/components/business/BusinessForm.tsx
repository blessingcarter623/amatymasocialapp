
import { useState, useEffect } from "react";
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
import { Loader2, Save, Upload, X, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { southAfricanProvinces, getCitiesForProvince } from "@/utils/locationData";

interface BusinessFormProps {
  business?: Business | null;
  onSuccess?: () => void;
}

export function BusinessForm({ business, onSuccess }: BusinessFormProps) {
  const { departments } = useApp();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    category: string;
    subcategory?: string;
    location: string;
    province?: string;
    city?: string;
    contactPerson: string;
    phone: string;
    email: string;
    department?: string;
    socialLinks: SocialLinks;
    logo?: string;
    images: string[];
  }>({
    name: business?.name || "",
    description: business?.description || "",
    category: business?.category || "",
    subcategory: business?.subcategory || "",
    location: business?.location || "",
    province: business?.province || "",
    city: business?.city || "",
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
    logo: business?.logo || "/lovable-uploads/5e2c4b38-6218-4832-b605-0d4fe61c5b4d.png",
    images: business?.images || [],
  });

  useEffect(() => {
    setAvailableCities(getCitiesForProvince(formData.province));
    
    if (formData.city && !getCitiesForProvince(formData.province).includes(formData.city)) {
      setFormData(prev => ({ ...prev, city: undefined }));
    }
  }, [formData.province]);

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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFormData({ ...formData, logo: reader.result.toString() });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      
      fileArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            setFormData(prev => ({
              ...prev,
              images: [...prev.images, reader.result.toString()]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to save business information");
      return;
    }
    
    setIsLoading(true);
    
    try {
      let businessId = business?.id;
      
      const businessData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        subcategory: formData.subcategory || null,
        location: formData.location,
        province: formData.province || null,
        city: formData.city || null,
        contact_person: formData.contactPerson,
        phone: formData.phone,
        email: formData.email,
        department: formData.department || null,
        logo: formData.logo,
        images: formData.images,
        user_id: user.id,
      };
      
      console.log("Saving business data:", businessData);
      
      if (businessId) {
        const { data, error: businessError } = await supabase
          .from('businesses')
          .update(businessData)
          .eq('id', businessId)
          .select();
          
        if (businessError) {
          console.error("Error updating business:", businessError);
          throw businessError;
        }
        
        console.log("Business updated successfully:", data);
        
        const { error: socialLinksError } = await supabase
          .from('social_links')
          .upsert({
            business_id: businessId,
            facebook: formData.socialLinks.facebook || null,
            instagram: formData.socialLinks.instagram || null,
            whatsapp: formData.socialLinks.whatsapp || null,
            website: formData.socialLinks.website || null,
          })
          .eq('business_id', businessId);
          
        if (socialLinksError) throw socialLinksError;
        
      } else {
        const { data: newBusiness, error: businessError } = await supabase
          .from('businesses')
          .insert(businessData)
          .select('id')
          .single();
          
        if (businessError) throw businessError;
        
        businessId = newBusiness.id;
        
        const { error: socialLinksError } = await supabase
          .from('social_links')
          .insert({
            business_id: businessId,
            facebook: formData.socialLinks.facebook || null,
            instagram: formData.socialLinks.instagram || null,
            whatsapp: formData.socialLinks.whatsapp || null,
            website: formData.socialLinks.website || null,
          });
          
        if (socialLinksError) throw socialLinksError;
      }
      
      toast.success(businessId ? "Business updated successfully!" : "Business created successfully!");
      if (onSuccess) onSuccess();
      
    } catch (error) {
      console.error("Error saving business:", error);
      toast.error("Failed to save business information");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="neumorphic p-6 space-y-4">
        <h3 className="text-lg font-medium">Business Information</h3>
        
        <div className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-700 border-2 border-amatyma-red/20">
              {formData.logo ? (
                <img 
                  src={formData.logo} 
                  alt="Business logo" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Image className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <label 
              htmlFor="logo-upload" 
              className="cursor-pointer text-sm text-amatyma-red hover:underline flex items-center"
            >
              <Upload className="mr-1 h-3 w-3" />
              Upload Logo
            </label>
            <input 
              id="logo-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleLogoUpload}
            />
          </div>

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
                Location (Address/Area)
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

            <div className="space-y-2">
              <label htmlFor="province" className="text-sm font-medium">
                Province
              </label>
              <Select
                value={formData.province}
                onValueChange={(value) => setFormData({ ...formData, province: value })}
              >
                <SelectTrigger className="bg-background border-amatyma-red/20">
                  <SelectValue placeholder="Select a province" />
                </SelectTrigger>
                <SelectContent>
                  {southAfricanProvinces.map((province) => (
                    <SelectItem key={province.name} value={province.name}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">
                City
              </label>
              <Select
                value={formData.city}
                onValueChange={(value) => setFormData({ ...formData, city: value })}
                disabled={!formData.province}
              >
                <SelectTrigger className="bg-background border-amatyma-red/20">
                  <SelectValue placeholder={formData.province ? "Select a city" : "Select province first"} />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
        <h3 className="text-lg font-medium">Business Images</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group aspect-square">
                <img 
                  src={image} 
                  alt={`Business image ${index + 1}`} 
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1
                  opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            
            <label 
              htmlFor="images-upload" 
              className="cursor-pointer flex flex-col items-center justify-center bg-gray-800 border-2 
              border-dashed border-gray-700 rounded-md aspect-square hover:bg-gray-700 transition-colors"
            >
              <Upload className="h-6 w-6 text-gray-400 mb-2" />
              <span className="text-xs text-gray-400">Upload Images</span>
            </label>
            <input 
              id="images-upload" 
              type="file" 
              accept="image/*" 
              multiple
              className="hidden" 
              onChange={handleImageUpload}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Upload images of your business, products, or services (max 10 images)
          </p>
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
