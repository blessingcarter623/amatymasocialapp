
import React, { useState, useEffect } from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { getProducts, deleteProduct } from '@/services/merchandiseService';
import { AdminProductForm } from '@/components/admin/AdminProductForm';
import { Product } from '@/types';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AdminMerchandise = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle product form submission success
  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
    fetchProducts();
  };

  // Open edit dialog
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  // Open delete confirmation
  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  // Delete product
  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    
    try {
      await deleteProduct(productToDelete);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
      console.error(error);
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Merchandise Management</h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setEditingProduct(null)}
                className="bg-amatyma-red hover:bg-amatyma-red/80"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              </DialogHeader>
              <AdminProductForm 
                product={editingProduct} 
                onSuccess={handleFormSuccess}
              />
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-amatyma-red border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableCaption>List of all merchandise products</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>In Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No products found. Add your first product.
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="w-12 h-12 rounded overflow-hidden border">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>R{product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          product.inStock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteClick(product.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleDeleteConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default AdminMerchandise;
