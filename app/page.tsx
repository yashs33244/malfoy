"use client";
import Hero from "@/components/hero";
import EarlyAccessForm from "@/components/early-access-form";
import ProductShowcase from "@/components/product-showcase";
import WhyUs from "@/components/why-us";
import PricingSection from "@/components/pricing-section";
import FaqSection from "@/components/faq-section";
import CallToAction from "@/components/call-to-action";
import Footer from "@/components/footer";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { useState, MouseEvent } from "react";
import Companies from "@/components/companies";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { UserAvatar } from "@/components/user-avatar";
import { CalendlyScheduleModal } from "@/components/calendly-schedule-modal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    name: "Home",
    link: "#home",
  },
  {
    name: "Features",
    link: "#features",
  },
  {
    name: "Pricing",
    link: "#pricing",
  },
  {
    name: "FAQ",
    link: "#faq",
  },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  // Handle smooth scrolling for navbar links
  const handleNavLinkClick = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Only handle # links
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Offset for navbar height
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <Navbar>
        {/* Desktop & Mobile Navigation - Responsive Layout */}
        <div className="hidden lg:block w-full mr-10">
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} onItemClick={handleNavLinkClick} />
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <UserAvatar />
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-black rounded-full"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Login
                  </Button>
                  <Button
                    className="rounded-full bg-green-500 hover:bg-green-300 hover:text-black"
                    onClick={() => (window.location.href = "/signup")}
                  >
                    Sign Up
                  </Button>
                </>
              )}
              <CalendlyScheduleModal
                buttonClassName="rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                modalTitle="Schedule a Consultation"
                url="https://calendly.com/yashs3324/interview"
              />
            </div>
          </NavBody>
        </div>

        {/* Mobile Navigation Only */}
        <div className="block lg:hidden w-full mr-10">
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={(e) => {
                    handleNavLinkClick(e, item.link);
                    setIsMobileMenuOpen(false);
                  }}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}
              <div className="flex w-full flex-col gap-4">
                {isLoggedIn ? (
                  <div className="flex justify-center py-2">
                    <UserAvatar />
                  </div>
                ) : (
                  <>
                    <div className="w-full">
                      <Button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          window.location.href = "/login";
                        }}
                        className="w-full"
                      >
                        Login
                      </Button>
                    </div>
                    <div className="w-full">
                      <Button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          window.location.href = "/signup";
                        }}
                        className="w-full"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </>
                )}
                <CalendlyScheduleModal
                  buttonClassName="w-full rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                  modalTitle="Schedule a Consultation"
                  url="https://calendly.com/yashs3324/interview"
                />
              </div>
            </MobileNavMenu>
          </MobileNav>
        </div>
      </Navbar>

      {/* Hero Section */}
      <motion.section id="home" className="scroll-mt-20">
        <Hero />
        <div className="text-center pt-10 m-10">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-medium leading-tight">
            <span className="font-extrabold text-black dark:text-white">
              Automated
            </span>{" "}
            <span className="text-gray-400">invoicing for</span>
            <br />
            <span className="text-gray-400">the aviation </span>
            <span className="font-extrabold text-black dark:text-white">
              industry
            </span>
          </h1>

          {/* Colored Chips */}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-pink-600 bg-pink-100 rounded-2xl border border-pink-300">
              <span>🧭</span> Efficiency
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-2xl border border-purple-300">
              <span>🔗</span> Streamline
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-2xl border border-green-300">
              <span>⭐</span> Automation
            </span>
          </div>
        </div>
      </motion.section>

      {/* Product Showcase Section */}
      <motion.section id="features" className="scroll-mt-20">
        <ProductShowcase />
      </motion.section>

      {/* Companies Section */}
      <div className="bg-white dark:bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" ">
            <Companies />
          </div>
        </div>
      </div>

      {/* Why Us Section */}
      <motion.section id="how-it-works" className="scroll-mt-20">
        <WhyUs />
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="pricing"
        className="bg-white dark:bg-black py-16 scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto rounded-2xl bg-white/80 dark:bg-slate-900/80 overflow-hidden shadow-lg">
            <div className="p-8">
              <PricingSection />
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        className="bg-white dark:bg-black py-16 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm p-8">
            <FaqSection />
          </div>
        </div>
      </motion.section>

      {/* Early Access Form Section */}
      <div id="early-access" className="bg-white dark:bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto rounded-2xl bg-white/80 dark:bg-slate-900/80 overflow-hidden shadow-lg">
            <div className="p-8">
              <EarlyAccessForm />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
