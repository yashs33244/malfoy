import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Malfoy",
  description: "Sign in to your Malfoy account",
};

export default function LoginPage() {
  return <LoginForm />;
}
