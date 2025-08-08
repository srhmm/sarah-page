import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export default function ExternalLink({
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
        'focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 focus-visible:outline-none dark:focus-visible:ring-offset-neutral-900',
        'rounded-10 size-10 rounded-md bg-gray-50 text-gray-600 transition-colors hover:bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800'
      )}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}
