import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

interface InputFieldProps {
  label?: string
  style?: string
  InputStyle?: string
  name?: string
  Error?: string | undefined | false
  type?: string
  required?: boolean
  [key: string]: any // For additional input props
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  style,
  Error,
  type,

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
          Error
            ? ' border border-red-500 bg-red-50/20 rounded-[8px]'
            : 'bg-white border border-[#808080]/20'
        }  text-[14px] flex items-center gap-4 duration-500 font-light rounded-[8px]`}
      >
        {/* {(name === "gmail" && <CiMail size={20} />) ||
          (name === "medviveEmail" && (
            <img
              src="/logo-v2.png"
              alt="logo"
              width={20}
              height={20}
              className=" w-[20px] h-[20px]"
            />
          )) ||
          (name == "password" && <BiLockAlt size={20} />) ||
          (name == "userName" && <BsPerson size={20} />)} */}
        <input
          // Set the input properties using the spread operator
          {...inputProps}
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
      {Error && (
        <span className=' text-red-700 text-[12px] font-light'>{Error}</span>
      )}
    </div>
  )
}

export default InputField
