import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Scissors, Sparkles } from "lucide-react";
import { useAppStore } from "../store";
import { cn } from "../utils/cn";

const navLinks = [
  { name: "Trang Chủ", path: "/" },
  { name: "Dịch Vụ", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Bài Viết", path: "/blog" },
  { name: "Đặt Lịch", path: "/booking" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn } = useAppStore();

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-base/80 via-ink-base/40 to-transparent pointer-events-none" />
      <div className="relative container pt-3 md:pt-5">
        <div className="glass-card rounded-2xl md:rounded-3xl px-4 md:px-6 py-3 md:py-3.5 flex items-center justify-between shadow-soft">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="relative inline-flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent via-accent-gold to-accent-burnt shadow-glow">
              <Scissors className="h-4.5 w-4.5 md:h-5 md:w-5 text-ink-base stroke-[2.5]" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg md:text-xl font-bold tracking-tight text-text-primary">
                Hyper<span className="text-gradient-luxury">soft</span>
              </span>
              <span className="hidden sm:flex items-center gap-1 text-[10px] text-text-muted uppercase tracking-[0.2em]">
                <Sparkles className="h-3 w-3" />
                Luxury Hair Studio
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                    active
                      ? "bg-white/[0.07] text-text-primary"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                  )}
                >
                  {link.name}
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-gradient-to-r from-accent-gold to-accent-burnt shadow-glow" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to={isLoggedIn ? "/dashboard" : "/login"}>
              <button className="px-4 py-2 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/[0.04] transition">
                {isLoggedIn ? "Hồ sơ" : "Đăng nhập"}
              </button>
            </Link>
            <Link to="/booking">
              <button className="px-5 py-2.5 min-h-[44px] rounded-2xl font-semibold text-ink-base bg-gradient-to-b from-accent to-accent-burnt shadow-[0_8px_28px_-8px_rgba(217,119,6,0.55)] hover:brightness-105 transition text-sm tracking-tight">
                Đặt lịch ngay
              </button>
            </Link>
          </div>

          <button
            aria-label="Open menu"
            className="lg:hidden p-2 rounded-xl text-text-primary hover:bg-white/[0.05] active:scale-95 transition"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-3 glass-card rounded-2xl animate-fade-up overflow-hidden">
            <div className="divide-y divide-white/5 p-2">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl transition",
                      active
                        ? "bg-white/[0.07] text-text-primary"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/[0.035]"
                    )}
                  >
                    <span className="text-sm font-medium">{link.name}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  </Link>
                );
              })}
            </div>
            <div className="p-3 space-y-2 border-t border-white/5">
              <Link to={isLoggedIn ? "/dashboard" : "/login"} onClick={() => setIsMenuOpen(false)} className="block">
                <button className="w-full py-3 rounded-xl border border-white/10 text-sm font-medium text-text-primary hover:bg-white/[0.04] transition">
                  {isLoggedIn ? "Tài khoản của tôi" : "Đăng nhập / Đăng ký"}
                </button>
              </Link>
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="block">
                <button className="w-full py-3 rounded-2xl font-semibold text-ink-base bg-gradient-to-b from-accent to-accent-burnt shadow-glow text-sm">
                  Đặt lịch ngay
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
