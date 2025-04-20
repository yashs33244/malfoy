import { ChevronRight } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  dark?: boolean;
}

export const FeatureItem = ({
  icon,
  title,
  subtitle,
  description,
  dark = false,
}: FeatureCardProps) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl ${
        dark ? "bg-black text-white" : "bg-transparent"
      } transition-all duration-300 hover:bg-gray-50 group cursor-pointer ${
        dark ? "hover:bg-black/90" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1">{icon}</div>
        <div className="flex flex-col">
          <div className="flex gap-4">
            <span className="font-medium">{title}</span>
            <span className="text-gray-400">{subtitle}</span>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
    </div>
  );
};
