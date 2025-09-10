'use client'
import { ReactNode } from 'react'

// project import
import { Toaster } from 'sonner'

// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthGuard from '@/utils/route-guard/AuthGuard'
import { UserProvider } from './user'
import { SettingModalProvider } from './model-settings'
import NavigationLayout from '@/components/layout/navigation'

export const queryClient = new QueryClient()

// ==============================|| APP, ROUTER, LOCAL ||============================== //

export default function ProviderWrapper ({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <UserProvider>
        <SettingModalProvider>
          <AuthGuard>
            <NavigationLayout>{children}</NavigationLayout>
          </AuthGuard>
        </SettingModalProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}
