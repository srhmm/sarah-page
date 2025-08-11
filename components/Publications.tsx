import { Publication } from '@/types/main'
import { conferencePublications } from '@/data/publications'
import { cn } from '@/lib/utils'
import { ReactNode, RefObject, useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { HiArrowUpRight } from 'react-icons/hi2'
import Spacer from '@/components/Spacer'

export default function Publications({
  containerRef,
}: {
  containerRef?: RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="txt-preset-5">Recent Publications</h2>
      <div className="h-px w-full bg-gray-800/10" />
      <section className="flex flex-col gap-y-4">
        {conferencePublications.map((publication: Publication) => (
          <PublicationCard
            key={publication.title}
            publication={publication}
            containerRef={containerRef}
          />
        ))}
      </section>
    </div>
  )
}

function PublicationCard({
  publication,
  containerRef,
}: {
  publication: Publication
  containerRef?: RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="flex flex-col rounded-md py-4">
      <div className="txt-preset-9 font-normal text-gray-500">
        {publication.venue}, {publication.year}
      </div>
      <Spacer className="h-2" />
      <h3 className="txt-preset-5 font-semibold">{publication.title}</h3>
      <Spacer className="h-1" />
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {publication.authors.map((author) => (
          <div key={author} className="flex items-center">
            <span
              className={cn(
                'txt-preset-7 leading-[140%] text-gray-500',
                author === 'Sarah Mameche' ? '' : ''
              )}
            >
              {author}
            </span>
          </div>
        ))}
      </div>
      <Spacer className="h-5" />
      <div className="flex gap-2.5">
        {publication.urls?.paper && (
          <PublicationLink url={publication.urls.paper}>
            <span className="text-semibold txt-preset-9">paper</span>
          </PublicationLink>
        )}
        {publication.bibtex && (
          <Bibtex bibtex={publication.bibtex} containerRef={containerRef} />
        )}
        {publication.urls?.code && (
          <PublicationLink
            url={publication.urls.code}
            type="external"
            className="h-6 txt-preset-9"
          >
            code
            <HiArrowUpRight className="size-2 stroke-1 text-gray-900" />
          </PublicationLink>
        )}
      </div>
    </div>
  )
}

function PublicationLink({
  url,
  children,
  type,
  className,
}: {
  url: string
  children: ReactNode
  type?: 'external' | 'internal'
  className?: string
}) {
  return (
    <a
      className={cn(
        'flex h-6 w-fit items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1 transition-colors hover:bg-gray-200',
        className
      )}
      href={url}
      target={type === 'external' ? '_blank' : '_self'}
      rel={type === 'external' ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  )
}

function Bibtex({
  bibtex,
  containerRef,
}: {
  bibtex: string
  containerRef?: RefObject<HTMLDivElement | null>
}) {
  const [container, setContainer] = useState<HTMLDivElement | undefined>(
    undefined
  )

  useEffect(() => {
    if (!containerRef?.current) return
    setContainer(containerRef.current)
  }, [containerRef])

  return (
    <Popover>
      <PopoverTrigger className="flex h-6 w-fit items-center gap-2 rounded-md bg-gray-100 px-3 py-1 txt-preset-9 transition-colors hover:bg-gray-200">
        bib
      </PopoverTrigger>
      <PopoverContent
        className="w-[calc(100vw-40px)] max-w-[600px] overflow-x-auto"
        collisionBoundary={container}
      >
        <pre className="txt-preset-mono">{bibtex}</pre>
      </PopoverContent>
    </Popover>
  )
}
