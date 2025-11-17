import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";

const Store = () => {
  return (
    <PageLayout>

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our premium collection of digital services designed to elevate your
              business and personal projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsData.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Store;
