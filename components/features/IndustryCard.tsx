import { IndustryCardProps } from "@/types/features";
import CardContainer from "./ui/CardContainer";

export const IndustryCard = ({
  id,
  name,
  icon,
  description,
  active,
  onClick,
}: IndustryCardProps) => {
  return (
    <CardContainer active={active} onClick={() => onClick(id)}>
      <div className="flex items-center">
        <div
          className={`mr-3 ${
            active
              ? "text-white"
              : "text-slate-500 dark:text-slate-400 group-hover:text-white"
          }`}
        >
          {icon}
        </div>
        <div>
          <h4
            className={`font-medium ${
              active ? "text-white" : "group-hover:text-white"
            }`}
          >
            {name}
          </h4>
          <p
            className={`text-xs ${
              active
                ? "text-white/80"
                : "text-slate-500 dark:text-slate-400 group-hover:text-white/80"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </CardContainer>
  );
};
