import PhoneInput from "react-phone-number-input";
import { ComponentProps } from "react";

interface PhoneInputFieldProps {
  label?: string;
  InputStyle?: string;
  name?: string;
  Error?: string;
  required?: boolean;
  onChange: (value: string | undefined) => void;
}

type PhoneInputProps = ComponentProps<typeof PhoneInput>;

const PhoneInputField = ({
  label,
  InputStyle,
  name,
  Error,
  required,
  onChange,
  ...inputProps
}: PhoneInputFieldProps & Omit<PhoneInputProps, keyof PhoneInputFieldProps>) => {
  return (
    <div className={`  flex flex-col relative justify-end  w-full text-[14px]`}>
      {label && (
        <label className=" capitalize  text-start flex gap-1 text-base font-light text-[#3A3D4C]">
          {label}
        </label>
      )}

      <PhoneInput
        id="phoneNumber"
        className={`${
          Error
            ? "  border border-red-500 bg-red-50/20"
            : "bg-white border border-[#808080]/20"
        } phoneNumber font-light text-base flex items-center rounded-[8px] gap-4 px-4 py-3.5 duration-500`}
        style={{
          width: "100%",
        }}
        defaultCountry="NG"
        countries={["NG"]}
        onChange={onChange}
        {...inputProps}
      />
      {Error && (
        <span className=" absolute mt-2  text-red-700 font-light bottom-[-20px] text-[12px] ">
          {Error}
        </span>
      )}
    </div>
  );
};

export default PhoneInputField;
