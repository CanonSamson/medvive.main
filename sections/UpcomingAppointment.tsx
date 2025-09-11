'use client'
import UpcomingBookingCard from '@/components/cards/UpcomingBookingCard'
import SectionTitle from '@/components/custom/SectionTitle'
import Link from 'next/link'

const UpcomingAppointment = () => {
  const appointments: any[] = []
  return (
    <div className='py-8 px-6 rounded-lg bg-white border  flex flex-col gap-8'>
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
  return (
    <div className='border bg-[#FDFDFD] border-tablet-srtoke rounded-lg py-8 px-6 flex flex-col items-start'>
      <p className='font-medium mb-3'>
        You currently have no upcoming appointment
      </p>

        <Link
          className='w-[200px] flex items-center px-4 bg-primary h-[45px] text-white rounded-md'
          href='/patient/consult'
        >
          Book Doctor
        </Link>
    </div>
  )
}
export default UpcomingAppointment
