import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("tx");

  useEffect(() => {
    // Confetti or celebration effect could be added here
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 mb-8 neon-glow-lg">
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
                    <span className="font-mono font-semibold">{transactionId}</span>
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
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
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
