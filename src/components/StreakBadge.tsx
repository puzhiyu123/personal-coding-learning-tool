"use client";

import { cn } from "@/lib/utils";

interface StreakBadgeProps {
  streak: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function StreakBadge({
  streak,
  size = "md",
  showLabel = true,
}: StreakBadgeProps) {
  const getColor = () => {
    if (streak >= 30) return "text-amber-400";
    if (streak >= 14) return "text-orange-400";
    if (streak >= 7) return "text-coral-400";
    if (streak >= 3) return "text-coral-300";
    return "text-sand-400";
  };

  const getBgColor = () => {
    if (streak >= 30) return "bg-amber-500/20";
    if (streak >= 14) return "bg-orange-500/20";
    if (streak >= 7) return "bg-coral-500/20";
    if (streak >= 3) return "bg-coral-500/10";
    return "bg-sand-800";
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-2 gap-2",
  };

  const iconSize = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  if (streak === 0) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        getColor(),
        getBgColor(),
        sizeClasses[size]
      )}
    >
      <svg
        className={iconSize[size]}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 23a7.5 7.5 0 0 0 7.5-7.5c0-4.5-3.5-8.5-6-11.5C12 6 11 8 10 9.5c-1.5-2-3-3.5-3-3.5S3 10 3 15.5A7.5 7.5 0 0 0 12 23zm-2-3a4.5 4.5 0 0 1-2.5-4c0-2 1.5-3.5 2.5-4.5 1 1 2.5 2.5 2.5 4.5A4.5 4.5 0 0 1 10 20z" />
      </svg>
      {streak}
      {showLabel && (
        <span className="font-normal opacity-75">
          {streak === 1 ? "day" : "days"}
        </span>
      )}
    </span>
  );
}
