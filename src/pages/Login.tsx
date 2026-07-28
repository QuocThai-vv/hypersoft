import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  MessageCircle,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Gift,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/Button";
import { cn } from "@/utils/cn";
import { useAppStore } from "@/store";

export default function Login() {
  const { setIsLoggedIn } = useAppStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    password: "",
    name: "",
    email: "",
    agree: false,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setTimeout(() => navigate("/dashboard"), 250);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-base via-ink-base/85 to-ink-base/60" />
      </div>
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-accent/40 to-transparent blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-accent-gold/30 to-transparent blur-3xl" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-4xl overflow-hidden glass-strong shadow-lift">
          {/* Left */}
          <div className="relative p-8 md:p-12 bg-gradient-to-br from-white/[0.03] via-white/[0.015] to-transparent hidden md:flex flex-col justify-between border-r border-white/5">
            <div>
              <Link to="/" className="inline-flex items-center gap-2.5 mb-12">
                <span className="h-10 w-10 rounded-xl inline-flex items-center justify-center bg-gradient-to-br from-accent via-accent-gold to-accent-burnt text-ink-base shadow-glow">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <div className="font-display text-xl font-bold tracking-tight">
                    Hyper<span className="text-gradient-luxury">soft</span>
                  </div>
                  <p className="text-[10px] text-text-muted uppercase tracking-[0.2em]">
                    Luxury Hair Studio
                  </p>
                </div>
              </Link>
              <div className="chip-accent w-fit mb-4">Thành viên</div>
              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight mb-5">
                Chào mừng trở <br /> lại{" "}
                <span className="text-gradient-luxury">Hypersoft Family</span>
              </h2>
              <p className="text-text-secondary leading-relaxed max-w-sm mb-10">
                Truy cập để theo dõi lịch hẹn, tích điểm ưu đãi và xem các gợi ý
                phong cách dành riêng cho bạn.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: Gift,
                  t: "Tích điểm mỗi lần dùng dịch vụ",
                  s: "Đổi voucher, combo và quà tặng giá trị",
                },
                {
                  icon: Shield,
                  t: "Lưu lịch sử đặt lịch",
                  s: "Theo dõi tất cả các lần ghé salon trong một nơi",
                },
                {
                  icon: CheckCircle2,
                  t: "Ưu tiên đặt lịch",
                  s: "Chỗ ngồi dành riêng cho thành viên vàng",
                },
              ].map((it, i) => {
                const Ic = it.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.025] p-4"
                  >
                    <span className="h-10 w-10 shrink-0 rounded-xl inline-flex items-center justify-center bg-accent/15 border border-accent/30 text-accent-gold">
                      <Ic className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-semibold mb-0.5">{it.t}</div>
                      <div className="text-sm text-text-secondary">{it.s}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right form */}
          <div className="p-6 md:p-12 relative">
            <div className="absolute top-5 right-5 md:hidden">
              <Link to="/" className="inline-flex h-9 w-9 items-center justify-center rounded-xl glass text-text-primary">
                ×
              </Link>
            </div>

            <div className="mb-8 md:hidden">
              <div className="chip-accent w-fit mb-3 inline-flex">
                <Sparkles className="h-3.5 w-3.5" /> Chào mừng
              </div>
              <h2 className="text-3xl font-bold leading-[1.1] tracking-tight">
                {mode === "login"
                  ? "Đăng nhập Hypersoft"
                  : "Tạo tài khoản mới"}
              </h2>
            </div>

            <div className="hidden md:block mb-10">
              <div className="flex items-center gap-3 pb-5 border-b border-white/5 mb-8">
                {(["login", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={cn(
                      "relative text-sm font-semibold pb-2 transition",
                      mode === m
                        ? "text-text-primary"
                        : "text-text-muted hover:text-text-secondary"
                    )}
                  >
                    {m === "login" ? "Đăng nhập" : "Đăng ký"}
                    {mode === m && (
                      <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-accent-gold to-accent" />
                    )}
                  </button>
                ))}
              </div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight mb-2">
                {mode === "login" ? "Đăng nhập" : "Tạo tài khoản mới"}
              </h2>
              <p className="text-text-secondary">
                {mode === "login"
                  ? "Nhập thông tin để truy cập tài khoản"
                  : "Hoàn tất chỉ trong 30 giây"}
              </p>
            </div>

            <div className="md:hidden mb-6">
              <div className="inline-flex items-center gap-1 p-1 rounded-2xl glass">
                {(["login", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={cn(
                      "px-4 h-9 rounded-xl text-sm font-medium transition",
                      mode === m
                        ? "bg-gradient-to-b from-accent to-accent-burnt text-ink-base shadow-glow"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {m === "login" ? "Đăng nhập" : "Đăng ký"}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="text-xs uppercase tracking-widest text-text-muted mb-2 block">
                    Họ và tên
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="luxury-input"
                  />
                </div>
              )}
              <div>
                <label className="text-xs uppercase tracking-widest text-text-muted mb-2 block">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="090 123 45 67"
                    className="luxury-input pl-11"
                  />
                </div>
              </div>
              {mode === "signup" && (
                <div>
                  <label className="text-xs uppercase tracking-widest text-text-muted mb-2 block">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="luxury-input pl-11"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="text-xs uppercase tracking-widest text-text-muted mb-2 block">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted opacity-0" />
                  <input
                    required
                    type={show ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="luxury-input pl-4 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl inline-flex items-center justify-center text-text-muted hover:text-accent-gold"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {mode === "signup" && (
                <label className="flex items-start gap-3 pt-2 text-sm text-text-secondary">
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-accent focus:ring-accent/30"
                  />
                  <span>
                    Tôi đã đọc và đồng ý với{" "}
                    <a href="#" className="text-accent-gold hover:underline">
                      điều khoản dịch vụ
                    </a>{" "}
                    &{" "}
                    <a href="#" className="text-accent-gold hover:underline">
                      chính sách bảo mật
                    </a>
                    .
                  </span>
                </label>
              )}
              {mode === "login" && (
                <div className="flex items-center justify-between pt-2 text-xs text-text-muted">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-accent"
                    />
                    Ghi nhớ đăng nhập
                  </label>
                  <a href="#" className="text-text-secondary hover:text-accent-gold transition">
                    Quên mật khẩu?
                  </a>
                </div>
              )}

              <div className="pt-3">
                <Button type="submit" size="lg" className="w-full">
                  {mode === "login" ? "Đăng nhập" : "Tạo tài khoản ngay"}{" "}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </form>

            <div className="my-7 flex items-center gap-4 text-xs uppercase tracking-widest text-text-muted">
              <div className="flex-1 h-px bg-white/10" />
              Hoặc
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  Ic: MessageCircle,
                  label: "Đăng nhập với SMS",
                  tag: "Mã OTP",
                },
                {
                  Ic: Mail,
                  label: "Đăng nhập với Google",
                  tag: "Nhanh chóng",
                },
              ].map((it, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={submit as unknown as () => void}
                  className="group h-14 rounded-2xl glass hover:bg-white/[0.07] hover:border-accent/30 transition inline-flex items-center justify-center gap-3 text-sm"
                >
                  <span className="h-9 w-9 rounded-xl inline-flex items-center justify-center bg-white/[0.05] border border-white/10 text-accent-gold group-hover:bg-accent/15 group-hover:border-accent/30">
                    <it.Ic className="h-4.5 w-4.5" />
                  </span>
                  <div className="text-left">
                    <div className="font-semibold text-text-primary">{it.label}</div>
                    <div className="text-[10px] uppercase tracking-widest text-text-muted">
                      {it.tag}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center text-sm text-text-secondary">
              {mode === "login" ? (
                <>
                  Chưa có tài khoản?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-accent-gold font-semibold hover:underline"
                  >
                    Đăng ký miễn phí
                  </button>
                </>
              ) : (
                <>
                  Đã có tài khoản?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-accent-gold font-semibold hover:underline"
                  >
                    Đăng nhập ngay
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
