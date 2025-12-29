import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import GlowButton from "@/components/common/GlowButton";

const CTA = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 mb-8"
          >
            <Sparkles size={16} className="text-secondary" />
            <span className="text-sm font-semibold text-secondary">
              Join 50,000+ warriors
            </span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Ready to </span>
            <span className="text-gradient-cyan">Prove </span>
            <span className="text-foreground">Yourself?</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            The battlefield awaits. Join thousands of developers sharpening their 
            skills through competitive coding. Your first battle is free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/lobby">
              <GlowButton variant="primary" size="lg" className="min-w-[250px]">
                Enter the Arena
                <ArrowRight size={20} />
              </GlowButton>
            </Link>
            <GlowButton variant="ghost" size="lg">
              Learn More
            </GlowButton>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-sm">+5,000 new warriors this week</span>
            </div>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <span className="text-sm">Free to play • No credit card</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
