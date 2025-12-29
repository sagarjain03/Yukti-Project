import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Swords,
  Users,
  Crown,
  Copy,
  Check,
  Zap,
  Clock,
  Shield,
  ChevronRight,
  Loader2,
  UserPlus,
  Play,
} from "lucide-react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import GlowButton from "@/components/common/GlowButton";
import AnimatedCard from "@/components/common/AnimatedCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type GameMode = "duel" | "squad" | "royale";
type SquadSize = "2v2" | "3v3" | "4v4" | "5v5";
type Team = "A" | "B";

interface Player {
  id: string;
  name: string;
  elo: number;
  avatar: string;
}

const gameModes = [
  {
    id: "duel" as GameMode,
    icon: Swords,
    title: "1v1 Duel",
    subtitle: "Ranked Matchmaking",
    desc: "Auto-matched based on your ELO rating. Face an opponent of similar skill.",
    players: "2 players",
    color: "cyan",
    features: ["ELO-based matching", "Ranked progression", "±200 ELO range"],
  },
  {
    id: "squad" as GameMode,
    icon: Users,
    title: "Squad Wars",
    subtitle: "Team Battle",
    desc: "Create a custom room and battle with your squad. Choose your team size.",
    players: "4-10 players",
    color: "purple",
    features: ["Room codes", "Team selection", "2v2 to 5v5"],
  },
  {
    id: "royale" as GameMode,
    icon: Crown,
    title: "Battle Royale",
    subtitle: "Free For All",
    desc: "Last coder standing wins! Up to 20 players compete to solve first.",
    players: "10-20 players",
    color: "pink",
    features: ["Free-for-all", "First to solve wins", "Maximum chaos"],
  },
];

const squadSizes: SquadSize[] = ["2v2", "3v3", "4v4", "5v5"];

// Generate random room code
const generateRoomCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const BattleSetup = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [copied, setCopied] = useState(false);

  // Squad Wars state
  const [squadSize, setSquadSize] = useState<SquadSize>("3v3");
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [joinCode, setJoinCode] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team>("A");
  const [teamA, setTeamA] = useState<Player[]>([]);
  const [teamB, setTeamB] = useState<Player[]>([]);

  // Battle Royale state
  const [royaleRoomCode, setRoyaleRoomCode] = useState<string | null>(null);
  const [royalePlayers, setRoyalePlayers] = useState<Player[]>([]);

  // Simulate matchmaking
  const startMatchmaking = () => {
    setIsSearching(true);
    setSearchTime(0);

    const interval = setInterval(() => {
      setSearchTime((prev) => prev + 1);
    }, 1000);

    // Simulate finding a match after 3-8 seconds
    setTimeout(() => {
      clearInterval(interval);
      setIsSearching(false);
      toast.success("Match found! Entering the arena...");
      navigate("/battle");
    }, Math.random() * 5000 + 3000);
  };

  const cancelMatchmaking = () => {
    setIsSearching(false);
    setSearchTime(0);
    toast.info("Matchmaking cancelled");
  };

  const createSquadRoom = () => {
    const code = generateRoomCode();
    setRoomCode(code);
    // Add current user to Team A
    setTeamA([{ id: "1", name: "You", elo: 1847, avatar: "👤" }]);
    toast.success(`Room created! Share code: ${code}`);
  };

  const createRoyaleRoom = () => {
    const code = generateRoomCode();
    setRoyaleRoomCode(code);
    setRoyalePlayers([{ id: "1", name: "You", elo: 1847, avatar: "👤" }]);
    toast.success(`Battle Royale room created! Share code: ${code}`);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Code copied to clipboard!");
  };

  const joinRoom = () => {
    if (joinCode.length !== 6) {
      toast.error("Please enter a valid 6-character room code");
      return;
    }
    toast.success(`Joining room ${joinCode}...`);
    // In real implementation, this would verify the room and join
  };

  const renderModeContent = () => {
    switch (selectedMode) {
      case "duel":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold mb-2">1v1 Ranked Duel</h2>
              <p className="text-muted-foreground">
                You'll be matched with an opponent within ±200 of your ELO
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div>
                    <div className="font-semibold">Your Profile</div>
                    <div className="text-sm text-muted-foreground">ELO: 1,847</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Matching Range</div>
                  <div className="font-mono text-primary">1,647 - 2,047</div>
                </div>
              </div>

              {!isSearching ? (
                <GlowButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={startMatchmaking}
                >
                  <Zap size={20} className="mr-2" />
                  Find Match
                </GlowButton>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4 py-4">
                    <Loader2 size={32} className="text-primary animate-spin" />
                    <div>
                      <div className="font-semibold">Searching for opponent...</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock size={14} />
                        {Math.floor(searchTime / 60)}:{String(searchTime % 60).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={cancelMatchmaking}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        );

      case "squad":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold mb-2">Squad Wars</h2>
              <p className="text-muted-foreground">
                Create a room or join with a code
              </p>
            </div>

            {!roomCode ? (
              <div className="space-y-6">
                {/* Squad Size Selection */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Select Team Size</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {squadSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSquadSize(size)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          squadSize === size
                            ? "border-primary bg-primary/20 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="font-display font-bold text-lg">{size}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <GlowButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={createSquadRoom}
                >
                  <Users size={20} className="mr-2" />
                  Create Squad Room
                </GlowButton>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-background px-4 text-muted-foreground">or join existing</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Input
                    placeholder="Enter room code"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    maxLength={6}
                    className="font-mono text-lg tracking-widest uppercase"
                  />
                  <GlowButton variant="outline" onClick={joinRoom}>
                    Join
                  </GlowButton>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Room Created */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Room Code</div>
                      <div className="font-mono text-3xl font-bold text-primary tracking-widest">
                        {roomCode}
                      </div>
                    </div>
                    <GlowButton
                      variant="outline"
                      size="sm"
                      onClick={() => copyCode(roomCode)}
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </GlowButton>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Share this code with your friends to join • Mode: {squadSize}
                  </div>
                </div>

                {/* Team Selection */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Team A */}
                  <div className="glass rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-bold text-primary">Team Alpha</h3>
                      <span className="text-sm text-muted-foreground">
                        {teamA.length}/{parseInt(squadSize[0])}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {teamA.map((player) => (
                        <div
                          key={player.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <span className="text-xl">{player.avatar}</span>
                          <div className="flex-1">
                            <div className="font-medium">{player.name}</div>
                            <div className="text-xs text-muted-foreground">
                              ELO: {player.elo}
                            </div>
                          </div>
                        </div>
                      ))}
                      {Array(parseInt(squadSize[0]) - teamA.length)
                        .fill(0)
                        .map((_, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-border text-muted-foreground"
                          >
                            <UserPlus size={16} />
                            <span className="text-sm">Waiting...</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Team B */}
                  <div className="glass rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-bold text-secondary">Team Beta</h3>
                      <span className="text-sm text-muted-foreground">
                        {teamB.length}/{parseInt(squadSize[0])}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {teamB.map((player) => (
                        <div
                          key={player.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <span className="text-xl">{player.avatar}</span>
                          <div className="flex-1">
                            <div className="font-medium">{player.name}</div>
                            <div className="text-xs text-muted-foreground">
                              ELO: {player.elo}
                            </div>
                          </div>
                        </div>
                      ))}
                      {Array(parseInt(squadSize[0]) - teamB.length)
                        .fill(0)
                        .map((_, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-border text-muted-foreground"
                          >
                            <UserPlus size={16} />
                            <span className="text-sm">Waiting...</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <GlowButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={teamA.length < parseInt(squadSize[0]) || teamB.length < parseInt(squadSize[0])}
                  onClick={() => navigate("/battle")}
                >
                  <Play size={20} className="mr-2" />
                  Start Battle
                </GlowButton>
              </div>
            )}
          </motion.div>
        );

      case "royale":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold mb-2">Battle Royale</h2>
              <p className="text-muted-foreground">
                Create a lobby or join with a code
              </p>
            </div>

            {!royaleRoomCode ? (
              <div className="space-y-6">
                <GlowButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={createRoyaleRoom}
                >
                  <Crown size={20} className="mr-2" />
                  Create Battle Royale Room
                </GlowButton>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-background px-4 text-muted-foreground">or join existing</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Input
                    placeholder="Enter room code"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    maxLength={6}
                    className="font-mono text-lg tracking-widest uppercase"
                  />
                  <GlowButton variant="outline" onClick={joinRoom}>
                    Join
                  </GlowButton>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Room Created */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Room Code</div>
                      <div className="font-mono text-3xl font-bold text-warning tracking-widest">
                        {royaleRoomCode}
                      </div>
                    </div>
                    <GlowButton
                      variant="outline"
                      size="sm"
                      onClick={() => copyCode(royaleRoomCode)}
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </GlowButton>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Share this code to invite players</span>
                    <span className="text-primary font-semibold">
                      {royalePlayers.length}/20 players
                    </span>
                  </div>
                </div>

                {/* Players Grid */}
                <div className="glass rounded-2xl p-4">
                  <h3 className="font-semibold mb-4">Players in Lobby</h3>
                  <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                    {royalePlayers.map((player) => (
                      <div
                        key={player.id}
                        className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/50"
                      >
                        <span className="text-2xl">{player.avatar}</span>
                        <span className="text-xs font-medium truncate w-full text-center">
                          {player.name}
                        </span>
                      </div>
                    ))}
                    {Array(Math.min(20 - royalePlayers.length, 8))
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg border border-dashed border-border text-muted-foreground"
                        >
                          <UserPlus size={20} />
                        </div>
                      ))}
                  </div>
                </div>

                <GlowButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={royalePlayers.length < 3}
                  onClick={() => navigate("/battle")}
                >
                  <Play size={20} className="mr-2" />
                  Start Battle Royale ({royalePlayers.length}/20)
                </GlowButton>
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <SidebarLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-cyan">Choose Your</span>{" "}
            <span className="text-foreground">Battle</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select a game mode and prepare to enter the arena
          </p>
        </motion.div>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {gameModes.map((mode, i) => {
            const Icon = mode.icon;
            const isSelected = selectedMode === mode.id;
            return (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <button
                  onClick={() => {
                    setSelectedMode(mode.id);
                    setRoomCode(null);
                    setRoyaleRoomCode(null);
                    setTeamA([]);
                    setTeamB([]);
                    setRoyalePlayers([]);
                  }}
                  className="w-full text-left"
                >
                  <AnimatedCard
                    glow={mode.color as any}
                    className={`cursor-pointer transition-all h-full ${
                      isSelected ? "ring-2 ring-primary scale-[1.02]" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl ${
                          mode.color === "cyan"
                            ? "bg-primary/20"
                            : mode.color === "purple"
                            ? "bg-secondary/20"
                            : "bg-neon-pink/20"
                        }`}
                      >
                        <Icon
                          size={32}
                          className={
                            mode.color === "cyan"
                              ? "text-primary"
                              : mode.color === "purple"
                              ? "text-secondary"
                              : "text-neon-pink"
                          }
                        />
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check size={14} className="text-primary-foreground" />
                        </motion.div>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-bold mb-1">
                      {mode.title}
                    </h3>
                    <p className="text-sm text-primary font-semibold mb-2">
                      {mode.subtitle}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">
                      {mode.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {mode.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                        {mode.players}
                      </span>
                    </div>
                  </AnimatedCard>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Mode-specific content */}
        <AnimatePresence mode="wait">
          {selectedMode && (
            <motion.div
              key={selectedMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              {renderModeContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SidebarLayout>
  );
};

export default BattleSetup;
