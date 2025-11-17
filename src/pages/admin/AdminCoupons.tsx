import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import couponsData from "@/data/coupons.json";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState(couponsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gradient">Coupons Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="neon-glow">
                <Plus className="h-4 w-4 mr-2" />
                Create Coupon
              </Button>
            </DialogTrigger>
            <DialogContent className="glass border-border/50">
              <DialogHeader>
                <DialogTitle>Create New Coupon</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label>Coupon Code</Label>
                  <Input placeholder="SAVE20" className="mt-2" />
                </div>
                <div>
                  <Label>Discount Type</Label>
                  <select className="w-full mt-2 p-2 rounded-lg bg-background border border-border">
                    <option value="percentage">Percentage</option>
                    <option value="flat">Flat Amount</option>
                  </select>
                </div>
                <div>
                  <Label>Discount Value</Label>
                  <Input type="number" placeholder="20" className="mt-2" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Active</Label>
                  <Switch defaultChecked />
                </div>
                <Button
                  type="submit"
                  className="w-full neon-glow"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success("Coupon created successfully!");
                    setIsDialogOpen(false);
                  }}
                >
                  Create Coupon
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon, index) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold font-mono">{coupon.code}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {coupon.type}
                      </p>
                    </div>
                    {coupon.active && (
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-primary mb-4">
                    {coupon.type === "percentage" ? `${coupon.value}%` : `$${coupon.value}`}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminCoupons;
