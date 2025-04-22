"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useEarlyAccess } from "@/lib/query-hooks";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

export default function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [industry, setIndustry] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, isLoggedIn } = useAuth();
  const { mutate: submitEarlyAccess, isPending } = useEarlyAccess();

  // Pre-fill email and name if user is logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      setEmail(user.email || "");
      setName(user.name || "");
    }
  }, [isLoggedIn, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Check if user is logged in and email is verified
    if (isLoggedIn && user && !user.emailVerified) {
      setError(
        "Please verify your email address before requesting early access."
      );
      toast.error("Email verification required for early access requests.");
      return;
    }

    submitEarlyAccess(
      {
        email,
        name,
        company,
        message: `Industry: ${industry}${
          message ? ", Message: " + message : ""
        }`,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          toast.success("Your early access request has been submitted!");
        },
        onError: (err) => {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "Failed to submit early access request. Please try again.";
          setError(errorMessage);
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400">
          Get Early Access
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Join our exclusive waitlist and be among the first to experience the
          future of AI-powered procurement.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/60 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Business Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                placeholder="you@company.com"
                required
                disabled={!!(isLoggedIn && user)}
              />
            </div>

            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                placeholder="Your Name"
                required
                disabled={!!(isLoggedIn && user && user.name)}
              />
            </div>

            <div className="group">
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
                className="w-full px-4 py-2 bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                placeholder="Your Company"
                required
              />
            </div>

            <div className="group">
              <label
                htmlFor="industry"
                className="block text-sm font-medium mb-2"
              >
                Industry
              </label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-2 bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                required
              >
                <option value="" disabled>
                  Select your industry
                </option>
                <option value="aerospace">Aerospace</option>
                <option value="aviation">Aviation</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="logistics">Logistics</option>
                <option value="defense">Defense</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="group">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message (Optional)
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                placeholder="Tell us about your needs"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 font-medium text-white rounded-full shadow-md transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: "#03c76e" }}
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Join Waitlist"}
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4"
              style={{ color: "#03c76e" }}
            >
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
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You've been added to our waitlist. We'll notify you when early
              access is available.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-green-500 hover:underline transition-all duration-300"
              style={{ color: "#03c76e" }}
            >
              Submit another request
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
