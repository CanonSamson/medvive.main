import { UserContext } from '@/context/user'
import Image from 'next/image'
import { useContextSelector } from 'use-context-selector'

interface AllSetScreenProps {
  setProfileUpdated: (updated: boolean) => void
}

const AllSetScreen = ({ setProfileUpdated }: AllSetScreenProps) => {
  const fetchCurrentUser = useContextSelector(
    UserContext,
    state => state.fetchCurrentUser
  )

  const handleClose = async (): Promise<void> => {
    fetchCurrentUser({ load: false })
    setProfileUpdated(true)
  }
  return (
    <div className='min-h-[100dvh]  flex flex-col bg-white tablet:h-fit tablet:w-[500px] tablet:justify-center tablet:items-center tablet:gap-10 tablet:min-h-fit tablet:px-[32px] tablet:py-[48px] rounded-md'>
      {/* centered top area (fills available space above footer) */}
      <main className='flex-1 flex items-center justify-center px-4 tablet:px-0 tablet:h-fit'>
        <div className='flex flex-col items-center gap-4 tablet:gap-10'>
          <Image
            src='/svg/onboarding/completed.svg'
            alt='check-icon'
            width={132}
            height={132}
            className=''
          />

          <div className='text-center'>
            <h1 className='font-bold text-xl text-[#404040]'>All Set!</h1>
            <p className='font-normal text-[13px] text-[#424242] tablet:[#text-[#909090] mt-1'>
              Welcome to the future of healthcare
            </p>
          </div>
        </div>
      </main>

      {/* footer - always at bottom */}
      <footer className='w-full px-4 pb-20 tablet:pb-0'>
        <button
          onClick={() => handleClose()}
          className='w-full bg-primary hover:bg-primary-dark duration-300 transition-colors text-white py-3 rounded-[12px]'
        >
          Finish
        </button>

        {/* <Button
  text="Submit"
  isSubmit={submit}
  onClick={handleSubmit}
/>; */}
      </footer>
    </div>
  )
}

export default AllSetScreen
