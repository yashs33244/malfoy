"use client";

import type React from "react";

import { useState } from "react";
import { TextShimmer } from "@/components/ui/text-shimmer";

export default function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    setSubmitted(true);
  };

  return (
    <section>
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <TextShimmer>Get Early Access</TextShimmer>
        </h2>
        <p className="text-muted-foreground">
          Join our exclusive waitlist and be among the first to experience the
          future of pricing intelligence.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/60 rounded-xl shadow-lg p-8">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="input-trail-container">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Business Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-trail w-full px-4 py-2 bg-white/60 dark:bg-slate-900/60 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="input-trail-container">
              <label
                htmlFor="company"
                className="block text-sm font-medium mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="input-trail w-full px-4 py-2 bg-white/60 dark:bg-slate-900/60 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                placeholder="Your Company"
                required
              />
            </div>

            <div className="input-trail-container">
              <label
                htmlFor="industry"
                className="block text-sm font-medium mb-2"
              >
                Industry
              </label>
              <select
                id="industry"
                className="input-trail w-full px-4 py-2 bg-white/60 dark:bg-slate-900/60 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select your industry
                </option>
                <option value="retail">Retail</option>
                <option value="ecommerce">E-commerce</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="wholesale">Wholesale</option>
                <option value="services">Services</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 font-medium text-white bg-primary hover:bg-primary/90 transition-colors rounded-md shadow-md"
            >
              Join Waitlist
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-4">
              You've been added to our waitlist. We'll notify you when early
              access is available.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-primary hover:underline"
            >
              Submit another request
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
