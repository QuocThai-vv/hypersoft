import { Clock, ArrowRight, Check, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Service } from "../types";
import { Button } from "./Button";
import { cn } from "../utils/cn";
import { formatVND } from "../utils/cn";
import { useAppStore } from "../store";

interface ServiceCardProps {
  service: Service;
  showBookButton?: boolean;
  isSelected?: boolean;
  onSelect?: (service: Service) => void;
  dense?: boolean;
}

export const ServiceCard = ({
  service,
  showBookButton = true,
  isSelected = false,
  onSelect,
  dense = false,
}: ServiceCardProps) => {
  const { favoriteServiceIds, toggleFavoriteService } = useAppStore();
  const isFavorite = favoriteServiceIds.includes(service.id);

  return (
    <div
      className={cn(
        "glass-card rounded-3xl overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:shadow-lift relative",
        isSelected && "ring-2 ring-accent/60 shadow-glow"
      )}
    >
      <div className={cn("relative overflow-hidden", dense ? "h-32 md:h-36" : "h-44 md:h-52")}>
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-base via-ink-base/40 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {service.tag && (
            <span className="chip-accent backdrop-blur-md border border-accent/40">
              {service.tag}
            </span>
          )}
          <span className="chip backdrop-blur-md">
            <Clock className="h-3 w-3" /> {service.duration} phút
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavoriteService(service.id);
          }}
          aria-label="favorite"
          className={cn(
            "absolute top-3 right-3 h-9 w-9 rounded-full backdrop-blur-md flex items-center justify-center transition",
            isFavorite
              ? "bg-accent/85 border border-accent text-ink-base"
              : "bg-white/[0.06] border border-white/10 text-white hover:text-accent-gold hover:bg-accent/10"
          )}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-ink-base")} />
        </button>
      </div>
      <div className="p-5 md:p-6 space-y-4">
        <div>
          <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-1.5">
            {service.name}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
            {service.description}
          </p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-text-muted">Bắt đầu từ</div>
            <div className="text-gradient-luxury text-xl md:text-2xl font-bold">
              {formatVND(service.price)}
            </div>
          </div>
          {showBookButton ? (
            <Link to="/booking" onClick={() => onSelect?.(service)}>
              <Button size="sm">
                Đặt ngay <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : onSelect ? (
            <Button
              size="sm"
              variant={isSelected ? "primary" : "outline"}
              onClick={() => onSelect(service)}
              className="min-w-[130px]"
            >
              {isSelected ? (
                <>
                  <Check className="h-4 w-4" /> Đã chọn
                </>
              ) : (
                "Chọn dịch vụ"
              )}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
