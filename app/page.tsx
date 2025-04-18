import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import EarlyAccessForm from "@/components/early-access-form"
import ProductShowcase from "@/components/product-showcase"
import WhyUs from "@/components/why-us"
import PricingSection from "@/components/pricing-section"
import FaqSection from "@/components/faq-section"
import CallToAction from "@/components/call-to-action"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <EarlyAccessForm />
      <ProductShowcase />
      <WhyUs />
      <PricingSection />
      <FaqSection />
      <CallToAction />
      <Footer />
    </main>
  )
}
