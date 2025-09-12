import DashboardHeader from '@/components/layout/DashboardHeader'
import BreadCrumbs from '@/components/ui/bradcrubms'
import UpcomingAppointment from '@/sections/UpcomingAppointment'

const PatientConsulationsPage = () => {
  return (
    <div className='bg-[#FAFAFA] min-h-screen w-full font-poppins'>
      {/* Desktop Layout */}
      <div className='hidden lg:block'>
        <div className='max-w-7xl mx-auto px-8 py-8'>
          {/* Desktop Header */}
          <DashboardHeader showAvatar={false} fullName={'Patient'} />
          <div className=' my-5'>
            <BreadCrumbs
              links={[{ href: '/patient', name: 'Patient' }]}
              currentPageName='Consultations'
            />
          </div>
          <UpcomingAppointment />
        </div>
      </div>
    </div>
  )
}

export default PatientConsulationsPage
