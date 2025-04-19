import { ChevronRight } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

// Make sure to properly type the props
interface ChipProps {
  givenText: string; // This should be a string, not an object
}

export function Chip({ givenText }: ChipProps) {
  return (
    <div className="flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm shadow-sm">
      <AnimatedGradientText className="text-sm font-medium">
        {givenText}
      </AnimatedGradientText>
      <ChevronRight className="ml-1 h-3 w-3" />
    </div>
  );
}
