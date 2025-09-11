import React from 'react'

interface TextAreaProps {
  label?: string
  style?: string
  name?: string
  error?: string | undefined | false
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  value?: string
  placeholder?: string
  rows?: number
  className?: string
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  style,
  error,
  onChange,
  onBlur,
  value,
  placeholder,
  rows = 4,
  className,
  ...textareaProps
}) => {
  return (
    <div className={`flex flex-col relative justify-end ${style} w-full text-[14px] tablet:gap-[10px]`}>
      {label && (
        <label className='capitalize text-start flex gap-1 text-base font-light text-[#3A3D4C] mb-2'>
          {label}
        </label>
      )}
      
      <div className={`${
        error
          ? 'border border-red-500 bg-red-50/20 rounded-[8px]'
          : 'bg-white border border-[#808080]/20'
      } text-[14px] flex items-start gap-4 duration-500 font-light rounded-[8px]`}>
        <textarea
          {...textareaProps}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          className={`placeholder:font-extralight font-light placeholder:text-[14px] focus:outline-none rounded-[8px] text-black px-4 py-3 placeholder:text-[#AEB4C6] flex-1 w-full resize-none ${className}`}
        />
      </div>
      
      {error && (
        <span className='text-red-700 text-[12px] font-light'>{error}</span>
      )}
    </div>
  )
}

export default TextArea