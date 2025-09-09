import AuthLayout from '@/layouts/AuthLayout'

export const metadata = {
  title: 'Medvive | patient sign up'
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout mode='signup'>{children}</AuthLayout>
}

export default Layout
