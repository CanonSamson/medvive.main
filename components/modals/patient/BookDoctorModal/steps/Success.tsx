'use client'
import { useSettingModal } from '@/context/model-settings'
import Button from '@/components/custom/Button'
import { FaRegCheckCircle } from 'react-icons/fa'
import { CgCloseO } from "react-icons/cg";
const Success = () => {
  const { closeModal } = useSettingModal()

  const handleViewBookings = () => {
  
    closeModal('bookDoctorModal')
 
  }

  return (
    <div className='relative lg:rounded-[16px] overflow-hidden'>
      {/* Close Button */}
      <button
        type='button'
        className='absolute top-4 right-4 text-white hover:text-gray-200 duration-500 transition-colors z-10'
        onClick={() => closeModal('bookDoctorModal')}
      >
        <CgCloseO size={25} />
      </button>

      {/* Blue Header Section */}
      <div className='bg-blue-600 text-white text-center  px-5'>
        {/* Success Icon */}
        <div className='  flex items-center justify-center py-5 mx-auto '>
          <FaRegCheckCircle className=' size-[60px] text-white' />
        </div>
      </div>

      {/* Content Section */}
      <div className='bg-white px-5 py-8 text-center'>
        {/* Title */}
        <h2 className='text-2xl font-bold text-[#1D1C1D] mb-4'>Awesome!</h2>

        {/* Message */}
        <p className='text-gray-600 text-base leading-relaxed mb-8 max-w-sm mx-auto'>
          We&apos;ll notify you once your booking is confirmed, A confirmation
          will also be sent to your email/SMS.
        </p>

        {/* View Bookings Button */}
        <div className='px-4'>
          <Button
            type='button'
            onClick={handleViewBookings}
            text='View Bookings'
            className='rounded-lg py-3 font-medium transition-colors duration-200 bg-blue-600 hover:bg-blue-700 w-full'
          />
        </div>
      </div>
    </div>
  )
}

export default Success
