import { ChevronRight } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  dark?: boolean;
}

export const SmallFeatureItem = ({
  icon,
  title,
  subtitle,
  description,
  dark = false,
}: FeatureCardProps) => {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-full transition-all duration-400 cursor-pointer group shadow-sm ${
        dark
          ? "bg-black text-white hover:bg-black/90"
          : "bg-gray-100 hover:bg-black"
      }`}
    >
      <div className="flex items-start gap-4 flex-1">
        {/* Icon container */}
        <div className="w-8 h-7 mt-3 ml-2 mr-2 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:drop-shadow-[0_0_8px_rgba(0,0,255,0.7)]">
          <div className="text-blue-500 group-hover:text-blue-600 transition-all">
            {icon}
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center w-full">
            <span className="font-medium group-hover:text-white">{title}</span>
            <span className="text-gray-400 text-sm truncate mt-4 pr-2">
              {subtitle}
            </span>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <ChevronRight className="w-5 h-5 mr-2 text-gray-400 group-hover:text-green-500 group-hover:drop-shadow-md transition-all" />
    </div>
  );
};
