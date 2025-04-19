"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <Link href="/" className="flex items-center mb-4">
            <span className="text-2xl font-bold font-kanit bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Malfoy
            </span>
          </Link>
          <img
            src="https://ysingla.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fe12b42ac-4e54-476f-a4f5-7d6bdb1e61e2%2F714beba9-2afc-440e-b1c8-8d95f9c03bda%2Fproductnerd_a_modern_logo_for_a_company_called_greenmind_that_2b7c439c-f8f7-48bc-8446-0d129b699a3f_2-removebg-preview.png?table=block&id=1cfe6255-f338-81c4-9a65-c21f3b88d852&spaceId=e6b92090-480d-4e79-a4a6-82eca60a06b3&width=250&userId=&cache=v2"
            alt="Malfoy"
            className="w-10 h-10"
          />
          <p className="text-muted-foreground mb-4">
            Advanced pricing intelligence platform for data-driven businesses.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#features"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#how-it-works"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                href="#pricing"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Roadmap
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Integrations
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Documentation
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Case Studies
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Webinars
              </Link>
            </li>
            <li>
              <Link
                href="#faq"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PriceIQ. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
