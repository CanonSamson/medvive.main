'use client'

import { useContextSelector } from 'use-context-selector'
import CustomNavLink from './CustomNavLink'
import { usePathname } from 'next/navigation'
import { UserContext } from '@/context/user'

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
        <CustomNavLink href={`${basedCurrentUserPath}`} text='Home' />

        <CustomNavLink
          href={`${basedCurrentUserPath}/consultations`}
          text='Consultations'
          notify={unSeenConsultations && unSeenConsultations}
        />

        <CustomNavLink
          href={`${basedCurrentUserPath}/chats`}
          text='Chats'
          notify={unSeenBookingChats && unSeenBookingChats}
          active={pathname.includes('${basedCurrentUserPath}/chats')}
        />

        <CustomNavLink
          href={`${basedCurrentUserPath}/profile`}
          text='Profile'
          active={pathname.includes('${basedCurrentUserPath}/profile')}
        />
      </div>
    </div>
  )
}

export default MobileNavigation
