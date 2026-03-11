import type * as React from "react";

export type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

export type ButtonTone = "primary" | "secondary";
