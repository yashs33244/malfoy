import { IntegrationIcons } from "./features/IntegrationIcons";
import { VelocityScroll } from "./magicui/scroll-based-velocity";

export default function Companies() {
  return (
    <section className="w-full bg-background py-16 px-4 md:px-8 lg:px-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl mb-4">
          Versatile Platform
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Elevate your workflow by seamlessly integrating our machine learning
          platform with your existing tools. Our platform supports a wide array
          of marketplaces and enablement tools for smooth collaboration.
        </p>
      </div>

      <div className="relative mt-12 w-full flex flex-col items-center justify-center overflow-hidden">
        <VelocityScroll numRows={3} defaultVelocity={5}>
          <div className="flex items-center justify-center gap-20 px-10">
            <IntegrationIcons.shein />
            <IntegrationIcons.amazon />
            <IntegrationIcons.shopify />
            <IntegrationIcons.airbnb />
            <IntegrationIcons.costco />
            <IntegrationIcons.blinkit />
          </div>

          <div className="flex items-center justify-center gap-20 px-10">
            <IntegrationIcons.instacart />
            <IntegrationIcons.wholefoods />
            <IntegrationIcons.commerceiq />
            <IntegrationIcons.googleanalytics />
            <IntegrationIcons.walmart />
            <IntegrationIcons.doordash />
          </div>

          <div className="flex items-center justify-center gap-20 px-10">
            <IntegrationIcons.uber />
            <IntegrationIcons.ola />
            <IntegrationIcons.zepto />
            <IntegrationIcons.swiggy />
            <IntegrationIcons.optimizely />
          </div>
        </VelocityScroll>

        {/* Gradient Fade Effects */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background via-background/70 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background via-background/70 to-transparent z-10" />
      </div>
    </section>
  );
}
