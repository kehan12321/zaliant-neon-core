import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import productsData from "@/data/products.json";

const Product = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedPlan, setSelectedPlan] = useState(0);

  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return (
      <PageLayout>
        <div className="pt-32 flex items-center justify-center">
          <p className="text-xl">Product not found</p>
        </div>
      </PageLayout>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      selectedPlan: product.plans[selectedPlan],
      image: product.image,
    });
    toast.success("Added to cart!");
  };

  const recommendedProducts = productsData
    .filter((p) => p.id !== id)
    .slice(0, 3);

  return (
    <PageLayout>

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[500px] object-cover rounded-xl neon-glow"
              />
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-bold mb-4 text-gradient">
                  {product.title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {product.longDescription}
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              {/* Features */}
              <Card className="glass border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Features:</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Plan Selection */}
              <div>
                <h3 className="font-semibold mb-4">Select Plan:</h3>
                <div className="flex gap-3">
                  {product.plans.map((plan, index) => (
                    <Button
                      key={index}
                      variant={selectedPlan === index ? "default" : "outline"}
                      onClick={() => setSelectedPlan(index)}
                      className={selectedPlan === index ? "neon-glow" : ""}
                    >
                      {plan}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                size="lg"
                className="w-full neon-glow"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </motion.div>
          </div>

          {/* Recommended Products */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gradient">
              Recommended Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendedProducts.map((recProduct, index) => (
                <Card key={recProduct.id} className="glass border-border/50 overflow-hidden">
                  <img
                    src={recProduct.image}
                    alt={recProduct.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{recProduct.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {recProduct.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        ${recProduct.price}
                      </span>
                      <Link to={`/product/${recProduct.id}`}>
                        <Button>View</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Product;
