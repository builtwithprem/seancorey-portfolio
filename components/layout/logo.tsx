"use client";

import { useState } from "react";
import Link from "next/link";

// No sectionDark prop — color is inherited from parent motion.nav in navbar.tsx
export function Logo() {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
      {/* Circular headshot */}
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
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

      {/* Name — no color class, inherits from parent */}
      <span className="font-display font-semibold text-[1.2rem] tracking-tight">
        Sean Corey
      </span>
    </Link>
  );
}
