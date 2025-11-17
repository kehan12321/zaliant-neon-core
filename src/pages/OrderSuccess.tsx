import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Download, Copy, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { downloadInvoice, getInvoicesByUserId } from "@/utils/invoice";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("tx");
  const { user } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const [copiedKeys, setCopiedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (transactionId) {
      const orders = JSON.parse(localStorage.getItem("zaliant_orders") || "[]");
      const foundOrder = orders.find((o: any) => o.id === transactionId);
      setOrder(foundOrder);
    }
  }, [transactionId]);

  const handleDownloadInvoice = () => {
    if (order && user) {
      const invoices = getInvoicesByUserId(user.id);
      const invoice = invoices.find(inv => inv.orderId === order.id);
      if (invoice) {
        downloadInvoice(invoice);
        toast.success("Invoice downloaded!");
      }
    }
  };

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeys(prev => new Set(prev).add(keyId));
    toast.success("License key copied!");
    
    setTimeout(() => {
      setCopiedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(keyId);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 mb-8 neon-glow-lg floating">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>

            <h1 className="text-5xl font-bold mb-4 text-gradient">
              Order Successful!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            <Card className="glass border-border/50 mb-8">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction ID:</span>
                    <span className="font-mono font-semibold text-sm">{transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-semibold text-primary">Completed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-semibold">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  {order && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-bold text-primary text-lg">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* License Keys */}
            {order?.licenses && order.licenses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="glass border-border/50 border-primary/50 neon-glow mb-8">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gradient">
                      Your License Keys
                    </h2>
                    <div className="space-y-4">
                      {order.licenses.map((license: any, index: number) => (
                        <motion.div
                          key={license.key}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="p-4 rounded-lg bg-background/50 border border-border/50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">
                              {license.productTitle}
                            </span>
                            <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                              Active
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <code className="flex-1 font-mono text-lg font-bold text-primary">
                              {license.key}
                            </code>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => copyToClipboard(license.key, license.key)}
                            >
                              {copiedKeys.has(license.key) ? (
                                <Check className="h-4 w-4 text-green-400" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-6 text-center">
                      Keep these keys safe. You can access them anytime from your dashboard.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={handleDownloadInvoice} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              <Link to="/dashboard">
                <Button size="lg" className="neon-glow">
                  Go to Dashboard
                </Button>
              </Link>
              <Link to="/store">
                <Button size="lg" variant="outline">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
