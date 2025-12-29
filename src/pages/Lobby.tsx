import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swords, Users, Crown, Copy, Check } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import GlowButton from "@/components/common/GlowButton";
import AnimatedCard from "@/components/common/AnimatedCard";

const modes = [
  { id: "duel", icon: Swords, title: "1v1 Duel", desc: "Face a single opponent", players: "2 players", color: "cyan" },
  { id: "squad", icon: Users, title: "Squad Wars", desc: "Team up with friends", players: "Up to 5v5", color: "purple" },
  { id: "royale", icon: Crown, title: "Battle Royale", desc: "Last coder standing", players: "10+ players", color: "pink" },
];

const Lobby = () => {
  const [selectedMode, setSelectedMode] = useState("duel");
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText("https://codebattle.arena/join/ABC123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageLayout showFooter={false}>
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-cyan">Choose Your</span> <span className="text-foreground">Battle</span>
          </h1>
          <p className="text-muted-foreground text-lg">Select a mode and enter the arena</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {modes.map((mode, i) => {
            const Icon = mode.icon;
            const isSelected = selectedMode === mode.id;
            return (
              <motion.div key={mode.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <button onClick={() => setSelectedMode(mode.id)} className="w-full text-left">
                  <AnimatedCard glow={mode.color as any} className={`cursor-pointer transition-all ${isSelected ? "ring-2 ring-primary" : ""}`}>
                    <Icon size={40} className={isSelected ? "text-primary" : "text-muted-foreground"} />
                    <h3 className="font-display text-xl font-bold mt-4 mb-1">{mode.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{mode.desc}</p>
                    <span className="text-xs text-primary font-semibold uppercase">{mode.players}</span>
                  </AnimatedCard>
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="max-w-md mx-auto space-y-4">
          <div className="flex gap-2">
            <input type="text" value="https://codebattle.arena/join/ABC123" readOnly className="flex-1 px-4 py-3 rounded-lg bg-input border border-border text-sm font-mono" />
            <GlowButton variant="outline" size="md" onClick={copyLink}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </GlowButton>
          </div>
          <Link to="/battle" className="block">
            <GlowButton variant="primary" size="lg" className="w-full">Find Match</GlowButton>
          </Link>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Lobby;
