import { useState } from "react";
import {
  CalendarCheck,
  History,
  Gift,
  Ticket,
  Bookmark,
  Heart,
  LogOut,
  Edit3,
  Star,
  ChevronRight,
  Crown,
  Sparkles,
  Clock,
  Scissors,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Button } from "../components/Button";
import { useAppStore } from "../store";
import { services, stylists, vouchers, articles } from "../data/mockData";
import { formatVND, cn } from "../utils/cn";
import { ServiceCard } from "../components/ServiceCard";
import { Link } from "react-router-dom";

const nextTierGoal = 5000;

type TabId = "appointments" | "rewards" | "vouchers" | "saved" | "favorites";

const DashboardHeader = () => {
  const { user } = useAppStore();
  const points = user?.rewardPoints ?? 0;
  const progress = Math.min(100, (points / nextTierGoal) * 100);

  return (
    <div className="glass-card rounded-4xl p-5 md:p-8 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent/20 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent-gold/10 blur-[110px] pointer-events-none" />

      <div className="relative flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent via-accent-gold to-accent opacity-80 blur-sm" />
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"}
            alt={user?.name}
            className="relative w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-ink-surface"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
              Xin chào, {user?.name?.split(" ")[0] ?? "bạn"}
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-accent-gold/20 to-accent/20 border border-accent-gold/30 text-accent-gold text-xs font-semibold">
              <Crown className="w-3.5 h-3.5" />
              Thành viên Vàng
            </span>
          </div>
          <p className="text-text-secondary text-sm md:text-base mb-4">
            {user?.email} · {user?.phone}
          </p>

          <div className="glass rounded-3xl p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-gold" />
                <span className="text-text-secondary text-sm">Điểm thưởng</span>
              </div>
              <span className="text-xs text-text-muted">
                Còn {nextTierGoal - points} điểm để lên hạng Bạch Kim
              </span>
            </div>
            <div className="flex items-end justify-between mb-3">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-gradient-luxury tracking-tight">
                  {points.toLocaleString()}
                </div>
                <div className="text-xs text-text-muted mt-1">điểm</div>
              </div>
              <Button variant="secondary" size="sm" className="rounded-full">
                <Plus className="w-4 h-4" /> Đổi điểm
              </Button>
            </div>
            <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-gold via-accent to-accent-gold transition-all duration-1000 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 shimmer-luxury" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickStats = () => {
  const stats = [
    { label: "Lịch sắp tới", value: "2", icon: CalendarCheck, accent: "from-accent-gold/20 to-accent/10" },
    { label: "Đã hoàn thành", value: "18", icon: History, accent: "from-emerald-500/20 to-emerald-400/5" },
    { label: "Voucher khả dụng", value: vouchers.length.toString(), icon: Ticket, accent: "from-rose-400/20 to-amber-400/10" },
    { label: "Yêu thích", value: "2", icon: Heart, accent: "from-pink-400/20 to-rose-500/10" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <div
            key={idx}
            className="glass-card rounded-3xl p-4 md:p-5 group hover:-translate-y-0.5 transition-all duration-500"
          >
            <div
              className={cn(
                "w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mb-3 bg-gradient-to-br",
                s.accent
              )}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6 text-accent-gold" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-text-primary mb-0.5 tracking-tight">
              {s.value}
            </div>
            <div className="text-xs md:text-sm text-text-muted">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
};

const AppointmentsSection = () => {
  const upcoming = [
    {
      id: "bk-1021",
      date: "22/07/2026",
      time: "10:30",
      services: [services[1], services[4]],
      stylist: stylists[0],
      status: "upcoming",
      total: services[1].price + services[4].price,
    },
    {
      id: "bk-1040",
      date: "02/08/2026",
      time: "15:00",
      services: [services[2]],
      stylist: stylists[2],
      status: "upcoming",
      total: services[2].price,
    },
  ];

  const history = [
    {
      id: "bk-0998",
      date: "05/07/2026",
      time: "14:00",
      services: [services[0]],
      stylist: stylists[1],
      status: "completed",
      total: services[0].price,
      rating: 5,
    },
    {
      id: "bk-0950",
      date: "18/06/2026",
      time: "11:00",
      services: [services[3], services[5]],
      stylist: stylists[3],
      status: "completed",
      total: services[3].price + services[5].price,
      rating: 5,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4 md:mb-5">
          <h2 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-accent" /> Lịch hẹn sắp tới
          </h2>
          <Link to="/booking">
            <Button variant="ghost" size="sm" className="text-accent-gold">
              Đặt lịch mới <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {upcoming.map((a) => (
            <div
              key={a.id}
              className="glass-card rounded-3xl p-5 md:p-6 hover:-translate-y-0.5 hover:shadow-lift transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] md:text-xs font-semibold bg-emerald-500/15 border border-emerald-400/25 text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sắp đến
                </span>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 md:w-18 md:h-18 shrink-0 rounded-2xl bg-gradient-to-br from-accent/30 to-accent-gold/20 border border-accent-gold/30 flex flex-col items-center justify-center">
                  <div className="text-[11px] text-text-muted uppercase tracking-wider">
                    {a.date.split("/")[1]}/{a.date.split("/")[2].slice(-2)}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-text-primary leading-none mt-0.5">
                    {a.date.split("/")[0]}
                  </div>
                  <div className="text-xs text-accent-gold font-semibold mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {a.time}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-text-muted mb-1.5">Mã lịch hẹn</div>
                  <div className="text-sm font-bold text-text-primary tracking-wide mb-2">
                    #{a.id.toUpperCase()}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {a.services.map((sv) => (
                      <span
                        key={sv.id}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-text-secondary truncate max-w-[200px]"
                      >
                        <Scissors className="w-3 h-3 inline mr-1 -mt-0.5" />
                        {sv.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={a.stylist.avatar}
                    alt={a.stylist.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-accent-gold/30"
                  />
                  <div>
                    <div className="text-sm font-semibold text-text-primary">
                      {a.stylist.name}
                    </div>
                    <div className="text-xs text-text-muted flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent-gold fill-accent-gold" />
                      {a.stylist.rating} · {a.stylist.experienceYears} năm
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg md:text-xl font-bold text-gradient-luxury tracking-tight">
                    {formatVND(a.total)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 mt-5 pt-4 border-t border-dashed border-white/5">
                <Button variant="outline" size="sm" className="flex-1 rounded-2xl">
                  <Edit3 className="w-4 h-4" /> Đổi lịch
                </Button>
                <Button variant="secondary" size="sm" className="flex-1 rounded-2xl">
                  Hủy
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2 mb-4 md:mb-5">
          <History className="w-6 h-6 text-text-muted" /> Lịch sử đặt lịch
        </h2>
        <div className="glass-card rounded-3xl overflow-hidden divide-y divide-white/5">
          {history.map((a) => (
            <div
              key={a.id}
              className="p-5 md:p-6 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center shrink-0">
                  <div className="text-[10px] text-text-muted">{a.date.split("/")[1]}</div>
                  <div className="text-xl font-bold text-text-secondary leading-none">
                    {a.date.split("/")[0]}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-semibold text-text-primary text-sm md:text-base truncate">
                      {a.services.map((s) => s.name).join(", ")}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
                      <CheckCircleIcon /> Đã hoàn thành
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <img
                      src={a.stylist.avatar}
                      alt=""
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    {a.stylist.name} · {a.time} · {formatVND(a.total)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:shrink-0">
                <div className="flex items-center gap-1 mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < (a.rating ?? 0) ? "text-accent-gold fill-accent-gold" : "text-white/10"
                      )}
                    />
                  ))}
                </div>
                <Button variant="secondary" size="sm" className="rounded-2xl">
                  <Star className="w-4 h-4" /> Đánh giá
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" className="shrink-0">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14.59l-4.3-4.3 1.42-1.42L11 13.76l6.88-6.88 1.42 1.42L11 16.59z" />
  </svg>
);

const RewardsSection = () => {
  const { user } = useAppStore();
  const points = user?.rewardPoints ?? 0;
  const tiers = [
    { name: "Thành viên Bạc", min: 0, color: "from-gray-400/30 to-gray-500/10", border: "border-gray-400/30", text: "text-gray-300" },
    { name: "Thành viên Vàng", min: 2000, color: "from-accent-gold/30 to-accent/15", border: "border-accent-gold/40", text: "text-accent-gold", active: true },
    { name: "Thành viên Bạch Kim", min: 5000, color: "from-cyan-400/20 to-indigo-400/10", border: "border-cyan-300/25", text: "text-cyan-200" },
  ];

  const exchanges = [
    { pts: 500, gift: "Giảm 10% cho dịch vụ cắt tóc", badge: "Hot" },
    { pts: 1200, gift: "Gội đầu thảo dược MIỄN PHÍ", badge: "Save" },
    { pts: 2500, gift: "Voucher 200K cho nhuộm/uốn", badge: "Best" },
    { pts: 4000, gift: "Điều trị Keratin 1 buổi", badge: "Luxury" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((t, idx) => {
          const locked = points < t.min;
          return (
            <div
              key={idx}
              className={cn(
                "rounded-3xl p-5 md:p-6 relative overflow-hidden border transition-all duration-500",
                t.border,
                t.active ? "glass-card shadow-glow-gold" : "glass-card opacity-90"
              )}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40", t.color)} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Crown className={cn("w-7 h-7", t.text)} />
                  {t.active && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-text-secondary">
                      Hạng hiện tại
                    </span>
                  )}
                  {locked && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-text-muted">
                      {t.min.toLocaleString()} điểm
                    </span>
                  )}
                </div>
                <div className={cn("text-lg md:text-xl font-bold mb-2 tracking-tight", locked && "text-text-muted opacity-70", t.text)}>
                  {t.name}
                </div>
                <ul className="space-y-1.5 text-xs md:text-sm text-text-secondary">
                  <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-accent" /> Giảm {idx === 0 ? "3" : idx === 1 ? "8" : "15"}% toàn bộ dịch vụ</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-accent" /> Ưu tiên đặt lịch {idx >= 1 ? "24h" : "6h"}</li>
                  {idx >= 1 && <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-accent" /> Quà sinh nhật đặc biệt</li>}
                  {idx >= 2 && <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-accent" /> Dịch vụ chăm sóc tóc hàng tháng free</li>}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2 mb-4 md:mb-5">
          <Gift className="w-6 h-6 text-accent-gold" /> Đổi điểm thành ưu đãi
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {exchanges.map((ex, i) => {
            const ok = points >= ex.pts;
            return (
              <div
                key={i}
                className="glass-card rounded-3xl p-5 flex items-center gap-4 hover:-translate-y-0.5 transition-all duration-500"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center",
                  ok
                    ? "bg-gradient-to-br from-accent-gold/25 to-accent/15 border border-accent-gold/30"
                    : "bg-white/5 border border-white/10"
                )}>
                  <Gift className={cn("w-7 h-7", ok ? "text-accent-gold" : "text-text-muted")} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent-gold uppercase tracking-wider">
                      {ex.badge}
                    </span>
                    <span className="text-xs text-text-muted">{ex.pts.toLocaleString()} điểm</span>
                  </div>
                  <div className="text-sm md:text-base font-semibold text-text-primary mb-2 leading-snug">
                    {ex.gift}
                  </div>
                  <Button
                    size="sm"
                    variant={ok ? "primary" : "secondary"}
                    disabled={!ok}
                    className="rounded-2xl"
                  >
                    {ok ? "Đổi ngay" : "Thiếu điểm"}
                    {ok && <ChevronRight className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const VouchersSection = () => {
  return (
    <div className="space-y-5">
      <h2 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
        <Ticket className="w-6 h-6 text-accent" /> Voucher của bạn
      </h2>
      <div className="grid md:grid-cols-2 gap-5">
        {vouchers.map((v) => {
          const gold = v.tier === "gold";
          return (
            <div
              key={v.id}
              className={cn(
                "relative rounded-3xl overflow-hidden group hover:-translate-y-1 transition-all duration-500",
                gold ? "shadow-glow-gold" : "shadow-card"
              )}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br",
                gold
                  ? "from-accent-gold/30 via-accent/20 to-accent-burnt/25"
                  : "from-rose-400/20 via-white/5 to-amber-300/10"
              )} />
              <div className="absolute inset-0 noise opacity-[0.04]" />

              <div className="relative grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr]">
                <div className="flex flex-col items-center justify-center py-6 px-3 border-r border-dashed border-white/20 relative">
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-ink-canvas" />
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-ink-canvas" />
                  <div className={cn(
                    "text-2xl md:text-3xl font-extrabold tracking-tight",
                    gold ? "text-gradient-luxury" : "text-rose-200"
                  )}>
                    {v.discountValue}
                  </div>
                  <div className="text-[10px] md:text-xs text-text-muted uppercase tracking-[0.18em] mt-1">
                    {gold ? "GOLD" : "SILVER"}
                  </div>
                </div>
                <div className="p-5 md:p-6 relative">
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <div>
                      <div className="font-bold text-text-primary text-base md:text-lg tracking-tight mb-1">
                        {v.title}
                      </div>
                      <div className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-text-secondary font-mono tracking-wide">
                        {v.code}
                      </div>
                    </div>
                    <Ticket className={cn("w-5 h-5 md:w-6 md:h-6 shrink-0", gold ? "text-accent-gold" : "text-rose-200/80")} />
                  </div>
                  <div className="text-xs text-text-muted mb-4 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Hạn dùng: <span className="text-text-secondary">{v.expireDate}</span>
                  </div>
                  <Button size="sm" className="rounded-2xl w-full" variant={gold ? "primary" : "outline"}>
                    <Gift className="w-4 h-4" /> Sử dụng ngay
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SavedArticlesSection = () => {
  const { savedArticleIds } = useAppStore();
  const list = articles.filter((a) => savedArticleIds.includes(a.id));

  if (list.length === 0) {
    return (
      <EmptyState
        icon={<Bookmark className="w-10 h-10 text-text-muted" />}
        title="Chưa có bài viết đã lưu"
        hint="Khám phá blog làm đẹp của chúng tôi để cập nhật xu hướng và mẹo chăm sóc tóc."
        ctaLink="/blog"
        ctaLabel="Xem blog"
      />
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
        <Bookmark className="w-6 h-6 text-accent-gold fill-accent-gold/30" /> Bài viết đã lưu
      </h2>
      <div className="grid md:grid-cols-2 gap-5">
        {list.map((a) => (
          <Link
            key={a.id}
            to={`/blog/${a.slug}`}
            className="glass-card rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-500 group"
          >
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 relative overflow-hidden aspect-[4/3] md:aspect-auto">
                <img
                  src={a.cover}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink-canvas via-transparent to-transparent" />
              </div>
              <div className="md:col-span-3 p-5 md:p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-accent/15 border border-accent/25 text-accent-gold font-semibold uppercase tracking-wider">
                    {a.category}
                  </span>
                  <span className="text-xs text-text-muted">{a.readMinutes} phút đọc</span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-text-primary mb-2 leading-snug group-hover:text-accent-gold transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
                  {a.excerpt}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <img
                      src={a.author.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-xs font-semibold text-text-primary">{a.author.name}</div>
                      <div className="text-[11px] text-text-muted">{a.publishedAt}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-accent-gold" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const FavoritesSection = () => {
  const { favoriteServiceIds } = useAppStore();
  const list = services.filter((s) => favoriteServiceIds.includes(s.id));

  if (list.length === 0) {
    return (
      <EmptyState
        icon={<Heart className="w-10 h-10 text-text-muted" />}
        title="Chưa có dịch vụ yêu thích"
        hint="Thêm các dịch vụ bạn yêu thích để đặt lại nhanh chóng sau này."
        ctaLink="/services"
        ctaLabel="Xem dịch vụ"
      />
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
        <Heart className="w-6 h-6 text-rose-400 fill-rose-400/40" /> Dịch vụ yêu thích
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </div>
  );
};

const EmptyState = ({
  icon,
  title,
  hint,
  ctaLink,
  ctaLabel,
}: {
  icon: React.ReactNode;
  title: string;
  hint: string;
  ctaLink: string;
  ctaLabel: string;
}) => (
  <div className="glass-card rounded-4xl p-10 md:p-14 text-center">
    <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
      {icon}
    </div>
    <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3 tracking-tight">{title}</h3>
    <p className="text-text-secondary max-w-md mx-auto mb-7">{hint}</p>
    <Link to={ctaLink}>
      <Button>
        {ctaLabel} <ArrowRight className="w-4 h-4" />
      </Button>
    </Link>
  </div>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("appointments");
  const { setIsLoggedIn, setUser } = useAppStore();

  const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "appointments", label: "Lịch hẹn", icon: CalendarCheck },
    { id: "rewards", label: "Điểm thưởng", icon: Gift },
    { id: "vouchers", label: "Voucher", icon: Ticket },
    { id: "saved", label: "Bài đã lưu", icon: Bookmark },
    { id: "favorites", label: "Yêu thích", icon: Heart },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="py-5 md:py-10 space-y-6 md:space-y-8 animate-fade-up">
      <DashboardHeader />
      <QuickStats />

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <aside className="lg:w-72 shrink-0">
          <div className="glass-card rounded-3xl p-3 lg:sticky lg:top-28 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all duration-300 group",
                    active
                      ? "bg-gradient-to-r from-accent/25 to-accent-gold/10 text-text-primary shadow-[0_0_0_1px_rgba(244,184,96,0.3)]"
                      : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                  )}
                >
                  <span
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all",
                      active
                        ? "bg-gradient-to-br from-accent to-accent-burnt text-ink-base shadow-glow"
                        : "bg-white/5 border border-white/10 group-hover:bg-white/[0.08]"
                    )}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </span>
                  <span className="text-sm md:text-base font-semibold flex-1">{tab.label}</span>
                  {active && <ChevronRight className="w-4 h-4 text-accent-gold" />}
                </button>
              );
            })}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 transition-all"
            >
              <span className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-500/10 border border-rose-400/15">
                <LogOut className="w-4.5 h-4.5" />
              </span>
              <span className="text-sm md:text-base font-semibold">Đăng xuất</span>
            </button>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {activeTab === "appointments" && <AppointmentsSection />}
          {activeTab === "rewards" && <RewardsSection />}
          {activeTab === "vouchers" && <VouchersSection />}
          {activeTab === "saved" && <SavedArticlesSection />}
          {activeTab === "favorites" && <FavoritesSection />}
        </div>
      </div>
    </div>
  );
}
