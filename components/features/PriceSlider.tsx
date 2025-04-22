import { PriceSliderProps } from "@/types/features";

export const PriceSlider = ({
  value,
  onChange,
  optimalPoint,
}: PriceSliderProps) => (
  <div className="space-y-2 px-4 py-3">
    <div className="flex justify-between mb-2 text-sm font-medium">
      <span className="text-rose-500">-20%</span>
      <span className="text-blue-600">Current Price</span>
      <span className="text-emerald-500">+20%</span>
    </div>

    <div className="relative">
      {/* Marker dots */}
      <div className="absolute w-full flex justify-between px-[2px] -mt-1">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="w-1 h-1 bg-gray-400 rounded-full z-10" />
        ))}
      </div>

      {/* Range Slider */}
      <input
        type="range"
        min="-20"
        max="20"
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full appearance-none bg-gray-200 rounded-full h-2 cursor-pointer transition-all duration-200 mt-2"
        style={{
          background: `linear-gradient(to right,rgba(0, 0, 0, 0.29) 0%,#005900 ${
            ((value + 20) / 40) * 100
          }%, #e5e7eb ${((value + 20) / 40) * 100}%, #e5e7eb 100%)`,
        }}
      />

      {/* Optimal Marker */}
      {optimalPoint !== value && (
        <div
          className="absolute pointer-events-none w-1 h-4 bg-emerald-500 rounded-full"
          style={{
            left: `calc(${((optimalPoint + 20) / 40) * 100}% - 2px)`,
            top: "8px",
          }}
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white text-xs px-1 rounded">
            Optimal
          </div>
        </div>
      )}

      {/* Slider Styling */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: black;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        input[type="range"]:hover::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px #005900;
          transform: scale(1.1);
        }

        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: black;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }

        input[type="range"]:hover::-moz-range-thumb {
          box-shadow: 0 0 0 3px #005900;
          transform: scale(1.1);
        }

        input[type="range"] {
          border-radius: 8px;
          height: 8px;
        }
      `}</style>
    </div>

    <div className="text-center font-semibold text-base">
      {value > 0 ? `+${value}%` : `${value}%`}
    </div>
  </div>
);
