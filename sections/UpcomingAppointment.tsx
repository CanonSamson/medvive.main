'use client'
import UpcomingBookingCard from '@/components/cards/UpcomingBookingCard'
import SectionTitle from '@/components/custom/SectionTitle'
import { useRouter } from 'next/navigation'

const UpcomingAppointment = () => {
  const appointments: any[] = []
  return (
    <div className='py-8 px-6 rounded-lg bg-white border border-tablet-srtoke flex flex-col gap-8'>
      <SectionTitle>Upcoming Appointment</SectionTitle>
      {appointments.length === 0 ? (
        <NoUpcomingAppointments />
      ) : (
        appointments.map((item, index) => <UpcomingBookingCard key={index} />)
      )}
    </div>
  )
}

const NoUpcomingAppointments = () => {
  const router = useRouter()
  return (
    <div className='border bg-[#FDFDFD] border-tablet-srtoke rounded-lg py-8 px-6 flex flex-col items-start'>
      <p className='font-medium mb-3'>
      You currently have no upcoming appointment 
      </p>

      <button
        className='w-[200px]  bg-primary h-[45px] text-white rounded-md text-xs font-medium'
        onClick={() => {
          router.push('/patient/consult')
        }}
      >
        Book Doctor
      </button>
    </div>
  )
}
export default UpcomingAppointment
