import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  MessageSquare,
  Palette,
  ChevronDown,
  ChevronUp,
  Zap,
  Trophy,
} from "lucide-react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import GlowButton from "@/components/common/GlowButton";
import BattleChat from "@/components/battle/BattleChat";
import DSAWhiteboard from "@/components/battle/DSAWhiteboard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const problemData = {
  title: "Two Sum",
  difficulty: "Easy",
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "",
    },
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists.",
  ],
};

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
];

const Arena = () => {
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Your code here
    
}`);
  const [language, setLanguage] = useState("javascript");
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string }[]>([]);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [showChat, setShowChat] = useState(true);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const runCode = () => {
    setIsRunning(true);
    toast.loading("Running tests...");

    // Simulate code execution
    setTimeout(() => {
      setTestResults([
        { passed: true, output: "[0,1]" },
        { passed: true, output: "[1,2]" },
        { passed: false, output: "Time Limit Exceeded" },
      ]);
      setIsRunning(false);
      toast.dismiss();
      toast.warning("2/3 test cases passed");
    }, 2000);
  };

  const submitCode = () => {
    setIsRunning(true);
    toast.loading("Submitting solution...");

    setTimeout(() => {
      setIsRunning(false);
      toast.dismiss();
      toast.success("Solution accepted! You won the battle!");
    }, 3000);
  };

  return (
    <SidebarLayout>
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-primary" />
              <span className="font-display font-bold">1v1 Duel</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <Users size={16} />
              <span>vs</span>
              <span className="font-semibold text-foreground">CodeNinja_42</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold ${
                timeRemaining < 300
                  ? "bg-destructive/20 text-destructive"
                  : "bg-muted/50 text-foreground"
              }`}
            >
              <Clock size={18} />
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Problem */}
          <div className="w-full md:w-1/3 border-r border-border/50 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Problem Header */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-display text-2xl font-bold">
                    {problemData.title}
                  </h1>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-success/20 text-success">
                    {problemData.difficulty}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-muted-foreground whitespace-pre-line">
                  {problemData.description}
                </p>
              </div>

              {/* Examples */}
              <div className="space-y-4">
                <h3 className="font-semibold">Examples</h3>
                {problemData.examples.map((example, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-muted/30 border border-border/50"
                  >
                    <div className="space-y-2 font-mono text-sm">
                      <div>
                        <span className="text-muted-foreground">Input: </span>
                        <span className="text-primary">{example.input}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Output: </span>
                        <span className="text-success">{example.output}</span>
                      </div>
                      {example.explanation && (
                        <div className="text-muted-foreground text-xs mt-2">
                          {example.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="space-y-2">
                <h3 className="font-semibold">Constraints</h3>
                <ul className="space-y-1">
                  {problemData.constraints.map((constraint, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground font-mono"
                    >
                      • {constraint}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Panel - Code Editor & Tools */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-card/30">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-36 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowWhiteboard(!showWhiteboard)}
                  className={showWhiteboard ? "bg-primary/20" : ""}
                >
                  <Palette size={16} className="mr-2" />
                  Whiteboard
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChat(!showChat)}
                  className={showChat ? "bg-primary/20" : ""}
                >
                  <MessageSquare size={16} className="mr-2" />
                  Chat
                </Button>
              </div>
            </div>

            {/* Editor + Panels */}
            <div className="flex-1 flex overflow-hidden">
              {/* Code Area */}
              <div className="flex-1 flex flex-col">
                {/* Code Editor */}
                <div className="flex-1 p-4">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full bg-muted/30 rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border/50"
                    spellCheck={false}
                  />
                </div>

                {/* Test Results */}
                {testResults.length > 0 && (
                  <div className="border-t border-border/50 p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      Test Results
                      <span className="text-sm font-normal text-muted-foreground">
                        ({testResults.filter((r) => r.passed).length}/{testResults.length} passed)
                      </span>
                    </h4>
                    <div className="flex gap-2">
                      {testResults.map((result, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                            result.passed
                              ? "bg-success/20 text-success"
                              : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {result.passed ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <XCircle size={16} />
                          )}
                          Case {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 bg-card/30">
                  <Button variant="outline" onClick={runCode} disabled={isRunning}>
                    <Play size={16} className="mr-2" />
                    Run Code
                  </Button>
                  <GlowButton
                    variant="primary"
                    onClick={submitCode}
                    disabled={isRunning}
                  >
                    <Trophy size={16} className="mr-2" />
                    Submit Solution
                  </GlowButton>
                </div>
              </div>

              {/* Side Panels */}
              {(showWhiteboard || showChat) && (
                <div className="w-80 border-l border-border/50 overflow-y-auto p-4 space-y-4">
                  {showWhiteboard && <DSAWhiteboard />}
                  {showChat && <BattleChat />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Arena;
