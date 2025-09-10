import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface CustomNavLinkProps {
  href: string
  text: string
  notify?: any[]
  active?: boolean
  isOpen: boolean
  icon: React.ReactNode
}

const CustomNavLink = ({
  href,
  text,
  notify,
  active,
  icon,
  isOpen
}: CustomNavLinkProps) => {
  const pathname = usePathname()
  const isActive: boolean = active ? active : pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'relative flex  transition-all duration-500 items-center hover:opacity-90  transition-colors',
        isActive
          ? isOpen
            ? 'bg-primary text-white'
            : 'text-primary '
          : isOpen
          ? ' '
          : 'text-[#929CAD]',
        isOpen ? ' rounded-[6px] w-full gap-2 py-2 px-2' : ' gap-[4px] flex-col justify-between'
      )}
    >
      {icon}
      <span className={cn(` opacity-80`, isOpen? "text-[12px]":" text-[10px]")}>{text}</span>
      {notify && notify?.length >= 1 && (
        <span
          className='flex absolute right-[30%] -top-[2px] rounded-full px-[4px] py-[2px] 
                text-[10px] items-center leading-none justify-center bg-red-500 text-white'
        >
          {notify.length}
        </span>
      )}
    </Link>
  )
}

export default CustomNavLink
