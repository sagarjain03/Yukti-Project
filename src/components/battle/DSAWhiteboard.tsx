import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Rect, Circle, Line, IText, Group } from "fabric";
import { motion } from "framer-motion";
import {
  Square,
  CircleDot,
  Link2,
  GitBranch,
  Trash2,
  Download,
  MousePointer,
  Pencil,
  Type,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

type Tool = "select" | "draw" | "text" | "array" | "linkedlist" | "tree" | "stack" | "queue";

interface DSANode {
  type: "array" | "linkedlist" | "tree" | "stack" | "queue";
  value: string;
}

const DSAWhiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [activeColor, setActiveColor] = useState("#00ffff");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const colors = [
    { name: "Cyan", value: "#00ffff" },
    { name: "Purple", value: "#a855f7" },
    { name: "Pink", value: "#ec4899" },
    { name: "Green", value: "#22c55e" },
    { name: "Orange", value: "#f97316" },
    { name: "White", value: "#ffffff" },
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 500,
      backgroundColor: "#0a0a0f",
      selection: true,
    });

    // Initialize freeDrawingBrush
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = activeColor;
      canvas.freeDrawingBrush.width = 2;
    }

    setFabricCanvas(canvas);

    // Add grid pattern
    const gridSize = 25;
    for (let i = 0; i <= canvas.width! / gridSize; i++) {
      const line = new Line([i * gridSize, 0, i * gridSize, canvas.height!], {
        stroke: "rgba(255,255,255,0.05)",
        selectable: false,
        evented: false,
      });
      canvas.add(line);
    }
    for (let i = 0; i <= canvas.height! / gridSize; i++) {
      const line = new Line([0, i * gridSize, canvas.width!, i * gridSize], {
        stroke: "rgba(255,255,255,0.05)",
        selectable: false,
        evented: false,
      });
      canvas.add(line);
    }

    canvas.renderAll();

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw";

    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = 2;
    }
  }, [activeTool, activeColor, fabricCanvas]);

  const createArrayBlock = (value: string = "0", x: number, y: number) => {
    if (!fabricCanvas) return;

    const rect = new Rect({
      width: 50,
      height: 50,
      fill: "transparent",
      stroke: activeColor,
      strokeWidth: 2,
      rx: 4,
      ry: 4,
    });

    const text = new IText(value, {
      fontSize: 18,
      fill: activeColor,
      fontFamily: "JetBrains Mono",
      originX: "center",
      originY: "center",
      left: 25,
      top: 25,
    });

    const group = new Group([rect, text], {
      left: x,
      top: y,
    });

    fabricCanvas.add(group);
    fabricCanvas.setActiveObject(group);
    fabricCanvas.renderAll();
  };

  const createLinkedListNode = (value: string = "0", x: number, y: number) => {
    if (!fabricCanvas) return;

    // Node circle
    const circle = new Circle({
      radius: 25,
      fill: "transparent",
      stroke: activeColor,
      strokeWidth: 2,
    });

    const text = new IText(value, {
      fontSize: 16,
      fill: activeColor,
      fontFamily: "JetBrains Mono",
      originX: "center",
      originY: "center",
      left: 25,
      top: 25,
    });

    // Arrow pointer
    const arrow = new Line([55, 25, 80, 25], {
      stroke: activeColor,
      strokeWidth: 2,
    });

    const arrowHead = new Rect({
      width: 8,
      height: 8,
      fill: activeColor,
      angle: 45,
      left: 76,
      top: 21,
    });

    const group = new Group([circle, text, arrow, arrowHead], {
      left: x,
      top: y,
    });

    fabricCanvas.add(group);
    fabricCanvas.setActiveObject(group);
    fabricCanvas.renderAll();
  };

  const createTreeNode = (value: string = "0", x: number, y: number) => {
    if (!fabricCanvas) return;

    const circle = new Circle({
      radius: 25,
      fill: "transparent",
      stroke: activeColor,
      strokeWidth: 2,
    });

    const text = new IText(value, {
      fontSize: 16,
      fill: activeColor,
      fontFamily: "JetBrains Mono",
      originX: "center",
      originY: "center",
      left: 25,
      top: 25,
    });

    // Left branch
    const leftLine = new Line([10, 50, -15, 80], {
      stroke: activeColor,
      strokeWidth: 2,
    });

    // Right branch
    const rightLine = new Line([40, 50, 65, 80], {
      stroke: activeColor,
      strokeWidth: 2,
    });

    const group = new Group([circle, text, leftLine, rightLine], {
      left: x,
      top: y,
    });

    fabricCanvas.add(group);
    fabricCanvas.setActiveObject(group);
    fabricCanvas.renderAll();
  };

  const createStackBlock = (x: number, y: number) => {
    if (!fabricCanvas) return;

    const blocks: any[] = [];
    const labels = ["TOP", "1", "2", "..."];

    labels.forEach((label, i) => {
      const rect = new Rect({
        width: 60,
        height: 30,
        fill: i === 0 ? activeColor + "20" : "transparent",
        stroke: activeColor,
        strokeWidth: 2,
        top: i * 35,
      });

      const text = new IText(label, {
        fontSize: 14,
        fill: activeColor,
        fontFamily: "JetBrains Mono",
        originX: "center",
        originY: "center",
        left: 30,
        top: i * 35 + 15,
      });

      blocks.push(rect, text);
    });

    const group = new Group(blocks, {
      left: x,
      top: y,
    });

    fabricCanvas.add(group);
    fabricCanvas.setActiveObject(group);
    fabricCanvas.renderAll();
  };

  const createQueueBlock = (x: number, y: number) => {
    if (!fabricCanvas) return;

    const blocks: any[] = [];
    const labels = ["FRONT", "1", "2", "REAR"];

    labels.forEach((label, i) => {
      const rect = new Rect({
        width: 50,
        height: 40,
        fill: i === 0 || i === 3 ? activeColor + "20" : "transparent",
        stroke: activeColor,
        strokeWidth: 2,
        left: i * 55,
      });

      const text = new IText(label, {
        fontSize: i === 0 || i === 3 ? 10 : 14,
        fill: activeColor,
        fontFamily: "JetBrains Mono",
        originX: "center",
        originY: "center",
        left: i * 55 + 25,
        top: 20,
      });

      blocks.push(rect, text);
    });

    // Arrow for flow direction
    const arrow = new Line([220, 20, 250, 20], {
      stroke: activeColor,
      strokeWidth: 2,
    });

    blocks.push(arrow);

    const group = new Group(blocks, {
      left: x,
      top: y,
    });

    fabricCanvas.add(group);
    fabricCanvas.setActiveObject(group);
    fabricCanvas.renderAll();
  };

  const handleToolClick = (tool: Tool) => {
    setActiveTool(tool);

    if (!fabricCanvas) return;

    const centerX = fabricCanvas.width! / 2 - 50;
    const centerY = fabricCanvas.height! / 2 - 25;

    switch (tool) {
      case "array":
        // Create array of 5 blocks
        for (let i = 0; i < 5; i++) {
          createArrayBlock(String(i), centerX - 100 + i * 55, centerY);
        }
        toast.success("Array created! Double-click to edit values.");
        break;
      case "linkedlist":
        createLinkedListNode("1", centerX - 100, centerY);
        createLinkedListNode("2", centerX, centerY);
        createLinkedListNode("3", centerX + 100, centerY);
        toast.success("Linked list nodes created! Drag to connect.");
        break;
      case "tree":
        createTreeNode("1", centerX, centerY - 50);
        createTreeNode("2", centerX - 80, centerY + 50);
        createTreeNode("3", centerX + 80, centerY + 50);
        toast.success("Binary tree nodes created!");
        break;
      case "stack":
        createStackBlock(centerX, centerY - 50);
        toast.success("Stack visualization created!");
        break;
      case "queue":
        createQueueBlock(centerX - 100, centerY);
        toast.success("Queue visualization created!");
        break;
    }

    if (tool !== "select" && tool !== "draw" && tool !== "text") {
      setActiveTool("select");
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#0a0a0f";

    // Re-add grid
    const gridSize = 25;
    for (let i = 0; i <= fabricCanvas.width! / gridSize; i++) {
      const line = new Line([i * gridSize, 0, i * gridSize, fabricCanvas.height!], {
        stroke: "rgba(255,255,255,0.05)",
        selectable: false,
        evented: false,
      });
      fabricCanvas.add(line);
    }
    for (let i = 0; i <= fabricCanvas.height! / gridSize; i++) {
      const line = new Line([0, i * gridSize, fabricCanvas.width!, i * gridSize], {
        stroke: "rgba(255,255,255,0.05)",
        selectable: false,
        evented: false,
      });
      fabricCanvas.add(line);
    }

    fabricCanvas.renderAll();
    toast.success("Canvas cleared!");
  };

  const handleExport = () => {
    if (!fabricCanvas) return;
    const dataURL = fabricCanvas.toDataURL({ format: "png", multiplier: 2 });
    const link = document.createElement("a");
    link.download = "dsa-whiteboard.png";
    link.href = dataURL;
    link.click();
    toast.success("Whiteboard exported!");
  };

  const addText = () => {
    if (!fabricCanvas) return;
    const text = new IText("Double-click to edit", {
      left: fabricCanvas.width! / 2 - 80,
      top: fabricCanvas.height! / 2,
      fontSize: 18,
      fill: activeColor,
      fontFamily: "Rajdhani",
    });
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    fabricCanvas.renderAll();
  };

  const tools = [
    { id: "select", icon: MousePointer, label: "Select" },
    { id: "draw", icon: Pencil, label: "Draw" },
    { id: "text", icon: Type, label: "Text", action: addText },
  ];

  const dsaTools = [
    { id: "array", icon: Square, label: "Array" },
    { id: "linkedlist", icon: Link2, label: "Linked List" },
    { id: "tree", icon: GitBranch, label: "Binary Tree" },
    { id: "stack", icon: Square, label: "Stack" },
    { id: "queue", icon: Square, label: "Queue" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg">DSA Whiteboard</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleExport}>
            <Download size={18} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleClear}>
            <Trash2 size={18} />
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Basic Tools */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Tooltip key={tool.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTool === tool.id ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => tool.action ? tool.action() : handleToolClick(tool.id as Tool)}
                    className="h-9 w-9"
                  >
                    <Icon size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{tool.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        <div className="w-px h-8 bg-border" />

        {/* DSA Tools */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50">
          {dsaTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Tooltip key={tool.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToolClick(tool.id as Tool)}
                    className="h-9 px-3 gap-2"
                  >
                    <Icon size={16} />
                    <span className="text-xs hidden sm:inline">{tool.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{tool.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        <div className="w-px h-8 bg-border" />

        {/* Colors */}
        <div className="flex items-center gap-1">
          {colors.map((color) => (
            <Tooltip key={color.value}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setActiveColor(color.value)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    activeColor === color.value
                      ? "border-foreground scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              </TooltipTrigger>
              <TooltipContent>{color.name}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="border border-border/50 rounded-xl overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Click DSA tools to add data structures • Double-click text to edit • Drag to move
      </p>
    </motion.div>
  );
};

export default DSAWhiteboard;
