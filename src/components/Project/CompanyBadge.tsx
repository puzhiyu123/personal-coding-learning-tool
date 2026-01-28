"use client";

import { cn } from "@/lib/utils";

interface CompanyBadgeProps {
  tier: 1 | 2 | 3 | 4;
  companyName: string;
  size?: "sm" | "md" | "lg";
}

const tierConfig = {
  1: {
    label: "Small Startup",
    color: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    icon: "S",
  },
  2: {
    label: "Growing Startup",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    icon: "M",
  },
  3: {
    label: "Series-E",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: "E",
  },
  4: {
    label: "Big-5",
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    icon: "B5",
  },
};

export default function CompanyBadge({ tier, companyName, size = "md" }: CompanyBadgeProps) {
  const config = tierConfig[tier];

  return (
    <div className="flex items-center gap-3">
      {/* Company Icon */}
      <div
        className={cn(
          "flex-shrink-0 rounded-lg flex items-center justify-center font-bold border",
          config.color,
          size === "sm" && "w-8 h-8 text-xs",
          size === "md" && "w-10 h-10 text-sm",
          size === "lg" && "w-14 h-14 text-lg"
        )}
      >
        {config.icon}
      </div>

      {/* Company Info */}
      <div>
        <h3
          className={cn(
            "font-semibold text-sand-100",
            size === "sm" && "text-sm",
            size === "md" && "text-base",
            size === "lg" && "text-xl"
          )}
        >
          {companyName}
        </h3>
        <span
          className={cn(
            "inline-block px-2 py-0.5 rounded text-xs font-medium border",
            config.color
          )}
        >
          {config.label}
        </span>
      </div>
    </div>
  );
}
