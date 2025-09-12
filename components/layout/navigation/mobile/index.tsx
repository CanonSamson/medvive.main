'use client'

import { useContextSelector } from 'use-context-selector'
import CustomNavLink from './CustomNavLink'
import { usePathname } from 'next/navigation'
import { UserContext } from '@/context/user'
import {
  BriefcaseMedical,
  House,
  MessageSquareText,
  SquareUser
} from 'lucide-react'
const MobileNavigation = () => {
  const pathname = usePathname()

  // These should be defined or imported from your state management
  const unSeenConsultations: any[] = [] // Replace with actual type
  const unSeenBookingChats: any[] = [] // Replace with actual type

  const basedCurrentUserPath = useContextSelector(
    UserContext,
    state => state.basedCurrentUserPath
  )

  if (!basedCurrentUserPath) return <></>

  return (
    <div className={`z-[40]  fixed bottom-0 left-0 w-full lg:hidden`}>
      <div className='h-[60px] grid-cols-4 text-[#929CAD]  mx-auto w-full bg-white shadow-gray-400 border-t grid justify-center items-center'>
        <CustomNavLink
          href={`${basedCurrentUserPath}`}
          text='Home'
          icon={<House />}
        />

        <CustomNavLink
          href={`${basedCurrentUserPath}/consultations`}
          text='Consultations'
          notify={unSeenConsultations && unSeenConsultations}
          icon={<BriefcaseMedical />}
        />

        <CustomNavLink
          href={`${basedCurrentUserPath}/chats`}
          text='Chats'
          notify={unSeenBookingChats && unSeenBookingChats}
          active={pathname.includes('${basedCurrentUserPath}/chats')}
          icon={<MessageSquareText />}
        />

        <CustomNavLink
          href={`${basedCurrentUserPath}/profile`}
          text='Profile'
          active={pathname.includes('${basedCurrentUserPath}/profile')}
          icon={<SquareUser />}
        />
      </div>
    </div>
  )
}

export default MobileNavigation
