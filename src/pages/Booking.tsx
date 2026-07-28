import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
  Sparkles,
  CalendarDays,
  Scissors,
  User2,
  FileText,
  CreditCard,
  UserCheck,
  Phone,
  Mail,
  Info,
  CheckCircle2,
  MapPin,
  Heart,
} from "lucide-react";
import { Button } from "@/components/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { services, stylists } from "@/data/mockData";
import { cn, formatVND } from "@/utils/cn";
import { useAppStore } from "@/store";
import { Service, Stylist } from "@/types";

const steps = [
  { n: 1, label: "Dịch vụ", icon: Scissors },
  { n: 2, label: "Stylist", icon: UserCheck },
  { n: 3, label: "Ngày", icon: CalendarDays },
  { n: 4, label: "Giờ", icon: Clock },
  { n: 5, label: "Thông tin", icon: User2 },
  { n: 6, label: "Xác nhận", icon: CreditCard },
];

function generateCalendarDays(offsetWeeks = 0) {
  const out: { key: string; date: Date; weekday: string; day: string; month: string; disabled?: boolean; hasSlots?: boolean }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() + offsetWeeks * 7);
  for (let i = 0; i < 21; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const weekdayShort = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][d.getDay()];
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const key = `${d.getFullYear()}-${month}-${day}`;
    const before = d.getTime() < today.getTime();
    const noSlot = i % 7 === 0 || i % 11 === 0;
    out.push({
      key,
      date: d,
      weekday: weekdayShort,
      day,
      month,
      disabled: before || i % 19 === 0,
      hasSlots: !before && !noSlot,
    });
  }
  return out;
}

const timeSlots = [
  "09:00",
  "09:45",
  "10:30",
  "11:15",
  "12:00",
  "13:30",
  "14:15",
  "15:00",
  "15:45",
  "16:30",
  "17:15",
  "18:00",
  "18:45",
];

export default function Booking() {
  const navigate = useNavigate();
  const {
    currentBookingStep,
    setCurrentBookingStep,
    booking,
    setBooking,
    resetBooking,
  } = useAppStore();

  const [selectedServices, setSelectedServices] = useState<Service[]>(
    booking.services
  );
  const [selectedStylist, setSelectedStylist] = useState<Stylist | undefined>(
    booking.stylist
  );
  const [calendarOffset, setCalendarOffset] = useState(0);
  const days = useMemo(() => generateCalendarDays(calendarOffset), [calendarOffset]);
  const [selectedDateKey, setSelectedDateKey] = useState<string | undefined>(
    booking.date
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    booking.time
  );
  const [form, setForm] = useState({
    name: booking.customerName ?? "",
    phone: booking.customerPhone ?? "",
    email: booking.customerEmail ?? "",
    note: booking.customerNote ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const total = useMemo(
    () => selectedServices.reduce((s, x) => s + x.price, 0),
    [selectedServices]
  );
  const totalDuration = useMemo(
    () => selectedServices.reduce((s, x) => s + x.duration, 0),
    [selectedServices]
  );

  const toggleService = (s: Service) => {
    setSelectedServices((prev) =>
      prev.find((x) => x.id === s.id)
        ? prev.filter((x) => x.id !== s.id)
        : [...prev, s]
    );
  };

  const canNext = useMemo(() => {
    if (currentBookingStep === 1) return selectedServices.length > 0;
    if (currentBookingStep === 2) return !!selectedStylist;
    if (currentBookingStep === 3) return !!selectedDateKey;
    if (currentBookingStep === 4) return !!selectedTime;
    if (currentBookingStep === 5) return form.name.trim() && /^[0-9-\s]{9,}$/.test(form.phone);
    return true;
  }, [currentBookingStep, selectedServices, selectedStylist, selectedDateKey, selectedTime, form]);

  const next = () => {
    if (currentBookingStep === 5) {
      const e: Record<string, string> = {};
      if (!form.name.trim()) e.name = "Vui lòng nhập họ tên";
      if (!/^[0-9-\s]{9,}$/.test(form.phone)) e.phone = "Số điện thoại không hợp lệ";
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "Email không hợp lệ";
      setErrors(e);
      if (Object.keys(e).length) return;
    }
    setCurrentBookingStep(Math.min(6, currentBookingStep + 1));
  };
  const back = () => setCurrentBookingStep(Math.max(1, currentBookingStep - 1));

  const submit = () => {
    setSubmitting(true);
    setBooking({
      services: selectedServices,
      stylist: selectedStylist,
      date: selectedDateKey,
      time: selectedTime,
      customerName: form.name,
      customerPhone: form.phone,
      customerEmail: form.email,
      customerNote: form.note,
      totalPrice: total,
    });
    setTimeout(() => {
      setSubmitting(false);
      resetBooking();
      navigate("/confirmation");
    }, 900);
  };

  const selectedDate = days.find((d) => d.key === selectedDateKey)?.date;
  const dateLabel = selectedDate
    ? `${selectedDate.getDate()} tháng ${selectedDate.getMonth() + 1}, ${selectedDate.getFullYear()}`
    : "";

  return (
    <div className="animate-fade-up pt-6 md:pt-10">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
          <div>
            <span className="chip-accent w-fit mb-3 inline-flex">
              <Sparkles className="h-3.5 w-3.5" /> Đặt lịch 6 bước
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.05]">
              Đặt lịch tại <span className="text-gradient-luxury">Hypersoft</span>
            </h1>
            <p className="text-text-secondary mt-3 max-w-xl">
              Quy trình ngắn gọn, trực quan — bạn sẽ hoàn thành chỉ trong 90 giây.
            </p>
          </div>
          <div className="glass-card rounded-2xl px-4 py-3 inline-flex items-center gap-5 text-xs w-fit">
            <div className="flex items-center gap-2 text-text-secondary">
              <Clock className="h-4 w-4 text-accent-gold" />
              Tổng thời gian: <span className="text-text-primary font-semibold">{totalDuration || 0} phút</span>
            </div>
            <div className="h-5 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-text-secondary">
              <FileText className="h-4 w-4 text-accent-gold" />
              <span className="text-text-primary font-semibold">Bước {currentBookingStep}/6</span>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="mb-8 md:mb-10">
          <div className="hidden md:block">
            <div className="relative glass-card rounded-3xl p-5 md:p-6">
              <div className="absolute left-[8%] right-[8%] top-1/2 h-0.5 bg-white/8 -translate-y-1/2" />
              <div
                className="absolute left-[8%] top-1/2 h-0.5 bg-gradient-to-r from-accent-gold to-accent -translate-y-1/2 transition-all duration-500"
                style={{ width: `${((currentBookingStep - 1) / 5) * 84}%` }}
              />
              <div className="relative grid grid-cols-6 items-start">
                {steps.map((s) => {
                  const Icon = s.icon;
                  const done = currentBookingStep > s.n;
                  const active = currentBookingStep === s.n;
                  return (
                    <div
                      key={s.n}
                      className="flex flex-col items-center gap-2.5"
                    >
                      <span
                        className={cn(
                          "relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-all",
                          done && "bg-gradient-to-b from-accent-gold to-accent text-ink-base shadow-glow",
                          active && "bg-gradient-to-b from-accent/25 to-accent/5 text-accent-gold border border-accent/40 shadow-glow",
                          !done && !active && "glass text-text-muted"
                        )}
                      >
                        {done ? (
                          <Check className="h-5 w-5 stroke-[3]" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </span>
                      <div className="text-center">
                        <div
                          className={cn(
                            "text-xs uppercase tracking-widest mb-0.5",
                            active ? "text-accent-gold" : "text-text-muted"
                          )}
                        >
                          Bước {s.n}
                        </div>
                        <div
                          className={cn(
                            "text-sm font-semibold",
                            active ? "text-text-primary" : "text-text-secondary"
                          )}
                        >
                          {s.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="md:hidden glass-card rounded-3xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-gold to-accent transition-all duration-500"
                  style={{ width: `${(currentBookingStep / 6) * 100}%` }}
                />
              </div>
              <div className="text-xs text-text-muted">{currentBookingStep}/6</div>
            </div>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-1 -mx-1 px-1">
              {steps.map((s) => {
                const Icon = s.icon;
                const done = currentBookingStep > s.n;
                const active = currentBookingStep === s.n;
                return (
                  <div
                    key={s.n}
                    className={cn(
                      "snap-start shrink-0 flex items-center gap-1.5 px-2.5 h-9 rounded-full transition",
                      active && "bg-gradient-to-r from-accent/25 to-accent/5 border border-accent/30 text-accent-gold",
                      !active && done && "bg-white/[0.06] text-text-primary",
                      !active && !done && "bg-white/[0.03] text-text-muted"
                    )}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                    <span className="text-[11px] font-medium whitespace-nowrap">{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* STEP CONTENT */}
          <div className="lg:col-span-8">
            <div className="glass-card rounded-4xl p-5 md:p-8 min-h-[520px]">
              {currentBookingStep === 1 && (
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="h-9 w-9 inline-flex items-center justify-center rounded-2xl bg-accent/15 border border-accent/30 text-accent-gold">
                      <Scissors className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                        Chọn dịch vụ bạn muốn
                      </h2>
                      <p className="text-sm text-text-muted">
                        Có thể chọn nhiều dịch vụ cùng lúc.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                    {services.map((s) => (
                      <div key={s.id}>
                        <ServiceCard
                          service={s}
                          showBookButton={false}
                          onSelect={toggleService}
                          isSelected={!!selectedServices.find((x) => x.id === s.id)}
                          dense
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentBookingStep === 2 && (
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="h-9 w-9 inline-flex items-center justify-center rounded-2xl bg-accent/15 border border-accent/30 text-accent-gold">
                      <UserCheck className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                        Chọn stylist đồng hành
                      </h2>
                      <p className="text-sm text-text-muted">
                        Đội ngũ chuyên nghiệp với nhiều năm kinh nghiệm.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                    {stylists.map((st) => {
                      const active = selectedStylist?.id === st.id;
                      return (
                        <button
                          key={st.id}
                          onClick={() => setSelectedStylist(st)}
                          className={cn(
                            "text-left glass-card rounded-3xl p-5 transition-all duration-500 relative overflow-hidden",
                            active && "ring-2 ring-accent/60 shadow-glow"
                          )}
                        >
                          {active && (
                            <span className="absolute top-4 right-4 h-9 w-9 rounded-full bg-gradient-to-b from-accent-gold to-accent inline-flex items-center justify-center text-ink-base shadow-glow">
                              <Check className="h-4 w-4 stroke-[3]" />
                            </span>
                          )}
                          <div className="flex items-start gap-4">
                            <div className="relative shrink-0">
                              <div className="h-20 w-20 rounded-2xl overflow-hidden border border-white/10">
                                <img
                                  src={st.avatar}
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span className="absolute -bottom-1 -right-1 chip-accent backdrop-blur-md !py-0.5 !px-2 !text-[10px]">
                                <Star className="h-2.5 w-2.5 fill-current text-ink-base" />
                                {st.rating}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline justify-between gap-2">
                                <h3 className="font-display text-lg font-semibold tracking-tight">
                                  {st.name}
                                </h3>
                                <span className="text-xs text-text-muted">
                                  {st.experienceYears} năm
                                </span>
                              </div>
                              <p className="text-xs uppercase tracking-widest text-text-muted mb-2.5">
                                Senior Stylist
                              </p>
                              <p className="text-sm text-text-secondary italic mb-3 line-clamp-2">
                                "{st.quote}"
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {st.specialty.slice(0, 3).map((sp) => (
                                  <span key={sp} className="chip">
                                    {sp}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentBookingStep === 3 && (
                <div>
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="h-9 w-9 inline-flex items-center justify-center rounded-2xl bg-accent/15 border border-accent/30 text-accent-gold">
                        <CalendarDays className="h-4.5 w-4.5" />
                      </span>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                          Chọn ngày đặt lịch
                        </h2>
                        <p className="text-sm text-text-muted">
                          Ngày có màu <span className="text-accent-gold">cam</span> là còn trống.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCalendarOffset((v) => Math.max(0, v - 1))}
                        className="h-10 w-10 rounded-xl glass hover:text-accent-gold transition inline-flex items-center justify-center"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setCalendarOffset((v) => v + 1)}
                        className="h-10 w-10 rounded-xl glass hover:text-accent-gold transition inline-flex items-center justify-center"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5 md:gap-2">
                    {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
                      <div
                        key={d}
                        className="text-center text-xs uppercase tracking-widest text-text-muted py-2"
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1.5 md:gap-2">
                    {days.map((d) => {
                      const selected = selectedDateKey === d.key;
                      return (
                        <button
                          key={d.key}
                          disabled={d.disabled}
                          onClick={() => !d.disabled && setSelectedDateKey(d.key)}
                          className={cn(
                            "relative rounded-2xl py-3 md:py-4 text-sm transition-all",
                            d.disabled && "opacity-40 cursor-not-allowed",
                            !d.disabled && !selected && !d.hasSlots && "text-text-muted glass",
                            !d.disabled && !selected && d.hasSlots && "text-text-primary glass hover:border-accent/30 hover:bg-accent/5 hover:text-accent-gold",
                            selected &&
                              "bg-gradient-to-b from-accent to-accent-burnt text-ink-base shadow-glow scale-[1.02] font-semibold"
                          )}
                        >
                          <div className="text-[10px] md:text-xs opacity-80">
                            {d.weekday}
                          </div>
                          <div className="text-lg md:text-2xl font-bold leading-tight">
                            {d.day}
                          </div>
                          <div className="text-[10px] opacity-70">
                            Th{d.month}
                          </div>
                          {!d.disabled && d.hasSlots && !selected && (
                            <span className="mx-auto mt-1 block h-1 w-1 rounded-full bg-accent" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentBookingStep === 4 && (
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="h-9 w-9 inline-flex items-center justify-center rounded-2xl bg-accent/15 border border-accent/30 text-accent-gold">
                      <Clock className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                        Chọn khung giờ phù hợp
                      </h2>
                      <p className="text-sm text-text-muted">
                        {dateLabel || "Vui lòng quay lại chọn ngày."}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 md:gap-3">
                    {timeSlots.map((t, i) => {
                      const disabled = i % 7 === 3;
                      const selected = selectedTime === t;
                      return (
                        <button
                          key={t}
                          disabled={disabled}
                          onClick={() => !disabled && setSelectedTime(t)}
                          className={cn(
                            "h-14 md:h-16 rounded-2xl font-semibold tracking-tight transition-all",
                            disabled &&
                              "opacity-40 line-through decoration-text-muted/60 cursor-not-allowed glass text-text-muted",
                            !disabled &&
                              !selected &&
                              "glass text-text-primary hover:border-accent/40 hover:bg-accent/5 hover:text-accent-gold hover:shadow-glow active:scale-95",
                            selected &&
                              "bg-gradient-to-b from-accent-gold to-accent text-ink-base shadow-glow scale-[1.02]"
                          )}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-text-muted">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-5 w-10 rounded-md glass" />
                      Còn trống
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-5 w-10 rounded-md bg-gradient-to-b from-accent-gold to-accent" />
                      Đã chọn
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-5 w-10 rounded-md glass opacity-40 line-through" />
                      Đã đầy
                    </div>
                  </div>
                </div>
              )}

              {currentBookingStep === 5 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="h-9 w-9 inline-flex items-center justify-center rounded-2xl bg-accent/15 border border-accent/30 text-accent-gold">
                      <User2 className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                        Thông tin liên hệ
                      </h2>
                      <p className="text-sm text-text-muted">
                        Thông tin này giúp chúng tôi xác nhận lịch nhanh hơn.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-text-muted mb-2 inline-flex items-center gap-1">
                        Họ và tên <span className="text-danger">*</span>
                      </label>
                      <div className="relative">
                        <User2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                        <input
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          placeholder="Nguyễn Văn A"
                          className={cn(
                            "luxury-input pl-11",
                            errors.name && "border-danger/60 ring-danger/30 shadow-none"
                          )}
                        />
                      </div>
                      {errors.name && (
                        <div className="text-xs text-danger mt-2 flex items-center gap-1">
                          <Info className="h-3.5 w-3.5" />
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-text-muted mb-2 inline-flex items-center gap-1">
                        Số điện thoại <span className="text-danger">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                        <input
                          value={form.phone}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, phone: e.target.value }))
                          }
                          placeholder="090 123 45 67"
                          className={cn(
                            "luxury-input pl-11",
                            errors.phone && "border-danger/60"
                          )}
                        />
                      </div>
                      {errors.phone && (
                        <div className="text-xs text-danger mt-2 flex items-center gap-1">
                          <Info className="h-3.5 w-3.5" />
                          {errors.phone}
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs uppercase tracking-widest text-text-muted mb-2 inline-flex items-center gap-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                        <input
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          placeholder="email@example.com"
                          className={cn(
                            "luxury-input pl-11",
                            errors.email && "border-danger/60"
                          )}
                        />
                      </div>
                      {errors.email && (
                        <div className="text-xs text-danger mt-2 flex items-center gap-1">
                          <Info className="h-3.5 w-3.5" />
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs uppercase tracking-widest text-text-muted mb-2 inline-flex items-center gap-1">
                        Ghi chú cho stylist
                      </label>
                      <textarea
                        value={form.note}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, note: e.target.value }))
                        }
                        rows={4}
                        placeholder="Ví dụ: cắt mái che trán, không để quá ngắn..."
                        className="luxury-input resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentBookingStep === 6 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="h-9 w-9 inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-accent-gold to-accent text-ink-base shadow-glow">
                      <CheckCircle2 className="h-5 w-5 stroke-[2.5]" />
                    </span>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                        Xác nhận thông tin đặt lịch
                      </h2>
                      <p className="text-sm text-text-muted">
                        Kiểm tra lại một lần nữa trước khi xác nhận.
                      </p>
                    </div>
                  </div>
                  <div className="divide-y divide-white/5 rounded-3xl glass overflow-hidden">
                    <div className="p-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="h-10 w-10 rounded-2xl bg-white/[0.05] inline-flex items-center justify-center">
                          <Scissors className="h-5 w-5 text-accent-gold" />
                        </span>
                        <div>
                          <div className="text-xs uppercase tracking-widest text-text-muted">
                            Dịch vụ ({selectedServices.length})
                          </div>
                          <div className="font-semibold mt-0.5">
                            {selectedServices.length
                              ? selectedServices.map((s) => s.name).join(" + ")
                              : "Chưa chọn"}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-text-muted">Tổng cộng</div>
                        <div className="text-gradient-luxury font-bold">
                          {formatVND(total)}
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex items-center gap-3">
                      <span className="h-10 w-10 rounded-2xl bg-white/[0.05] inline-flex items-center justify-center shrink-0">
                        <UserCheck className="h-5 w-5 text-accent-gold" />
                      </span>
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs uppercase tracking-widest text-text-muted">
                            Stylist
                          </div>
                          <div className="font-semibold truncate">
                            {selectedStylist?.name || "Chưa chọn"}
                          </div>
                        </div>
                        {selectedStylist && (
                          <span className="chip-accent">
                            <Star className="h-3 w-3 fill-current text-ink-base" /> {selectedStylist.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-5 flex items-center gap-3">
                      <span className="h-10 w-10 rounded-2xl bg-white/[0.05] inline-flex items-center justify-center shrink-0">
                        <CalendarDays className="h-5 w-5 text-accent-gold" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs uppercase tracking-widest text-text-muted">
                          Ngày giờ
                        </div>
                        <div className="font-semibold">
                          {dateLabel || "Chưa chọn ngày"} · {selectedTime || "Chưa chọn giờ"}
                        </div>
                      </div>
                      <div className="chip">
                        <Clock className="h-3 w-3" /> {totalDuration} phút
                      </div>
                    </div>
                    <div className="p-5 flex items-start gap-3">
                      <span className="h-10 w-10 rounded-2xl bg-white/[0.05] inline-flex items-center justify-center shrink-0">
                        <User2 className="h-5 w-5 text-accent-gold" />
                      </span>
                      <div className="flex-1">
                        <div className="text-xs uppercase tracking-widest text-text-muted">
                          Khách hàng
                        </div>
                        <div className="font-semibold">{form.name || "Chưa nhập"}</div>
                        <div className="text-sm text-text-secondary flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                          {form.phone && (
                            <span className="inline-flex items-center gap-1">
                              <Phone className="h-3.5 w-3.5" /> {form.phone}
                            </span>
                          )}
                          {form.email && (
                            <span className="inline-flex items-center gap-1">
                              <Mail className="h-3.5 w-3.5" /> {form.email}
                            </span>
                          )}
                        </div>
                        {form.note && (
                          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-text-secondary">
                            <span className="inline-flex items-center gap-1 text-text-muted text-xs mb-1">
                              <Info className="h-3.5 w-3.5" /> Ghi chú
                            </span>
                            <div>{form.note}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-5 flex items-start gap-3">
                      <span className="h-10 w-10 rounded-2xl bg-white/[0.05] inline-flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-accent-gold" />
                      </span>
                      <div className="flex-1">
                        <div className="text-xs uppercase tracking-widest text-text-muted">
                          Địa điểm
                        </div>
                        <div className="font-semibold">Hypersoft</div>
                        <div className="text-sm text-text-secondary">
                          123 Hai Bà Trưng, Quận 1, TP.Hồ Chí Minh
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-white/5">
                {currentBookingStep > 1 ? (
                  <Button variant="secondary" onClick={back}>
                    <ArrowLeft className="h-4 w-4" /> Quay lại
                  </Button>
                ) : (
                  <Link to="/">
                    <Button variant="secondary">
                      <ArrowLeft className="h-4 w-4" /> Về trang chủ
                    </Button>
                  </Link>
                )}
                <div className="flex gap-3">
                  {currentBookingStep < 6 ? (
                    <Button onClick={next} disabled={!canNext}>
                      Tiếp tục <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={submit}
                      disabled={!canNext || submitting}
                      size="lg"
                      className="min-w-[220px]"
                    >
                      {submitting ? (
                        <span className="inline-flex items-center gap-2">
                          <Sparkles className="h-4 w-4 animate-pulse-soft" />
                          Đang xác nhận...
                        </span>
                      ) : (
                        <>
                          Xác nhận đặt lịch
                          <Check className="h-4 w-4 stroke-[3]" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-4">
            <div className="glass-card rounded-4xl p-6 sticky top-32 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="chip-accent w-fit mb-1.5">Tóm tắt</div>
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    Đơn hàng
                  </h3>
                </div>
                <button className="h-9 w-9 rounded-xl glass inline-flex items-center justify-center text-text-muted hover:text-accent-gold transition">
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              {selectedServices.length === 0 && (
                <div className="rounded-2xl border border-dashed border-white/10 p-5 text-center">
                  <div className="chip mb-3 !px-3">Chưa có dịch vụ</div>
                  <p className="text-sm text-text-secondary">
                    Hãy bắt đầu bằng việc chọn một dịch vụ bạn yêu thích.
                  </p>
                </div>
              )}

              <div className="space-y-3 max-h-64 overflow-auto pr-1 scrollbar-hide">
                {selectedServices.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-3 rounded-2xl bg-white/[0.03] border border-white/5 p-2.5"
                  >
                    <div className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden border border-white/5">
                      <img src={s.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{s.name}</div>
                      <div className="text-xs text-text-muted">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {s.duration} phút
                      </div>
                    </div>
                    <div className="text-sm font-semibold shrink-0 text-accent-gold">
                      {formatVND(s.price)}
                    </div>
                  </div>
                ))}
              </div>

              {selectedStylist && (
                <div className="flex items-center gap-3 rounded-2xl glass p-3">
                  <div className="h-11 w-11 rounded-xl overflow-hidden border border-white/10 shrink-0">
                    <img src={selectedStylist.avatar} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-widest text-text-muted">
                      Stylist
                    </div>
                    <div className="font-semibold truncate">{selectedStylist.name}</div>
                  </div>
                  <span className="chip-accent !py-0.5 !px-2 !text-[10px]">
                    <Star className="h-2.5 w-2.5 fill-current text-ink-base" />
                    {selectedStylist.rating}
                  </span>
                </div>
              )}

              <div className="space-y-2.5 pt-4 border-t border-white/5 text-sm">
                <div className="flex items-center justify-between text-text-secondary">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-accent-gold" />
                    Ngày
                  </span>
                  <span className="text-text-primary">{dateLabel || "Chưa chọn"}</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent-gold" />
                    Giờ
                  </span>
                  <span className="text-text-primary">{selectedTime || "Chưa chọn"}</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent-gold" />
                    Tổng thời gian
                  </span>
                  <span className="text-text-primary">{totalDuration || 0} phút</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-end justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-text-muted">
                    Tổng cộng
                  </span>
                  <span className="text-gradient-luxury text-3xl font-bold">
                    {formatVND(total)}
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-accent/20 bg-accent/[0.07] p-3 text-xs text-text-secondary">
                  <Sparkles className="h-4 w-4 text-accent-gold shrink-0 mt-0.5" />
                  <div>
                    Thành viên vàng được giảm thêm{" "}
                    <span className="text-accent-gold font-semibold">10%</span> khi
                    thanh toán tại quầy.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
