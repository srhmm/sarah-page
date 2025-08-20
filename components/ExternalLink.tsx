import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function ExternalLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      className={cn(
        'flex shrink-0 items-center justify-center',
        'focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 focus-visible:outline-none dark:focus-visible:ring-offset-neutral-900',
        'rounded-10 size-10 rounded-md bg-[#fcf8fa] text-gray-600/90 transition-colors hover:bg-[#efebed] dark:bg-neutral-800',
      )}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}

export function InlineExternalLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      className="inline underline decoration-[#e3e2ec] decoration-3 underline-offset-2 transition-colors hover:text-gray-700 hover:decoration-[#bac7e3]"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}
