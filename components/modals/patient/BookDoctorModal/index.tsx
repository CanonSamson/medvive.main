'use client'

import { useSettingModal } from '@/context/model-settings'
import HowYouFeel from './steps/HowYouFeel'
import ConsultationTimeAndDate from './steps/ConsultationTimeAndDate'
import ConfirmBookingDetails from './steps/ConfirmBookingDetails'
import Success from './steps/Success'

const BookDoctorModal = () => {
  const { modals, toggleModal } = useSettingModal()

  const step: number = 4
  // const step: number = modalData?.bookDoctorModal?.step || 2
  return (
    <div
      className={`fixed  top-0 right-0  w-full h-screen !h-[100dvh] z-50 items-end lg:items-center justify-center ${
        modals.bookDoctorModal ? 'flex' : 'hidden'
      }`}
    >
      <div
        className='fixed inset-0 bg-black opacity-50'
        onClick={() => toggleModal('bookDoctorModal')}
      />

      {step === 4 ? (
        <Success />
      ) : (
        <div className='bg-white hide-scrollbar overflow-x-auto font-poppins rounded-b-[0px] lg:rounded-b-[16px] rounded-[16px] shadow-lg max-h-[70vh] w-full lg:max-w-[600px]  z-10 flex flex-col'>
          {step === 1 ? (
            <HowYouFeel />
          ) : step === 2 ? (
            <ConsultationTimeAndDate />
          ) : step === 3 ? (
            <ConfirmBookingDetails />
          ) : null}
        </div>
      )}
    </div>
  )
}

export default BookDoctorModal
