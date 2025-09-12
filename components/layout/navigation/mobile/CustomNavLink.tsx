import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface CustomNavLinkProps {
  href: string
  text: string
  notify?: any[]
  active?: boolean
  icon: React.ReactNode
}

const CustomNavLink = ({
  href,
  text,
  notify,
  active,
  icon
}: CustomNavLinkProps) => {
  const pathname = usePathname()
  const isActive: boolean = active ? active : pathname === href

  return (
    <Link
      href={href}
      className={`${
        isActive ? 'text-primary' : 'text-[#929CAD]'
      } relative flex flex-col duration-500 items-center justify-between hover:text-primary transition-colors`}
    >
      {icon}
      <span className='text-[8px] opacity-80'>{text}</span>
      {notify && notify?.length >= 1 && (
        <span
          className='flex absolute right-[30%] -top-[2px] rounded-full px-[4px] py-[2px] text-[10px] items-center leading-none justify-center bg-red-500 text-white'
        >
          {notify.length}
        </span>
      )}
    </Link>
  )
}

export default CustomNavLink
