import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import productsData from "@/data/products.json";

const AdminProducts = () => {
  const [products, setProducts] = useState(productsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gradient">Products Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="neon-glow">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="glass border-border/50 max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label>Product Title</Label>
                  <Input placeholder="Enter product title" className="mt-2" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Enter product description" className="mt-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Price</Label>
                    <Input type="number" placeholder="29.99" className="mt-2" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input placeholder="security" className="mt-2" />
                  </div>
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input placeholder="https://..." className="mt-2" />
                </div>
                <Button
                  type="submit"
                  className="w-full neon-glow"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success("Product added successfully!");
                    setIsDialogOpen(false);
                  }}
                >
                  Create Product
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass border-border/50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <p className="text-2xl font-bold text-primary mb-4">
                    ${product.price}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminProducts;
