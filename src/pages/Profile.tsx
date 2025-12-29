import { motion } from "framer-motion";
import { Trophy, Target, Flame, Clock, TrendingUp, Swords, Award } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import AnimatedCard from "@/components/common/AnimatedCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, Cell, PieChart, Pie } from "recharts";

const eloHistory = [
  { month: "Jul", elo: 1200 },
  { month: "Aug", elo: 1450 },
  { month: "Sep", elo: 1380 },
  { month: "Oct", elo: 1650 },
  { month: "Nov", elo: 1890 },
  { month: "Dec", elo: 2100 },
  { month: "Jan", elo: 2350 },
  { month: "Feb", elo: 2500 },
  { month: "Mar", elo: 2650 },
  { month: "Apr", elo: 2847 },
];

const skillRadar = [
  { skill: "Arrays", value: 92, fullMark: 100 },
  { skill: "Trees", value: 78, fullMark: 100 },
  { skill: "Graphs", value: 85, fullMark: 100 },
  { skill: "DP", value: 70, fullMark: 100 },
  { skill: "Strings", value: 88, fullMark: 100 },
  { skill: "Math", value: 75, fullMark: 100 },
];

const difficultyData = [
  { name: "Easy", solved: 156, color: "hsl(var(--success))" },
  { name: "Medium", solved: 98, color: "hsl(var(--warning))" },
  { name: "Hard", solved: 42, color: "hsl(var(--destructive))" },
];

const winRateData = [
  { name: "Wins", value: 127, color: "hsl(var(--primary))" },
  { name: "Losses", value: 45, color: "hsl(var(--muted))" },
];

const Profile = () => {
  const stats = [
    { icon: Trophy, label: "Total Wins", value: "127", color: "text-warning" },
    { icon: Target, label: "Accuracy", value: "73%", color: "text-success" },
    { icon: Flame, label: "Win Streak", value: "12", color: "text-destructive" },
    { icon: Clock, label: "Avg Time", value: "8:32", color: "text-primary" },
    { icon: Swords, label: "Battles", value: "172", color: "text-secondary" },
    { icon: Award, label: "Rank", value: "#1", color: "text-warning" },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-display font-bold">
              CN
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">CodeNinja_42</h1>
              <p className="text-muted-foreground">IIT Delhi • Joined Jan 2024</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold">2847 ELO</span>
                <span className="px-3 py-1 rounded-full bg-warning/20 text-warning text-sm font-bold">Rank #1</span>
                <span className="px-3 py-1 rounded-full bg-success/20 text-success text-sm font-bold flex items-center gap-1">
                  <TrendingUp size={14} /> +547 this month
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <AnimatedCard key={stat.label} delay={i * 0.05} glow="cyan" className="text-center">
                  <Icon size={24} className={stat.color} />
                  <div className="font-display text-2xl font-bold mt-2">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </AnimatedCard>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* ELO History Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-card/50 border border-border"
            >
              <h3 className="font-display text-lg font-bold mb-4">ELO Progression</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={eloHistory}>
                    <defs>
                      <linearGradient id="eloGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[1000, 3000]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="elo" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      fill="url(#eloGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Skills Radar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-card/50 border border-border"
            >
              <h3 className="font-display text-lg font-bold mb-4">Skill Breakdown</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillRadar}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                    <Radar
                      name="Skills"
                      dataKey="value"
                      stroke="hsl(var(--secondary))"
                      fill="hsl(var(--secondary))"
                      fillOpacity={0.4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Difficulty Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-card/50 border border-border"
            >
              <h3 className="font-display text-lg font-bold mb-4">Problems by Difficulty</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={difficultyData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={60} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="solved" radius={[0, 4, 4, 0]}>
                      {difficultyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Win Rate Pie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-card/50 border border-border"
            >
              <h3 className="font-display text-lg font-bold mb-4">Win Rate</h3>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={winRateData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {winRateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute text-center">
                  <div className="font-display text-3xl font-bold text-primary">73%</div>
                  <div className="text-xs text-muted-foreground">Win Rate</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Battles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="font-display text-xl font-bold mb-4">Recent Battles</h2>
            <div className="space-y-3">
              {[
                { result: "WIN", opponent: "AlgoMaster", problem: "Two Sum", elo: "+24", time: "2h ago" },
                { result: "WIN", opponent: "ByteWarrior", problem: "Valid Parentheses", elo: "+18", time: "5h ago" },
                { result: "LOSS", opponent: "DSA_King", problem: "Merge Intervals", elo: "-15", time: "1d ago" },
                { result: "WIN", opponent: "RecursiveQueen", problem: "Binary Tree Level Order", elo: "+32", time: "1d ago" },
              ].map((battle, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border hover:bg-card/80 transition-colors"
                >
                  <span className={`font-bold text-sm px-2 py-1 rounded ${battle.result === "WIN" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}>
                    {battle.result}
                  </span>
                  <span className="flex-1 font-medium">vs {battle.opponent}</span>
                  <span className="text-muted-foreground">{battle.problem}</span>
                  <span className={`font-bold ${battle.elo.startsWith("+") ? "text-success" : "text-destructive"}`}>
                    {battle.elo}
                  </span>
                  <span className="text-xs text-muted-foreground">{battle.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Profile;
