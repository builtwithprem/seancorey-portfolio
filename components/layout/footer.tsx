import Link from "next/link";

export function Footer() {
  return (
    <footer data-section-theme="dark" className="bg-[#253631]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 flex items-center justify-center">
        <p className="text-base text-white/70 font-sans text-center leading-relaxed">
          Built with love by a human + AI
          <span className="mx-3 text-white/40">&nbsp; | &nbsp;</span>
          <Link
            href="mailto:sean@seancorey.net"
            className="hover:text-white/70 transition-colors duration-200"
          >
            sean@seancorey.net
          </Link>
          <span className="mx-3 text-white/40">&nbsp; | &nbsp;</span>
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
