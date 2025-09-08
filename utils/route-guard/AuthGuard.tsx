'use client'

import React, { useEffect, useMemo } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { APP_DEFAULT_GUEST_PATHS } from '@/config'
import { useContextSelector } from 'use-context-selector'
import LoadingScreen from '@/components/layout/loading/LoadingScreen'
import { UserContext } from '@/context/user'

const AuthGuard = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()
  const pathName = usePathname()
  const currentUser = useContextSelector(UserContext, state => state.currentUser)

  const doctor = useContextSelector(UserContext, state => state.doctor)

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
      if (!isGuestPath) {
        router.replace('/login')

        return
      }
    } else {
      if (currentUser?.emailVerified === false) {
        router.replace('/register/verify-email')
        return
      } 
    }
  }, [isLoading, isAuthenticated, isGuestPath])

  if (isLoading) {
    return <LoadingScreen />
  }

  return children
}

export default AuthGuard
