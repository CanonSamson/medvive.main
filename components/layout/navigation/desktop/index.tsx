'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import CustomNavLink from './CustomNavLink'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import {
  BriefcaseMedical,
  House,
  MessageSquareText,
  SquareUser
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Avatar from '@/components/ui/avatar'

const DesktopNavigation = () => {
  const isOpen = true
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
    <div
      className={cn(
        `z-[40] sticky font-poppins  font-semibold top-0 left-0  bg-[#E8EDFA]/50  w-[100px]  hidden lg:block`,
        isOpen ? ' w-[300px]' : ' w-[110px]',
        'h-screen ',
        '!h-[100dvh]'
      )}
    >
      <div className='h-full w-full px-5'>
        <div className='flex items-center justify-center py-10'>
          <Image
            src='/logo/logo-v1.svg'
            alt='logo'
            className=' w-[50px] h-auto'
            width={100}
            height={100}
          />
        </div>
        {isOpen && (
          <div>
            <div className=' mb-5 border-y py-4 flex items-center gap-2'>
              <Avatar
                fullName='Samson Beatrice'
                className=''
                innerClassName=' rounded-[12px]'
              />
              <div>
                <span className=' font-normal'>Good day 👋</span>
                <h2 className=' font-bold'>Samson Beatrice</h2>
              </div>
            </div>
          </div>
        )}

        <div
          className={cn(
            ' text-[#595959]  flex flex-col gap-5  mx-auto justify-center items-center',
            isOpen ? ' pb-5' : ''
          )}
        >
          {isOpen && (
            <div className='  w-full p-2 rounded-[6px]  text-[#595959] uppercase '>
              Menu
            </div>
          )}
          <CustomNavLink
            href={`${basedCurrentUserPath}`}
            text='Home'
            isOpen={isOpen}
            icon={<House />}
          />

          <CustomNavLink
            href={`${basedCurrentUserPath}/consultations`}
            text='Consultations'
            notify={unSeenConsultations && unSeenConsultations}
            isOpen={isOpen}
            icon={<BriefcaseMedical />}
          />

          <CustomNavLink
            href={`${basedCurrentUserPath}/chats`}
            text='Chats'
            notify={unSeenBookingChats && unSeenBookingChats}
            active={pathname.includes('${basedCurrentUserPath}/chats')}
            isOpen={isOpen}
            icon={<MessageSquareText />}
          />

          <CustomNavLink
            href={`${basedCurrentUserPath}/profile`}
            text='Profile'
            active={pathname.includes('${basedCurrentUserPath}/profile')}
            isOpen={isOpen}
            icon={<SquareUser />}
          />
        </div>

        {isOpen && (
          <div>
            <div className=' mb-5 border-t py-4 flex items-center gap-2'>
              <div className='  w-full p-2 rounded-[6px]  text-[#595959] uppercase '>
                Quick actions
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DesktopNavigation
