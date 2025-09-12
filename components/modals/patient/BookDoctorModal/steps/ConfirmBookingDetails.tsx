'use client'
import { useSettingModal } from '@/context/model-settings'
import { IoClose } from 'react-icons/io5'
import Button from '@/components/custom/Button'
import { FiUser, FiCalendar, FiClock, FiDollarSign } from 'react-icons/fi'
import moment from 'moment'

const ConfirmBookingDetails = () => {
  const { closeModal, updateModalData, modalData } = useSettingModal()

  // Get booking data from modal context
  const doctor = modalData?.bookDoctorModal?.doctor
  const selectedDate = modalData?.bookDoctorModal?.selectedDate
  const selectedTime = modalData?.bookDoctorModal?.selectedTime
  const consultationFee = doctor?.price || '0.00'
  const duration = '20 mins'

  // Format date for display
  const formatDate = (dateString?: string): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  }

  // Format time for display
  const formatTime = (timeString?: string): string => {
    if (!timeString) return ''
    return moment(timeString, 'HH:mm').format('h:mm A')
  }

  const handleEditBooking = () => {
    updateModalData('bookDoctorModal', {
      ...modalData?.bookDoctorModal,
      step: 2
    })
  }

  const handleConfirmPayment = () => {
    // Update modal data with booking confirmation
    updateModalData('bookDoctorModal', {
      ...modalData?.bookDoctorModal,
      bookingConfirmed: true
    })

    console.log('Booking confirmed:', {
      doctor,
      selectedDate,
      selectedTime,
      consultationFee,
      duration,
      symptoms: modalData?.bookDoctorModal?.selectedSymptoms,
      otherSymptoms: modalData?.bookDoctorModal?.otherSymptoms,
      symptomDuration: modalData?.bookDoctorModal?.duration,
      moreDetails: modalData?.bookDoctorModal?.moreDetails
    })

    // Here you would typically make an API call to process payment
    // For now, we'll just close the modal
    closeModal('bookDoctorModal')
  }

  return (
    <div>
      {/* Header */}
      <div className='p-5 mt-5 flex-shrink-0'>
        <div className='flex justify-between items-center mb-4'>
          <div className='text-center flex-1'>
            <h2 className='font-black text-[18px] text-[#1D1C1D] mb-2'>
              Amount due: {consultationFee}
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
        {/* Booking Summary Section */}
        <div className='mb-6 border rounded-[6px] p-4'>
          <div className='flex items-center gap-3 mb-4'>
            <div className=''>
              <FiCalendar className='w-6 h-6 text-gray-600' />
            </div>
            <h3 className='text-lg font-semibold text-[#1D1C1D]'>
              Booking Summary
            </h3>
          </div>

          {/* Booking Details */}
          <div className='space-y-4'>
            {/* Doctor */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className=''>
                  <FiUser className='w-5 h-5 text-gray-600' />
                </div>
                <span className='text-gray-700'>Doctor:</span>
              </div>
              <span className='font-medium text-[#1D1C1D]'>
                {doctor?.fullName || 'Doctor'}
              </span>
            </div>

            {/* Date */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className=''>
                  <FiCalendar className='w-5 h-5 text-gray-600' />
                </div>
                <span className='text-gray-700'>Date:</span>
              </div>
              <span className='font-medium text-[#1D1C1D]'>
                {formatDate(selectedDate) || '6/13/2025'}
              </span>
            </div>

            {/* Time */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className=''>
                  <FiClock className='w-5 h-5 text-gray-600' />
                </div>
                <span className='text-gray-700'>Time:</span>
              </div>
              <span className='font-medium text-[#1D1C1D]'>
                {formatTime(selectedTime) || '9:00 AM'}
              </span>
            </div>

            {/* Consultation Fee */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className=''>
                  <FiDollarSign className='w-5 h-5 text-gray-600' />
                </div>
                <span className='text-gray-700'>Consultation Fee:</span>
              </div>
              <span className='font-medium text-[#1D1C1D]'>
                {consultationFee}
              </span>
            </div>

            {/* Duration */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className=''>
                  <FiClock className='w-5 h-5 text-gray-600' />
                </div>
                <span className='text-gray-700'>Duration:</span>
              </div>
              <span className='font-medium text-[#1D1C1D]'>{duration}</span>
            </div>
          </div>

          {/* Edit Booking Link */}
          <button
            type='button'
            onClick={handleEditBooking}
            className='text-blue-600 hover:text-blue-800 font-medium text-sm mt-4 transition-colors duration-200'
          >
            Edit Booking
          </button>
        </div>

        {/* Confirm & Make Payment Button */}
        <div className='mt-6 pb-5'>
          <Button
            type='button'
            onClick={handleConfirmPayment}
            text='Confirm & Make Payment'
            className='rounded-lg py-3 font-medium transition-colors duration-200 bg-blue-600 hover:bg-blue-700'
          />
        </div>
      </div>
    </div>
  )
}

export default ConfirmBookingDetails
