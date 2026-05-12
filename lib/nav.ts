import type React from "react";

export const NAV_LINKS = [
  { id: "hero",    label: "Home"    },
  { id: "work",    label: "Work"    },
  { id: "values",  label: "Values"  },
  { id: "about",   label: "About"   },
  { id: "contact", label: "Contact" },
] as const;

export function scrollToSection(id: string, e?: React.MouseEvent) {
  e?.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
