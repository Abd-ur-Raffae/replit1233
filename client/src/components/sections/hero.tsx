import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FloatingShapes from "@/components/ui/floating-shapes";
import TypingAnimation from "@/components/ui/typing-animation";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const handleScroll = (target: string) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      <FloatingShapes />

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg mb-4"
            data-testid="hero-greeting"
          >
            Hello, I'm
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            data-testid="hero-name"
          >
            Abd-ur-Raffae <span className="gradient-text">Masood</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8"
            data-testid="hero-title"
          >
            <TypingAnimation text="Full-Stack Developer" />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            data-testid="hero-description"
          >
            Crafting exceptional digital experiences with React, Ruby on Rails, and cutting-edge web technologies.
            Specializing in responsive design and immersive 3D interfaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              onClick={() => handleScroll("#projects")}
              className="bg-primary text-primary-foreground px-8 py-4 hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              data-testid="button-view-work"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              onClick={() => handleScroll("#contact")}
              className="border-primary text-primary px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              data-testid="button-contact"
            >
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground animate-bounce"
        data-testid="scroll-indicator"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
