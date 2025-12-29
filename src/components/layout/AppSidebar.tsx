import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Swords,
  Trophy,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Crown,
  Target,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/common/Logo";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Swords, label: "Battle Arena", href: "/lobby" },
  { icon: Gamepad2, label: "Active Battle", href: "/battle" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
  { icon: User, label: "Profile", href: "/profile" },
];

const secondaryNavItems: NavItem[] = [
  { icon: Settings, label: "Settings", href: "/settings" },
];

const AppSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  const NavLink = ({ item }: { item: NavItem }) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    return (
      <Link
        to={item.href}
        onClick={() => setIsMobileOpen(false)}
        className={cn(
          "group relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300",
          "hover:bg-primary/10",
          active && "bg-primary/20 border border-primary/30"
        )}
      >
        {/* Glow effect for active */}
        {active && (
          <motion.div
            layoutId="activeGlow"
            className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/40"
            style={{ boxShadow: "0 0 20px hsl(180 100% 50% / 0.2)" }}
          />
        )}

        <Icon
          size={22}
          className={cn(
            "relative z-10 transition-colors duration-300",
            active ? "text-primary" : "text-muted-foreground group-hover:text-primary"
          )}
        />

        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className={cn(
                "relative z-10 font-medium whitespace-nowrap overflow-hidden",
                active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Active indicator bar */}
        {active && (
          <motion.div
            layoutId="activeBar"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"
            style={{ boxShadow: "0 0 10px hsl(180 100% 50% / 0.8)" }}
          />
        )}
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-border/50">
        <Link to="/" className="flex items-center gap-3" onClick={() => setIsMobileOpen(false)}>
          <div className="relative">
            <Target size={32} className="text-primary" />
            <div className="absolute inset-0 blur-md bg-primary/50" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <span className="font-display text-xl font-bold text-gradient-cyan">
                  CodeAkhada
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <div className="mb-4">
          {isExpanded && (
            <span className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              Main Menu
            </span>
          )}
        </div>
        {mainNavItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      {/* Secondary Navigation */}
      <div className="p-3 border-t border-border/50">
        {secondaryNavItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}

        {/* Sign Out */}
        <button
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300",
            "text-destructive/70 hover:text-destructive hover:bg-destructive/10"
          )}
        >
          <LogOut size={22} />
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-medium whitespace-nowrap overflow-hidden"
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse Toggle - Desktop Only */}
      <div className="hidden md:block p-3 border-t border-border/50">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronLeft size={18} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Collapse</span>
            </>
          ) : (
            <ChevronRight size={18} className="text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Stats Card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 border-t border-border/50"
          >
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Crown size={16} className="text-warning" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Rank
                </span>
              </div>
              <div className="text-2xl font-display font-bold text-foreground">#127</div>
              <div className="text-sm text-muted-foreground">ELO: 1,847</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-muted transition-colors"
      >
        <Menu size={24} className="text-foreground" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="md:hidden fixed top-0 left-0 z-50 h-full w-72 bg-sidebar border-r border-sidebar-border"
          >
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X size={20} className="text-muted-foreground" />
            </button>
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isExpanded ? 280 : 80 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="hidden md:flex flex-col h-screen bg-sidebar border-r border-sidebar-border sticky top-0"
      >
        <SidebarContent />
      </motion.aside>
    </>
  );
};

export default AppSidebar;
