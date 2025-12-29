import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Trophy, Gamepad2, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import Logo from "@/components/common/Logo";
import GlowButton from "@/components/common/GlowButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/lobby", label: "Play", icon: Gamepad2 },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/profile", label: "Profile", icon: User },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-xl border-b border-border/50" />
      
      <nav className="relative container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              const Icon = link.icon;
              
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "relative flex items-center gap-2 font-semibold text-sm uppercase tracking-wider transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon size={16} />
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <GlowButton variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut size={16} />
                  Sign Out
                </GlowButton>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <GlowButton variant="outline" size="sm">
                    Sign In
                  </GlowButton>
                </Link>
                <Link to="/auth">
                  <GlowButton variant="primary" size="sm">
                    Join Battle
                  </GlowButton>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 p-2 text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-6 pb-4 space-y-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 text-foreground font-semibold"
                    >
                      <Icon size={20} className="text-primary" />
                      {link.label}
                    </Link>
                  );
                })}
                <div className="flex gap-3 pt-4">
                  {user ? (
                    <GlowButton variant="outline" size="sm" className="flex-1" onClick={handleSignOut}>
                      <LogOut size={16} />
                      Sign Out
                    </GlowButton>
                  ) : (
                    <>
                      <Link to="/auth" className="flex-1">
                        <GlowButton variant="outline" size="sm" className="w-full">
                          Sign In
                        </GlowButton>
                      </Link>
                      <Link to="/auth" className="flex-1">
                        <GlowButton variant="primary" size="sm" className="w-full">
                          Join Battle
                        </GlowButton>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
