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
import { useState, useEffect } from "react";
import { motion } from "motion/react";

const navItems = [
  {
    name: "Home",
    link: "/",
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
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Add an effect for page load animation
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
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
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Main content with padding for fixed navbar */}
      <motion.main
        className="pt-20" // Add padding at top for the navbar
        initial={{ opacity: 0 }}
        animate={{ opacity: isPageLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <EarlyAccessForm />
        <ProductShowcase />
        <WhyUs />
        <PricingSection />
        <FaqSection />
        <CallToAction />
        <Footer />
      </motion.main>
    </>
  );
}
