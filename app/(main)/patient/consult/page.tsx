'use client'
import { IoFilterOutline } from 'react-icons/io5'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { db } from '@/firebase-config'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Users } from 'lucide-react'
import DashboardHeader from '@/components/layout/DashboardHeader'
import DoctorCard from '@/components/cards/DoctorCard'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface Doctor {
  id: string
  uid: string
  stars: number
  fullName: string
  profileImage: string
  specialty: string
  price?: number
  availability: string[]
  profiles_rate: string
}

const FindDoctors: React.FC = () => {
  const onlineUsers: string[] = [] // Changed from {} to string[] array

  const getDoctorData = async (): Promise<Doctor[]> => {
    try {
      const collectionRef = collection(db, 'doctors')

      const q = query(
        collectionRef,
        limit(10),
        where('profiles_rate', '==', '100%')
      )

      const querySnapshot = await getDocs(q)

      const doctors: Doctor[] = querySnapshot.docs.map(
        doc =>
          ({
            id: doc.id,
            ...doc.data()
          } as Doctor)
      )

      const onlineDoctors = doctors.filter((doctor: Doctor) =>
        onlineUsers.includes(doctor.uid)
      )
      const offlineDoctors = doctors.filter(
        (doctor: Doctor) => !onlineUsers.includes(doctor.uid)
      )
      return [...onlineDoctors, ...offlineDoctors]
    } catch (error) {
      console.error('Error fetching doctor data: ', error)
      return []
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctorData
  })

  const router = useRouter()
  const handleBackClick = (): void => {
    router.back()
  }

  return (
    <div className='bg-[#FAFAFA] min-h-screen w-full font-poppins'>
      {/* Desktop Layout */}
      <div className='hidden lg:block'>
        <div className='max-w-7xl mx-auto px-8 py-8'>
          {/* Desktop Header */}
          <DashboardHeader fullName={'Patient'} />

          {/* Desktop Search and Filters */}
          <div className=' py-6' />

          {/* Desktop Content */}
          <div className='  py-6'>
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h2 className='text-xl font-semibold text-gray-800'>
                  Top Picks
                </h2>
                <p className='text-gray-600 text-sm mt-1'>
                  Highly rated doctors available for consultation
                </p>
              </div>
            </div>

            {isLoading && (
              <div className='flex items-center justify-center py-12'>
                <div className='flex items-center gap-3'>
                  <AiOutlineLoading3Quarters
                    className='animate-spin text-blue-600'
                    size={24}
                  />
                  <span className='text-gray-600'>Loading doctors...</span>
                </div>
              </div>
            )}

            {data && !isLoading && (
              <div className='space-y-4'>
                {data.map((doctor: Doctor, index: number) => (
                  <DoctorCard
                    key={doctor.id || index}
                    doctor={doctor}
                    button={true}
                  />
                ))}
              </div>
            )}

            {data?.length === 0 && !isLoading && (
              <div className='text-center py-12'>
                <Users className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                  No doctors found
                </h3>
                <p className='text-gray-600'>
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='lg:hidden w-full overflow-x-auto px-4 pb-[100px] bg-gray-100 pt-10 text-[14px] h-screen'>
        <div>
          <button
            onClick={handleBackClick}
            className='bg-[#C6C6C9] text-gray-700 p-1 rounded-full'
          >
            <IoIosArrowRoundBack size={24} />
          </button>
          <div className='pt-4'>
            <h1 className='text-xl font-semibold'>Choose your doctor</h1>
            <span>Curate Your Care Team</span>
          </div>

          <div className='relative overflow-hidden mt-5 bg-white flex pl-2 items-center rounded-xl justify-between'>
            <>{/* search icon */}</>
            <input
              type='text'
              className='ml-2 flex-1 focus:outline-none h-[45px]'
              placeholder='Search Doctors'
            />
            <button className=' px-2 text-black/75'>
              <IoFilterOutline className=' size-[20px]' />
            </button>
          </div>
        </div>

        <div className='mt-5'>
          <span className='p-2 rounded-xl text-[#C6C6C9] text-base w-full flex font-semibold bg-white'>
            Top Picks
          </span>

          {isLoading && (
            <div className='flex items-center justify-center'>
              <span className='bg-white rounded-full p-2 mt-2'>
                <AiOutlineLoading3Quarters size={20} className='animate-spin' />
              </span>
            </div>
          )}

          <div className='mt-4 grid gap-2'>
            {data?.map((doctor: Doctor, index: number) => (
              <DoctorCard
                key={doctor.id || index}
                doctor={doctor}
                button={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FindDoctors
