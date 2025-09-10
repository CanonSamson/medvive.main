'use client'
import DesktopNavigation from '@/components/layout/navigation/desktop'
import MobileNavigation from '@/components/layout/navigation/mobile'
import { APP_DEFAULT_GUEST_PATHS } from '@/config'
import { usePathname } from 'next/navigation'
import React from 'react'



const NavigationLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const patientTabs = APP_DEFAULT_GUEST_PATHS.filter(Boolean)

  const hidden = patientTabs.includes(pathname)
  return (
    <>
      <div className=' flex items-start  '>
        {!hidden && <DesktopNavigation />}
        <div className='w-full'>{children}</div>
      </div>
      {!hidden && <MobileNavigation />}
    </>
  )
}

export default NavigationLayout
