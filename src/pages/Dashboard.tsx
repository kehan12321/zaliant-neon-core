import { motion } from "framer-motion";
import { Package, User, ShoppingBag, Key, Copy, Check, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { downloadInvoice, getInvoicesByUserId } from "@/utils/invoice";
import { toast } from "sonner";
import { useState } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const orders = JSON.parse(localStorage.getItem("zaliant_orders") || "[]").filter(
    (order: any) => order.userId === user?.id
  );

  const licenses = JSON.parse(
    localStorage.getItem(`zaliant_licenses_${user?.id}`) || "[]"
  );

  const stats = [
    { icon: ShoppingBag, label: "Total Orders", value: orders.length },
    { icon: Key, label: "Active Licenses", value: licenses.length },
    { icon: User, label: "Account Status", value: "Active" },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    toast.success("License key copied!");
    
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleDownloadInvoice = (orderId: string) => {
    if (user) {
      const invoices = getInvoicesByUserId(user.id);
      const invoice = invoices.find(inv => inv.orderId === orderId);
      if (invoice) {
        downloadInvoice(invoice);
        toast.success("Invoice downloaded!");
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-4 text-gradient">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Manage your orders and account settings
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
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

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gradient">Recent Orders</h2>
            
            {orders.length === 0 ? (
              <Card className="glass border-border/50">
                <CardContent className="p-12 text-center">
                  <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-xl text-muted-foreground mb-4">
                    No orders yet
                  </p>
                  <Button className="neon-glow">Browse Products</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order: any, index: number) => (
                  <Card key={order.id} className="glass border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-mono text-sm text-muted-foreground mb-2">
                            {order.id}
                          </p>
                          <p className="font-semibold">
                            {order.items.length} item(s) - ${order.total.toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                            {order.status}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadInvoice(order.id)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>

          {/* License Keys */}
          {licenses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <h2 className="text-3xl font-bold mb-6 text-gradient">Your License Keys</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {licenses.map((license: any) => (
                  <Card key={license.key} className="glass border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold">{license.productTitle}</span>
                        <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                          {license.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 font-mono text-sm bg-background/50 p-2 rounded">
                          {license.key}
                        </code>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(license.key)}
                        >
                          {copiedKey === license.key ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-gradient">Account Settings</h2>
            <Card className="glass border-border/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
