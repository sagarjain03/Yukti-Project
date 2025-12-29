import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, Users, GraduationCap } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

const playerLeaders = [
  { rank: 1, name: "CodeNinja_42", college: "IIT Delhi", elo: 2847, wins: 342 },
  { rank: 2, name: "AlgoMaster", college: "NIT Trichy", elo: 2756, wins: 298 },
  { rank: 3, name: "ByteWarrior", college: "BITS Pilani", elo: 2698, wins: 276 },
  { rank: 4, name: "DSA_King", college: "IIT Bombay", elo: 2654, wins: 245 },
  { rank: 5, name: "RecursiveQueen", college: "IIIT Hyderabad", elo: 2612, wins: 231 },
  { rank: 6, name: "GraphGuru", college: "IIT Madras", elo: 2589, wins: 218 },
  { rank: 7, name: "DPDemon", college: "NIT Warangal", elo: 2567, wins: 205 },
  { rank: 8, name: "TreeTraverser", college: "DTU", elo: 2534, wins: 198 },
  { rank: 9, name: "HeapHero", college: "VIT Vellore", elo: 2512, wins: 187 },
  { rank: 10, name: "StackSamurai", college: "IIT Kanpur", elo: 2498, wins: 176 },
];

const collegeLeaders = [
  { rank: 1, name: "IIT Delhi", players: 1247, avgElo: 2156, totalWins: 15420 },
  { rank: 2, name: "IIT Bombay", players: 1189, avgElo: 2089, totalWins: 14230 },
  { rank: 3, name: "NIT Trichy", players: 987, avgElo: 1967, totalWins: 11890 },
  { rank: 4, name: "BITS Pilani", players: 876, avgElo: 1945, totalWins: 10567 },
  { rank: 5, name: "IIIT Hyderabad", players: 765, avgElo: 1923, totalWins: 9876 },
  { rank: 6, name: "IIT Madras", players: 1034, avgElo: 1912, totalWins: 9654 },
  { rank: 7, name: "NIT Warangal", players: 654, avgElo: 1876, totalWins: 8234 },
  { rank: 8, name: "DTU", players: 543, avgElo: 1854, totalWins: 7654 },
  { rank: 9, name: "VIT Vellore", players: 1432, avgElo: 1789, totalWins: 7123 },
  { rank: 10, name: "IIT Kanpur", players: 876, avgElo: 1778, totalWins: 6987 },
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<"players" | "colleges">("players");

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-fire">Global</span> <span className="text-foreground">Leaderboard</span>
          </h1>
          <p className="text-muted-foreground">Compete with the best warriors across India</p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-card/50 border border-border">
            <button
              onClick={() => setActiveTab("players")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "players" 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users size={18} />
              Top Players
            </button>
            <button
              onClick={() => setActiveTab("colleges")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "colleges" 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GraduationCap size={18} />
              College Wars
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {activeTab === "players" ? (
            <>
              {/* Top 3 Podium - Players */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                {[playerLeaders[1], playerLeaders[0], playerLeaders[2]].map((leader, i) => {
                  const icons = [Medal, Trophy, Award];
                  const Icon = icons[i];
                  const heights = ["h-32", "h-40", "h-28"];
                  const colors = ["text-[#C0C0C0]", "text-warning", "text-[#CD7F32]"];
                  return (
                    <motion.div 
                      key={leader.rank} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: i * 0.1 }}
                      className={`flex flex-col items-center justify-end ${heights[i]}`}
                    >
                      <div className="relative">
                        <div className={`absolute inset-0 blur-xl rounded-full ${i === 1 ? "bg-warning/30" : "bg-muted/20"}`} />
                        <Icon size={36} className={`relative ${colors[i]} mb-2`} />
                      </div>
                      <div className="font-display font-bold text-lg">{leader.name}</div>
                      <div className="text-xs text-muted-foreground mb-1">{leader.college}</div>
                      <div className="text-sm font-bold text-primary">{leader.elo} ELO</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Rankings Table - Players */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-border overflow-hidden bg-card/30"
              >
                <div className="grid grid-cols-12 gap-4 p-4 bg-muted/30 text-sm font-semibold text-muted-foreground border-b border-border">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-4">Player</div>
                  <div className="col-span-3">College</div>
                  <div className="col-span-2 text-right">ELO</div>
                  <div className="col-span-2 text-right">Wins</div>
                </div>
                {playerLeaders.map((leader, i) => (
                  <motion.div 
                    key={leader.rank} 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="grid grid-cols-12 gap-4 items-center p-4 border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <div className="col-span-1">
                      <span className={`font-display font-bold text-xl ${leader.rank <= 3 ? "text-warning" : "text-muted-foreground"}`}>
                        #{leader.rank}
                      </span>
                    </div>
                    <div className="col-span-4 font-semibold">{leader.name}</div>
                    <div className="col-span-3 text-muted-foreground text-sm">{leader.college}</div>
                    <div className="col-span-2 text-right">
                      <span className="font-display font-bold text-primary">{leader.elo}</span>
                    </div>
                    <div className="col-span-2 text-right text-muted-foreground">{leader.wins} wins</div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <>
              {/* Top 3 Podium - Colleges */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                {[collegeLeaders[1], collegeLeaders[0], collegeLeaders[2]].map((college, i) => {
                  const icons = [Medal, Trophy, Award];
                  const Icon = icons[i];
                  const heights = ["h-36", "h-44", "h-32"];
                  const colors = ["text-[#C0C0C0]", "text-warning", "text-[#CD7F32]"];
                  return (
                    <motion.div 
                      key={college.rank} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: i * 0.1 }}
                      className={`flex flex-col items-center justify-end ${heights[i]}`}
                    >
                      <div className="relative">
                        <div className={`absolute inset-0 blur-xl rounded-full ${i === 1 ? "bg-warning/30" : "bg-muted/20"}`} />
                        <Icon size={36} className={`relative ${colors[i]} mb-2`} />
                      </div>
                      <div className="font-display font-bold text-lg text-center">{college.name}</div>
                      <div className="text-xs text-muted-foreground mb-1">{college.players} warriors</div>
                      <div className="text-sm font-bold text-primary">{college.avgElo} Avg ELO</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Rankings Table - Colleges */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-border overflow-hidden bg-card/30"
              >
                <div className="grid grid-cols-12 gap-4 p-4 bg-muted/30 text-sm font-semibold text-muted-foreground border-b border-border">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-4">College</div>
                  <div className="col-span-2 text-right">Players</div>
                  <div className="col-span-2 text-right">Avg ELO</div>
                  <div className="col-span-3 text-right">Total Wins</div>
                </div>
                {collegeLeaders.map((college, i) => (
                  <motion.div 
                    key={college.rank} 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="grid grid-cols-12 gap-4 items-center p-4 border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <div className="col-span-1">
                      <span className={`font-display font-bold text-xl ${college.rank <= 3 ? "text-warning" : "text-muted-foreground"}`}>
                        #{college.rank}
                      </span>
                    </div>
                    <div className="col-span-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap size={16} className="text-primary" />
                        <span className="font-semibold">{college.name}</span>
                      </div>
                    </div>
                    <div className="col-span-2 text-right text-muted-foreground">{college.players.toLocaleString()}</div>
                    <div className="col-span-2 text-right">
                      <span className="font-display font-bold text-primary">{college.avgElo}</span>
                    </div>
                    <div className="col-span-3 text-right text-muted-foreground">{college.totalWins.toLocaleString()}</div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Leaderboard;
