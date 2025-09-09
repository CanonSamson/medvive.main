'use client'

import React, { useEffect, useMemo } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { APP_DEFAULT_GUEST_PATHS } from '@/config'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import Cookies from 'js-cookie'

const userType = Cookies.get('user-type')

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathName = usePathname()
  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )

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

  const { uidb64, token } = useParams()

  const isGuestPath = useMemo(() => {
    return APP_DEFAULT_GUEST_PATHS.some(path => {
      // Remove query parameters from pathName for comparison
      const cleanPathName = pathName.split('?')[0]

      if (path.includes('[id]')) {
        const pathPattern = new RegExp(`^${path.replace('[id]', '([^/]+)')}$`)
        return pathPattern.test(cleanPathName)
      }
      return path === cleanPathName || (uidb64 && token)
    })
  }, [pathName])

  useEffect(() => {
    if (isAuthenticated === undefined || isLoading) return

    if (!allowRedirect) return

    if (!isAuthenticated) {
      if (userType === 'PATIENT') {
        router.replace('/patient/login')
      } else if (userType === 'DOCTOR') {
        router.replace('/doctor/login')
      }
    } else {
      if (userType === 'PATIENT') {
        router.replace('/patient')
      } else if (userType === 'DOCTOR') {
        router.replace('/doctor')
      }
    }
  }, [isLoading, isAuthenticated, isGuestPath])

  if (isLoading) {
    return <></>
  }

  return <>{children}</>
}

export default AuthGuard
