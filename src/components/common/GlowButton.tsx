import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlowButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

const GlowButton = ({
  children,
  variant = "primary",
  size = "md",
  glow = true,
  className,
  ...props
}: GlowButtonProps) => {
  const baseStyles =
    "relative font-display font-semibold tracking-wide uppercase transition-all duration-300 overflow-hidden group";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-neon-blue text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]",
    secondary:
      "bg-gradient-to-r from-secondary to-accent text-secondary-foreground hover:shadow-[0_0_30px_hsl(var(--secondary)/0.5)]",
    outline:
      "bg-transparent border-2 border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]",
    ghost:
      "bg-transparent text-foreground hover:bg-muted hover:text-primary",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-md",
    md: "px-6 py-3 text-sm rounded-lg",
    lg: "px-8 py-4 text-base rounded-xl",
  };

  return (
    <motion.button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Animated background shimmer */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Corner accents for cyber feel */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-50" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-50" />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default GlowButton;
