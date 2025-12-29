import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Smile, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  isSystem?: boolean;
}

const BattleChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "System",
      text: "Battle started! Good luck, coders!",
      timestamp: new Date(),
      isSystem: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      user: "You",
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate opponent response
    setTimeout(() => {
      const responses = [
        "Nice approach!",
        "I'm thinking recursion...",
        "This is tricky!",
        "Almost got it!",
        "What's the time complexity here?",
      ];
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          user: "Opponent",
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
        },
      ]);
    }, 2000 + Math.random() * 3000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl overflow-hidden flex flex-col"
      style={{ height: isMinimized ? "auto" : "350px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <h3 className="font-semibold text-sm">Battle Chat</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
        </Button>
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${
                    message.isSystem
                      ? "text-center"
                      : message.user === "You"
                      ? "text-right"
                      : ""
                  }`}
                >
                  {message.isSystem ? (
                    <span className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                      {message.text}
                    </span>
                  ) : (
                    <div
                      className={`inline-block max-w-[80%] ${
                        message.user === "You" ? "text-right" : ""
                      }`}
                    >
                      <div className="text-xs text-muted-foreground mb-1">
                        {message.user} • {formatTime(message.timestamp)}
                      </div>
                      <div
                        className={`px-4 py-2 rounded-2xl text-sm ${
                          message.user === "You"
                            ? "bg-primary/20 text-foreground rounded-br-md"
                            : "bg-muted/50 text-foreground rounded-bl-md"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 h-10"
                />
                <Button
                  size="icon"
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="h-10 w-10"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BattleChat;
