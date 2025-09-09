import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

interface InputFieldProps {
  label?: string
  style?: string
  InputStyle?: string
  name?: string
  error?: string | undefined | false
  type?: string
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  value?: string | number | readonly string[] | undefined
  placeholder?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  style,
  error,
  type,
  onChange,
  onBlur,
  value,
  placeholder,
  ...inputProps
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <div
      className={`  flex flex-col relative justify-end ${style} w-full text-[14px] tablet:gap-[10px]`}
    >
      <div
        className={` ${
          type === 'password' && 'flex justify-between items-center'
        } `}
      >
        {label && (
          <label className=' capitalize  text-start flex gap-1 text-base font-light text-[#3A3D4C]'>
            {label}
          </label>
        )}
      </div>

      <div
        className={`${
          error
            ? ' border border-red-500 bg-red-50/20 rounded-[8px]'
            : 'bg-white border border-[#808080]/20'
        }  text-[14px] flex items-center gap-4 duration-500 font-light rounded-[8px]`}
      >
        <input
          // Set the input properties using the spread operator
          {...inputProps}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          placeholder={placeholder}
          // Show password as plain text if showPassword is true, else show as the input type
          type={showPassword ? 'text' : type}
          // Apply the input style classes
          className='placeholder:font-extralight font-light placeholder:text-[14px] focus:outline-none rounded-[8px] text-black px-4 py-3 placeholder:text-[#AEB4C6] flex-1 w-full'
        />

        {/* Render a div that toggles the password visibility when clicked
 if the input type is password */}
        {type == 'password' && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className='flex items-center  gap-1 text-[#616061] pr-4'
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </div>
        )}
      </div>
      {error && (
        <span className=' text-red-700 text-[12px] font-light'>{error}</span>
      )}
    </div>
  )
}

export default InputField
