import { useState, KeyboardEvent, ChangeEvent } from "react";

interface OTPInputProps {
  length?: number;
  onChange: (value: string) => void;
}

export function OTPInput({ length = 5, onChange }: OTPInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));

  const handleChange = (value: string, index: number): void => {
    if (/^[0-9]?$/.test(value)) {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);
      onChange(newValues.join(""));

      if (value && index < length - 1) {
        const nextInput = document?.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      const prevInput = document?.getElementById(`otp-${index - 1}`) as HTMLInputElement | null;
      prevInput?.focus();
    }
  };

  return (
    <div className="flex justify-between gap-[2px] tablet:gap-3 tablet:justify-center items-center w-full">
      {values.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
          className="w-[60px] h-[60px] text-center border border-[#EDF0F8] rounded-lg text-[16px] font-semibold focus:outline-none bg-[#F1F5FF] focus:border-blue-500 text-[#2C2C2C]"
        />
      ))}
    </div>
  );
}
