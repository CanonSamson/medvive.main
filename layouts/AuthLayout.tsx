import Image from 'next/image'
import { ReactNode } from 'react'

interface AuthLayoutProps {
  mode: 'signin' | 'signup'
  children: ReactNode
}

const AuthLayout = ({ mode, children }: AuthLayoutProps) => {
  return (
    <main className=' font-poppins relative w-ful laptop:flex tablet:flex-row tablet:grid tablet:grid-cols-2'>
      <section className="bg-[url('/svg/onboarding/Pattern.svg')] hidden overflow-hidden  text-black tablet:flex bg-accent h-[100dvh] justify-center items-center sticky top-0 laptop:max-w-[666px] tablet:max-w">
        <div className=' flex flex-col gap-40 w-full h-full py-24 px-11 justify-center relative'>
          <div className='hidden tablet:flex absolute top-[97px] left-[44px]'>
            <Image
              src={`/logo-v3.svg`}
              alt='medvive logo'
              width={40}
              height={40}
              className=' h-[32px] w-auto'
            />
          </div>

          {mode === 'signin' && (
            <div className=' max-w-[100%] mx-auto h-fit text-[#2D2D2D]'>
              <h1 className='laptop:text-[48px] tablet:text-[24px] leading-none font-bold'>
                Jump right back in
              </h1>
              <p className='laptop:text-[20px] text-[16px] mt-6'>
                Pick off where you left off. Your health info and care is
                intact.
              </p>
            </div>
          )}

          {mode === 'signup' && (
            <div className=' max-w-[100%] mx-auto h-fit text-[#2D2D2D]'>
              <h1 className='laptop:text-[48px] tablet:text-[24px] leading-none font-bold'>
                Join thousands taking control of their health — anytime,
                anywhere.
              </h1>
              <p className=' laptop:text-[20px] text:[16px] mt-6'>
                Sign up in seconds. Talk to a doctor in minutes
              </p>
            </div>
          )}
        </div>
      </section>

      <section className=' flex flex-col flex-1 tablet:overflow-auto min-w-fit'>
        {children}
      </section>
    </main>
  )
}

export default AuthLayout
