"use client";

import Link from "next/link";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const socialLinks = [
  { href: "https://linkedin.com/in/seancorey",  label: "LinkedIn"    },
  { href: "https://twitter.com/seancorey",       label: "Twitter / X" },
  { href: "https://github.com/builtwithprem",    label: "GitHub"      },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-section-theme="dark"
      className="bg-[#253631]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {/* Main row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
          {/* Left: name + tagline */}
          <div>
            <button
              onClick={() => scrollTo("hero")}
              className="font-display font-bold text-xl text-white hover:opacity-70 transition-opacity block cursor-pointer mb-1"
            >
              Sean Corey
            </button>
            <p className="text-sm text-white/40 font-sans">
              Web designer + AI strategist
            </p>
          </div>

          {/* Right: email + social */}
          <div className="flex flex-col md:items-end gap-3">
            <Link
              href="mailto:sean@seancorey.net"
              className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-sans"
            >
              sean@seancorey.net
            </Link>
            <div className="flex gap-5">
              {socialLinks.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/30 hover:text-white transition-colors duration-200 font-sans"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright — no border */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/25 font-sans">
            © {year} Sean Corey. All rights reserved.
          </p>
          <p className="text-xs text-white/25 font-sans">
            Built with love by a human + AI.
          </p>
        </div>

      </div>
    </footer>
  );
}
