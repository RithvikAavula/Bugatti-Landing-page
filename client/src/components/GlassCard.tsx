import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  neonBorder?: boolean;
}

export function GlassCard({ children, className, neonBorder = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-md overflow-hidden relative group",
        neonBorder && "p-[1px]",
        className
      )}
    >
      {neonBorder && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity animate-shimmer bg-[length:200%_auto]" />
      )}
      <div
        className={cn(
          "relative rounded-md p-6",
          "backdrop-blur-xl bg-card/50 border border-card-border/50"
        )}
        style={{
          background: "linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(14, 165, 233, 0.02) 100%)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
