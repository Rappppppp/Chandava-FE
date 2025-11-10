import { FC } from "react";
import clsx from "clsx";

interface TitleProps {
  title: string;
  /** Tailwind color name or full class (e.g. "red-500" or "text-red-500") */
  color?: string;
  /** Optional size override */
  size?: "sm" | "md" | "lg" | "xl";
  /** Optional custom class for further control */
  className?: string;
}

/**
 * A flexible, type-safe Title component with dynamic color and size support.
 */
const Title: FC<TitleProps> = ({
  title,
  color = "primary",
  size = "md",
  className = "",
}) => {
  const textSize = {
    sm: "text-lg md:text-xl",
    md: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
    xl: "text-3xl md:text-4xl",
  }[size];

  // Prevent Tailwind purge issues by restricting dynamic parts
  const colorClass = color.startsWith("text-")
    ? color
    : `text-${color}`;

  return (
    <h1
      className={clsx(
        textSize,
        "font-bold mb-3",
        colorClass,
        className
      )}
    >
      {title}
    </h1>
  );
};

export default Title;
