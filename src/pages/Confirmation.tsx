import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Calendar,
  Share2,
  MapPin,
  Phone,
  Clock,
  Scissors,
  User,
  Sparkles,
  Download,
  Home,
  LayoutDashboard,
  ChevronRight,
  Copy,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/Button";
import { useAppStore } from "../store";
import { formatVND, cn } from "../utils/cn";

export default function Confirmation() {
  const { booking, resetBooking } = useAppStore();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const totalPrice = booking.services.reduce((sum, s) => sum + s.price, 0);
  const duration = booking.services.reduce((sum, s) => sum + s.duration, 0);
  const code = booking.id ? `HS-${booking.id.slice(-6).toUpperCase()}` : "HS-PENDING";
  const hasData = booking.services.length > 0;

  const handleReset = () => {
    resetBooking();
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const steps = [
    { icon: Scissors, label: "Dịch vụ", value: booking.services.map((s) => s.name).join(", ") || "Chưa chọn" },
    { icon: User, label: "Stylist", value: booking.stylist?.name || "Chưa chọn" },
    { icon: Calendar, label: "Ngày & giờ", value: booking.date || booking.time ? `${booking.date ?? ""} ${booking.time ?? ""}`.trim() : "Chưa chọn" },
  ];

  return (
    <div className="py-6 md:py-14 relative overflow-hidden animate-fade-up">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 rounded-full bg-accent-gold/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative max-w-4xl">
        <div className="text-center mb-10 md:mb-14">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent via-accent-gold to-accent opacity-40 blur-xl animate-pulse-soft" />
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-accent-gold via-accent to-accent-burnt flex items-center justify-center shadow-glow-gold">
              <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-ink-base" strokeWidth={3} />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-3">
            <span className="text-gradient-luxury">Đặt lịch thành công!</span>
          </h1>
          <p className="text-text-secondary text-sm md:text-lg max-w-xl mx-auto">
            Cảm ơn bạn đã tin tưởng Hypersoft. Chúng tôi đã gửi xác nhận đến email và số điện thoại của bạn.
          </p>
        </div>

        <div className="glass-card rounded-4xl overflow-hidden shadow-glow-gold mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-accent/10 pointer-events-none" />

          <div className="relative bg-gradient-to-r from-accent-gold/15 via-accent/10 to-accent-burnt/15 px-5 md:px-8 py-6 md:py-8 border-b border-white/5">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 justify-between">
              <div>
                <div className="text-xs md:text-sm text-text-muted uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                  Mã đặt lịch
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl md:text-4xl font-extrabold text-text-primary tracking-[0.15em]">
                    {code}
                  </span>
                  <button
                    onClick={copyCode}
                    className="shrink-0 w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-accent/10 hover:border-accent/30 flex items-center justify-center transition-all group"
                    title="Sao chép mã"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" strokeWidth={2.5} />
                    ) : (
                      <Copy className="w-4.5 h-4.5 text-text-secondary group-hover:text-accent-gold" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="md" className="rounded-2xl">
                  <Calendar className="w-4 h-4" /> Thêm vào Lịch
                </Button>
                <Button variant="outline" size="md" className="rounded-2xl">
                  <Share2 className="w-4 h-4" /> Chia sẻ
                </Button>
                <Button variant="secondary" size="md" className="rounded-2xl">
                  <Download className="w-4 h-4" /> PDF
                </Button>
              </div>
            </div>
          </div>

          <div className="relative grid md:grid-cols-2 gap-0 md:gap-8 p-5 md:p-8">
            <div className="space-y-5 border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-8">
              <h2 className="text-lg md:text-xl font-bold text-text-primary flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-gold" /> Chi tiết lịch hẹn
              </h2>
              <ol className="space-y-4">
                {steps.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <li key={idx} className="flex gap-4">
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent/25 to-accent-gold/15 border border-accent-gold/30 flex items-center justify-center">
                          <Icon className="w-4.5 h-4.5 text-accent-gold" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="text-xs text-text-muted mb-1">{s.label}</div>
                        <div className="text-sm md:text-base font-semibold text-text-primary leading-snug break-words">
                          {s.value}
                        </div>
                      </div>
                    </li>
                  );
                })}
                <li className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-emerald-500/10 border border-emerald-400/20 flex items-center justify-center">
                      <Clock className="w-4.5 h-4.5 text-emerald-300" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-xs text-text-muted mb-1">Tổng thời lượng</div>
                    <div className="text-sm md:text-base font-semibold text-text-primary">
                      ~{duration} phút · Vui lòng đến trước 10 phút
                    </div>
                  </div>
                </li>
              </ol>

              <div className="mt-6 pt-5 border-t border-dashed border-white/10">
                <div className="text-xs text-text-muted mb-3">Dịch vụ đã chọn</div>
                <div className="space-y-2.5">
                  {(hasData ? booking.services : []).map((s) => (
                    <div key={s.id} className="flex items-center justify-between gap-4 py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={s.image}
                          alt={s.name}
                          className="w-10 h-10 rounded-lg object-cover shrink-0 ring-1 ring-white/10"
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-text-primary truncate">{s.name}</div>
                          <div className="text-[11px] text-text-muted">{s.duration} phút</div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-gradient-luxury shrink-0 tabular-nums">
                        {formatVND(s.price)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-end justify-between mt-5 pt-5 border-t border-white/5">
                  <div>
                    <div className="text-xs text-text-muted mb-1">Tổng thanh toán</div>
                    <div className="text-xs text-text-secondary line-through">
                      {formatVND(Math.round(totalPrice / 0.9))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-block text-[10px] md:text-xs px-2 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/20 text-emerald-300 mb-1.5 font-semibold">
                      -10% thành viên vàng
                    </div>
                    <div className="text-2xl md:text-3xl font-extrabold text-gradient-luxury tracking-tight tabular-nums">
                      {formatVND(totalPrice)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 md:pt-0 md:pl-4 space-y-5">
              <h2 className="text-lg md:text-xl font-bold text-text-primary flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" /> Thông tin salon
              </h2>

              <div className="glass rounded-3xl p-5 space-y-4 overflow-hidden relative">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/15 blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-3 ring-1 ring-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80"
                    alt="Salon"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-canvas/90 via-ink-canvas/10 to-transparent" />
                </div>
                <div className="relative space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-accent-gold" />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">Địa chỉ</div>
                      <div className="text-sm md:text-base font-semibold text-text-primary leading-snug">
                        Hypersoft · L4-25, Saigon Centre
                        <br />
                        65 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-emerald-500/15 border border-emerald-400/25 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">Liên hệ & Hotline</div>
                      <div className="text-sm md:text-base font-semibold text-text-primary">
                        090.123.4567 · support@hypersoft.vn
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-accent-gold/15 border border-accent-gold/25 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-accent-gold" />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">Giờ mở cửa</div>
                      <div className="text-sm md:text-base font-semibold text-text-primary">
                        Thứ 2 – Chủ Nhật · 09:00 – 21:00
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-accent-gold/10 via-accent/5 to-transparent border border-accent-gold/20 p-4 md:p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm md:text-base font-semibold text-text-primary mb-1.5">
                      Điểm thưởng bạn nhận được
                    </div>
                    <div className="text-xs md:text-sm text-text-secondary mb-3">
                      Cảm ơn bạn! Lịch hẹn này cộng thêm <span className="font-bold text-accent-gold">{Math.round(totalPrice / 1000).toLocaleString()} điểm</span> vào tài khoản thành viên vàng của bạn.
                    </div>
                    <button
                      onClick={() => navigate("/dashboard?tab=rewards")}
                      className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-accent-gold hover:gap-2.5 transition-all"
                    >
                      Xem ưu đãi thành viên <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
          <Link to="/" onClick={handleReset}>
            <Button variant="secondary" size="lg" className="w-full rounded-3xl">
              <Home className="w-5 h-5" /> Về trang chủ
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button size="lg" className="w-full rounded-3xl">
              <LayoutDashboard className="w-5 h-5" /> Quản lý lịch hẹn <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className={cn(
          "mt-8 md:mt-12 grid md:grid-cols-3 gap-4",
          "transition-opacity duration-500"
        )}>
          {[
            {
              title: "Bạn đã sẵn sàng?",
              desc: "Đến salon đúng giờ, stylist của bạn đã chuẩn bị mọi thứ.",
              icon: Sparkles,
              color: "from-accent-gold/20 to-accent/10",
            },
            {
              title: "Cần đổi lịch / hủy?",
              desc: "Thay đổi miễn phí trước 24h, trên Dashboard hoặc gọi hotline.",
              icon: Calendar,
              color: "from-sky-400/20 to-indigo-500/10",
            },
            {
              title: "Mang theo gì?",
              desc: "Chỉ cần xuất trình mã đặt lịch khi đến quầy, không cần in ấn.",
              icon: User,
              color: "from-emerald-400/20 to-teal-500/10",
            },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="glass-card rounded-3xl p-5 hover:-translate-y-0.5 transition-all duration-500">
                <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br", c.color)}>
                  <Icon className="w-5.5 h-5.5 text-accent-gold" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-text-primary mb-2 tracking-tight">{c.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
