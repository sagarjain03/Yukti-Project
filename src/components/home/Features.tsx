import { motion } from "framer-motion";
import { 
  Swords, 
  Users, 
  Video, 
  PenTool, 
  Trophy, 
  PlayCircle,
  Zap,
  Brain
} from "lucide-react";
import AnimatedCard from "@/components/common/AnimatedCard";

const features = [
  {
    icon: Swords,
    title: "1v1 Duels",
    description: "Face off against opponents of similar skill in intense head-to-head coding battles.",
    color: "cyan",
  },
  {
    icon: Users,
    title: "Squad Wars",
    description: "Form a team of up to 5 warriors and conquer the battlefield together.",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Battle Royale",
    description: "10+ coders enter, only one emerges victorious. The ultimate test of speed and skill.",
    color: "pink",
  },
  {
    icon: Video,
    title: "Live Communication",
    description: "Built-in video/audio chat. No external tools needed to strategize with teammates.",
    color: "cyan",
  },
  {
    icon: PenTool,
    title: "Interactive Whiteboard",
    description: "Draw, explain, and visualize algorithms in real-time during post-match discussions.",
    color: "purple",
  },
  {
    icon: PlayCircle,
    title: "Replay System",
    description: "Watch time-travel replays of winning solutions to learn winning strategies.",
    color: "pink",
  },
  {
    icon: Trophy,
    title: "College Wars",
    description: "Represent your university. Compete for bragging rights on the global leaderboard.",
    color: "cyan",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Get post-match breakdowns powered by AI. Understand exactly why winners win.",
    color: "purple",
  },
];

const colorClasses = {
  cyan: "text-primary bg-primary/10 border-primary/30",
  purple: "text-secondary bg-secondary/10 border-secondary/30",
  pink: "text-accent bg-accent/10 border-accent/30",
};

const Features = () => {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block font-display text-sm font-semibold text-primary uppercase tracking-widest mb-4">
            Features
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Built for </span>
            <span className="text-gradient-fire">Competition</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to train, compete, and dominate the coding battlefield.
          </p>
        </motion.div>

        {/* Features Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLarge = index === 0 || index === 5;
            
            return (
              <AnimatedCard
                key={feature.title}
                delay={index * 0.1}
                glow={feature.color as "cyan" | "purple" | "pink"}
                className={isLarge ? "md:col-span-2" : ""}
              >
                <div className={`inline-flex p-3 rounded-xl border ${colorClasses[feature.color as keyof typeof colorClasses]} mb-4`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
