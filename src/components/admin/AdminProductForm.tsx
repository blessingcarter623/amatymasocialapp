
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { toast } from 'sonner';
import { Product, ProductSize } from '@/types';
import { createProduct, updateProduct, uploadProductImage } from '@/services/merchandiseService';
import { UploadCloud, Loader2 } from 'lucide-react';

// Schema for product validation
const productFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  inStock: z.boolean().default(true),
  sizes: z.array(z.string()).min(1, 'At least one size must be selected'),
});

type ProductFormValues = z.infer<typeof productFormSchema> & {
  image?: FileList;
};

const ALL_SIZES: { value: ProductSize; label: string }[] = [
  { value: 'XS', label: 'XS' },
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' },
  { value: 'XXL', label: 'XXL' },
  { value: 'One Size', label: 'One Size' },
  { value: 'A4', label: 'A4' },
  { value: 'A5', label: 'A5' },
];

interface AdminProductFormProps {
  product?: Product | null;
  onSuccess: () => void;
}

export const AdminProductForm: React.FC<AdminProductFormProps> = ({ 
  product, 
  onSuccess 
}) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product ? product.image : null
  );

  // Set up form with default values from the product if editing
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      category: product?.category || '',
      inStock: product?.inStock ?? true,
      sizes: product?.availableSizes || [],
    },
  });

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    try {
      setLoading(true);
      
      // Handle image upload if there's a new image
      let imageUrl = product?.image || '';
      if (values.image && values.image.length > 0) {
        imageUrl = await uploadProductImage(values.image[0]);
      }

      const productData = {
        name: values.name,
        description: values.description,
        price: values.price,
        category: values.category,
        available_sizes: values.sizes as ProductSize[],
        in_stock: values.inStock,
        image: imageUrl,
      };

      if (product) {
        // Update existing product
        await updateProduct({
          id: product.id,
          ...productData
        });
        toast.success('Product updated successfully');
      } else {
        // Create new product
        await createProduct(productData);
        toast.success('Product added successfully');
      }

      onSuccess();

    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Image upload */}
          <div className="space-y-4">
            <FormLabel>Product Image</FormLabel>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="mx-auto h-48 object-contain rounded-md"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => setImagePreview(null)}
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <div className="py-4">
                  <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <Input
                    id="image"
                    type="file"
                    className="mt-4"
                    accept="image/*"
                    {...form.register('image')}
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </div>
            <FormDescription>
              Upload a clear, high-quality image of the product.
            </FormDescription>
          </div>

          {/* Right column - Product details */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (R)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      {...field} 
                      onChange={(e) => 
                        field.onChange(parseFloat(e.target.value) || 0)
                      } 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>In Stock</FormLabel>
                    <FormDescription>
                      Uncheck if this product is out of stock
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="sizes"
            render={() => (
              <FormItem>
                <FormLabel>Available Sizes</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {ALL_SIZES.map((size) => (
                    <FormField
                      key={size.value}
                      control={form.control}
                      name="sizes"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={size.value}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(size.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, size.value])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== size.value
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {size.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            type="submit"
            disabled={loading}
            className="bg-amatyma-red hover:bg-amatyma-red/80"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {product ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
