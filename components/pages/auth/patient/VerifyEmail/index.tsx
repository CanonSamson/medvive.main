'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import VerifyEmailBanner from './sections/VerifyEmailBanner'
import mixpanel from 'mixpanel-browser'
import Verification from './sections/Verification'
import { emailService } from '@/services/emailService'
import { auth } from '@/firebase-config'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'

const VerifyEmail = () => {
  const [isSending, setIsSending] = useState(false)
  const [verified, setVerified] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const patient = useContextSelector(UserContext, state => state.patient)

  const reSendEmail = async () => {
    setIsSending(true)

    if (!auth.currentUser) return
    try {
      emailService.sendWelcomeEmail({
        userId: auth.currentUser?.uid
      })

      toast.success('Email sent, please check your inbox.')
      mixpanel.track('email_verification_sent')
    } catch (error: any) {
      toast.error('Something went wrong.', error)
    } finally {
      setIsSending(false)
    }
  }

  // Show enhanced banner when verification is postponed
  if (!showModal && patient?.verifyLater && !patient?.emailVerification) {
    return (
      <VerifyEmailBanner
        reSendEmail={reSendEmail}
        setShowModal={setShowModal}
      />
    )
  }

  const condition = patient && patient?.emailVerification == false

  // if (!condition) {
  //   return null
  // }

  return (
    <>
      {!verified && (
        <Verification
          reSendEmail={reSendEmail}
          setVerified={setVerified}
          setShowModal={setShowModal}
        />
      )}
    </>
  )
}

export default VerifyEmail
