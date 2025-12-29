import { motion } from "framer-motion";
import { UserPlus, Swords, Code, Trophy } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Profile",
    description: "Sign up with GitHub or Google. Link your university for College Wars.",
  },
  {
    number: "02",
    icon: Swords,
    title: "Choose Battle Mode",
    description: "1v1 Duel, Squad Wars, or Battle Royale. Pick your arena.",
  },
  {
    number: "03",
    icon: Code,
    title: "Solve & Submit",
    description: "Race against time and opponents. First correct solution wins.",
  },
  {
    number: "04",
    icon: Trophy,
    title: "Climb Rankings",
    description: "Win battles, earn Elo points, and dominate the leaderboard.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-32">
      {/* Gradient line */}
      <div className="absolute left-1/2 top-48 bottom-32 w-px bg-gradient-to-b from-primary via-secondary to-accent hidden lg:block" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block font-display text-sm font-semibold text-secondary uppercase tracking-widest mb-4">
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">From Zero to </span>
            <span className="text-gradient-purple">Hero</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to becoming a coding champion.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center gap-8 mb-16 last:mb-0 ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${isEven ? "lg:text-right" : "lg:text-left"}`}>
                  <div className={`inline-flex flex-col ${isEven ? "lg:items-end" : "lg:items-start"}`}>
                    <span className="font-display text-6xl font-bold text-muted/30 mb-2">
                      {step.number}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground max-w-sm">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center glow-cyan"
                  >
                    <Icon size={32} className="text-primary" />
                  </motion.div>
                </div>

                {/* Empty space for alignment */}
                <div className="hidden lg:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
