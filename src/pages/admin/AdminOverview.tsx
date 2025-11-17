import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, Package, Users, TrendingUp } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminOverview = () => {
  const orders = JSON.parse(localStorage.getItem("zaliant_orders") || "[]");
  const revenue = orders.reduce((sum: number, order: any) => sum + order.total, 0);
  const users = JSON.parse(localStorage.getItem("zaliant_all_users") || "[]");

  const stats = [
    { icon: DollarSign, label: "Total Revenue", value: `$${revenue.toFixed(2)}`, color: "text-green-400" },
    { icon: ShoppingBag, label: "Orders", value: orders.length, color: "text-blue-400" },
    { icon: Package, label: "Active Licenses", value: orders.length, color: "text-purple-400" },
    { icon: Users, label: "Total Users", value: users.length + 2, color: "text-orange-400" },
  ];

  const recentOrders = orders.slice(-5).reverse();

  const quickActions = [
    { label: "Add Product", path: "/admin/products" },
    { label: "View Orders", path: "/admin/orders" },
    { label: "Create Coupon", path: "/admin/coupons" },
    { label: "View Analytics", path: "/admin/analytics" },
  ];

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-gradient">Admin Overview</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-primary/10 ${stat.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card className="glass border-border/50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
                <div className="space-y-3">
                  {recentOrders.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No orders yet</p>
                  ) : (
                    recentOrders.map((order: any) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-background/50"
                      >
                        <div>
                          <p className="font-mono text-sm">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">{order.items.length} items</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="glass border-border/50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => window.location.href = action.path}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminOverview;
