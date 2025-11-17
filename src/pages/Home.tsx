import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Headphones, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import zaliantLogo from "@/assets/zaliant-logo.png";

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: "Maximum Security",
      description: "Military-grade encryption and security protocols protect your data",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized infrastructure ensures blazing fast performance",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our expert team is always ready to assist you",
    },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Business Owner",
      content: "Zaliant Services transformed our digital infrastructure. Exceptional quality!",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      role: "Developer",
      content: "The best service provider I've worked with. Fast, reliable, and secure.",
      rating: 5,
    },
    {
      name: "Marcus Williams",
      role: "Entrepreneur",
      content: "Outstanding support and premium features. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={zaliantLogo}
              alt="Zaliant"
              className="h-32 w-32 mx-auto mb-8 neon-glow-lg"
            />
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Premium Digital Services</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience unmatched quality and performance with our suite of premium
              digital solutions. Built for professionals who demand excellence.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/store">
                <Button size="lg" className="neon-glow text-lg px-8">
                  Shop Now
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 text-gradient"
          >
            Why Choose Zaliant?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 neon-glow">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 text-gradient"
          >
            What Our Clients Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass border-border/50 h-full">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
