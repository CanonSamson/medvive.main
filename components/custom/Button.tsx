import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  text: string;
  color?: string;
  type?: "outline" | "solid" | "button";
  buttonType?: "button" | "submit" | "reset";
  isSubmit?: boolean;
}

const Button = ({ text, color, type, buttonType = "button", isSubmit = false, ...props }: ButtonProps) => {
  return (
    <button
      disabled={isSubmit}
      {...props}
      type={buttonType}
      className={`w-full   active:scale-95  rounded-[8px]  ${
        color
          ? color
          : "bg-primary hover:bg-primary-dark transition-colors duration-300"
      }   text-[14px] items-center flex justify-center py-4   font-light ${
        type == "outline"
          ? `${
              color ? color : "border-primary  text-primary"
            } border  bg-transparent duration-500 `
          : "text-white"
      }  flex gap-2`}
    >
      {text}
      {isSubmit ? (
        <AiOutlineLoading3Quarters
          name="loading"
          size={20}
          className=" animate-spin"
        />
      ) : null}
    </button>
  );
};

export default Button;
