import { Link } from "react-router-dom";
import { Scissors, Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";
import { cn } from "../utils/cn";

export const Footer = ({ className = "" }: { className?: string }) => {
  return (
    <footer className={cn("relative mt-24 pb-8", className)}>
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-t from-accent/[0.08] via-accent/[0.03] to-transparent pointer-events-none blur-2xl" />
      <div className="container">
        <div className="glass-card rounded-3xl p-6 md:p-10 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent via-accent-gold to-accent-burnt shadow-glow">
                  <Scissors className="h-5 w-5 text-ink-base stroke-[2.5]" />
                </span>
                <div>
                  <span className="font-display text-xl font-bold tracking-tight text-text-primary">
                    Hyper<span className="text-gradient-luxury">soft</span>
                  </span>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    Luxury Hair Studio · Est. 2015
                  </p>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
                Nơi cảm hứng thẩm mỹ được biến thành hình hài. Tại Hypersoft,
                mỗi đường cắt là một câu chuyện, mỗi kiểu tóc là một kỷ niệm.
              </p>
              <div className="flex items-center gap-2">
                {[Facebook, Instagram, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-text-secondary hover:text-accent-gold hover:border-accent/30 hover:bg-accent/10 transition"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h5 className="text-sm font-semibold tracking-wide uppercase text-text-muted">
                Dịch vụ
              </h5>
              <ul className="space-y-2.5 text-sm">
                {["Cắt tóc", "Nhuộm màu", "Uốn tóc", "Phục hồi", "Combo"].map((s) => (
                  <li key={s}>
                    <Link
                      to="/services"
                      className="text-text-secondary hover:text-accent-gold transition"
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h5 className="text-sm font-semibold tracking-wide uppercase text-text-muted">
                Khám phá
              </h5>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: "Portfolio", to: "/portfolio" },
                  { label: "Bài viết", to: "/blog" },
                  { label: "Đặt lịch", to: "/booking" },
                  { label: "Đăng nhập", to: "/login" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-text-secondary hover:text-accent-gold transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3 space-y-4">
              <h5 className="text-sm font-semibold tracking-wide uppercase text-text-muted">
                Liên hệ
              </h5>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 text-accent-gold" />
                  <span>123 Hai Bà Trưng, Quận 1, TP.Hồ Chí Minh</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent-gold" />
                  <span>090 123 45 67 · Hotline 24/7</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent-gold" />
                  <span>hello@hypersoft.vn</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-accent-gold" />
                  <span>9:00 - 21:00 · Mở cửa tất cả các ngày</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-muted">
              © 2026 Hypersoft. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-text-muted">
              <a href="#" className="hover:text-accent-gold transition">Chính sách bảo mật</a>
              <a href="#" className="hover:text-accent-gold transition">Điều khoản dịch vụ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
