"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setScrolled] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  // Calculate navbar background opacity based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Full opacity after 60% of hero section
      const opacity = Math.min(scrollY / (heroHeight * 0.6), 1);
      
      setBgOpacity(opacity);
      setScrolled(scrollY > 40);

      // Detect active section
      const sections = navLinks.map(link => link.href.substring(1));
      let currentSection = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider section active if it's in the top half of viewport
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            currentSection = section;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    const section = document.querySelector(href);
    section?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const isActive = (href: string) => {
    return activeSection === href.substring(1);
  };

  // Calculate dynamic colors based on scroll
  const textColor = bgOpacity > 0.5 ? "text-gray-900" : "text-gray-900";
  const logoColor = bgOpacity > 0.5 ? "text-[var(--primary)]" : "bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent";
  const buttonBgColor = bgOpacity > 0.5 ? "bg-[var(--primary)] hover:bg-[var(--primary-dark)]" : "bg-[var(--primary)] hover:bg-[var(--primary-dark)]";

  return (
    <>
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
              <Image src="/assets/images/mainLogo.png" alt="Synapitch Logo" width={50} height={50}/> 
              Synapitch
            </motion.a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`relative font-medium transition-colors duration-300 ${
                  isActive(link.href) 
                    ? "text-emerald-600" 
                    : `${textColor} hover:text-emerald-600`
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute left-0 bottom-[-6px] h-[2px] bg-emerald-600 w-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
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
            className="md:hidden transition-colors duration-300 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: menuOpen ? "#059669" : (bgOpacity > 0.5 ? "#0a0a0a" : "#0a0a0a") }}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[70%] bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="px-6 py-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Image 
                      src="/assets/images/mainLogo.png" 
                      alt="Synapitch Logo" 
                      width={40} 
                      height={40}
                    />
                    <span className="text-xl font-bold text-emerald-600">
                      Synapitch
                    </span>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-8">
                  <nav className="space-y-2">
                    {navLinks.map((link, i) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleScrollTo(e, link.href)}
                        className={`block py-3 px-4 text-base font-medium rounded-lg transition-all ${
                          isActive(link.href)
                            ? "bg-emerald-50 text-emerald-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.1 }}
                      >
                        <div className="flex items-center justify-between">
                          {link.name}
                          {isActive(link.href) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-emerald-600 rounded-full"
                            />
                          )}
                        </div>
                      </motion.a>
                    ))}
                  </nav>
                </div>

                {/* Drawer Footer */}
                <div className="px-6 py-6 border-t border-gray-200">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      href="/auth/signup"
                      className="block w-full px-6 py-3 rounded-full text-center font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                      onClick={() => setMenuOpen(false)}
                    >
                      Get Started Free
                    </Link>
                  </motion.div>

                  {/* Optional: Social links or additional info */}
                  <p className="mt-4 text-xs text-center text-gray-500">
                    © 2024 Synapitch. All rights reserved.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}