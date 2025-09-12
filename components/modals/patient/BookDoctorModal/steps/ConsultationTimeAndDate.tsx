'use client'

import { useSettingModal } from '@/context/model-settings'
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'
import Button from '@/components/custom/Button'
import CustomSelect from '@/components/custom/CustomSelect'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMemo } from 'react'
import { WiTime4 } from 'react-icons/wi'
import { IoCalendarClearOutline } from 'react-icons/io5'
// Validation schema
const validationSchema = Yup.object({
  selectedDate: Yup.string().required('Please select a date'),
  selectedTime: Yup.string().required('Please select a time')
})

// Generate time slots (9 AM to 5 PM)
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour <= 17; hour++) {
    const time12 = hour > 12 ? hour - 12 : hour
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = time12 === 0 ? 12 : time12

    slots.push({
      value: `${hour.toString().padStart(2, '0')}:00`,
      label: `${displayHour}:00 ${ampm}`
    })

    slots.push({
      value: `${hour.toString().padStart(2, '0')}:30`,
      label: `${displayHour}:30 ${ampm}`
    })
  }
  return slots
}

// Generate next 7 days for date selection
const generateDateOptions = () => {
  const dates = []
  const today = new Date()

  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
    const monthDay = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
    const isoDate = date.toISOString().split('T')[0]

    dates.push({
      value: isoDate,
      label:
        i === 0
          ? `Today, ${monthDay}`
          : i === 1
          ? `Tomorrow, ${monthDay}`
          : `${dayName}, ${monthDay}`
    })
  }
  return dates
}

const ConsultationTimeAndDate = () => {
  const { closeModal, updateModalData, modalData } = useSettingModal()

  // Get doctor data from modal context
  const doctor = modalData?.bookDoctorModal?.doctor

  const initialValues = useMemo(
    () => ({
      selectedDate: modalData?.bookDoctorModal?.selectedDate || '',
      selectedTime: modalData?.bookDoctorModal?.selectedTime || ''
    }),
    [modalData?.bookDoctorModal]
  )

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      enableReinitialize: true,
      onSubmit: values => {
        // Update modal data with booking details
        updateModalData('bookDoctorModal', {
          ...modalData.bookDoctorModal,
          ...values,
          bookingConfirmed: true
        })

        console.log('Booking confirmed:', {
          doctor,
          ...values,
          symptoms: modalData?.bookDoctorModal?.selectedSymptoms,
          duration: modalData?.bookDoctorModal?.duration
        })

        // Here you would typically make an API call to book the consultation
        // For now, we'll just close the modal
        closeModal('bookDoctorModal')
      }
    })

  // Helper function to get name initials
  const getNameInitials = (name?: string): string => {
    if (!name) return 'DR'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <div className='p-5 mt-5 flex-shrink-0 font-poppins'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <h2 className='font-black text-[24px] text-[#1D1C1D]'>
              Book Consultation
            </h2>
          </div>
          <button
            type='button'
            className='text-gray-400 hover:text-gray-600 duration-500 transition-colors'
            onClick={() => closeModal('bookDoctorModal')}
          >
            <IoClose size={25} />
          </button>
        </div>
      </div>

      <div className='px-5 pb-5'>
        {/* Doctor Information Card */}
        <div className='mb-6 p-4 border border-gray-200 rounded-lg '>
          <div className='flex items-center gap-4'>
            <div className='relative'>
              {doctor?.profileImage ? (
                <Image
                  src={doctor.profileImage}
                  width={60}
                  height={60}
                  alt={doctor.fullName || 'Doctor'}
                  className='w-[60px] h-[60px] rounded-full object-cover bg-gray-200'
                />
              ) : (
                <div className='w-[60px] h-[60px] rounded-full bg-blue-100 flex items-center justify-center text-primary text-lg font-bold'>
                  {getNameInitials(doctor?.fullName)}
                </div>
              )}
            </div>

            <div className='flex-1'>
              <h3 className='text-lg font-semibold text-[#1D1C1D] mb-1'>
                {doctor?.fullName || 'Doctor Name'}
              </h3>
              <p className='text-primary font-medium text-sm mb-2'>
                {doctor?.specialty || 'General Practitioner'}
              </p>
              <div className=' gap-2 flex flex-col'>
                <span className='text-lg font-bold text-[#1D1C1D]'>
                  ₦ {doctor?.price || '0.00'}
                </span>
                <div className='px-2 w-[100px] items-center text-center flex justify-center py-1 bg-[#34C759] text-white text-xs rounded-full font-medium'>
                  Available
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className='mb-6 border rounded-[6px] p-2'>
          <div className='flex items-center gap-2 mb-3'>
            <div className='flex items-center justify-center'>
              <IoCalendarClearOutline className='w-6 h-6' />
            </div>
            <h3 className='text-lg font-semibold text-[#1D1C1D]'>
              Select Date
            </h3>
          </div>

          <CustomSelect
            placeholder='Select Date'
            value={values.selectedDate}
            onChange={value => setFieldValue('selectedDate', value)}
            options={generateDateOptions()}
            onBlur={handleBlur}
            selectTriggerClassName='bg-white border-none  rounded-lg min-h-[50px] h-[50px]'
            error={
              touched?.selectedDate && typeof errors.selectedDate === 'string'
                ? errors.selectedDate
                : false
            }
          />
        </div>

        {/* Time Selection */}
        <div className='mb-6 border rounded-[6px] p-2'>
          <div className='flex items-center gap-2 mb-3'>
            <div className='flex items-center justify-center'>
              <WiTime4 className='w-6 h-6' />
            </div>
            <h3 className='text-lg font-semibold text-[#1D1C1D]'>
              Select Time
            </h3>
          </div>

          <CustomSelect
            placeholder='Select Time'
            value={values.selectedTime}
            onChange={value => setFieldValue('selectedTime', value)}
            options={generateTimeSlots()}
            onBlur={handleBlur}
            selectTriggerClassName='bg-white border-none rounded-lg min-h-[50px] h-[50px]'
            error={
              touched?.selectedTime && typeof errors.selectedTime === 'string'
                ? errors.selectedTime
                : false
            }
          />
        </div>

        {/* Action Buttons */}
        <div className='flex gap-3 mt-8'>
          <Button
            text='Review Booking'
            className='w-full rounded-lg'
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </>
  )
}

export default ConsultationTimeAndDate
