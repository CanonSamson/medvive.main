'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {  useState } from 'react'
import CustomNavLink from './CustomNavLink'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'

const DesktopNavigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathname = usePathname()

  // These should be defined or imported from your state management
  const unSeenConsultations: any[] = [] // Replace with actual type
  const unSeenBookingChats: any[] = [] // Replace with actual type

  const basedCurrentUserPath = useContextSelector(UserContext, state => state.basedCurrentUserPath)
  
  if (!basedCurrentUserPath) return <></>
  return (
    <div
      className={`z-[40] sticky top-0 left-0  bg-[#E8EDFA]/50  w-[100px] h-screen !h-[100dvh] hidden lg:block`}
    >
      <div className='flex items-center justify-center py-10'>
        <Image
          src='/logo/logo-v1.svg'
          alt='logo'
          className=' w-[50px] h-auto'
          width={100}
          height={100}
        />
      </div>
      <div className=' text-[#929CAD] flex flex-col gap-5  mx-auto justify-center items-center'>
        <CustomNavLink
          href={`${basedCurrentUserPath}`}
          text='Home'
          isOpen={isOpen}
        />

        <CustomNavLink
          href={`${basedCurrentUserPath}/consultations`}
          text='Consultations'
          notify={unSeenConsultations && unSeenConsultations}
          isOpen={isOpen}
        />

        <CustomNavLink
          href={`${basedCurrentUserPath}/chats`}
          text='Chats'
          notify={unSeenBookingChats && unSeenBookingChats}
          active={pathname.includes('${basedCurrentUserPath}/chats')}
          isOpen={isOpen}
        />

        <CustomNavLink
          href={`${basedCurrentUserPath}/profile`}
          text='Profile'
          active={pathname.includes('${basedCurrentUserPath}/profile')}
          isOpen={isOpen}
        />
      </div>
    </div>
  )
}

export default DesktopNavigation
