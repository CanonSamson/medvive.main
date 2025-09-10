import NavigationLayout from '@/components/layout/navigation'
import ProviderWrapper from '@/context/ProviderWrapper'

export default function MainLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ProviderWrapper>
      {children}
    </ProviderWrapper>
  )
}
