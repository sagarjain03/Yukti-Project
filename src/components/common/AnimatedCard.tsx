import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  glow?: "cyan" | "purple" | "pink" | "none";
}

const AnimatedCard = ({
  children,
  className,
  delay = 0,
  hover = true,
  glow = "none",
}: AnimatedCardProps) => {
  const glowStyles = {
    cyan: "hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] hover:border-primary/50",
    purple: "hover:shadow-[0_0_40px_hsl(var(--secondary)/0.3)] hover:border-secondary/50",
    pink: "hover:shadow-[0_0_40px_hsl(var(--accent)/0.3)] hover:border-accent/50",
    none: "",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, scale: 1.01 } : {}}
      className={cn(
        "relative p-6 rounded-xl bg-card/50 backdrop-blur-lg border border-border/50 transition-all duration-300",
        glowStyles[glow],
        className
      )}
    >
      {/* Corner decoration */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/30 rounded-tl-xl" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-secondary/30 rounded-br-xl" />
      
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
