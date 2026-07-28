import { useMemo, useState } from "react";
import {
  Sparkles,
  Bookmark,
  ZoomIn,
  Download,
} from "lucide-react";
import { portfolio, stylists } from "@/data/mockData";
import { cn } from "@/utils/cn";

const catFilters = [
  "Tất cả",
  "Nữ",
  "Nam",
  "Unisex",
  "Balayage",
  "Fade",
  "Uốn sóng",
  "Treatment",
];

export default function Portfolio() {
  const [cat, setCat] = useState("Tất cả");
  const [stylist, setStylist] = useState<string>("all");
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return portfolio.filter((p) => {
      const sOK = stylist === "all" || p.stylistId === stylist;
      const cOK = cat === "Tất cả" || p.tags.some((t) => t.includes(cat));
      return sOK && cOK;
    });
  }, [cat, stylist]);

  const activeItem = portfolio.find((p) => p.id === active);

  return (
    <div className="animate-fade-up pt-6 md:pt-10">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 md:mb-14">
          <div>
            <span className="chip-accent w-fit mb-3 inline-flex">
              <Sparkles className="h-3.5 w-3.5" /> Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl">
              Tác phẩm <span className="text-gradient-luxury">Hypersoft</span>
            </h1>
            <p className="text-text-secondary mt-4 max-w-xl">
              Những tác phẩm đáng tự hào do stylist của chúng tôi tạo ra trong 11
              năm hoạt động.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-soft" />
            Cập nhật liên tục hàng tuần
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-10">
          <div className="-mx-4 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-shadow">
            <div className="flex gap-2 min-w-max">
              {catFilters.map((c) => {
                const active = cat === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
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
          <div className="-mx-4 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-shadow">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => setStylist("all")}
                className={cn(
                  "snap-start h-11 rounded-2xl text-sm font-medium transition-all px-4",
                  stylist === "all"
                    ? "bg-white/[0.08] border border-white/15 text-text-primary"
                    : "glass text-text-secondary hover:text-text-primary"
                )}
              >
                Tất cả stylist
              </button>
              {stylists.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStylist(s.id)}
                  className={cn(
                    "snap-start h-11 rounded-2xl text-sm font-medium transition-all px-3 inline-flex items-center gap-2",
                    stylist === s.id
                      ? "bg-white/[0.08] border border-white/15 text-text-primary"
                      : "glass text-text-secondary hover:text-text-primary"
                  )}
                >
                  <img
                    src={s.avatar}
                    alt=""
                    className="h-6 w-6 rounded-full object-cover border border-white/10"
                  />
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Masonry-ish grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pb-10">
          {filtered.map((p, i) => {
            const tall = i % 3 === 0;
            const styl = stylists.find((x) => x.id === p.stylistId);
            return (
              <div
                key={p.id}
                className={cn(
                  "group relative glass-card rounded-3xl overflow-hidden",
                  tall ? "row-span-2" : ""
                )}
                onClick={() => setActive(p.id)}
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden cursor-zoom-in",
                    tall ? "h-full min-h-[460px] md:min-h-[600px]" : "h-52 md:h-72"
                  )}
                >
                  <img
                    src={p.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-base/90 via-ink-base/10 to-transparent opacity-90" />
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition">
                    <button
                      className="h-9 w-9 rounded-full glass backdrop-blur-md inline-flex items-center justify-center hover:text-accent-gold"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button
                      className="h-9 w-9 rounded-full glass backdrop-blur-md inline-flex items-center justify-center hover:text-accent-gold"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActive(p.id);
                      }}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                    {styl && (
                      <div className="flex items-center gap-2">
                        <img
                          src={styl.avatar}
                          alt=""
                          className="h-7 w-7 rounded-full object-cover border border-white/10"
                        />
                        <div className="text-xs">
                          <div className="font-semibold text-text-primary">
                            {styl.name}
                          </div>
                          <div className="text-text-muted">Stylist</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="glass-card rounded-3xl p-10 text-center">
            <div className="chip-accent w-fit mx-auto mb-3">0 kết quả</div>
            <p className="text-text-secondary">
              Không có tác phẩm với bộ lọc này — thử bộ lọc khác nhé.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[60] bg-ink-base/85 backdrop-blur-2xl p-4 md:p-10 flex items-center justify-center"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-w-5xl w-full rounded-3xl overflow-hidden glass-strong shadow-lift animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full glass inline-flex items-center justify-center text-text-primary hover:text-accent-gold transition"
            >
              ×
            </button>
            <div className="grid md:grid-cols-5 gap-0">
              <div className="md:col-span-3 relative h-64 md:h-[600px]">
                <img src={activeItem.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-2 p-6 md:p-8 flex flex-col gap-5">
                <div className="chip-accent w-fit">Tác phẩm</div>
                <div className="flex flex-wrap gap-1.5">
                  {activeItem.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-text-muted mb-2">
                    Stylist phụ trách
                  </div>
                  {(() => {
                    const st = stylists.find((x) => x.id === activeItem.stylistId);
                    if (!st) return null;
                    return (
                      <div className="flex items-center gap-3">
                        <img
                          src={st.avatar}
                          alt=""
                          className="h-12 w-12 rounded-2xl object-cover border border-white/10"
                        />
                        <div>
                          <div className="font-semibold">{st.name}</div>
                          <div className="text-xs text-text-muted">
                            {st.experienceYears} năm kinh nghiệm
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
                <div className="space-y-2 text-sm text-text-secondary mt-auto pt-6">
                  <button className="w-full py-3 rounded-2xl glass hover:bg-white/[0.06] transition inline-flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" /> Tải ảnh chất lượng cao
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
