import Onboard from './layout'

interface OnboardingItem {
  heading: string
  text: string
  image: string
}

interface OnboardingProps {
  onboardingPage: number | null
  setOnboardingPage: (page: number | null) => void
}

const Onboarding = ({ onboardingPage, setOnboardingPage }: OnboardingProps) => {
  const onboarding: OnboardingItem[] = [
    {
      heading: 'Instant Access to Trusted Doctors',
      text: 'Affordable, convenient, and stress-free care at your convenience.',
      image: '/svg/onboarding/onboarding-1.svg'
    },
    {
      heading: 'Track Key Health Metrics Effortlessly',
      text: 'Monitor vital signs and progress to stay in control of your health journey.',
      image: '/svg/onboarding/onboarding-2.svg'
    },
    {
      heading: 'Your Healthcare Just a Tap Away',
      text: 'Get access to trusted medical care when you need it, anytime, anywhere.',
      image: '/svg/onboarding/onboarding-3.svg'
    }
  ]
  
  return (
    <div className=' tablet:hidden font-poppins'>
      <div>
        {onboarding.map((x, index) => (
          <Onboard
            key={index}
            index={index}
            onboardingPage={onboardingPage}
            setOnboardingPage={setOnboardingPage}
            {...x}
          />
        ))}
      </div>
    </div>
  )
}

export default Onboarding
