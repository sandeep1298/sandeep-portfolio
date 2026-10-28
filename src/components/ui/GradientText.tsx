import type { ElementType, ReactNode } from "react";

interface GradientTextProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Animated teal → purple → orange gradient text. */
export default function GradientText({ as: Tag = "span", className = "", children }: GradientTextProps) {
  return (
    <Tag
      className={`animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text font-display font-extrabold text-transparent ${className}`}
    >
      {children}
    </Tag>
  );
}
