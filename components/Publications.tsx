import { Publication } from '@/types/main'
import { conferencePublications } from '@/data/publications'
import { cn } from '@/lib/utils'
import { ReactNode, RefObject, useEffect, useState } from 'react'
import { FaGithub } from 'react-icons/fa6'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FaQuidditch } from 'react-icons/fa'

export default function Publications({
  containerRef,
}: {
  containerRef?: RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="txt-preset-6">Publications</h2>
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
    <div className="flex flex-col gap-y-2 rounded-md py-4">
      <div className="txt-preset-8 font-normal text-gray-500">
        {publication.venue}, {publication.year}
      </div>
      <h3 className="txt-preset-6 font-semibold">{publication.title}</h3>
      <div className="flex flex-col gap-y-1">
        <div className="flex">
          {publication.authors.map((author, index) => (
            <div key={author} className="flex items-center">
              <span
                className={cn(
                  'txt-preset-7 text-gray-500',
                  author === 'Sarah Mameche' ? '' : ''
                )}
              >
                {author}
              </span>
              {index < publication.authors.length - 1 && (
                <div className="mx-1 size-0.5 rounded-full bg-gray-400/0" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex gap-2.5">
        {publication.urls?.paper && (
          <PublicationLink url={publication.urls.paper}>
            <span className="text-semibold txt-preset-7 text-gray-600">
              PDF
            </span>
          </PublicationLink>
        )}
        {publication.urls?.code && (
          <PublicationLink
            url={publication.urls.code}
            type="external"
            className="size-10"
          >
            <FaGithub className="text-gray-600" />
          </PublicationLink>
        )}
        {publication.bibtex && (
          <Bibtex bibtex={publication.bibtex} containerRef={containerRef} />
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
        'flex h-10 w-fit items-center gap-2 rounded-md bg-gray-50 px-3 py-1 transition-colors hover:bg-gray-100',
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

  console.log(containerRef?.current)

  return (
    <Popover>
      <PopoverTrigger className="flex h-10 w-fit items-center gap-2 rounded-md bg-gray-50 px-3 py-1 transition-colors hover:bg-gray-100">
        <FaQuidditch className="text-gray-600" />
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
