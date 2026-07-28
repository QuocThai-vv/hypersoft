import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Star,
  Award,
  Users,
  Clock,
  Sparkles,
  ChevronRight,
  Quote,
  Bookmark,
  Gift,
  Calendar,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { services, stylists, testimonials, articles } from "@/data/mockData";
import { cn, formatVND } from "@/utils/cn";
import { useAppStore } from "@/store";

const stats = [
  { icon: Award, label: "Năm kinh nghiệm", value: "11+" },
  { icon: Users, label: "Khách hàng hài lòng", value: "32K+" },
  { icon: Star, label: "Đánh giá trung bình", value: "4.9★" },
  { icon: Clock, label: "Stylist chuyên nghiệp", value: "18+" },
];

export default function Home() {
  const { toggleSaveArticle, savedArticleIds } = useAppStore();
  const featuredServices = services.slice(0, 4);
  const homeArticles = articles.slice(0, 3);
  const featured = articles.find((a) => a.featured) ?? articles[0];

  return (
    <div className="animate-fade-up">
      {/* HERO */}
      <section className="relative pt-8 md:pt-14">
        <div className="container">
          <div className="relative rounded-4xl overflow-hidden shadow-lift">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80"
                alt="Luxury salon"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-base via-ink-base/80 to-ink-base/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-base via-ink-base/20 to-transparent" />
              <div className="absolute inset-0 noise" />
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 md:p-14 min-h-[560px] md:min-h-[640px]">
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="chip-accent w-fit mb-5 animate-fade-up">
                  <Sparkles className="h-3.5 w-3.5" />
                  Sang trọng · Tận tâm · Đẳng cấp thẩm mỹ
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold leading-[1.05] tracking-tight mb-6">
                  Nâng tầm vẻ đẹp của bạn{" "}
                  <span className="text-gradient-luxury">từng đường cắt</span>
                </h1>
                <p className="text-base md:text-lg text-text-secondary/90 max-w-xl leading-relaxed mb-8">
                  Từ 2015, Hypersoft đã cùng hàng chục ngàn khách hàng tìm
                  ra phong cách tóc đúng bản sắc. Hãy để chúng tôi viết câu chuyện
                  thẩm mỹ của bạn.
                </p>
                <div className="flex flex-wrap items-center gap-3 mb-10">
                  <Link to="/booking">
                    <Button size="lg">
                      Đặt lịch ngay <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button size="lg" variant="secondary">
                      <Play className="h-5 w-5 text-accent-gold" /> Xem dịch vụ
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-5 text-xs md:text-sm">
                  <div className="flex -space-x-2">
                    {stylists.slice(0, 4).map((s) => (
                      <img
                        key={s.id}
                        src={s.avatar}
                        alt={s.name}
                        className="h-9 w-9 rounded-full border-2 border-ink-base object-cover"
                      />
                    ))}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-accent-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-text-secondary">
                      <span className="text-text-primary font-semibold">4.9/5</span> · 2,843 đánh giá
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex items-end lg:justify-end">
                <div className="glass-card rounded-3xl p-5 md:p-6 w-full max-w-md backdrop-blur-xl animate-float-slow">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-text-muted">
                        Combo mùa hè
                      </div>
                      <div className="font-display text-2xl font-bold mt-1">
                        Summer Glow
                      </div>
                    </div>
                    <span className="h-12 w-12 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-accent/30 to-accent-gold/20 border border-accent/30">
                      <Gift className="h-6 w-6 text-accent-gold" />
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-5">
                    Cắt + Gội + Uốn lạnh nhanh + Trị liệu dưỡng bóng — tiết kiệm 30%.
                  </p>
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="text-xs line-through text-text-muted">
                        {formatVND(1680000)}
                      </div>
                      <div className="text-gradient-luxury text-3xl font-bold">
                        {formatVND(1180000)}
                      </div>
                    </div>
                    <span className="chip-accent">Giảm 30%</span>
                  </div>
                  <Link to="/booking" className="block">
                    <Button className="w-full">
                      Đặt combo ngay <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="glass-card rounded-3xl p-4 md:p-6 flex items-center gap-4"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="h-12 w-12 shrink-0 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent-gold/10 border border-accent/30">
                    <Icon className="h-5 w-5 text-accent-gold" />
                  </span>
                  <div>
                    <div className="text-2xl font-bold tracking-tight">{s.value}</div>
                    <div className="text-xs text-text-muted">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DỊCH VỤ NỔI BẬT */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
            <div>
              <div className="chip-accent w-fit mb-3">
                <Sparkles className="h-3.5 w-3.5" /> Dịch vụ
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-2xl">
                Dịch vụ <span className="text-gradient-luxury">được ưa thích</span>
              </h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-gold transition">
              Xem tất cả dịch vụ <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {featuredServices.map((s, i) => (
              <div key={s.id} style={{ animationDelay: `${i * 60}ms` }}>
                <ServiceCard service={s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STYLIST NỔI BẬT */}
      <section className="py-10 md:py-20">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
            <div>
              <div className="chip-accent w-fit mb-3">
                <Award className="h-3.5 w-3.5" /> Đội ngũ
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-2xl">
                Stylist <span className="text-gradient-luxury">hàng đầu</span>
              </h2>
            </div>
            <div className="chip">4 chuyên gia · 38 năm kinh nghiệm tổng hợp</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {stylists.map((st, i) => (
              <div
                key={st.id}
                className="glass-card rounded-3xl p-5 group hover:-translate-y-1 hover:shadow-lift transition-all duration-500 relative overflow-hidden"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-3xl group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="relative mb-5">
                    <div className="h-44 md:h-52 rounded-2xl overflow-hidden border border-white/5">
                      <img
                        src={st.avatar}
                        alt={st.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <span className="absolute bottom-3 left-3 chip-accent backdrop-blur-md">
                      <Star className="h-3 w-3 fill-current text-ink-base" /> {st.rating}
                    </span>
                    <span className="absolute bottom-3 right-3 chip backdrop-blur-md">
                      {st.experienceYears} năm
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-1">
                    {st.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-text-muted mb-3">
                    Senior Stylist
                  </p>
                  <p className="text-sm text-text-secondary italic mb-4 line-clamp-2">
                    "{st.quote}"
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {st.specialty.slice(0, 2).map((sp) => (
                      <span key={sp} className="chip">
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10 md:py-20">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
            <div>
              <div className="chip-accent w-fit mb-3">
                <Quote className="h-3.5 w-3.5" /> Cảm nhận
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-2xl">
                Hàng chục ngàn khách{" "}
                <span className="text-gradient-luxury">yêu thích</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className="glass-card rounded-3xl p-6 md:p-7 relative"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <Quote className="absolute top-6 right-6 h-8 w-8 text-accent/30" />
                <div className="flex items-center gap-1 text-accent-gold mb-4">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {t.content}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-text-muted">{t.service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KHUYẾN MÃI */}
      <section className="py-10 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
            <div className="glass-card rounded-4xl relative overflow-hidden p-7 md:p-10">
              <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-accent/40 to-transparent blur-3xl" />
              <div className="relative max-w-md">
                <span className="chip-accent mb-4">
                  <Gift className="h-3.5 w-3.5" /> Ưu đãi thành viên
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mt-4 mb-3 leading-tight">
                  Thành viên vàng{" "}
                  <span className="text-gradient-luxury">giảm 25%</span>
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Nạp thẻ thành viên mùa hè, nhận ưu đãi không giới hạn cùng quà
                  tặng trị giá 500K tại các dịch vụ cao cấp.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/dashboard">
                    <Button>
                      Xem ưu đãi <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/booking">
                    <Button variant="secondary">Đặt lịch thử</Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-4xl relative overflow-hidden p-7 md:p-10">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-30 mask-fade-b"
              />
              <div className="relative">
                <span className="chip-accent mb-4">
                  <Calendar className="h-3.5 w-3.5" /> Hằng ngày
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mt-4 mb-3 leading-tight">
                  Mở cửa{" "}
                  <span className="text-gradient-luxury">09:00 → 21:00</span>
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed max-w-md">
                  Bao gồm cả ngày lễ, CN. Trải nghiệm không gian salon đẳng cấp
                  tại 123 Hai Bà Trưng, Quận 1, TP.HCM.
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <MapPin className="h-4 w-4 text-accent-gold" />
                    Quận 1, TP.HCM
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Calendar className="h-4 w-4 text-accent-gold" />
                    Đặt lịch online 24/7
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BÀI VIẾT MỚI NHẤT */}
      <section className="py-10 md:py-20">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
            <div>
              <div className="chip-accent w-fit mb-3">
                <Bookmark className="h-3.5 w-3.5" /> Bài viết
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-2xl">
                Chia sẻ <span className="text-gradient-luxury">thẩm mỹ</span>
              </h2>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-gold transition">
              Xem tất cả bài viết <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-6">
            {/* Featured */}
            <Link
              to={`/blog/${featured.slug}`}
              className="group glass-card rounded-3xl overflow-hidden lg:col-span-3 hover:-translate-y-1 hover:shadow-lift transition-all duration-500"
            >
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-base via-ink-base/40 to-transparent" />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="chip-accent backdrop-blur-md">{featured.category}</span>
                  <span className="chip backdrop-blur-md">Featured</span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSaveArticle(featured.id);
                  }}
                  className={cn(
                    "absolute top-4 right-4 h-10 w-10 rounded-full backdrop-blur-md flex items-center justify-center transition",
                    savedArticleIds.includes(featured.id)
                      ? "bg-accent/85 border border-accent text-ink-base"
                      : "bg-white/[0.06] border border-white/10 text-white hover:text-accent-gold"
                  )}
                >
                  <Bookmark
                    className={cn(
                      "h-4 w-4",
                      savedArticleIds.includes(featured.id) && "fill-ink-base"
                    )}
                  />
                </button>
              </div>
              <div className="p-6 md:p-7 space-y-3">
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span>{featured.publishedAt}</span>
                  <span>·</span>
                  <span>{featured.readMinutes} phút đọc</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight group-hover:text-gradient-luxury transition">
                  {featured.title}
                </h3>
                <p className="text-text-secondary line-clamp-2 leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={featured.author.avatar}
                    alt={featured.author.name}
                    className="h-9 w-9 rounded-full object-cover border border-white/10"
                  />
                  <div className="text-sm">
                    <div className="font-semibold">{featured.author.name}</div>
                    <div className="text-xs text-text-muted">
                      {featured.author.title}
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex flex-col gap-5 md:gap-6 lg:col-span-2">
              {homeArticles
                .filter((a) => a.id !== featured.id)
                .concat(articles.slice(1, 3))
                .slice(0, 2)
                .map((a, i) => (
                  <Link
                    key={a.id}
                    to={`/blog/${a.slug}`}
                    className="group glass-card rounded-3xl overflow-hidden flex gap-4 p-3 hover:shadow-lift hover:-translate-y-0.5 transition-all duration-500"
                  >
                    <div className="relative w-28 h-28 md:w-32 md:h-32 shrink-0 rounded-2xl overflow-hidden">
                      <img
                        src={a.cover}
                        alt={a.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1 pr-2 min-w-0 flex-1">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="chip-accent !px-2 !py-0.5 !text-[10px]">
                            {a.category}
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-text-muted">
                            {a.readMinutes} min
                          </span>
                        </div>
                        <h4 className="font-semibold tracking-tight line-clamp-2 group-hover:text-accent-gold transition">
                          {a.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <img
                          src={a.author.avatar}
                          alt=""
                          className="h-5 w-5 rounded-full object-cover"
                        />
                        <span className="truncate">{a.author.name}</span>
                        <span>·</span>
                        <span className="shrink-0">{a.publishedAt}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="pb-14 md:pb-24">
        <div className="container">
          <div className="relative glass-card rounded-4xl overflow-hidden p-8 md:p-16 text-center">
            <div className="absolute inset-0 -z-10">
              <img
                src="https://images.unsplash.com/photo-1521490683710-986f04e2a573?auto=format&fit=crop&w=2000&q=80"
                alt=""
                className="w-full h-full object-cover opacity-25 mask-fade-b"
              />
            </div>
            <span className="chip-accent mb-5">
              <Sparkles className="h-3.5 w-3.5" /> Hypersoft Experience
            </span>
            <h2 className="text-3xl md:text-6xl font-bold leading-[1.05] max-w-3xl mx-auto tracking-tight">
              Sẵn sàng biến đổi{" "}
              <span className="text-gradient-luxury">phong cách</span> của bạn
            </h2>
            <p className="text-text-secondary mt-5 max-w-xl mx-auto">
              Đặt lịch 24/7, chọn stylist yêu thích, không đợi chờ.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <Link to="/booking">
                <Button size="lg">
                  Đặt lịch ngay <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="secondary">
                  Tư vấn miễn phí
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
