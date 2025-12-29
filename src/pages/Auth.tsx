import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff, Github, GraduationCap, IdCard, ChevronDown } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Logo from "@/components/common/Logo";
import GlowButton from "@/components/common/GlowButton";
import { INDIAN_COLLEGES } from "@/data/colleges";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = loginSchema.extend({
  username: z.string().trim().min(3, { message: "Username must be at least 3 characters" }).max(20),
  college: z.string().optional(),
  collegeId: z.string().optional(),
});

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [collegeDropdownOpen, setCollegeDropdownOpen] = useState(false);
  const [collegeSearch, setCollegeSearch] = useState("");
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "", 
    username: "",
    college: "",
    collegeId: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredColleges = INDIAN_COLLEGES.filter(c => 
    c.name.toLowerCase().includes(collegeSearch.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const selectCollege = (collegeId: string, collegeName: string) => {
    setFormData((prev) => ({ ...prev, college: collegeId }));
    setCollegeSearch(collegeName);
    setCollegeDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const schema = isLogin ? loginSchema : signupSchema;
      schema.parse(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) newErrors[e.path[0] as string] = e.message;
        });
        setErrors(newErrors);
        return;
      }
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        toast.success("Welcome back, warrior!");
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { 
              username: formData.username,
              college: formData.college,
              college_id: formData.collegeId
            },
          },
        });
        if (error) throw error;
        toast.success("Account created! Entering the arena...");
        navigate("/");
      }
    } catch (error: any) {
      if (error.message.includes("User already registered")) {
        setErrors({ email: "This email is already registered" });
      } else if (error.message.includes("Invalid login credentials")) {
        toast.error("Invalid email or password");
      } else {
        toast.error(error.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "github" | "google") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/` },
    });
    if (error) toast.error(error.message);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="mb-8">
            <Logo size="lg" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                {isLogin ? (
                  <>
                    <span className="text-foreground">Welcome </span>
                    <span className="text-gradient-cyan">Back</span>
                  </>
                ) : (
                  <>
                    <span className="text-foreground">Join </span>
                    <span className="text-gradient-purple">YUKTI</span>
                  </>
                )}
              </h1>
              <p className="text-muted-foreground mb-8">
                {isLogin ? "Enter your credentials to continue" : "Create your warrior profile"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    {/* Username */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Username</label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="CodeNinja_42"
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                      </div>
                      {errors.username && <p className="text-destructive text-sm mt-1">{errors.username}</p>}
                    </div>

                    {/* College Dropdown */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        College <span className="text-muted-foreground font-normal">(optional)</span>
                      </label>
                      <div className="relative">
                        <GraduationCap size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
                        <input
                          type="text"
                          value={collegeSearch}
                          onChange={(e) => {
                            setCollegeSearch(e.target.value);
                            setCollegeDropdownOpen(true);
                          }}
                          onFocus={() => setCollegeDropdownOpen(true)}
                          placeholder="Search your college..."
                          className="w-full pl-12 pr-10 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                        <ChevronDown 
                          size={18} 
                          className={`absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-transform ${collegeDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                      
                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {collegeDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-50 w-full mt-2 py-2 rounded-xl bg-card border border-border shadow-xl max-h-60 overflow-y-auto"
                          >
                            {filteredColleges.length > 0 ? (
                              filteredColleges.map((college) => (
                                <button
                                  key={college.id}
                                  type="button"
                                  onClick={() => selectCollege(college.id, college.name)}
                                  className="w-full px-4 py-2.5 text-left hover:bg-muted/50 text-foreground text-sm transition-colors"
                                >
                                  {college.name}
                                </button>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-muted-foreground text-sm">No colleges found</div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* College ID */}
                    {formData.college && formData.college !== "other" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          College ID <span className="text-muted-foreground font-normal">(for verification)</span>
                        </label>
                        <div className="relative">
                          <IdCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="text"
                            name="collegeId"
                            value={formData.collegeId}
                            onChange={handleChange}
                            placeholder="Enter your college ID"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          This helps verify your college affiliation for College Wars
                        </p>
                      </motion.div>
                    )}
                  </>
                )}

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="warrior@yukti.arena"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
                </div>

                <GlowButton type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      {isLogin ? "Enter Arena" : "Create Account"}
                      <ArrowRight size={18} />
                    </>
                  )}
                </GlowButton>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-background text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleOAuth("github")}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-card/50 hover:bg-card text-foreground font-semibold transition-all"
                  >
                    <Github size={18} />
                    GitHub
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOAuth("google")}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-card/50 hover:bg-card text-foreground font-semibold transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                </div>
              </div>

              <p className="mt-8 text-center text-muted-foreground">
                {isLogin ? "New to YUKTI? " : "Already a warrior? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-semibold hover:underline"
                >
                  {isLogin ? "Create account" : "Sign in"}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/20 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 text-center p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-8">
              <span className="font-display text-8xl font-bold text-gradient-cyan">⚡</span>
            </div>
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Battle <span className="text-gradient-fire">Awaits</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
              Join 50,000+ developers sharpening their skills through competitive coding battles.
            </p>

            <div className="mt-12 flex justify-center gap-8">
              {[
                { value: "1v1", label: "Duels" },
                { value: "5v5", label: "Squads" },
                { value: "10+", label: "Battle Royale" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="font-display text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
