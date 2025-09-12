'use client'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import mixpanel from 'mixpanel-browser'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import { authService } from '@/services/authService'
import { firebaseDatabaseService } from '@/services/firebase/databaseService'
import { OTPInput } from '@/components/custom/OTPInput'

// Format time as MM:SS
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`
}

interface VerificationProps {
  reSendEmail: () => void
  setShowModal: (show: boolean) => void
  setVerified: (verified: boolean) => void
  isSending: boolean
}

const Verification = ({
  reSendEmail,
  setShowModal,
  setVerified
}: VerificationProps) => {
  const patient = useContextSelector(UserContext, state => state.patient)
  const logout = useContextSelector(UserContext, state => state.logout)
  const fetchCurrentUser = useContextSelector(
    UserContext,
    state => state.fetchCurrentUser
  )

  const [otp, setOtp] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState<number>(300)

  const verifyOtp = async (): Promise<void> => {
    const { success } = await authService.verifySignUpEmail({
      otp,
      userId: patient?.uid as string
    })

    if (success) {
      setVerified(true)
      setShowModal(true)
    } else {
      toast.error('Invalid OTP')
    }
  }

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleVerifyLater = async (): Promise<void> => {
    setShowModal(false)
    await firebaseDatabaseService.updateDB('patients', patient?.uid as string, {
      verifyLater: true
    })
    await fetchCurrentUser({ load: true })
    mixpanel.track('verify_later')
  }

  return (
    <div className='flex text-[14px] tablet:bg-primary  w-full z-[55] relative font-poppins'>
      <div className='h-[100dvh] bg-white tablet:bg-primary flex justify-center items-center px-4 w-full z-[70] tablet:gap-10 flex-col'>
        <div className='gap-[38px] h-fit flex flex-col bg-white tablet:w-[504px] tablet:p-[32px] tablet:rounded-md'>
          <div className='gap-2 flex flex-col h-fit justify-start items-start w-full px-4'>
            <h2 className='text-[24px] font-bold text-[#2C2C2C]'>
              Verify your email
            </h2>
            <p className='text-[13px] text-[#3B3C3D]'>
              We&apos;ve sent a 5-digit code to your email address{' '}
              <span className='text-[#1648CE]'>{patient?.email}</span> Enter
              below to verify.
            </p>
          </div>

          <div className='gap-[32px] flex flex-col h-fit justify-center items-center w-full px-4'>
            <OTPInput length={5} onChange={setOtp} />
            <div className='flex flex-row justify-center items-center gap-1'>
              <p className='text-[13px] text-[#3B3C3D] text-center select-none w-[100px]'>
                Wait for {formatTime(timeLeft)}{' '}
              </p>
              <button
                onClick={reSendEmail}
                className={`font-semibold cursor-pointer transition-colors duration-300 text-[13px] ${
                  timeLeft === 0
                    ? 'text-[#1648CE] hover:text-primary-dark'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                Resend Code
              </button>
            </div>
          </div>

          <button
            onClick={() => verifyOtp()}
            disabled={otp.length !== 5}
            className='w-full py-3 bg-primary hover:bg-primary-dark transition-colors duration-300 text-white text-[16px] rounded-[12px] disabled:opacity-50'
          >
            Verify
          </button>

          <p className='text-[13px] text-[#3B3C3D] text-center select-none tablet:hidden'>
            Having Issues?{' '}
            <span
              onClick={() => logout({})}
              className='text-primary hover:text-primary-dark transition-colors duration-300 font-semibold cursor-pointer'
            >
              Restart{' '}
            </span>
            or{' '}
            <span
              onClick={() => handleVerifyLater()}
              className='text-primary hover:text-primary-dark transition-colors duration-300 font-semibold cursor-pointer'
            >
              {' '}
              Verify Later
            </span>
          </p>
        </div>

        <p className='hidden text-[13px] text-[#fff] text-center select-none tablet:block'>
          Having Issues?{' '}
          <span
            onClick={() => logout({})}
            className='hover:text-primary-dark transition-colors duration-300 font-semibold cursor-pointer'
          >
            Restart{' '}
          </span>
          or{' '}
          <span
            onClick={() => handleVerifyLater()}
            className='hover:text-primary-dark transition-colors duration-300 font-semibold cursor-pointer'
          >
            {' '}
            Verify Later
          </span>
        </p>
      </div>
    </div>
  )
}

export default Verification
