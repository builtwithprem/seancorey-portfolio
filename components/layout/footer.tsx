"use client";

import Link from "next/link";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const socialLinks = [
  { href: "https://linkedin.com/in/seancorey",   label: "LinkedIn"   },
  { href: "https://twitter.com/seancorey",        label: "Twitter / X" },
  { href: "https://github.com/builtwithprem",     label: "GitHub"     },
];

export function Footer() {
  return (
    <footer
      data-section-theme="dark"
      className="bg-[#253631] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <button
              onClick={() => scrollTo("hero")}
              className="font-display font-bold text-xl text-white mb-4 block cursor-pointer hover:opacity-70 transition-opacity"
            >
              Sean Corey
            </button>
            <p className="text-sm text-white/50 leading-relaxed font-sans max-w-xs">
              Senior web designer crafting considered digital experiences since 2005.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-white/40 mb-5 font-sans">
              Navigate
            </h3>
            <ul className="space-y-3">
              {[
                { id: "work",     label: "Work"     },
                { id: "services", label: "Services" },
                { id: "contact",  label: "Contact"  },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-sans cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-white/40 mb-5 font-sans">
              Get in touch
            </h3>
            <Link
              href="mailto:sean@seancorey.net"
              className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-sans block mb-6"
            >
              sean@seancorey.net
            </Link>
            <div className="flex flex-col gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/40 hover:text-white transition-colors duration-200 font-sans"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/35 font-sans">
            © 2026 Sean Corey. All rights reserved.
          </p>
          <p className="text-xs text-white/25 font-sans">
            Designed & built with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
