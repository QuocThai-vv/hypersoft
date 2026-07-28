import { useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Clock,
  ArrowLeft,
  Bookmark,
  Share2,
  Facebook,
  MessageCircle,
  Twitter,
  ArrowRight,
  Quote,
  Lightbulb,
  CheckCircle2,
  Copy,
  Image,
} from "lucide-react";
import { articles } from "@/data/mockData";
import { cn, formatVND } from "@/utils/cn";
import { useAppStore } from "@/store";
import { Button } from "@/components/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/mockData";

export default function Article() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = useMemo(
    () => articles.find((a) => a.slug === slug) ?? articles[0],
    [slug]
  );
  const { savedArticleIds, toggleSaveArticle } = useAppStore();
  const saved = savedArticleIds.includes(article.id);
  const related = articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .concat(articles.filter((a) => a.id !== article.id))
    .slice(0, 3);
  const relatedService = services.slice(0, 1)[0];

  return (
    <div className="animate-fade-up pt-6 md:pt-10">
      <div className="container">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-gold transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Quay lại
        </button>

        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted mb-5">
          <Link to="/" className="hover:text-accent-gold transition">
            Trang chủ
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/blog" className="hover:text-accent-gold transition">
            Bài viết
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text-secondary">{article.category}</span>
        </div>

        {/* Cover */}
        <div className="relative rounded-4xl overflow-hidden h-72 md:h-[480px] mb-10 md:mb-14 shadow-lift">
          <img
            src={article.cover}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-base via-ink-base/40 to-ink-base/20" />
          <div className="absolute inset-0 p-6 md:p-14 flex flex-col justify-end max-w-4xl">
            <span className="chip-accent backdrop-blur-md w-fit mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt=""
                  className="h-11 w-11 rounded-full object-cover border border-white/10"
                />
                <div className="text-sm">
                  <div className="font-semibold">{article.author.name}</div>
                  <div className="text-xs text-text-muted">
                    {article.author.title}
                  </div>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Clock className="h-4 w-4 text-accent-gold" />
                {article.publishedAt} · {article.readMinutes} phút đọc
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* BODY */}
          <article className="lg:col-span-8 max-w-none">
            <div className="prose-invert max-w-none space-y-7 leading-relaxed">
              <p className="text-lg md:text-xl text-text-secondary/95 leading-relaxed">
                {article.excerpt}
              </p>
              {article.body.map((block, i) => {
                switch (block.type) {
                  case "h2":
                    return (
                      <h2
                        key={i}
                        className="text-2xl md:text-3xl font-bold tracking-tight pt-6"
                      >
                        {block.text}
                      </h2>
                    );
                  case "p":
                    return (
                      <p key={i} className="text-text-secondary">
                        {block.text}
                      </p>
                    );
                  case "quote":
                    return (
                      <blockquote
                        key={i}
                        className={cn(
                          "relative rounded-3xl p-6 md:p-8 italic",
                          block.accent === "gold"
                            ? "bg-gradient-to-br from-accent/10 to-transparent border border-accent/20"
                            : "glass-card"
                        )}
                      >
                        <Quote
                          className={cn(
                            "absolute -top-3 left-6 h-8 w-8",
                            block.accent === "gold" ? "text-accent/50" : "text-text-muted"
                          )}
                        />
                        <p className="text-text-primary text-lg md:text-xl leading-relaxed">
                          {block.text}
                        </p>
                      </blockquote>
                    );
                  case "callout":
                    return (
                      <div
                        key={i}
                        className="relative glass-card rounded-3xl p-6 flex items-start gap-4 overflow-hidden"
                      >
                        <div
                          className={cn(
                            "absolute inset-y-0 left-0 w-1",
                            block.accent === "gold"
                              ? "bg-gradient-to-b from-accent-gold to-accent"
                              : "bg-accent"
                          )}
                        />
                        <span
                          className={cn(
                            "shrink-0 h-11 w-11 rounded-2xl inline-flex items-center justify-center border",
                            block.accent === "gold"
                              ? "bg-accent/15 border-accent/30 text-accent-gold"
                              : "bg-white/[0.06] border-white/10 text-text-primary"
                          )}
                        >
                          <Lightbulb className="h-5 w-5" />
                        </span>
                        <div className="flex-1">
                          <div className="font-semibold mb-1">Chuyên gia gợi ý</div>
                          <div className="text-text-secondary">{block.text}</div>
                        </div>
                      </div>
                    );
                  case "list":
                    return (
                      <ul key={i} className="space-y-3">
                        {(block.items ?? []).map((it, k) => (
                          <li
                            key={k}
                            className="flex items-start gap-3 text-text-secondary"
                          >
                            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-accent-gold" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  case "image":
                    return (
                      <figure
                        key={i}
                        className="my-10 -mx-2 md:mx-0 md:my-14 rounded-3xl overflow-hidden border border-white/5 shadow-lift"
                      >
                        <div className="relative">
                          <img
                            src={block.src}
                            alt=""
                            className="w-full h-auto max-h-[520px] object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink-base/30 to-transparent" />
                          <span className="absolute bottom-3 right-3 chip backdrop-blur-md">
                            <Image className="h-3 w-3" /> Hình ảnh minh họa
                          </span>
                        </div>
                      </figure>
                    );
                  default:
                    return null;
                }
              })}

              {article.body.length < 5 && (
                <div className="glass-card rounded-3xl p-8 space-y-5">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Bài viết được biên tập kỹ lưỡng
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    Nội dung được kiểm duyệt bởi đội ngũ chuyên gia stylist của
                    Hypersoft, đảm bảo tính chính xác và hữu ích cao nhất cho
                    hành trình làm đẹp của bạn.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                    {[
                      "Kiểm duyệt 2 bước",
                      "Nguồn tham khảo rõ ràng",
                      "Cập nhật tháng 7/2026",
                    ].map((it) => (
                      <div
                        key={it}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-2xl border border-white/10 bg-white/[0.03] text-sm text-text-secondary"
                      >
                        <CheckCircle2 className="h-4 w-4 text-accent-gold shrink-0" />
                        {it}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Share & Save */}
            <div className="mt-12 glass-card rounded-3xl p-5 md:p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveArticle(article.id)}
                  className={cn(
                    "h-11 w-11 rounded-2xl flex items-center justify-center transition",
                    saved
                      ? "bg-gradient-to-b from-accent to-accent-burnt text-ink-base shadow-glow"
                      : "bg-white/[0.05] border border-white/10 text-text-primary hover:text-accent-gold hover:bg-accent/10"
                  )}
                >
                  <Bookmark className={cn("h-5 w-5", saved && "fill-ink-base")} />
                </button>
                {[Facebook, Twitter, MessageCircle, Share2].map((Ic, k) => (
                  <button
                    key={k}
                    className="h-11 w-11 rounded-2xl flex items-center justify-center bg-white/[0.05] border border-white/10 text-text-secondary hover:text-accent-gold hover:border-accent/30 hover:bg-accent/10 transition"
                  >
                    <Ic className="h-4.5 w-4.5" />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <span>Link bài viết:</span>
                <code className="glass rounded-xl px-3 py-2 text-xs max-w-[220px] truncate">
                  hypersoft.vn/blog/{article.slug}
                </code>
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4" /> Sao chép
                </Button>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={article.author.avatar}
                  alt=""
                  className="h-14 w-14 rounded-2xl object-cover border border-white/10"
                />
                <div>
                  <div className="font-semibold">{article.author.name}</div>
                  <div className="text-xs text-text-muted">
                    {article.author.title}
                  </div>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                Đội ngũ biên tập chuyên môn về tóc & thẩm mỹ của Hypersoft.
              </p>
              <Button className="w-full" variant="secondary">
                Theo dõi tác giả
              </Button>
            </div>

            {/* CTA booking */}
            <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-br from-accent/40 to-transparent blur-3xl" />
              <div className="relative">
                <div className="chip-accent w-fit mb-4">
                  Đặt lịch tư vấn
                </div>
                <h4 className="text-2xl font-bold leading-tight mb-2">
                  Tư vấn <span className="text-gradient-luxury">0Đ</span> cùng stylist
                </h4>
                <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                  Tìm đúng kiểu tóc cho bạn chỉ trong 15 phút — không bắt buộc
                  đặt dịch vụ.
                </p>
                <div className="text-xs text-text-muted mb-5">
                  Dịch vụ: <span className="text-text-secondary">{relatedService.name}</span>
                  <br />
                  Bắt đầu từ{" "}
                  <span className="text-gradient-luxury font-bold">
                    {formatVND(relatedService.price)}
                  </span>
                </div>
                <Link to="/booking" className="block">
                  <Button className="w-full">
                    Đặt lịch ngay <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Related Service */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold">Dịch vụ gợi ý</h5>
              </div>
              <ServiceCard service={relatedService} dense />
            </div>
          </aside>
        </div>

        {/* RELATED ARTICLES */}
        <section className="mt-16 md:mt-24">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8 md:mb-10">
            <div>
              <span className="chip-accent w-fit mb-3 inline-flex">
                Bài viết liên quan
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight">
                Tiếp tục <span className="text-gradient-luxury">khám phá</span>
              </h2>
            </div>
            <Link to="/blog" className="text-sm text-text-secondary hover:text-accent-gold transition inline-flex items-center gap-1">
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/blog/${r.slug}`}
                className="group glass-card rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-lift transition-all duration-500"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={r.cover}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-base/90 via-ink-base/30 to-transparent" />
                  <span className="absolute top-3 left-3 chip-accent backdrop-blur-md">
                    {r.category}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span>{r.publishedAt}</span>
                    <span>·</span>
                    <span>{r.readMinutes} phút</span>
                  </div>
                  <h3 className="font-semibold tracking-tight line-clamp-2 group-hover:text-accent-gold transition min-h-[2.8rem]">
                    {r.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="my-16 md:my-24">
          <div className="glass-card rounded-4xl p-8 md:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-br from-accent/40 to-transparent blur-3xl" />
            <div className="relative max-w-2xl mx-auto">
              <span className="chip-accent mb-4 inline-flex">
                Hypersoft Experience
              </span>
              <h3 className="text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
                Áp dụng ngay gợi ý hôm nay — đặt lịch với <span className="text-gradient-luxury">Hypersoft</span>
              </h3>
              <p className="text-text-secondary mb-7">
                Trải nghiệm không gian hạng sang, đội ngũ stylist chuyên nghiệp —
                đặt lịch chỉ trong 30 giây.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/booking">
                  <Button size="lg">
                    Đặt lịch ngay <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="secondary">
                    Khám phá dịch vụ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
