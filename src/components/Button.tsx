import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      "bg-gradient-to-b from-accent to-accent-burnt text-ink-base shadow-[0_0_0_1px_rgba(244,184,96,0.35),0_10px_40px_-12px_rgba(217,119,6,0.45)] hover:shadow-[0_0_0_1px_rgba(244,184,96,0.55),0_18px_60px_-12px_rgba(217,119,6,0.65)] hover:brightness-105",
    secondary:
      "bg-white/[0.05] border border-white/10 text-text-primary hover:bg-white/[0.08] hover:border-white/15 backdrop-blur",
    ghost:
      "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/[0.05]",
    outline:
      "border border-white/15 text-text-primary hover:border-accent/60 hover:text-accent-gold hover:bg-accent/5 backdrop-blur",
  };

  const sizes = {
    sm: "px-4 py-2 min-h-[40px] text-sm rounded-xl",
    md: "px-5 py-3 min-h-[48px] text-sm md:text-base rounded-2xl",
    lg: "px-8 py-4 min-h-[56px] text-base md:text-lg rounded-2xl font-semibold",
  };

  return (
    <button
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
        (e.currentTarget as HTMLButtonElement).style.setProperty(
          "--rx",
          `${((e.clientX - rect.left) / rect.width) * 100}%`
        );
      }}
      className={cn(
        "btn-ripple inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 ease-out transform active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 select-none tracking-tight",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
