export class UserService {
  sendWelcomeEmail = ({ userId }: { userId: string }) => {
    try {
      fetch(`/api/v1/auth/sign-up/email-verification`, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId
        })
      }).then(res => {
        console.log('Fetch: ', res)
        return { sent: true }
      })
    } catch (error: any) {
      return { sent: true }
    }
  }
}

export const userService = new UserService()
