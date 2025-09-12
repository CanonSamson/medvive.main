export type PatientType = {
  uid: string
  fullName: string
  preferredName: string
  email: string
  profileImage: string | null
  emailVerification: boolean
  emailVerifiedAt: string
  phoneNumber: string
  dateofbirth: string
  gender: string
  height: number
  heightUnit: string
  weight: number
  weightUnit: string
  verifyLater: boolean
  updateProfileLater: boolean
  occupation?: string
}