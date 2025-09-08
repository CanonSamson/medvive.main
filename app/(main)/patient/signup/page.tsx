'use client'

import Link from 'next/link'

import { useFormik } from 'formik'
import Onboarding from './_onboarding/Onboarding'
import { useLayoutEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import mixpanel from 'mixpanel-browser'
import { auth } from '@/firebase-config'
import PrivacyPolicy from '@/components/PrivacyPolicy'
import InputField from '@/components/custom/InputField'
import * as yup from 'yup'
import { authService } from '@/services/firebase/authService'
import { emailService } from '@/services/emailService'

const signupSchema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email().required('Email address is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Passwords must match')
})

const SignUpPage = () => {
  const [onboardingPage, setOnboardingPage] = useState<null | number>(1)
  const [loading, setLoading] = useState(false)
  const [showTemsModal, setShowTemsModal] = useState(false)
  const [acceptTems, setAcceptTems] = useState(false)
  const router = useRouter()

  const pending = false

  const patientDetail = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const onSubmit = async () => {
    if (acceptTems) return await handleAcceptedTems()
    setShowTemsModal(true)
  }

  const handleSignUpwithGoogle = async () => {
    mixpanel.track('tried_google_signup')
    return toast.error('Please sorry google auth is not active yet')
  }

  const handleAcceptedTems = async () => {
    setAcceptTems(true)
    setShowTemsModal(false)
    setLoading(true)

    try {
      const res = await authService.signUpEmailAndPassword({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        emailVerification: false,
        userDB: 'patients'
      })
      if (res?.success && auth.currentUser) {
        emailService.sendWelcomeEmail({
          userId: auth.currentUser.uid
        })

        toast.success('Welcome to Medvive!')
        router.replace('/patient')

        mixpanel.identify(auth.currentUser.uid)

        mixpanel.register({
          email: values.email,
          full_name: values.fullName
        })

        mixpanel.track('signup_completed', {
          email: values.email,
          full_name: values.fullName,
          balance: 0.0,
          plan_name: 'free_plan'
        })
      } else {
        if (res?.error) {
          toast.error('Something went Wrong')
          mixpanel.track('signup_failed', {
            email: values.email,
            full_name: values.fullName,
            error: 'Something went Wrong'
          })
        }
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error?.message ?? 'Something went Wrong')
      mixpanel.track('signup_failed', {
        email: values.email,
        full_name: values.fullName,
        error: error?.message ?? 'Something went Wrong'
      })
    } finally {
      setLoading(false)
    }
  }

  const { errors, touched, handleChange, handleBlur, values, handleSubmit } =
    useFormik({
      initialValues: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validationSchema: signupSchema,
      onSubmit
    })

  useLayoutEffect(() => {
    if (pending) return
    if (patientDetail) router.push('/patient')
  }, [pending, patientDetail, router])

  if (pending) return <></>

  return (
    <>
      <Onboarding
        onboardingPage={onboardingPage}
        setOnboardingPage={setOnboardingPage}
      />
      <PrivacyPolicy
        showTemsModal={showTemsModal}
        setShowTemsModal={setShowTemsModal}
        handleAcceptedTems={handleAcceptedTems}
        acceptTems={acceptTems}
      />
      <div className='flex-1 '>
        <div
          className={`${
            !onboardingPage ? 'flex' : 'hidden tablet:flex'
          } font-poppins text-[14px] font-semibold  relative bg-primary  tablet:bg-white tablet:px-[20px] tablet:min-h-full`}
        >
          {/* <div className=" tablet:hidden w-full h-[50vh] fixed top-0 right-0  p-10 bg-primary "></div> */}
          <div className=' tablet:max-w-[500px] tablet:mx-auto tablet:pt-20 flex flex-col absolute tablet:static w-full tablet:top-auto h-fit tablet:h-auto tablet:min-h-screen tablet:gap-10 tablet:justify-center'>
            <div className='text-white tablet:text-black flex flex-col px-4 gap-4 pb-4 tablet:p-0 bg-primary tablet:bg-white pt-10'>
              <div className='flex flex-col gap-[11px]'>
                <h1 className=' text-[24px] font-bold'>Sign Up</h1>
                <span className='font-normal text-[16px] tablet:hidden'>
                  Create an account to begin your care journey with MedVive.
                </span>
                <p className='font-normal text-[16px] tablet:hidden'>
                  Step <span className='font-semibold text-[16px]'>1 </span> of{' '}
                  <span className='font-semibold text-[16px]'>4</span>
                </p>
              </div>
            </div>

            <div className='px-4 py-7 w-full tablet:max-w-[441px] tablet:p-0 bg-none tablet:h-fit bg-'>
              <div className=' mt-7 relative z-[2] grid gap-4 tablet:mt-0'>
                <InputField
                  label='Full Name'
                  name='fullName'
                  id='fullName'
                  type='text'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                  required
                  Error={touched.fullName && errors?.fullName}
                  placeholder='Enter your fullname'
                />
                <InputField
                  label='Email'
                  name='email'
                  id='email'
                  type='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  value={values.email}
                  Error={touched.email && errors?.email}
                  placeholder='example@gmail.com'
                />
                <InputField
                  label='Password'
                  name='password'
                  id='password'
                  type='password'
                  required
                  Error={touched.password && errors?.password}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='enter password'
                />
                <InputField
                  label='Confirm Password'
                  name='confirmPassword'
                  id='confirmPassword'
                  type='password'
                  required
                  Error={touched.confirmPassword && errors?.confirmPassword}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='confirm password'
                />

                <div className={` mt-4`}>
                  <button
                    disabled={loading}
                    onClick={() => {
                      handleSubmit()
                    }}
                    type='button'
                    className={`px-5 justify-center gap-4 text-white bg-primary hover:bg-primary-dark rounded-[12px]
                   mx-auto h-[52px] font-normal text-[16px] transition-colors duration-300  flex items-center w-full`}
                  >
                    <span className=' font-medium'>Continue</span>
                    {loading && <>{/* loading page here */}</>}
                  </button>

                  <div className=' mt-5 flex w-[80%] mx-auto justify-between items-center '>
                    <span className='  h-[1px] flex bg-[#2c2c2c] w-full' />
                    <span className=' flex  font-medium justify-center w-[100px]  '>
                      Or
                    </span>
                    <span className='  h-[1px] flex w-full bg-[#2c2c2c]' />
                  </div>

                  <button
                    onClick={handleSignUpwithGoogle}
                    className=' rounded-[12px] mt-4 flex
                 w-full border border-[#2C2C2C] h-[52px] 
                justify-center  items-center gap-4 bg-white'
                  >
                    <>{/* google icon here */}</>
                    <p className=' text-[14px] font-normal text-[#2C2C2C]'>
                      Sign Up with Google
                    </p>
                  </button>
                </div>

                <Link
                  href='/patient/signin'
                  className=' flex justify-center mb-10 mt-6 gap-1 font-normal text-[#717991]'
                >
                  Already have account?{' '}
                  <span className=' text-primary font-semibold'>
                    {' '}
                    Sign In here
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SignUpPage
