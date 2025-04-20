export const ToggleSwitch = ({
  enabled,
  onChange,
  leftLabel,
  rightLabel,
}: {
  enabled: boolean;
  onChange: () => void;
  leftLabel: string;
  rightLabel: string;
}) => (
  <div className="mb-6 flex items-center space-x-3">
    <span
      className={`text-sm ${!enabled ? "font-bold" : "text-muted-foreground"}`}
    >
      {leftLabel}
    </span>
    <button
      className="relative h-6 w-12 rounded-full bg-background/40 flex items-center transition-colors border border-border/40"
      onClick={onChange}
    >
      <div
        className={`h-5 w-5 rounded-full bg-primary shadow-md transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      ></div>
    </button>
    <span
      className={`text-sm ${enabled ? "font-bold" : "text-muted-foreground"}`}
    >
      {rightLabel}
    </span>
  </div>
);
