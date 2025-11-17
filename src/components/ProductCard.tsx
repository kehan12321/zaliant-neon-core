import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  index: number;
}

const ProductCard = ({ id, title, description, price, image, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="glass border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300 group">
        <div className="relative overflow-hidden h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gradient">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">${price}</span>
            <span className="text-muted-foreground text-sm">/month</span>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Link to={`/product/${id}`} className="w-full">
            <Button className="w-full neon-glow">View Product</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
