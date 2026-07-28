import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { services } from "@/data/mockData";
import { ServiceCard } from "@/components/ServiceCard";
import { cn } from "@/utils/cn";
import { Button } from "@/components/Button";
import { Link } from "react-router-dom";

const cats = [
  { key: "all", label: "Tất cả" },
  { key: "cut", label: "Cắt tóc" },
  { key: "color", label: "Nhuộm màu" },
  { key: "perm", label: "Uốn" },
  { key: "treat", label: "Phục hồi" },
  { key: "wash", label: "Gội đầu" },
  { key: "combo", label: "Combo" },
];

export default function Services() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc" | "duration">("default");

  const filtered = useMemo(() => {
    let list = services.filter((s) => {
      const cOK = cat === "all" || s.category === cat;
      const qOK =
        !q ||
        s.name.toLowerCase().includes(q.toLowerCase()) ||
        s.description.toLowerCase().includes(q.toLowerCase());
      return cOK && qOK;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "duration") list = [...list].sort((a, b) => a.duration - b.duration);
    return list;
  }, [cat, q, sort]);

  return (
    <div className="animate-fade-up pt-6 md:pt-10">
      <div className="container">
        {/* Hero */}
        <div className="glass-card rounded-4xl overflow-hidden relative mb-10 md:mb-14">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2000&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-base via-ink-base/80 to-transparent" />
          </div>
          <div className="relative p-8 md:p-14 max-w-2xl">
            <span className="chip-accent w-fit mb-4 inline-flex">
              <Sparkles className="h-3.5 w-3.5" /> Menus dịch vụ
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-4">
              Danh sách <span className="text-gradient-luxury">dịch vụ</span>
            </h1>
            <p className="text-text-secondary leading-relaxed max-w-xl mb-7">
              Từ cắt tóc, nhuộm màu đến phục hồi và các combo cao cấp — tìm đúng
              dịch vụ bạn cần chỉ trong vài giây.
            </p>
            <Link to="/booking">
              <Button size="lg">
                Đặt lịch ngay <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 md:mb-10">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm dịch vụ, gói chăm sóc..."
              className="luxury-input pl-11"
            />
          </div>
          <div className="flex items-stretch gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="luxury-input appearance-none pr-10 inline-flex items-center !py-0 !h-[48px]"
            >
              <option value="default">Mặc định</option>
              <option value="price-asc">Giá: Thấp → Cao</option>
              <option value="price-desc">Giá: Cao → Thấp</option>
              <option value="duration">Thời gian nhanh</option>
            </select>
            <Button variant="secondary">
              <SlidersHorizontal className="h-4 w-4" /> Bộ lọc
            </Button>
          </div>
        </div>

        {/* Category chips edge-to-edge */}
        <div className="-mx-4 px-4 mb-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-shadow">
          <div className="flex gap-2 min-w-max">
            {cats.map((c) => {
              const active = cat === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setCat(c.key)}
                  className={cn(
                    "snap-start px-4 h-11 rounded-2xl text-sm font-medium transition-all whitespace-nowrap",
                    active
                      ? "bg-gradient-to-b from-accent to-accent-burnt text-ink-base shadow-glow"
                      : "glass text-text-secondary hover:text-text-primary hover:bg-white/[0.06]"
                  )}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 pb-10">
          {filtered.map((s, i) => (
            <div key={s.id} style={{ animationDelay: `${i * 40}ms` }}>
              <ServiceCard service={s} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="glass-card rounded-3xl p-10 text-center">
            <div className="chip-accent w-fit mx-auto mb-3">0 kết quả</div>
            <h3 className="text-xl font-semibold mb-2">Không tìm thấy dịch vụ phù hợp</h3>
            <p className="text-text-secondary mb-5">
              Thử từ khóa khác hoặc xem tất cả các dịch vụ.
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setQ("");
                setCat("all");
              }}
            >
              Xem tất cả dịch vụ
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
