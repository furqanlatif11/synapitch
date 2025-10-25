"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
  const [bgOpacity, setBgOpacity] = useState(0);

  // Calculate navbar background opacity based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Full opacity after 60% of hero section
      const opacity = Math.min(scrollY / (heroHeight * 0.6), 1);
      
      setBgOpacity(opacity);
      setScrolled(scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    const section = document.querySelector(href);
    section?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Calculate dynamic colors based on scroll
  const textColor = bgOpacity > 0.5 ? "text-gray-900" : "text-gray-900";
  const logoColor = bgOpacity > 0.5 ? "text-[var(--primary)]" : "bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent";
  const linkHoverColor = bgOpacity > 0.5 ? "hover:text-[var(--primary)]" : "hover:text-green-300";
  const buttonBgColor = bgOpacity > 0.5 ? "bg-[var(--primary)] hover:bg-[var(--primary-dark)]" : "bg-[var(--primary)] hover:bg-[var(--primary-dark)]";
  const mobileMenuBg = bgOpacity > 0.5 ? "bg-white text-gray-900" : "bg-green-900/95 text-white backdrop-blur-md";

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        backgroundColor: `rgba(255, 255, 255, ${bgOpacity})`,
        backdropFilter: `blur(${bgOpacity * 10}px)`,
        boxShadow: bgOpacity > 0.1 ? "0 1px 3px rgba(0, 0, 0, 0.05)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-4">
        {/* Brand */}
       <div>
         <motion.a
          href="#home"
          className={`text-2xl font-bold tracking-tight transition-colors duration-300 flex gap-3 items-center ${logoColor}`}
          whileHover={{ scale: 1.05 }}
        >
         <Image src="/assets/images/mainLogo.png" alt="Synapitch Logo" width={50} height={50}/> Synapitch
        </motion.a>
       </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`relative font-medium transition-colors duration-300 ${textColor} ${linkHoverColor}`}
            >
              {link.name}
              <motion.span
                className="absolute left-0 bottom-[-6px] h-[2px] bg-[var(--primary)]"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </a>
          ))}

          {/* Get Started Button */}
          <Link
            className={`ml-4 px-6 py-2 rounded-full font-semibold text-white transition-all duration-300 ${buttonBgColor}`}
            href='/auth/signup'
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden transition-colors duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ color: bgOpacity > 0.5 ? "#0a0a0a" : "#ffffff" }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className={`md:hidden px-6 py-6 border-t transition-all duration-300 ${
              bgOpacity > 0.5
                ? "bg-white border-gray-200 text-gray-900"
                : "bg-green-900/95 border-green-800 text-white backdrop-blur-md"
            }`}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="block py-3 text-base font-medium transition-colors hover:text-[var(--primary)]"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.name}
              </motion.a>
            ))}

            {/* Mobile CTA */}
            <motion.button
              className="w-full mt-6 px-6 py-3 rounded-full text-base font-semibold bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-all"
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}