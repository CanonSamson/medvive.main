'use client'

import { useMemo, useState } from 'react'
import StepOne from './steps/StepOne'
import StepTwo from './steps/StepTwo'
import AllSetScreen from './sections/AllSetScreen'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'

const FinishUp = () => {
  const [step, setStep] = useState(1)
  const [profileUpdated, setProfileUpdated] = useState(false)
  const patient = useContextSelector(UserContext, state => state.patient)

  const condition = useMemo(() => {
    if (profileUpdated) return false

    return (
      ((patient?.emailVerification || patient?.verifyLater) &&
        !patient?.dateofbirth) ||
      (patient?.dateofbirth && !patient?.height) ||
      (!patient?.updateProfileLater && !patient?.height)
    )
  }, [
    patient?.dateofbirth,
    patient?.emailVerification,
    patient?.height,
    patient?.verifyLater,
    patient?.updateProfileLater,
    profileUpdated
  ])

  // Render the appropriate step component with necessary props
  const renderStep = () => {
    const stepProps = {
      step,
      setStep,
      setProfileUpdated
    }

    switch (step) {
      case 1:
        return <StepOne {...stepProps} />
      case 2:
        return <StepTwo {...stepProps} />
      case 3:
        return <AllSetScreen {...stepProps} />
      default:
        return null
    }
  }

  return (
    <>
      <div
        className={`${
          condition ? 'tablet:flex' : 'hidden'
        }  top-0 right-0 left-0 w-full h-screen !h-[100dvh] z-[5000]`}
      >
        <div
          className={`  text-[14px] z-[55] tablet:bg-primary tablet:min-h-[100dvh] mx-auto w-full font-poppins  tablet:flex tablet:justify-center tablet:items-center`}
        >
          <div className='flex flex-col w-full tablet:top-none top-[20vh] h-screen tablet:h-fit tablet:py-10 tablet:justify-center  tablet:items-center'>
            {renderStep()}
          </div>
        </div>
      </div>
    </>
  )
}

export default FinishUp
