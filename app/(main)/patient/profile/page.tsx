'use client'
import { useRouter } from 'next/navigation'

import { FaBriefcaseMedical } from 'react-icons/fa'
import { AiOutlineLogout } from 'react-icons/ai'
import { calculateAge, getNameInitials } from '@/utils/functions'
import Link from 'next/link'
import Image from 'next/image'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import { MdEdit } from 'react-icons/md'
import { MdPerson } from 'react-icons/md'
import { IoSettings } from 'react-icons/io5'
import { IoChatbubbleEllipses } from 'react-icons/io5'
import { IoIosArrowBack } from 'react-icons/io'

const Profile = () => {
  const patient = useContextSelector(UserContext, state => state.patient)
  const logout = useContextSelector(UserContext, state => state.logout)

  const router = useRouter()

  if (!patient) return null

  return (
    <div className='bg-gray-100 pb-[100px] lg:pb-8 text-[14px] min-h-screen lg:min-h-auto'>
      {/* Desktop Layout */}
      <div className='hidden lg:block'></div>

      {/* Mobile Layout - Exact copy of your original */}
      <div className='lg:hidden'>
        <div className='bg-blue-600 px-4 rounded-b-2xl pb-16 shadow-xl'>
          <div className='flex items-center justify-end pt-4'>
            <button
              onClick={() => router.push('/patient/profile/basic')}
              className='bg-white text-gray-700 p-1 rounded-full'
            >
              <MdEdit name='edit' size={24} />
            </button>
          </div>
          <div className='text-white leading-none flex items-center justify-center flex-col mt-5'>
            <div className='relative h-[100px] w-[100px]'>
              {!patient?.profileImage ? (
                <span className='flex w-[100px] bg-gray-200 rounded-full h-[100px] relative text-gray-700 text-4xl font-extrabold items-center justify-center'>
                  {getNameInitials(patient.fullName)}
                </span>
              ) : (
                <Image
                  src={patient?.profileImage}
                  width={100}
                  height={100}
                  alt={patient.fullName}
                  className='flex w-[100px] bg-gray-200 rounded-full h-[100px] object-cover items-center justify-center'
                />
              )}
            </div>
            <span className='text-xl font-base mt-4'>{patient.fullName}</span>
            <span className='mt-2 flex'>
              {patient?.dateofbirth
                ? `${calculateAge(patient.dateofbirth)} ${
                    calculateAge(patient.dateofbirth) <= 1 ? 'Year' : 'Years'
                  } Old |`
                : 'age |'}{' '}
              {patient?.occupation || 'occupation'}
            </span>
          </div>
        </div>

        <section className='px-4'>
          <div className='mt-5 bg-white p-4 rounded-lg'>
            <div className='grid gap-4 mt-4'>
              <Link
                href='/patient/profile/basic'
                className='flex items-center justify-between gap-4'
              >
                <div className='flex items-center gap-4'>
                  <div className='rounded-lg text-gray-600 bg-gray-100 p-2'>
                    <MdPerson size={24} name='person' />
                  </div>
                  <div>
                    <h4 className='text-[16px] font-semibold'>Basic Info</h4>
                    <p className='text-gray-600 text-[12px]'>
                      Edit Age, Languages, Phone Number etc
                    </p>
                  </div>
                </div>
                <button className='rotate-180'>
                  <IoIosArrowBack size={24} />
                </button>
              </Link>

              <Link
                href='/patient/profile/medicalinfo'
                className='flex items-center justify-between gap-4'
              >
                <div className='flex items-center gap-4'>
                  <div className='rounded-lg text-gray-600 bg-gray-100 p-2'>
                    <FaBriefcaseMedical size={24} />
                  </div>
                  <div>
                    <h4 className='text-[16px] font-semibold'>Medical Info</h4>
                    <p className='text-gray-600 text-[12px]'>
                      Edit Place of work, Education and so on.
                    </p>
                  </div>
                </div>
                <button className='rotate-180'>
                  <IoIosArrowBack size={24} name='backarrow' />
                </button>
              </Link>
            </div>
          </div>

          <div className='mt-5 bg-white p-4 rounded-lg'>
            <div className='grid gap-4 mt-4'>
              <Link
                href='#'
                className='flex items-center justify-between gap-4'
              >
                <div className='flex items-center gap-4'>
                  <div className='rounded-lg text-gray-600 bg-gray-100 p-2'>
                    <IoSettings size={24} name='settings' />
                  </div>
                  <div>
                    <h4 className='text-[16px] font-semibold'>Settings</h4>
                    <p className='text-gray-600 text-[12px]'>
                      Configure app preferences
                    </p>
                  </div>
                </div>
                <button className='rotate-180'>
                  <IoIosArrowBack size={24} />
                </button>
              </Link>

              <Link
                href='/patient/support'
                className='flex items-center justify-between gap-4'
              >
                <div className='flex items-center gap-4'>
                  <div className='rounded-lg text-gray-600 bg-gray-100 p-2'>
                    <IoChatbubbleEllipses size={24} />
                  </div>
                  <div>
                    <h4 className='text-[16px] font-semibold'>Support</h4>
                    <p className='text-gray-600 text-[12px]'>Get Help</p>
                  </div>
                </div>
                <button className='rotate-180'>
                  <IoIosArrowBack size={24} />
                </button>
              </Link>

              <button
                onClick={() => logout({})}
                className='flex items-center justify-between gap-4'
              >
                <div className='flex items-center gap-4'>
                  <div className='rounded-lg text-red-500 bg-gray-100 p-2'>
                    <AiOutlineLogout size={24} />
                  </div>
                  <div>
                    <h4 className='text-[16px] font-semibold'>Log Out</h4>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Profile
