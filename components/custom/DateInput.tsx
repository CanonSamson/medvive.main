import React, { useState, useRef, ChangeEvent, FocusEvent } from 'react'

interface DateInputProps {
  label?: string
  name?: string
  value?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  Error?: string
  required?: boolean
  className?: string
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  Error,

  className = ''
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(value || '')
  const dateInputRef = useRef<HTMLInputElement>(null)

  // Handle native date input change
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value
    setSelectedDate(newValue)
    onChange(e)
  }

  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className='text-base font-light text-gray-700 mb-2'
        >
          {label}
        </label>
      )}

      <div className='relative'>
        <div className='relative'>
          <input
            ref={dateInputRef}
            type='date'
            id={name}
            name={name}
            value={selectedDate}
            onChange={handleDateChange}
            onBlur={onBlur}
            className={`
              w-full px-4 py-3 border rounded-lg text-base text-black
              appearance-none bg-white placeholder:font-extralight font-light placeholder:text-[#AEB4C6] placeholder:text-[14px] focus:outline-none
              ${Error ? 'border-red-500' : 'border-[#808080]/20'}
              
              /* Custom styling for date input */
              [&::-webkit-datetime-edit]:px-1
              [&::-webkit-datetime-edit-fields-wrapper]:p-0
              [&::-webkit-inner-spin-button]:appearance-none
              [&::-webkit-calendar-picker-indicator]:cursor-pointer
              [&::-webkit-calendar-picker-indicator]:rounded
              [&::-webkit-calendar-picker-indicator]:px-2
              [&::-webkit-calendar-picker-indicator]:mr-1
              
              /* Firefox */
              [&::-moz-focus-inner]:border-0
              
            `}
          />

          <div className='absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#AEB4C6] md:hidden'>
            <svg
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              {' '}
              <polyline points='6,9 12,15 18,9'></polyline>{' '}
            </svg>
          </div>
        </div>
      </div>

      {Error && (
        <p className='mt-2 text-[12px] text-red-600 font-light'>{Error}</p>
      )}
    </div>
  )
}

export default DateInput
