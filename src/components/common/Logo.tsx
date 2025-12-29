import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizes = {
    sm: { icon: 20, text: "text-lg" },
    md: { icon: 28, text: "text-xl" },
    lg: { icon: 40, text: "text-3xl" },
  };

  return (
    <Link to="/" className="flex items-center gap-2 group">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
        <div className="relative p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/50">
          <Zap
            size={sizes[size].icon}
            className="text-primary"
            strokeWidth={2.5}
            fill="currentColor"
          />
        </div>
      </motion.div>
      {showText && (
        <span className={`font-display font-bold ${sizes[size].text} text-gradient-cyan tracking-wide`}>
          YUKTI
        </span>
      )}
    </Link>
  );
};

export default Logo;
