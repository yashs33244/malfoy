import { SignupForm } from "@/components/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Malfoy",
  description: "Create a new Malfoy account",
};

export default function SignupPage() {
  return <SignupForm />;
}
