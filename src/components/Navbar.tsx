import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, User, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import zaliantLogo from "@/assets/zaliant-logo.png";

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const { itemCount } = useCart();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={zaliantLogo} alt="Zaliant" className="h-10 w-10" />
            <span className="text-2xl font-bold text-gradient">Zaliant Services</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/store" className="text-foreground/80 hover:text-foreground transition-colors">
              Store
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
                Dashboard
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center neon-glow">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="neon-glow">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
