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
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { UserAvatar } from "@/components/user-avatar";

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
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Navbar>
        {/* Desktop & Mobile Navigation - Responsive Layout */}
        <div className="hidden lg:block w-full">
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <UserAvatar />
              ) : (
                <>
                  <Link href="/login">
                    <NavbarButton variant="secondary">Login</NavbarButton>
                  </Link>
                  <Link href="/signup">
                    <NavbarButton variant="primary">Sign Up</NavbarButton>
                  </Link>
                </>
              )}
              <NavbarButton variant="book-call">Book a call</NavbarButton>
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
                  onClick={() => setIsMobileMenuOpen(false)}
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
                    <Link href="/login" className="w-full">
                      <NavbarButton
                        onClick={() => setIsMobileMenuOpen(false)}
                        variant="primary"
                        className="w-full"
                      >
                        Login
                      </NavbarButton>
                    </Link>
                    <Link href="/signup" className="w-full">
                      <NavbarButton
                        onClick={() => setIsMobileMenuOpen(false)}
                        variant="secondary"
                        className="w-full"
                      >
                        Sign Up
                      </NavbarButton>
                    </Link>
                  </>
                )}
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="book-call"
                  className="w-full"
                >
                  Book a call
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </div>
      </Navbar>

      {/* Hero Section */}

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

      {/* Product Showcase Section */}

      <ProductShowcase />

      {/* Companies Section */}
      <div className="bg-white dark:bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" ">
            <Companies />
          </div>
        </div>
      </div>

      {/* Why Us Section */}

      <WhyUs />

      {/* Pricing Section */}
      <div id="pricing" className="bg-white dark:bg-black py-16">
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
      <div className=" py-12">
        <div className="container mx-auto px-4">
          <div className="">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
