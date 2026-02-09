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
    projects: string;
  };
};

export function Navbar({ locale, navItems }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (newLocale: string) => {
    const currentPath = window.location.pathname.replace(`/${locale}`, "");
    window.location.href = `/${newLocale}${currentPath || ""}`;
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header>
      <section
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "top-0 bg-letter shadow-md" : ""
        }`}
      >
        <section className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link
            href={`/${locale}`}
            className={`text-4xl font-bold transition-colors ${
              scrolled ? "text-primary" : "text-black"
            }`}
          >
            Isaelle
          </Link>

          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href={`/${locale}/`}
              className={`font-medium text-[1.5rem] transition-colors ${
                scrolled
                  ? "text-primary hover:text-primary/90"
                  : "text-black hover:text-gray-700"
              }`}
            >
              {navItems.home}
            </Link>

            <Link
              href={`/${locale}/blog`}
              className={`font-medium text-[1.5rem] transition-colors ${
                scrolled
                  ? "text-primary hover:text-primary/90"
                  : "text-black hover:text-gray-700"
              }`}
            >
              {navItems.blog}
            </Link>

            <Link
              href={`/${locale}/#about`}
              className={`font-medium text-[1.5rem] transition-colors ${
                scrolled
                  ? "text-primary hover:text-primary/90"
                  : "text-black hover:text-gray-700"
              }`}
            >
              {navItems.about}
            </Link>

            <Link
              href={`/${locale}/proyectos`}
              className={`font-medium text-[1.5rem] transition-colors ${
                scrolled
                  ? "text-primary hover:text-primary/90"
                  : "text-black hover:text-gray-700"
              }`}
            >
              {navItems.projects}
            </Link>

            <Link
              href={`/${locale}/#contact`}
              className={`font-medium text-[1.5rem] transition-colors ${
                scrolled
                  ? "text-primary hover:text-primary/90"
                  : "text-black hover:text-gray-700"
              }`}
            >
              {navItems.contact}
            </Link>
          </nav>

          {/* Language Switcher - Desktop */}
          <div className="hidden md:flex space-x-2 ml-4">
            {locales.map((loc: any) => (
              <button
                key={loc}
                onClick={() => switchLanguage(loc)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </section>

        {/* Mobile Menu - only visible on mobile when open */}
        {isMenuOpen && (
          <div className="md:hidden bg-letter border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              <div className="flex flex-col space-y-3">
                <Link
                  href={`/${locale}/`}
                  className="font-medium text-xl py-2 text-black hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navItems.home}
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className="font-medium text-xl py-2 text-black hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navItems.blog}
                </Link>
                <Link
                  href={`/${locale}/#about`}
                  className="font-medium text-xl py-2 text-black hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navItems.about}
                </Link>
                <Link
                  href={`/${locale}/proyectos`}
                  className="font-medium text-xl py-2 text-black hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navItems.projects}
                </Link>
                <Link
                  href={`/${locale}/#contact`}
                  className="font-medium text-xl py-2 text-black hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navItems.contact}
                </Link>
              </div>

              {/* Mobile Language Switcher */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-2xl font-medium text-gray-600 mb-4">
                  Idioma
                </p>
                <div className="flex space-x-2">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLanguage(loc)}
                      className={`px-3 py-1 rounded-md text-lg font-medium ${
                        locale === loc
                          ? "bg-gray-950 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {loc.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </header>
  );
}
