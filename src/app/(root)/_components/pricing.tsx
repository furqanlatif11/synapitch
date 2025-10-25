"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Crown, Rocket } from "lucide-react";
import { useState } from "react";

const pricingPlans = [
  {
    name: "Starter",
    icon: Zap,
    price: "Free",
    period: "forever",
    description: "Perfect for exploring Synapitch",
    features: [
      "5 AI proposals per month",
      "Basic job analysis",
      "Tone matching",
      "Standard support",
      "Export to PDF",
    ],
    notIncluded: [
      "Performance analytics",
      "Priority support",
      "Advanced suggestions",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    icon: Crown,
    price: "$19",
    period: "per month",
    description: "For serious freelancers ready to scale",
    features: [
      "Unlimited AI proposals",
      "Advanced job analysis",
      "Premium tone adaptation",
      "Priority support",
      "Export & direct send",
      "Performance analytics",
      "Monthly insights report",
      "Custom templates",
      "Proposal history (6 months)",
    ],
    notIncluded: ["Team collaboration", "White-label option"],
    cta: "Start 7-Day Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    icon: Rocket,
    price: "Custom",
    period: "pricing available",
    description: "For agencies and teams",
    features: [
      "Everything in Professional",
      "Team collaboration",
      "Multi-account management",
      "White-label branding",
      "Advanced API access",
      "Dedicated support",
      "Custom integrations",
      "Priority feature requests",
      "Unlimited everything",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const comparisonFeatures = [
  {
    category: "Proposals",
    items: ["Proposals per month", "Job analysis", "Tone adaptation"],
  },
  {
    category: "Insights",
    items: ["Performance analytics", "Success reports", "Export options"],
  },
  {
    category: "Support",
    items: ["Support tier", "Response time", "Monthly check-ins"],
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );

  const getAnnualPrice = (monthlyPrice: string) => {
    if (monthlyPrice === "Free" || monthlyPrice === "Custom")
      return monthlyPrice;
    const monthly = parseInt(monthlyPrice.replace("$", ""));
    const annual = Math.floor(monthly * 12 * 0.8); // 20% discount
    return `$${annual}`;
  };

  return (
    <section
      id="pricing"
      className="w-full py-24 md:py-32 px-6 md:px-12"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-0 w-96 h-96 rounded-full opacity-4"
          style={{
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
          animate={{ y: [0, 80, 0], x: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-3"
          style={{
            background:
              "radial-gradient(circle, var(--primary-light) 0%, transparent 70%)",
          }}
          animate={{ y: [0, -60, 0], x: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm md:text-base font-semibold text-[var(--primary)] uppercase tracking-widest">
              💰 Simple Pricing
            </p>
          </motion.div>

          <motion.h2
            className="h2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Choose Your Plan
            <span className="block text-gradient mt-2">
              Start Free, Upgrade Anytime
            </span>
          </motion.h2>

          <motion.p
            className="p max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            No credit card required. All plans include a 7-day free trial to
            explore every feature.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex gap-2 p-1 bg-white border border-[var(--primary)]/20 rounded-full">
            {["monthly", "annual"].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle as "monthly" | "annual")}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  billingCycle === cycle
                    ? "bg-[var(--primary)] text-white shadow-lg"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                {cycle === "annual" && (
                  <span className="ml-2 text-xs font-bold text-yellow-400">
                    Save 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, i) => {
            const Icon = plan.icon;
            const displayPrice =
              billingCycle === "annual"
                ? getAnnualPrice(plan.price)
                : plan.price;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Highlight background */}
                {plan.highlighted && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/15 via-[var(--primary)]/8 to-transparent rounded-3xl blur-xl" />
                )}

                {/* Card */}
                <div
                  className={`relative rounded-3xl transition-all duration-300 overflow-hidden h-full flex flex-col ${
                    plan.highlighted
                      ? "bg-white border-2 border-[var(--primary)] shadow-2xl scale-105 md:scale-100 md:ring-2 md:ring-[var(--primary)]/20"
                      : "bg-white border border-[var(--primary)]/12 shadow-sm hover:shadow-lg hover:border-[var(--primary)]/30"
                  } group-hover:-translate-y-2`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <motion.div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white text-xs font-bold rounded-full shadow-lg"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.15 + 0.2, type: "spring" }}
                      viewport={{ once: true }}
                    >
                      {plan.badge}
                    </motion.div>
                  )}

                  {/* Header */}
                  <div
                    className={`p-8 ${
                      plan.highlighted
                        ? "bg-gradient-to-br from-white to-[var(--primary)]/5"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-3 rounded-xl ${
                          plan.highlighted
                            ? "bg-[var(--primary)]/20"
                            : "bg-[var(--primary)]/10"
                        }`}
                      >
                        <Icon className="w-6 h-6 text-[var(--primary)]" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {plan.name}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                      {plan.description}
                    </p>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-gray-900">
                          {displayPrice}
                        </span>
                        {plan.price !== "Free" && plan.price !== "Custom" && (
                          <span className="text-gray-600">{plan.period}</span>
                        )}
                      </div>
                      {plan.price !== "Free" && plan.price !== "Custom" && (
                        <p className="text-xs text-gray-500">
                          Billed{" "}
                          {billingCycle === "annual" ? "annually" : "monthly"}
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        plan.highlighted
                          ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] shadow-lg"
                          : "bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 border border-[var(--primary)]/20"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Features */}
                  <div className="p-8 flex-grow">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">
                      What's Included
                    </p>

                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, j) => (
                        <motion.div
                          key={j}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: i * 0.15 + j * 0.05,
                            duration: 0.3,
                          }}
                          viewport={{ once: true }}
                        >
                          <Check className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Not included features */}
                    {plan.notIncluded.length > 0 && (
                      <div className="border-t border-gray-200 pt-6">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                          Not Included
                        </p>
                        {plan.notIncluded.map((feature, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-3 text-xs text-gray-500 mb-2"
                          >
                            <div className="w-5 h-5 rounded-full border border-gray-300" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white border border-[var(--primary)]/12 rounded-3xl overflow-hidden shadow-sm"
        >
          <div className="p-8 md:p-12 border-b border-gray-200 bg-gradient-to-r from-[var(--primary)]/8 to-transparent">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Detailed Comparison
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {comparisonFeatures.map((group, i) => (
                  <motion.tr
                    key={i}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <td className="px-8 py-6 bg-gradient-to-r from-gray-50 to-transparent">
                      <p className="font-bold text-gray-900">
                        {group.category}
                      </p>
                    </td>
                    {pricingPlans.map((plan, j) => (
                      <td key={j} className="px-8 py-6 text-center">
                        <div className="space-y-2">
                          {group.items.map((item, k) => (
                            <div key={k} className="text-sm text-gray-700">
                              {plan.name === "Starter" && k === 0 && "Limited"}
                              {plan.name === "Professional" && "Full"}
                              {plan.name === "Enterprise" && "Full"}
                              {k > 0 && item.includes("report")
                                ? "Yes"
                                : k > 0 && item.includes("options")
                                ? "Yes"
                                : k > 0 && item.includes("tier")
                                ? "Standard"
                                : ""}
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
            Questions? We've Got Answers
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "Can I change plans anytime?",
                a: "Yes! Upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
              },
              {
                q: "Is there a long-term contract?",
                a: "No contracts. Cancel your subscription anytime with no questions asked.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer a 30-day money-back guarantee if you're not satisfied.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                className="text-left p-6 bg-white border border-[var(--primary)]/12 rounded-2xl hover:border-[var(--primary)]/30 transition-all"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-700">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center space-y-8"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Join thousands of freelancers already earning more with Synapitch.
              Try it free for 7 days.
            </p>
          </div>

          <motion.button
            className="btn-primary px-8 py-4 text-lg font-semibold flex items-center justify-center gap-2 group mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <p className="text-sm text-gray-600">
            No credit card required • Cancel anytime • 7-day full access
          </p>
        </motion.div>
      </div>
    </section>
  );
}
