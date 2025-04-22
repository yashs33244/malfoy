export const SmallFeatureItem = ({
  title,
  subtitle,
  description,
  icon,
}: {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <div className="flex items-start gap-3 p-3 bg-white/80 dark:bg-slate-800/80 rounded-lg">
    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-700 dark:text-indigo-400">
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-slate-900 dark:text-white">{title}</h4>
      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
        {subtitle}
      </p>
      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
        {description}
      </p>
    </div>
  </div>
);
