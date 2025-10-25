"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Apply theme to root vars
  const applyTheme = (mode: "light" | "dark") => {
    const root = document.documentElement;

    if (mode === "light") {
      root.style.setProperty("--background", "#ffffff");
      root.style.setProperty("--foreground", "#171717");
    } else {
      root.style.setProperty("--background", "#0a0a0a");
      root.style.setProperty("--foreground", "#ededed");
    }

    setTheme(mode);
    localStorage.setItem("theme", mode);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(savedTheme || (prefersDark ? "dark" : "light"));
  }, []);

  // Navbar background + scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    applyTheme(theme === "light" ? "dark" : "light");
  };

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    const section = document.querySelector(href);
    section?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white text-green-700 shadow-md dark:bg-[#0a0a0a] dark:text-green-400"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand */}
        <motion.a
          href="#home"
          className={`text-2xl font-bold tracking-tight ${
            scrolled
              ? "text-green-700 dark:text-green-400"
              : "bg-gradient-to-r from-green-200 to-emerald-400 bg-clip-text text-transparent"
          }`}
          whileHover={{ scale: 1.05 }}
        >
          Synapitch
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`relative font-medium transition-colors ${
                scrolled
                  ? "text-green-700 dark:text-green-400 hover:text-emerald-600 dark:hover:text-emerald-300"
                  : "text-white hover:text-green-200"
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 bottom-[-4px] h-[2px] w-0 transition-all duration-300 ${
                  scrolled
                    ? "bg-green-500 dark:bg-emerald-400 hover:w-full"
                    : "bg-white hover:w-full"
                }`}
              ></span>
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition ${
              scrolled
                ? "border-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
                : "border-white/50 hover:bg-white/10"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={18} className="text-inherit" />
            ) : (
              <Sun size={18} className="text-yellow-400" />
            )}
          </button>

          {/* Auth Button */}
          <button
            className={`ml-4 px-5 py-2 rounded-full font-medium transition ${
              scrolled
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-white text-green-700 hover:bg-green-200"
            }`}
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X size={24} className={`${scrolled ? "text-green-700 dark:text-green-400" : "text-white"}`} />
          ) : (
            <Menu size={24} className={`${scrolled ? "text-green-700 dark:text-green-400" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden px-6 py-4 ${
              scrolled
                ? "bg-white text-green-700 dark:bg-[#0a0a0a] dark:text-green-400"
                : "bg-green-800 text-white"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="block py-2 text-sm font-medium hover:underline"
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Bottom Controls */}
            <div className="flex justify-between items-center border-t border-white/10 dark:border-green-900 pt-4 mt-3">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-sm font-medium hover:text-green-400 transition"
              >
                {theme === "light" ? (
                  <>
                    <Moon size={16} /> Dark Mode
                  </>
                ) : (
                  <>
                    <Sun size={16} /> Light Mode
                  </>
                )}
              </button>

              <button className="px-4 py-2 rounded-full text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
