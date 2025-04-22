import { ToggleSwitchProps } from "@/types/features";

export const ToggleSwitch = ({
  enabled,
  onChange,
  leftLabel,
  rightLabel,
}: ToggleSwitchProps) => (
  <div className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-full p-3 border border-slate-200 dark:border-slate-700">
    <span
      className={`text-sm ${
        !enabled ? "font-medium" : "text-slate-500 dark:text-slate-400"
      }`}
    >
      {leftLabel}
    </span>
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"
      }`}
    >
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
    <span
      className={`text-sm ${
        enabled ? "font-medium" : "text-slate-500 dark:text-slate-400"
      }`}
    >
      {rightLabel}
    </span>
  </div>
);
