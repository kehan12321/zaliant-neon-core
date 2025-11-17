import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminOrders = () => {
  const orders = JSON.parse(localStorage.getItem("zaliant_orders") || "[]");

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-gradient">Orders Management</h1>

        {orders.length === 0 ? (
          <Card className="glass border-border/50">
            <CardContent className="p-12 text-center">
              <p className="text-xl text-muted-foreground">No orders yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any, index: number) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass border-border/50">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Order ID</p>
                        <p className="font-mono text-sm">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-semibold">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Items</p>
                        <p className="font-semibold">{order.items.length} items</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-xl font-bold text-primary">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AdminLayout>
  );
};

export default AdminOrders;
