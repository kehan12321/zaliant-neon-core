import { motion } from "framer-motion";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PremiumButtonProps extends ButtonProps {
  children: ReactNode;
  glow?: boolean;
}

const PremiumButton = ({ children, glow = true, className, ...props }: PremiumButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        className={cn(
          glow && "neon-glow hover:shadow-glow-lg transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default PremiumButton;
