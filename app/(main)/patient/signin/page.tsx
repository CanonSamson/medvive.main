'use client'
import { useFormik } from 'formik'
import { useEffect, useLayoutEffect, useState } from 'react'
import * as yup from 'yup'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast'
import mixpanel from 'mixpanel-browser/src/loaders/loader-module-core'
import InputField from '@/components/custom/InputField'
import Button from '@/components/custom/Button'

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Email address is required'),
  password: yup.string().min(8).required()
})

const SignInPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [signInError, setSignInError] = useState(null)

  const [patientDetail, setPatientDetail] = useState(null)

  console.log(setPatientDetail, signInError)
  const pending = false

  const loginEmailAndPassword = async (values: {
    email: string
    password: string
  }) => {
    return { Success: true, Error: 'Error', values }
  }

  const onSubmit = async (values: { email: string; password: string }) => {
    const { auth } = await import('@/firebase-config')

    setLoading(true)
    setSignInError(null)
    try {
      const { Success, Error } = await loginEmailAndPassword({
        email: values.email,
        password: values.password
      })

      if (Success) {
        const patient = {
          uid: '123',
          fullName: 'John Doe'
        }

        if (patient == null) {
          toast.success("You aren't a patient!")
          setLoading(false)
          await signOut(auth)
        } else {
          mixpanel.identify(patient?.uid)
          mixpanel.track('logged_in', {
            email: values.email,
            full_name: patient.fullName,
            plan_name: 'free_plan',
            user_id: patient?.uid
          })

          toast.success(`Welcome  Back`)
          router.replace('/patient')
        }
      } else {
        setLoading(false)
        toast.error(Error)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const { errors, touched, handleChange, handleBlur, values, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema,
      onSubmit
    })

  useEffect(() => {
    setSignInError(null)
  }, [values])

  useLayoutEffect(() => {
    if (patientDetail) {
      router.replace('/patient')
    }
  }, [pending, patientDetail, router])

  if (pending) return <></>

  return (
    <div
      className={`flex text-[14px] font-poppins bg-primary tablet:h-[100dvh] tablet:bg-white relative tablet:justify-center tablet:items-center tablet:px-[20px]`}
    >
      <div className=' tablet:max-w-[441px] tablet:mx-auto flex flex-col absolute tablet:static w-full tablet:top-auto h-[100dvh] tablet:h-auto tablet:justify-center tablet:items-center'>
        <div className='text-white bg-primary tablet:text-black flex flex-col px-4 gap-4 py-8 tablet:hidden'>
          <div className=' mb-2 bg-white tablet:bg-accent flex items-end rounded-full w-fit h-fit'>
            <Image
              src='/svg/onboarding/welcome-avatar.svg'
              alt='avatar'
              className=''
              width={48}
              height={48}
            />
          </div>

          <div className='flex flex-col gap-[11px]'>
            <h1 className=' text-[24px] font-bold'>Welcome Back</h1>
            <span className='font-regular text-[16px]'>
              Pick up where you left off. Your health info and care are here.
            </span>
          </div>
        </div>

        <div className='p-4 py-7 tablet:py-0 tablet:p-0 gap-5 font-semibold w-full flex-1 tablet:h-fit'>
          <div className='text-center flex flex-col gap-3 p-3 tablet:p-0 bg-[#F3F4F7] tablet:bg-white rounded-[8px] tablet:justify-center tablet:items-start'>
            <p className='font-medium text-[18px] text-[#42485C] tablet:text-[#2C2C2C] tablet:font-bold tablet:text-[25px]'>
              Sign In as 👇
            </p>

            <div className='grid grid-cols-2 rounded-full mx-auto tablet:mx-0 tablet:rounded-[8px] w-[75%] h-fit bg-[#F2F5FA] tablet:bg-[#F2F5FA] tablet:p-1'>
              <button
                onClick={() => router.push('/patient/signin')}
                className='rounded-full bg-[#E1E7F8] text-primary h-10 tablet:rounded-[8px]'
              >
                Patient
              </button>
              <Link
                href='/doctor/signin'
                className=' rounded-full flex items-center justify-center hover:bg-[#E1E7F8]/50 h-10 text-[#636380] tablet:rounded-[8px]'
              >
                Doctor
              </Link>
            </div>
          </div>
          <div className='mt-7 grid gap-[29px] w-full'>
            <InputField
              label='Email'
              name='gmail'
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

            <Link
              href='/patient/resetpassword'
              className=' text-end flex justify-end text-[#3A3D4C] font-medium text-[13px]'
            >
              Forgot Password?
            </Link>

            <div className=''>
              {/* <div className={`${signInError ? " mt-2" : "mt-4"}`}> */}
              {/* {signInError && (
                  <span className=" mb-4 text-[14px] flex text-red-500 ">
                    {signInError}
                  </span>
                )} */}

              <Button
                isSubmit={loading}
                onClick={() => handleSubmit()}
                type='button'
                text='Continue'
              />
              {/* <div className=" mt-5 flex w-[80%] mx-auto justify-between items-center ">
                  <span className="  h-[2px] flex bg-gray-100 w-full" />
                  <span className=" flex  font-medium justify-center w-[100px]  ">
                    Or
                  </span>
                  <span className="  h-[2px] flex bg-gray-100 w-full" />
                </div> */}
              {/* <button
                  disabled={loading}
                  onClick={handleSignUpwithGoogle}
                  className=" rounded-full mt-4 flex
                 w-full border h-[45px] 
                justify-center  items-center gap-4 bg-white"
                >
                  <Icon name="google" size={24} />
                  <p className=" font-poppins text-[14px] capitalize">
                    Sign In with Google
                  </p>
                </button> */}
              <Link
                href='/patient/signup'
                className=' flex justify-center mb-10 tablet:mb-0 mt-6 gap-1 font-normal text-[#717991]'
              >
                New user?{' '}
                <span className=' text-primary font-semibold hover:text-primary-dark transition-colors duration-300'>
                  Sign up here
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
