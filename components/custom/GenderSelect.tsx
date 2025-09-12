import * as React from "react";
import CustomSelect from "./CustomSelect"; // Adjust path as needed

interface GenderOption {
  value: string;
  label: string;
}

interface GenderSelectProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  style?: React.CSSProperties;
  InputStyle?: string;
  name?: string;
  Error?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const genderOptions: GenderOption[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-Binary" },
  { value: "prefer not to say", label: "Prefer not to say" },
];

export default function GenderSelect({
  value = "",
  onChange,
  label,
  style,
 
  Error,
  required,
  className = "",
  placeholder = "Select gender",
  disabled = false,
}: GenderSelectProps) {
  return (
    <div className={`flex flex-col relative justify-end w-full text-[14px] ${className}`} style={style}>
      <CustomSelect
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        options={genderOptions}
        error={Error}
        showStar={required}
        disabled={disabled}
        className="w-full"
        selectTriggerClassName={`
          px-4 py-3 border rounded-lg text-base text-black
          appearance-none bg-white font-light focus:outline-none
          ${Error ? "border-red-500 bg-red-50/20" : "border-[#808080]/20"}
        `}
        optionClassName="font-light text-[14px]"
      />
    </div>
  );
}
