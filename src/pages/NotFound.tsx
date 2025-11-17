import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <PageLayout showFooter={false}>
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-9xl font-bold mb-4 text-gradient">404</h1>
            <p className="text-2xl mb-4">Page Not Found</p>
            <p className="text-xl text-muted-foreground mb-8">
              Oops! The page you're looking for doesn't exist.
            </p>
            <Link to="/">
              <Button className="neon-glow" size="lg">
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
