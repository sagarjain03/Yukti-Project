import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Play, User, CheckCircle } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import GlowButton from "@/components/common/GlowButton";

const Battle = () => {
  const [code, setCode] = useState("// Write your solution here\n\nfunction solve(arr) {\n  \n}");

  return (
    <PageLayout showFooter={false}>
      <div className="h-[calc(100vh-80px)] flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
          <div className="flex items-center gap-4">
            <span className="font-display text-sm text-muted-foreground">BATTLE #12847</span>
            <span className="px-3 py-1 rounded bg-warning/20 text-warning text-xs font-bold">MEDIUM</span>
          </div>
          <div className="flex items-center gap-2 text-2xl font-display font-bold text-primary">
            <Clock size={24} /> 14:32
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-success"><CheckCircle size={16} /> 3/5 tests</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid lg:grid-cols-3 gap-0">
          {/* Problem Panel */}
          <div className="border-r border-border p-6 overflow-auto bg-card/30">
            <h2 className="font-display text-xl font-bold mb-4 text-gradient-cyan">Two Sum</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Given an array of integers <code className="text-primary">nums</code> and an integer <code className="text-primary">target</code>, return indices of the two numbers such that they add up to target.
            </p>
            <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm">
              <div className="text-muted-foreground mb-2">Example:</div>
              <div>Input: nums = [2,7,11,15], target = 9</div>
              <div className="text-success">Output: [0,1]</div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
              <span className="text-xs font-semibold text-primary">JavaScript</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 p-4 bg-background font-mono text-sm resize-none focus:outline-none"
              spellCheck={false}
            />
            <div className="flex items-center justify-between p-4 border-t border-border bg-card/50">
              <GlowButton variant="outline" size="sm">Run Tests</GlowButton>
              <GlowButton variant="primary" size="sm"><Play size={16} /> Submit</GlowButton>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Battle;
