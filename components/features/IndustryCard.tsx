import { IndustryCardProps } from "@/types/features";

export const IndustryCard = ({
  id,
  name,
  icon,
  description,
  active,
  onClick,
}: IndustryCardProps) => (
  <div
    className={`p-4 rounded-lg cursor-pointer transition-all border ${
      active
        ? "border-primary/70 bg-primary/10"
        : "border-border/40 hover:border-primary/30 bg-background/20 backdrop-blur-sm"
    }`}
    onClick={() => onClick(id)}
  >
    <div className="flex items-center">
      <div
        className={`mr-3 ${active ? "text-primary" : "text-muted-foreground"}`}
      >
        {icon}
      </div>
      <div>
        <h4 className={`font-medium ${active ? "text-primary" : ""}`}>
          {name}
        </h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);
