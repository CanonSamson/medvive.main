// ==============================|| APP CONSTANT ||============================== //

export const APP_DEFAULT_PATH = '/'
export const PATIENT_DEFAULT_PATH = '/patient'
export const PATIENT_DEFAULT_GUEST_PATHS = [
  '/patient/signin',
  '/paitient/signup'
]
export const DOCTOR_DEFAULT_PATH = '/doctor'
export const DOCTOR_DEFAULT_GUEST_PATHS = ['/doctor/signin', '/doctor/signup']
export const APP_DEFAULT_AUTH_PATHS = []
export const APP_DEFAULT_GUEST_PATHS = [
  '/',
  '/patient/signin',
  '/paitient/signup',
  '/doctor/signin',
  '/doctor/signup'
]

// ==============================|| APP CONFIG ||============================== //

const config = {
  defaultPath: APP_DEFAULT_PATH,
  guestPaths: APP_DEFAULT_GUEST_PATHS,
  authPaths: APP_DEFAULT_AUTH_PATHS,
  patientPaths: PATIENT_DEFAULT_GUEST_PATHS,
  doctorPaths: DOCTOR_DEFAULT_GUEST_PATHS
}

export default config
