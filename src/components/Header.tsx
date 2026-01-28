"use client";

import Link from "next/link";
import { useState } from "react";
import { useThemeContext } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const { theme, setTheme, isDark } = useThemeContext();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/editor", label: "Editor" },
    { href: "/lessons", label: "Lessons" },
    { href: "/projects", label: "Projects" },
  ];

  const themeOptions = [
    { value: "light" as const, label: "Light", icon: "sun" },
    { value: "dark" as const, label: "Dark", icon: "moon" },
    { value: "system" as const, label: "System", icon: "computer" },
  ];

  const ThemeIcon = ({ type }: { type: string }) => {
    if (type === "sun") {
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    }
    if (type === "moon") {
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 h-14 md:h-16 border-b transition-colors",
        isDark
          ? "bg-sand-950/95 backdrop-blur-sm text-sand-100 border-sand-800"
          : "bg-white/95 backdrop-blur-sm text-sand-900 border-sand-200"
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="text-lg md:text-xl font-bold tracking-tight font-serif transition-colors hover:opacity-80"
      >
        <span className="text-primary-500">Code</span>
        <span className={isDark ? "text-sand-100" : "text-sand-900"}>Forge</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2">
        <nav className="flex gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isDark
                  ? "text-sand-300 hover:text-sand-100 hover:bg-sand-800"
                  : "text-sand-600 hover:text-sand-900 hover:bg-sand-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Theme Selector */}
        <div className="relative ml-2">
          <button
            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isDark
                ? "text-sand-400 hover:text-sand-100 hover:bg-sand-800"
                : "text-sand-500 hover:text-sand-900 hover:bg-sand-100"
            )}
            aria-label="Change theme"
            aria-expanded={themeMenuOpen}
          >
            <ThemeIcon type={theme === "system" ? "computer" : isDark ? "moon" : "sun"} />
          </button>
          {themeMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setThemeMenuOpen(false)}
              />
              <div
                className={cn(
                  "absolute right-0 mt-2 py-1 w-36 rounded-lg shadow-warm-lg z-50 border animate-scale-in",
                  isDark
                    ? "bg-sand-900 border-sand-700"
                    : "bg-white border-sand-200"
                )}
              >
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setTheme(option.value);
                      setThemeMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors",
                      theme === option.value
                        ? "text-primary-500"
                        : isDark
                          ? "text-sand-300 hover:bg-sand-800"
                          : "text-sand-600 hover:bg-sand-100"
                    )}
                  >
                    <ThemeIcon type={option.icon} />
                    {option.label}
                    {theme === option.value && (
                      <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Buttons */}
      <div className="flex md:hidden items-center gap-1">
        <button
          onClick={() => setThemeMenuOpen(!themeMenuOpen)}
          className={cn(
            "p-2 rounded-lg transition-colors",
            isDark
              ? "text-sand-400 hover:bg-sand-800"
              : "text-sand-500 hover:bg-sand-100"
          )}
          aria-label="Change theme"
        >
          <ThemeIcon type={theme === "system" ? "computer" : isDark ? "moon" : "sun"} />
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "p-2 rounded-lg transition-colors",
            isDark
              ? "text-sand-400 hover:bg-sand-800"
              : "text-sand-500 hover:bg-sand-100"
          )}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={cn(
            "absolute top-14 left-0 right-0 z-50 border-b md:hidden animate-slide-down",
            isDark
              ? "bg-sand-950 border-sand-800"
              : "bg-white border-sand-200"
          )}
        >
          <nav className="flex flex-col p-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg transition-colors",
                  isDark
                    ? "text-sand-300 hover:text-sand-100 hover:bg-sand-800"
                    : "text-sand-600 hover:text-sand-900 hover:bg-sand-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Mobile Theme Menu */}
      {themeMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setThemeMenuOpen(false)}
          />
          <div
            className={cn(
              "absolute top-14 right-4 z-50 py-1 w-36 rounded-lg shadow-warm-lg border md:hidden animate-scale-in",
              isDark
                ? "bg-sand-900 border-sand-700"
                : "bg-white border-sand-200"
            )}
          >
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setTheme(option.value);
                  setThemeMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors",
                  theme === option.value
                    ? "text-primary-500"
                    : isDark
                      ? "text-sand-300 hover:bg-sand-800"
                      : "text-sand-600 hover:bg-sand-100"
                )}
              >
                <ThemeIcon type={option.icon} />
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </header>
  );
}
