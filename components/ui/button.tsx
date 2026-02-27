import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type ButtonTone = "primary" | "secondary";

type BaseProps = {
  children: ReactNode;
  tone?: ButtonTone;
  className?: string;
};

type LuminaButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LuminaLinkButtonProps = BaseProps & {
  href: string;
};

function getToneClass(tone: ButtonTone) {
  return tone === "primary" ? "lumina-btn lumina-btn-primary" : "lumina-btn lumina-btn-secondary";
}

export function LuminaButton({ children, tone = "primary", className = "", ...props }: LuminaButtonProps) {
  return (
    <button {...props} className={`${getToneClass(tone)} ${className}`.trim()}>
      {children}
    </button>
  );
}

export function LuminaLinkButton({ href, children, tone = "secondary", className = "" }: LuminaLinkButtonProps) {
  return (
    <Link href={href} className={`${getToneClass(tone)} ${className}`.trim()}>
      {children}
    </Link>
  );
}

