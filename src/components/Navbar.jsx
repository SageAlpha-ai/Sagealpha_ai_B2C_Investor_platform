import React, { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({
  logoSrc = "/logo/logo.png",
  links,
  onSignIn,
}) {
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () =>
      links ?? [
        { label: "Dashboard", href: "#dashboard" },
        { label: "Pricing", href: "#pricing" },
        { label: "Blog", href: "#blog" },
        { label: "Contact us", href: "#contact" },
      ],
    [links],
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2">
            <img
              src={logoSrc}
              className="h-16 w-auto sm:h-10 object-contain"
              loading="eager"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-slate-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => (onSignIn ? onSignIn() : null)}
              className="hidden md:inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-50 active:scale-[0.98] transition"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-900 shadow-sm hover:bg-slate-50 active:scale-[0.98] transition"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  if (onSignIn) onSignIn();
                }}
                className="mt-1 inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-50 active:scale-[0.98] transition"
              >
                Sign In
              </button>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}

