'use client'
import React, { useEffect, useMemo } from 'react'
import { createContext } from 'use-context-selector'

import { useRouter } from 'next/navigation'
import { DoctorType } from '@/types/doctor'
import { UserType } from '@/types/user'
import { PatientType } from '@/types/patient'
import { auth } from '@/firebase-config'
import { signOut } from 'firebase/auth'
import Cookies from 'js-cookie'
import { firebaseDatabaseService } from '@/services/firebase/databaseService'
import { useDoctorAndPatients } from '@/hooks/useDoctorAndPatients'

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
  basedCurrentUserPath: string | null
}

// Create the UserContext
export const UserContext = createContext<UserContextType>({
  currentUser: null,
  patient: null,
  basedCurrentUserPath: null,
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

  const userType = Cookies.get('user-type')

  const fetchCurrentUser = async ({ load = true }: { load: boolean }) => {
    const userId = auth.currentUser?.uid

    try {
      if (load) setIsLoading(true)
      if (!userId) {
        setIsAuthenticated(false)
        setCurrentUser(null)
        return
      }

      if (userType === 'PATIENT') {
        const data = await getPatientData()
        console.log(data, 'patient')
      } else {
        const data = await getDoctorData()
      }

      setIsAuthenticated(true)
    } catch (error) {
      console.error('Failed to fetch user:', error)
      setCurrentUser(null)
      setIsAuthenticated(false)
    } finally {
      if (load) setIsLoading(false)
    }
  }

  const clearCookies = () => {}
  async function logout () {
    signOut(auth)
    router.push('/')
    setPatient(null)
    setDoctor(null)
  }

  const getPatientData = async () => {
    if (!auth.currentUser) return null
    try {
      const { data: patient } = await firebaseDatabaseService.getDB(
        'patients',
        auth.currentUser.uid
      )
      setPatient(patient)
      return { patient }
    } catch (error) {
      console.error('Error fetching user user:', error)
    }
  }

  const getDoctorData = async () => {
    if (!auth.currentUser) return null
    try {
      const { data: doctor } = await firebaseDatabaseService.getDB(
        'doctors',
        auth.currentUser.uid
      )
      setDoctor(doctor)
      return { doctor }
    } catch (error) {
      console.error('Error fetching user user:', error)
    }
  }

  useDoctorAndPatients({
    setUserDetail: data => {
      if (data?.doctor) {
        setDoctor(data.doctor)
      } else if (data?.patient) {
        setPatient(data.patient)
      }
    },
    setIsLoading
  })

  const basedCurrentUserPath = useMemo(() => {
    return userType === 'PATIENT'
      ? '/patient'
      : userType === 'DOCTOR'
      ? '/doctor'
      : '/patient'
  }, [userType])
  return (
    <UserContext.Provider
      value={{
        clearCookies,
        basedCurrentUserPath,
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
