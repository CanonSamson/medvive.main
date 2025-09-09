import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, ChangeEvent } from "react";

interface InputWithDropdownProps {
  label: string;
  id: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  selectedUnit: string;
  onUnitChange: (unit: string) => void;
  units: string[];
  inputType?: "text" | "number" | "email" | "password" | "tel";
  className?: string;
  Error?: string;
}

function InputWithDropdown({
  label,
  id,
  value,
  onChange,
  placeholder,
  selectedUnit,
  onUnitChange,
  units,
  inputType = "text",
  className = "",
  Error,
}: InputWithDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document?.addEventListener("mousedown", handleClickOutside);
    return () => {
      document?.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUnitSelect = (unit: string): void => {
    onUnitChange(unit);
    setIsDropdownOpen(false);
  };

  return (
    <div className={`${className} font-poppins`}>
      <label htmlFor={id} className="block text-[14px] text-[#404040] mb-3">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-colors placeholder:font-normal"
        />
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[80px] transition-colors"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
          >
            <span className="text-gray-700">{selectedUnit}</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 ml-2 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-in fade-in-0 zoom-in-95">
              {units.map((unit: string) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => handleUnitSelect(unit)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    selectedUnit === unit
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700"
                  }`}
                  role="option"
                  aria-selected={selectedUnit === unit}
                >
                  {unit}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {Error && <p className=" mt-1 text-red-500 text-sm">{Error}</p>}
    </div>
  );
}

export default InputWithDropdown;
