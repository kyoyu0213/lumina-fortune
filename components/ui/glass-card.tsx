import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return <section className={`lumina-glass-card rounded-2xl p-5 sm:p-6 ${className}`.trim()}>{children}</section>;
}

