import BreadCrumbs, {BreadCrumbsProps} from '@/components/ui/bradcrubms'
import React from 'react'

interface DashboardTopSectionProps extends BreadCrumbsProps {
  title: string
}

const DashboardTopSection = ({ title, ...props }: DashboardTopSectionProps) => {
  return (
    <div className='w-full'>
      <h1 className='text-3xl font-semibold block mb-8'>{title}</h1>
      <BreadCrumbs {...props} />
    </div>
  )
}

export default DashboardTopSection
