import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Bookmark,
  ChevronRight,
  Clock,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import { articles } from "@/data/mockData";
import { cn } from "@/utils/cn";
import { useAppStore } from "@/store";
import { Button } from "@/components/Button";

const categories = ["Tất cả", "Tư vấn phong cách", "Chăm sóc tóc", "Xu hướng"];

export default function Blog() {
  const { savedArticleIds, toggleSaveArticle } = useAppStore();
  const [activeCat, setActiveCat] = useState("Tất cả");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const catOK = activeCat === "Tất cả" || a.category === activeCat;
      const qOK =
        !q ||
        a.title.toLowerCase().includes(q.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(q.toLowerCase());
      return catOK && qOK;
    });
  }, [activeCat, q]);

  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = filtered.filter((a) => a.id !== featured.id);

  return (
    <div className="animate-fade-up pt-6 md:pt-10">
      <section className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 md:mb-14">
          <div>
            <span className="chip-accent w-fit mb-3">
              <Filter className="h-3.5 w-3.5" /> Tạp chí làm đẹp
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl">
              Thư viện <span className="text-gradient-luxury">thẩm mỹ</span>
            </h1>
            <p className="text-text-secondary mt-4 max-w-xl">
              Đọc, học hỏi và tìm cảm hứng cho kiểu tóc tiếp theo của bạn từ những
              chia sẻ hàng đầu.
            </p>
          </div>
          <div className="flex flex-wrap items-stretch gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm bài viết..."
                className="luxury-input pl-11 w-64 max-w-[70vw]"
              />
            </div>
            <Button variant="secondary">
              <SlidersHorizontal className="h-4 w-4" /> Lọc
            </Button>
          </div>
        </div>

        {/* Category chips */}
        <div className="-mx-4 px-4 mb-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-shadow">
          <div className="flex gap-2 min-w-max">
            {categories.map((c) => {
              const active = activeCat === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCat(c)}
                  className={cn(
                    "snap-start px-4 h-11 rounded-2xl text-sm font-medium transition-all whitespace-nowrap",
                    active
                      ? "bg-gradient-to-b from-accent to-accent-burnt text-ink-base shadow-glow"
                      : "glass text-text-secondary hover:text-text-primary hover:bg-white/[0.06]"
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured */}
        {activeCat === "Tất cả" && !q && (
          <Link
            to={`/blog/${featured.slug}`}
            className="group block glass-card rounded-4xl overflow-hidden mb-10 md:mb-14 hover:shadow-lift transition-all duration-500"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-full min-h-[320px] md:min-h-[480px] overflow-hidden">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ink-base via-ink-base/30 to-transparent md:to-ink-base/30" />
                <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                  <span className="chip-accent backdrop-blur-md">{featured.category}</span>
                  <span className="chip backdrop-blur-md">Bài viết nổi bật</span>
                </div>
              </div>
              <div className="p-6 md:p-12 flex flex-col justify-center max-w-xl">
                <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
                  <span>{featured.publishedAt}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {featured.readMinutes} phút đọc
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4 group-hover:text-gradient-luxury transition">
                  {featured.title}
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6 line-clamp-3 md:line-clamp-none">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between gap-4 pt-4 mt-auto">
                  <div className="flex items-center gap-3">
                    <img
                      src={featured.author.avatar}
                      alt=""
                      className="h-11 w-11 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <div className="font-semibold">{featured.author.name}</div>
                      <div className="text-xs text-text-muted">
                        {featured.author.title}
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm text-accent-gold">
                    Đọc tiếp <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 pb-10">
          {rest.map((a, i) => {
            const saved = savedArticleIds.includes(a.id);
            return (
              <article
                key={a.id}
                className="glass-card rounded-3xl overflow-hidden group hover:-translate-y-1 hover:shadow-lift transition-all duration-500"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <Link to={`/blog/${a.slug}`} className="block">
                  <div className="relative h-52 md:h-60 overflow-hidden">
                    <img
                      src={a.cover}
                      alt={a.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-base/90 via-ink-base/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="chip-accent backdrop-blur-md">
                        {a.category}
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => toggleSaveArticle(a.id)}
                  className={cn(
                    "absolute z-10 mt-3 ml-auto mr-3 block relative float-right -mt-[228px] md:-mt-[252px]",
                    "h-10 w-10 rounded-full backdrop-blur-md flex items-center justify-center transition",
                    saved
                      ? "bg-accent/85 border border-accent text-ink-base"
                      : "bg-white/[0.08] border border-white/10 text-white hover:text-accent-gold hover:bg-accent/10"
                  )}
                  style={{ marginLeft: "calc(100% - 52px)" }}
                >
                  <Bookmark
                    className={cn("h-4 w-4", saved && "fill-ink-base")}
                  />
                </button>

                <div className="p-5 md:p-6 space-y-3 relative">
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span>{a.publishedAt}</span>
                    <span>·</span>
                    <span>{a.readMinutes} phút đọc</span>
                  </div>
                  <Link to={`/blog/${a.slug}`}>
                    <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight leading-tight line-clamp-2 group-hover:text-accent-gold transition min-h-[3.2rem]">
                      {a.title}
                    </h3>
                  </Link>
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                    {a.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs">
                      <img
                        src={a.author.avatar}
                        alt=""
                        className="h-7 w-7 rounded-full object-cover border border-white/10"
                      />
                      <span className="text-text-secondary truncate max-w-[150px]">
                        {a.author.name}
                      </span>
                    </div>
                    <Link
                      to={`/blog/${a.slug}`}
                      className="text-xs text-accent-gold inline-flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Đọc tiếp <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {rest.length === 0 && q && (
          <div className="glass-card rounded-3xl p-10 text-center">
            <div className="chip-accent w-fit mx-auto mb-4">0 kết quả</div>
            <h3 className="text-xl font-semibold mb-2">
              Không tìm thấy bài viết phù hợp
            </h3>
            <p className="text-text-secondary">
              Thử dùng từ khóa khác hoặc xem tất cả các bài viết.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
