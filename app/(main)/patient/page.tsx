'use client'
import Banner from '@/components/Banner'
import DashboardHeader from '@/components/layout/DashboardHeader'
import BreadCrumbs from '@/components/ui/bradcrubms'
import { UserContext } from '@/context/user'
import UpcomingAppointment from '@/sections/UpcomingAppointment'
import {
  getNameInitials,
  getUserFirstName,
  updateGreeting
} from '@/utils/functions'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { GrNotification } from 'react-icons/gr'
import Image from 'next/image'
import { FcLineChart } from 'react-icons/fc'
import { FaUserDoctor } from 'react-icons/fa6'
import { LiaFileMedicalSolid } from 'react-icons/lia'

const PatientHomePage = () => {
  const [profileIsComplete, setProfileIsComplete] = useState(true)
  const [medicalInfoComplete, setMedicalInfoComplete] = useState(true)

  const pending = false
  const notifications = []
  const patient = useContextSelector(UserContext, state => state.patient)

  useEffect(() => {
    if (pending || !patient) return

    const requiredFields = [
      'phoneNumber',
      'gender',
      'dateOfBirth',
      'fullName',
      'houseAddress',
      'maritalStatus',
      'religion',
      'ethnicity',
      'language',
      'occupation'
    ]

    const missingRequiredFields = requiredFields.some(
      field =>
        (patient as any)?.[field] === null || (patient as any)?.[field] === ''
    )

    if (missingRequiredFields) {
      setProfileIsComplete(false)
    }

    const medicalFields = [
      'disabilities',
      'admissions',
      'conditions',
      'smoke',
      'alcohol',
      'medicationAllergies',
      'foodAllergies'
    ]

    const missingMedicalFields = medicalFields.some(
      field =>
        (patient as any)?.[field] === null || (patient as any)?.[field] === ''
    )

    if (!missingRequiredFields && missingMedicalFields) {
      setMedicalInfoComplete(false)
    }
  }, [patient, pending])

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
              currentPageName='Overview'
            />
          </div>
          <UpcomingAppointment />
        </div>
      </div>

      {/* Mobile Layout - Fixed version with proper spacing and overflow */}
      <div className='lg:hidden text-dark w-full text-[14px] px-4 pb-[80px] font-poppins relative h-screen overflow-auto min-h-screen bg-gray-100 lg:max-w-none lg:h-auto lg:min-h-screen lg:bg-gray-50'>
        <div className='lg:hidden'>
          <header className='flex pt-6 z-20 justify-between items-start py-2 mb-4'>
            <div className='flex flex-col gap-0 flex-1 min-w-0'>
              <h1 className='text-[22px] sm:text-[24px] capitalize font-semibold mb-[-2px] leading-tight'>
                Hello,{' '}
                {(patient && getUserFirstName(patient)) || patient?.fullName} 👋
              </h1>
              <span className='text-sm sm:text-base opacity-75 mt-1'>
                {updateGreeting()}, stay healthy
              </span>
            </div>
            <div className='flex items-center gap-3 flex-shrink-0 ml-2'>
              <Link href='/patient/notifications' className='relative p-1'>
                <GrNotification size={20} />
                {notifications?.length > 0 && (
                  <span className='flex absolute -right-[4px] -top-[2px] rounded-full px-[4px] py-[2px] text-[10px] items-center leading-none justify-center bg-red-500 text-white'>
                    {notifications?.length}
                  </span>
                )}
              </Link>

              <Link href='/patient/profile'>
                {!patient?.profileImage ? (
                  <span className='bg-blue-100 text-blue-600 text-lg rounded-full h-[36px] w-[36px] font-bold flex items-center justify-center'>
                    {getNameInitials(patient?.fullName || '')}
                  </span>
                ) : (
                  <Image
                    src={patient?.profileImage}
                    width={36}
                    height={36}
                    alt={patient.fullName}
                    className='w-[36px] bg-gray-200 rounded-full h-[36px] object-cover'
                  />
                )}
              </Link>
            </div>
          </header>

          <section className='relative z-20 mb-5'>
            <div className='relative pl-4 items-end bg-blue-100 flex rounded-xl overflow-hidden'>
              <div className='z-10 w-[55%] pb-4 py-6'>
                <h2 className='text-[15px] sm:text-[16px] pb-3 capitalize font-bold leading-none text-blue-600'>
                  Top-tier Healthcare!
                </h2>
                <p className='text-[11px] sm:text-[12px] font-medium leading-[14px] sm:leading-[16px] text-gray-700'>
                  Access top-tier medical services at no cost! No hidden fees
                  and no need for a card to get started.
                </p>
              </div>
              <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-[45%] h-full flex items-center justify-center'>
                <Image
                  className='h-auto w-full max-w-[120px] sm:max-w-[140px] object-contain'
                  src='/images/victor.png'
                  alt='a doctor at medvive'
                  width={140}
                  height={200}
                  priority
                />
              </div>
            </div>
          </section>

          {!profileIsComplete && (
            <Banner
              onClose={() => setProfileIsComplete(true)}
              link='/patient/profile/basic'
              heading='Complete Profile Set Up'
              message='Enhance Your Experience: Complete Your Profile Setup Now'
              bg='bg-orange-100'
            />
          )}

          {!medicalInfoComplete && (
            <Banner
              onClose={() => setMedicalInfoComplete(true)}
              link='/patient/profile/medicalinfo'
              heading='Set Up Medical Info'
              message='Enhance Your Experience: Complete Your Profile Setup Now'
              bg='bg-blue-100'
            />
          )}

          <div className='mt-5 bg-white p-4 rounded-lg shadow-sm'>
            <h2 className='font-semibold text-lg sm:text-xl text-gray-600 mb-4'>
              Quick Actions
            </h2>
            <div className='space-y-3'>
              <Link
                href='/patient/consult'
                className='flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors'
              >
                <div className='rounded-lg bg-orange-100 p-2 text-orange-600 flex-shrink-0'>
                  <FaUserDoctor size={28} name='consult' />
                </div>
                <div className='min-w-0 flex-1'>
                  <h4 className='text-[15px] sm:text-[16px] font-semibold py-1'>
                    Book a Consult
                  </h4>
                  <p className='text-gray-600 text-[11px] sm:text-[12px] leading-tight'>
                    Book virtual consultations with healthcare experts.
                  </p>
                </div>
              </Link>
              <Link
                href='/patient/wallet'
                className='flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors'
              >
                <div className='rounded-lg bg-teal-100 p-2 flex-shrink-0'>
                  <Image
                    src='/svg/service-2.svg'
                    alt=''
                    width={28}
                    height={28}
                  />
                </div>
                <div className='min-w-0 flex-1'>
                  <h4 className='text-[15px] sm:text-[16px] font-semibold py-1'>
                    Fund your wallet
                  </h4>
                  <p className='text-gray-600 text-[11px] sm:text-[12px] leading-tight'>
                    See wallet balance
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className='mt-5 bg-white p-4 rounded-lg shadow-sm'>
            <h2 className='font-semibold text-lg sm:text-xl text-gray-600 mb-4'>
              Top Services
            </h2>
            <div className='space-y-3'>
              <Link
                href='/patient/consult'
                className='flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors'
              >
                <div className='rounded-lg text-blue-600 bg-blue-100 p-2 flex-shrink-0'>
                  <FaUserDoctor size={28} name='consult' />
                </div>
                <div className='min-w-0 flex-1'>
                  <h4 className='text-[15px] sm:text-[16px] font-semibold py-1'>
                    Consultations
                  </h4>
                  <p className='text-gray-600 text-[11px] sm:text-[12px] leading-tight'>
                    Book virtual consultations with healthcare experts.
                  </p>
                </div>
              </Link>
              <button
                onClick={() => alert('Coming Soon')}
                className='flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors w-full text-left'
              >
                <div className='rounded-lg text-blue-600 bg-blue-100 p-2 flex-shrink-0'>
                  <FcLineChart size={28} name='lineChart' />
                </div>
                <div className='min-w-0 flex-1'>
                  <h4 className='text-[15px] sm:text-[16px] font-semibold py-1'>
                    Health Tracking
                  </h4>
                  <p className='text-gray-600 text-[11px] sm:text-[12px] leading-tight'>
                    Monitor health metrics: BP, glucose, weight, etc.
                  </p>
                </div>
              </button>
            </div>
          </div>

          <div className='mt-5 bg-white p-4 rounded-lg shadow-sm'>
            <h2 className='font-semibold text-lg sm:text-xl text-gray-600 mb-4'>
              Recommended
            </h2>
            <div className='flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors'>
              <div className='rounded-lg bg-teal-100 text-teal-600 p-2 flex-shrink-0'>
                <LiaFileMedicalSolid size={28} />
              </div>
              <div className='min-w-0 flex-1'>
                <h4 className='text-[15px] sm:text-[16px] font-semibold py-1'>
                  Records
                </h4>
                <p className='text-gray-600 text-[11px] sm:text-[12px] leading-tight'>
                  Prescriptions and medications from consultations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientHomePage
