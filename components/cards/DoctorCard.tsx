import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSettingModal } from '@/context/model-settings'
import Star from '../Star'
import { MouseEvent } from 'react'

interface Doctor {
  uid: string
  stars: number
  fullName: string
  profileImage: string
  specialty: string
  price?: number
  availability: string[]
}

interface DoctorCardProps {
  doctor: Doctor
  button?: boolean
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, button }) => {
  const { openModal } = useSettingModal()
  const { uid, stars, fullName, profileImage, specialty, price, availability } =
    doctor
  const router = useRouter()
  const isOnline: boolean = false

  const handleBookConsult = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    router.push(`/patient/doctors/${uid}`)
    console.log(isOnline)
    // Handle book consult logic here
  }

  // Helper function to format day names to short format
  const formatDayName = (day: string): string => {
    const dayMap: Record<string, string> = {
      monday: 'Mon',
      tuesday: 'Tue',
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun'
    }

    const lowerDay: string = day.toLowerCase()
    return dayMap[lowerDay] || day.substring(0, 3)
  }

  // Format availability to short day names
  const formatAvailability = (availability: string[]): string => {
    if (!availability || availability.length === 0) return 'Not Available'

    return availability.map((day: string) => formatDayName(day)).join(', ')
  }

  return (
    <div className='bg-white font-poppins  rounded-xl p-6  shadow-[0px_1px_1px_rgba(0,0,0,0.1)] w-full'>
      <div className='flex items-start gap-4'>
        {/* Doctor Image */}
        <div className='relative flex-shrink-0'>
          <Image
            className='w-[140px] h-[140px] rounded-[10px] object-top  object-cover'
            src={profileImage}
            alt={fullName}
            width={400}
            height={400}
            loading='lazy'
          />
        </div>

        {/* Doctor Info */}
        <div className='flex-1 min-w-0'>
          <h3 className='text-xl font-semibold text-[#404040] mb-1'>
            {fullName}
          </h3>
          <p className='text-blue-600 font-medium text-sm mb-2'>{specialty}</p>

          {/* Availability */}
          <div className='mb-3  '>
            <span className='text-[#79767D] text-sm'>Available: </span>
            <span className='text-[#79767D] text-sm font-medium'>
              {formatAvailability(availability)}
            </span>
          </div>

          {/* Price */}
          {price ? (
            <div className='mb-4'>
              <span className='text-gray-900 font-bold text-[12px]'>
                ₦ {price} Per Hour
              </span>
            </div>
          ) : (
            <div className='mb-4'>
              <span className='text-gray-900 font-bold text-[12px]'>Free</span>
            </div>
          )}

          {/* Stars */}
          {stars > 0 && (
            <div className='mb-4'>
              <Star stars={stars} size={16} />
            </div>
          )}

          {/* Action Buttons */}
          {button && (
            <div className='flex gap-2'>
              <button
                onClick={() => {
                  openModal('doctorInfoModal', doctor)
                }}
                className='p-2  text-[12px] border border-gray-300 text-gray-700 rounded-[4px] font-medium hover:bg-gray-50 transition-colors'
              >
                View Profile
              </button>
              <button
                onClick={() => {
                  openModal('bookDoctorModal', {
                    doctor,
                    step: 1
                  })
                }}
                className=' p-2 text-[12px] bg-[#1648CE] text-white rounded-[4px] font-medium hover:bg-blue-700 transition-colors'
              >
                Book Consult
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorCard
