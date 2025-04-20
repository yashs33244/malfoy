export const PriceSlider = ({
  value,
  onChange,
  optimalPoint,
}: {
  value: number;
  onChange: (value: number) => void;
  optimalPoint: number;
}) => (
  <div>
    <div className="flex justify-between mb-2">
      <label className="block text-sm font-medium">Price Change (%)</label>
      <span className="text-primary font-bold text-lg">
        {value >= 0 ? `+${value}%` : `${value}%`}
      </span>
    </div>

    <div className="relative">
      <input
        type="range"
        min="-20"
        max="20"
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full accent-primary"
        style={{
          height: "8px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      />

      {/* Optimal point indicator */}
      <div
        className="absolute top-0 h-5 w-2 bg-primary/70 rounded-full"
        style={{
          left: `${((optimalPoint + 20) / 40) * 100}%`,
          transform: "translateX(-50%) translateY(-50%)",
        }}
        title="AI recommended optimal point"
      >
        <div className="h-2 w-2 bg-primary rounded-full absolute -top-1 left-0 animate-ping"></div>
      </div>
    </div>

    <div className="flex justify-between text-xs mt-1">
      <span>-20%</span>
      <span>0%</span>
      <span>+20%</span>
    </div>
  </div>
);
