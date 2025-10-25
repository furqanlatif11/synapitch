"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Github,
  ArrowRight,
  Heart,
  MapPin,
} from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Security", href: "#security" },
    { label: "Updates", href: "#updates" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press Kit", href: "/press" },
    { label: "Contact", href: "#contact" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/api" },
    { label: "Templates", href: "/templates" },
    { label: "Community", href: "/community" },
    { label: "Status", href: "/status" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "GDPR", href: "/gdpr" },
    { label: "Refund Policy", href: "/refunds" },
  ],
};

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Mail, label: "Email", href: "mailto:hello@synapitch.com" },
];

const newsletter = {
  title: "Stay Updated",
  description: "Get the latest tips and updates delivered to your inbox.",
  buttonText: "Subscribe",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@synapitch.com",
    href: "mailto:hello@synapitch.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: "#",
  },
];

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="w-full relative overflow-hidden border-t border-[var(--primary)]/10">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 z-0  bg-gradient-to-b from-white via-[#6dce8e] to-white"
        
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, var(--primary)/12 0%, transparent 70%)",
        }}
        animate={{ y: [0, 60, 0], x: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, var(--primary)/10 0%, transparent 70%)",
        }}
        animate={{ y: [0, -60, 0], x: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, var(--primary-light)/8 0%, transparent 70%)",
        }}
        animate={{ y: [0, 40, 0], x: [0, -60, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-4">
        {/* Top Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 md:gap-8 mb-16"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="mb-8">
              <motion.h2
                className="text-3xl font-bold text-gradient mb-3"
                whileHover={{ scale: 1.05 }}
              >
                Synapitch
              </motion.h2>
              <p className="text-gray-700 text-sm leading-relaxed max-w-xs">
                Transform the way you write freelance proposals. Powered by AI,
                built for success.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white border border-[var(--primary)]/20 rounded-lg text-[var(--primary)] hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/40 transition-all duration-300 shadow-sm"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], sectionIdx) => (
            <motion.div key={category} variants={itemVariants}>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">
                {category}
              </h4>
              <ul className="space-y-4">
                {links.map((link, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: sectionIdx * 0.1 + idx * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-700 hover:text-[var(--primary)] text-sm transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <motion.span
                        className="w-1 h-1 bg-[var(--primary)]/0 group-hover:bg-[var(--primary)] rounded-full transition-all duration-300"
                        whileHover={{ scale: 1.5 }}
                      />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white border border-[var(--primary)]/20 rounded-3xl p-8 md:p-12 mb-16 shadow-sm hover:shadow-md transition-shadow duration-300 backdrop-blur-sm bg-white/80"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {newsletter.title}
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                {newsletter.description}
              </p>
            </motion.div>

            {/* Newsletter Form */}
            <motion.form
              className="flex gap-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-grow px-6 py-3 rounded-lg border border-[var(--primary)]/20 bg-white focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 outline-none transition-all text-sm"
              />
              <motion.button
                type="submit"
                className="btn-primary px-6 py-3 flex items-center gap-2 whitespace-nowrap shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {newsletter.buttonText}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.form>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {contactInfo.map((info, i) => {
            const Icon = info.icon;
            return (
              <motion.a
                key={i}
                href={info.href}
                className="p-6 bg-white/70 backdrop-blur-sm border border-[var(--primary)]/15 rounded-2xl hover:bg-white hover:border-[var(--primary)]/30 transition-all duration-300 group shadow-sm hover:shadow-md"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--primary)]/12 rounded-lg group-hover:bg-[var(--primary)]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">
                      {info.label}
                    </p>
                    <p className="text-gray-900 font-semibold text-sm group-hover:text-[var(--primary)] transition-colors">
                      {info.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent mb-12"
        />

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          {/* Copyright */}
          <div className="text-sm text-gray-700">
            <p>
              © {new Date().getFullYear()} Synapitch. All rights reserved. Built
              with{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block"
              >
                <Heart className="w-4 h-4 inline text-[var(--primary)]" />
              </motion.span>{" "}
              for freelancers.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-6">
            <motion.a
              href="/status"
              className="text-sm text-gray-700 hover:text-[var(--primary)] transition-colors flex items-center gap-2 group"
              whileHover={{ x: 5 }}
            >
              System Status
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="/changelog"
              className="text-sm text-gray-700 hover:text-[var(--primary)] transition-colors flex items-center gap-2 group"
              whileHover={{ x: 5 }}
            >
              What's New
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}