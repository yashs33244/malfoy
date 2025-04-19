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
import { useState } from "react";
import Companies from "@/components/companies";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

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

  return (
    <>
      <ScrollProgress />
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

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-cyan-50 to-white dark:from-slate-900 dark:to-black">
        <Hero />
      </div>

      {/* Product Showcase Section */}
      <div
        id="features"
        className="bg-gradient-to-br from-viridian-50 to-white dark:from-slate-900 dark:to-black"
      >
        <ProductShowcase />
      </div>

      {/* Companies Section */}
      <div className="bg-white dark:bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm p-8">
            <Companies />
          </div>
        </div>
      </div>

      {/* Why Us Section */}
      <div className="bg-gradient-to-br from-sgbus_green-50 to-white dark:from-slate-900 dark:to-black">
        <WhyUs />
      </div>

      {/* Pricing Section */}
      <div
        id="pricing"
        className="bg-gradient-to-br from-cyan-50 to-white dark:from-slate-900 dark:to-black py-16"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto rounded-2xl bg-white/80 dark:bg-slate-900/80 overflow-hidden shadow-lg">
            <div className="p-8">
              <PricingSection />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="bg-white dark:bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm p-8">
            <FaqSection />
          </div>
        </div>
      </div>

      {/* Call To Action Section */}
      <div className="bg-gradient-to-br from-viridian-50 to-white dark:from-slate-900 dark:to-black">
        <CallToAction />
      </div>

      {/* Early Access Form Section */}
      <div
        id="early-access"
        className="bg-gradient-to-br from-sgbus_green-50 to-white dark:from-slate-900 dark:to-black py-16"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto rounded-2xl bg-white/80 dark:bg-slate-900/80 overflow-hidden shadow-lg">
            <div className="p-8">
              <EarlyAccessForm />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 dark:bg-gray-950 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto rounded-2xl bg-white/90 dark:bg-slate-900/90 overflow-hidden shadow-md p-8">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
