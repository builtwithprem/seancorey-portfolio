import Link from "next/link";

export function Footer() {
  return (
    <footer data-section-theme="dark" className="bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 text-center">
        <span className="text-sm sm:text-base text-white/70 font-sans">Built with love by a human + AI</span>
        <span className="hidden sm:inline mx-3 text-white/30">&nbsp;|&nbsp;</span>
        <Link
          href="mailto:sean@seancorey.net"
          className="text-sm sm:text-base text-white/70 font-sans hover:text-white/90 transition-colors duration-200"
        >
          sean@seancorey.net
        </Link>
        <span className="hidden sm:inline mx-3 text-white/30">&nbsp;|&nbsp;</span>
        <span className="text-sm sm:text-base text-white/70 font-sans">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
