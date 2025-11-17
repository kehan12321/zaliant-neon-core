import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bitcoin, Wallet, Download } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { generateMultipleLicenseKeys, createLicense } from "@/utils/licenseKeys";
import { generateInvoice, saveInvoice } from "@/utils/invoice";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: "btc", name: "Bitcoin (BTC)", icon: Bitcoin, address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
    { id: "eth", name: "Ethereum (ETH)", icon: Wallet, address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" },
    { id: "ltc", name: "Litecoin (LTC)", icon: Bitcoin, address: "LKjHyg3d8d9aPPxL6X3KcJvZf5p2NmWxYz" },
    { id: "giftcard", name: "Gift Card", icon: Wallet, address: "" },
  ];

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      const transactionId = `ZAL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Generate license keys for each product
      const licenses = cart.map(item => {
        const keys = generateMultipleLicenseKeys(item.id, item.quantity);
        return keys.map(key => createLicense(key, item.id, item.title));
      }).flat();

      // Generate invoice
      const invoice = generateInvoice(
        transactionId,
        user?.id || 'guest',
        user?.email || 'guest@zaliant.com',
        cart,
        total,
        paymentMethod
      );
      
      saveInvoice(invoice);

      // Save order with licenses
      const order = {
        id: transactionId,
        userId: user?.id,
        items: cart,
        total,
        paymentMethod,
        status: "completed",
        date: new Date().toISOString(),
        licenses,
        invoiceId: invoice.id,
      };

      const orders = JSON.parse(localStorage.getItem("zaliant_orders") || "[]");
      orders.push(order);
      localStorage.setItem("zaliant_orders", JSON.stringify(orders));

      // Save licenses separately for user
      const userLicenses = JSON.parse(localStorage.getItem(`zaliant_licenses_${user?.id}`) || "[]");
      userLicenses.push(...licenses);
      localStorage.setItem(`zaliant_licenses_${user?.id}`, JSON.stringify(userLicenses));

      clearCart();
      toast.success("Order completed successfully! 🎉");
      navigate(`/success?tx=${transactionId}`);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PageLayout>

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-12 text-gradient"
          >
            Checkout
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div className="space-y-6">
              <Card className="glass border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => {
                            setPaymentMethod(method.id);
                            setWalletAddress(method.address);
                          }}
                          className={`w-full p-4 rounded-lg border-2 transition-all ${
                            paymentMethod === method.id
                              ? "border-primary bg-primary/10 neon-glow"
                              : "border-border/50 hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-6 w-6" />
                            <span className="font-semibold">{method.name}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {paymentMethod && paymentMethod !== "giftcard" && walletAddress && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="glass border-border/50 border-primary/50 neon-glow">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-4">Send payment to:</h3>
                      <div className="bg-background/50 p-4 rounded-lg">
                        <p className="text-sm font-mono break-all">{walletAddress}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        Amount: <span className="font-bold text-primary">${total.toFixed(2)}</span>
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {paymentMethod === "giftcard" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="glass border-border/50">
                    <CardContent className="p-6">
                      <Label htmlFor="giftcard">Gift Card Code</Label>
                      <Input
                        id="giftcard"
                        placeholder="Enter your gift card code"
                        className="mt-2"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="glass border-border/50 sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-2xl font-bold">Order Summary</h2>

                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={`${item.id}-${item.selectedPlan}`}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {item.title} ({item.selectedPlan}) x{item.quantity}
                        </span>
                        <span className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border/50 pt-4">
                    <div className="flex justify-between text-xl">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-primary">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full neon-glow"
                    size="lg"
                    onClick={handlePayment}
                    disabled={!paymentMethod || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Processing...
                      </>
                    ) : (
                      "Complete Purchase"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By completing this purchase, you agree to our Terms of Service
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Checkout;
