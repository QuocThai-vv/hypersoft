import { Link, useLocation } from "react-router-dom";
import { Home, Scissors, Calendar, User, BookOpenText } from "lucide-react";
import { cn } from "../utils/cn";

export const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Trang Chủ" },
    { path: "/services", icon: Scissors, label: "Dịch Vụ" },
    { path: "/booking", icon: Calendar, label: "Đặt Lịch", isCTA: true },
    { path: "/blog", icon: BookOpenText, label: "Bài Viết" },
    { path: "/dashboard", icon: User, label: "Tôi" },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}
    >
      <div className="px-3 pb-2 pt-1">
        <div className="glass-strong rounded-3xl border border-white/[0.07] shadow-lift">
          <div className="flex items-stretch px-1.5 py-1.5 max-w-md mx-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              if (item.isCTA) {
                return (
                  <Link key={item.path} to={item.path} className="flex-1 flex items-center justify-center">
                    <span className="relative -mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent via-accent-gold to-accent-burnt text-ink-base shadow-glow active:scale-95 transition">
                      <Icon className="h-6 w-6 stroke-[2.5]" />
                    </span>
                  </Link>
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[56px] rounded-2xl transition-all",
                    active
                      ? "text-accent-gold"
                      : "text-text-muted hover:text-text-secondary"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-xl transition",
                      active ? "bg-accent/15" : ""
                    )}
                  >
                    <Icon className={cn("h-5 w-5", active && "stroke-[2.2]")} />
                  </span>
                  <span className="text-[10.5px] font-medium leading-tight tracking-tight">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
