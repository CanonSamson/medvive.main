'use client'
import React, { useEffect } from 'react'
import { createContext } from 'use-context-selector'

import { useRouter } from 'next/navigation'
import { DoctorType } from '@/types/doctor'
import { UserType } from '@/types/user'
import { PatientType } from '@/types/patient'
import { auth } from '@/firebase-config'
import { signOut } from 'firebase/auth'



export interface UserContextType {
  currentUser: UserType | null
  doctor: DoctorType | null
  patient: PatientType | null
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>
  setPatient: React.Dispatch<React.SetStateAction<PatientType | null>>
  setDoctor: React.Dispatch<React.SetStateAction<DoctorType | null>>
  isAuthenticated: boolean | undefined
  setIsAuthenticated: React.Dispatch<React.SetStateAction<undefined | boolean>>
  logout: ({ redirect }: { redirect?: boolean }) => void
  fetchCurrentUser: ({ load }: { load: boolean }) => Promise<void>
  setAllowRedirect: React.Dispatch<React.SetStateAction<boolean>>
  allowRedirect: boolean
  clearCookies: () => void
}

// Create the UserContext
export const UserContext = createContext<UserContextType>({
  currentUser: null,
  patient: null,
  doctor: null,
  isLoading: true,
  clearCookies: () => {},
  setIsLoading: () => {},
  setCurrentUser: () => {},
  setPatient: () => {},
  setDoctor: () => {},
  isAuthenticated: undefined,
  setIsAuthenticated: () => {},
  logout: () => {},
  fetchCurrentUser: async () => {},
  allowRedirect: true,
  setAllowRedirect: () => {}
})

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [currentUser, setCurrentUser] = React.useState<UserType | null>(null)
  const [patient, setPatient] = React.useState<PatientType | null>(null)
  const [doctor, setDoctor] = React.useState<DoctorType | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [allowRedirect, setAllowRedirect] = React.useState<boolean>(true)
  const [isAuthenticated, setIsAuthenticated] = React.useState<
    undefined | boolean
  >(undefined)

  const router = useRouter()

  const fetchCurrentUser = async ({ load = true }: { load: boolean }) => {
    const userId = ''
    try {
      if (load) setIsLoading(true)
      if (!userId) {
        setIsAuthenticated(false)
        setCurrentUser(null)
        return
      }
      const userData = {
        userId,
        name: '',
        email: '',
        emailVerified: false
      }

      setCurrentUser({
        ...userData
      })

      setIsAuthenticated(true)
    } catch (error) {
      console.error('Failed to fetch user:', error)
      setCurrentUser(null)
      setIsAuthenticated(false)
    } finally {
      if (load) setIsLoading(false)
    }
  }

  useEffect(() => {
    if (currentUser) {
      fetchCurrentUser({ load: false })
    }
  }, [auth])

  useEffect(() => {
    fetchCurrentUser({ load: true })
  }, [])

  const clearCookies = () => {}
  async function logout() {

    signOut(auth);
    router.push("/");
    setPatient(null);
    setDoctor(null);
  }

  return (
    <UserContext.Provider
      value={{
        clearCookies,
        currentUser,
        isLoading,
        setIsLoading,
        setCurrentUser,
        isAuthenticated,
        setIsAuthenticated,
        logout,
        fetchCurrentUser,
        allowRedirect,
        setAllowRedirect,
        patient,
        doctor,
        setPatient,
        setDoctor
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
