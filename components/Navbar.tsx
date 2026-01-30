// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { locales } from "../i18n";

type NavbarProps = {
  locale: string;
  navItems: {
    home: string;
    blog: string;
    about: string;
    contact: string;
  };
};

export function Navbar({ locale, navItems }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (newLocale: string) => {
    const currentPath = window.location.pathname.replace(`/${locale}`, "");
    window.location.href = `/${newLocale}${currentPath || ""}`;
  };

  return (
    <header>
      <div
        className={`fixed left-0 right-0 z-50 transition-all duration-300 bg-letter ${
          scrolled ? "top-0 bg-letter shadow-md" : "-top-12"
        }`}
      >
        <section className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link
            href={`/${locale}`}
            className={`text-[2rem] font-bold transition-colors 
             ${scrolled ? "text-primary" : "text-white"}`}
          >
            Isaelle
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-16">
            <Link
              href={`/${locale}/`}
              className={`font-medium text-[1.5rem] transition-colors ${
                scrolled
                  ? "text-primary hover:text-primary/90"
                  : "text-white hover:text-white/90"
              }`}
            >
              {navItems.home}
            </Link>

            <Link
              href={`/${locale}/blog`}
              className={`font-medium text-[1.5rem] transition-colors ${
                scrolled
                  ? "text-primary hover:text-primary/90"
                  : "text-white hover:text-white/90"
              }`}
            >
              {navItems.blog}
            </Link>

            <Link
              href={`/${locale}/about`}
              className={`font-medium text-[1.5rem] transition-colors ${
                scrolled
                  ? "text-primary hover:text-primary/90"
                  : "text-white hover:text-white/90"
              }`}
            >
              {navItems.about}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className={`font-medium text-[1.5rem] transition-colors ${
                scrolled
                  ? "text-primary hover:text-primary/90"
                  : "text-white hover:text-white/90"
              }`}
            >
              {navItems.contact}
            </Link>
          </nav>
          <div className="flex space-x-2 ml-4">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLanguage(loc)}
                className={`px-3 py-1 rounded-md text-md font-medium transition-colors ${
                  locale === loc
                    ? "bg-gray-950 text-white"
                    : scrolled
                      ? "bg-white/80 text-black"
                      : "bg-white/30 text-white"
                }`}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>
        </section>
      </div>
    </header>
  );
}
