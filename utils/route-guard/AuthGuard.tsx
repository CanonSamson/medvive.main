'use client'

import React, { useEffect, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  APP_DEFAULT_GUEST_PATHS,
  PATIENT_DEFAULT_AUTH_PATHS,
  PATIENT_DEFAULT_GUEST_PATHS
} from '@/config'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import Cookies from 'js-cookie'
const userType = Cookies.get('user-type')

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathName = usePathname()

  const logout = useContextSelector(UserContext, state => state.logout)

  const doctor = useContextSelector(UserContext, state => state.doctor)
  const patient = useContextSelector(UserContext, state => state.patient)

  const isLoading = useContextSelector(UserContext, state => state.isLoading)
  const isAuthenticated = useContextSelector(
    UserContext,
    state => state.isAuthenticated
  )
  const allowRedirect = useContextSelector(
    UserContext,
    state => state.allowRedirect
  )

  const isGuestPath = useMemo(() => {
    return APP_DEFAULT_GUEST_PATHS.some(path => {
      // Remove query parameters from pathName for comparison
      const cleanPathName = pathName.split('?')[0]

      if (path.includes('[id]')) {
        const pathPattern = new RegExp(`^${path.replace('[id]', '([^/]+)')}$`)
        return pathPattern.test(cleanPathName)
      }
      return path === cleanPathName
    })
  }, [pathName])

  const isPatientGuestPath = useMemo(() => {
    return PATIENT_DEFAULT_GUEST_PATHS.some(path => {
      // Remove query parameters from pathName for comparison
      const cleanPathName = pathName.split('?')[0]

      if (path.includes('[id]')) {
        const pathPattern = new RegExp(`^${path.replace('[id]', '([^/]+)')}$`)
        return pathPattern.test(cleanPathName)
      }
      return path === cleanPathName
    })
  }, [pathName])

  const isPatientAuthPath = useMemo(() => {
    return PATIENT_DEFAULT_AUTH_PATHS.some(path => {
      // Remove query parameters from pathName for comparison
      const cleanPathName = pathName.split('?')[0]

      if (path.includes('[id]')) {
        const pathPattern = new RegExp(`^${path.replace('[id]', '([^/]+)')}$`)
        return pathPattern.test(cleanPathName)
      }
      return path === cleanPathName
    })
  }, [pathName])

  useEffect(() => {
    if (isAuthenticated === undefined || isLoading) return

    if (!allowRedirect) return

    if (userType === 'PATIENT') {
      if (!isAuthenticated) {
        if (!isPatientGuestPath) {
          router.replace('/patient/signin')
          return
        }
      } else {
        if (!patient?.emailVerification && !patient?.verifyLater) {
          router.replace('/patient/verify')
          return
        } else if (!patient?.dateofbirth) {
          router.replace('/register/complete-profile')
          return
        } else if (isPatientGuestPath && !isPatientAuthPath) {
          router.replace('/patient')
          return
        }
      }
    }
  }, [isLoading, isAuthenticated, isPatientGuestPath])

  useEffect(() => {
    if (!userType?.trim() && !isGuestPath && isAuthenticated) {
      logout({})
    }
  }, [userType, isAuthenticated, isGuestPath])

  if (isLoading) {
    return <></>
  }

  return <>{children}</>
}

export default AuthGuard
