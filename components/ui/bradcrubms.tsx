import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export interface BreadCrumbsProps {
  links: { href: string; name: string }[]
  currentPageName: string
}

const BreadCrumbs = ({ links, currentPageName }: BreadCrumbsProps) => {
  return (
    <div className='flex w-full items-center gap-2 text-sm text-[#616061] font-medium'>
      {links.map(item => (
        <div key={item.href} className='flex items-center gap-2'>
          <Link
            href={item.href}
            className='hover:text-blue-500 transition-colors duration-300 ease-in-out'
          >
            {item.name}
          </Link>
          <ChevronRight className='size-4 text-[#616061]' />
        </div>
      ))}
      <span>{currentPageName}</span>
    </div>
  )
}

export default BreadCrumbs
