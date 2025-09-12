import { auth } from '@/firebase-config'
import { firebaseDatabaseService } from '@/services/firebase/databaseService'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { DoctorType } from '@/types/doctor'
import { PatientType } from '@/types/patient'

const userType = Cookies.get('user-type')

interface UserDetail {
  doctor: DoctorType | null
  patient: PatientType | null
}

interface UseDoctorAndPatientsProps {
  setUserDetail: (userDetail: UserDetail | null) => void
  setIsLoading: (loading: boolean) => void
  fetchCurrentUser: ({ load }: { load: boolean }) => Promise<void>
}

export const useDoctorAndPatients = ({
  setUserDetail,
  setIsLoading,
}: UseDoctorAndPatientsProps): void => {
  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = auth.onAuthStateChanged(async user => {
        if (auth.currentUser) {
          try {
            const res = await firebaseDatabaseService.getDB(
              userType === 'DOCTOR' ? 'doctors' : 'patients',
              auth.currentUser.uid
            )

            setUserDetail({
              doctor: userType === 'DOCTOR' ? res?.data : null,
              patient: userType === 'DOCTOR' ? null : res?.data
            })

            setIsLoading(false)
          } catch (error) {
            console.error('Error fetching user data:', error)
            setUserDetail(null)
            setIsLoading(false)
          }
        } else {
          setIsLoading(false)
        }
      })

      return () => {
        unsubscribe()
      }
    }

    fetchData()
  }, [setUserDetail, setIsLoading])
}
