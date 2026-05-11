"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  sectionDark?: boolean;
}

export function Logo({ sectionDark }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* Circular headshot */}
      <div
        className={cn(
          "w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-1 transition-all duration-300",
          sectionDark
            ? "ring-white/20 group-hover:ring-white/40"
            : "ring-zinc-200 dark:ring-zinc-700 group-hover:ring-teal/40"
        )}
      >
        {imgError ? (
          <div className="w-full h-full bg-teal flex items-center justify-center">
            <span className="text-white text-[10px] font-display font-bold tracking-tight">
              SC
            </span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/headshot.jpg"
            alt="Sean Corey"
            className="w-full h-full object-cover object-[center_15%]"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Name */}
      <span
        className={cn(
          "font-display font-semibold text-base tracking-tight transition-colors duration-500",
          sectionDark ? "text-white" : "text-zinc-900 dark:text-white"
        )}
      >
        Sean Corey
      </span>
    </Link>
  );
}
