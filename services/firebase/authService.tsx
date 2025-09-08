import { auth } from '@/firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseDatabaseService } from './databaseService'

interface LoginCredentials {
  email: string
  password: string
}

interface SignUpCredentials {
  email: string
  password: string
  fullName: string
  emailVerification: boolean
  userDB: string
}

interface AuthResponse {
  Success: boolean
  Error: boolean | string
  uid?: string
}

export class AuthService {
  loginEmailAndPassword = async ({
    email,
    password
  }: LoginCredentials): Promise<AuthResponse | undefined> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)

      if (auth.currentUser) {
        return { Success: true, Error: false }
      }
    } catch (error: any) {
      let err: string | undefined
      if (error.message === `Firebase: Error (auth/user-not-found).`) {
        err = ' Invalid Credentials'
      }

      if (error.message === `Firebase: Error (auth/wrong-password).`) {
        err = 'Invalid Credentials'
      }

      if (
        error.message === `Firebase: Error (auth/invalid-login-credentials).`
      ) {
        err = 'Invalid Credentials'
      }

      if (error.message === `Firebase: Error (auth/network-request-failed).`) {
        err = 'Turn on your network'
      }

      if (
        error.message ===
        `Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).`
      ) {
        err =
          'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
      }
      if (err) return { Success: false, Error: err }
    }
  }

  signUpEmailAndPassword = async ({
    email,
    password,
    fullName,
    emailVerification,
    userDB
  }: SignUpCredentials) => {
    const { auth } = await import('@/firebase-config')
    const { createUserWithEmailAndPassword, updateProfile } = await import(
      'firebase/auth'
    )

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (credential && auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: fullName
        })

        await firebaseDatabaseService.createDB(userDB, auth.currentUser.uid, {
          email,
          fullName,
          emailVerification,
          uid: auth.currentUser.uid,
          wallet: {
            totalBalance: 0.0
          }
        })
        return { success: true, error: false, uid: auth.currentUser.uid }
      }
    } catch (error: any) {
      console.log(error)
      let err: string | undefined
      if (error.message === `Firebase: Error (auth/email-already-in-use).`) {
        err = 'Email address already in use'
      }

      if (error.message === `Firebase: Error (auth/invalid-email).`) {
        err = 'Enter a valid Email address'
      }
      if (
        error.message ===
        `Firebase: Password should be at least 6 characters (auth/weak-password).`
      ) {
        err = 'Password should be at least 6 characters '
      }

      if (err) return { error: err, success: false }
    }
  }
}

export const authService = new AuthService()
