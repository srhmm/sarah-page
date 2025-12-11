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
import { Button } from '@/components/ui/button'
import { LucideCheck, LucideClipboard } from 'lucide-react'
import {InlineExternalLink, PublicationExternalLink} from "@/components/ExternalLink"

import Demo from "@/components/demo/Demo";
import { HiChevronDown } from "react-icons/hi"

export default function Publications({
  containerRef,
}: {
  containerRef?: RefObject<HTMLDivElement | null>
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="txt-preset-5 text-gray-700">Publications</h2>
      <div className="h-px w-full bg-gray-300" />
      <ul className="flex flex-col gap-y-4">
        {conferencePublications.map((publication: Publication) => (
          <li key={publication.title}>
            <PublicationCard
              publication={publication}
              containerRef={containerRef}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

function PublicationCard({
  publication,
  containerRef,
}: {
  publication: Publication
  containerRef?: RefObject<HTMLDivElement | null>
}) {

  const [demoOpen, setDemoOpen] = useState(false) // @A check
  return (
    <div className="flex flex-col rounded-md py-4">
      <div className="txt-preset-9 font-normal text-gray-500">
        {publication.venue}, {publication.year}
      </div>
      <Spacer className="h-1.5" />
      <h3 className="txt-preset-5 font-semibold text-gray-700"> {publication.urls?.paper &&
          (<PublicationExternalLink href={publication.urls.paper}>
              {publication.title}
          </PublicationExternalLink>)}
      </h3>
      <Spacer className="h-1" />
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {publication.authors.map((author) => (
          <div key={author} className="flex items-center">
            <span
              className={cn(
                'txt-preset-7 leading-[140%] text-gray-600',
                  author.startsWith("Sarah Mameche") ? 'underline underline-offset-3 decoration-gray-500' : ''
              )}
            >
              {author}
            </span>
          </div>
        ))}
      </div>
      <Spacer className="h-5" />
      <div className="flex gap-2.5">
        {publication.bibtex && (
          <Bibtex bibtex={publication.bibtex} containerRef={containerRef} />
        )}
        {publication.urls?.poster && (
          <PublicationLink url={publication.urls.poster}>
            <span className="text-semibold txt-preset-9">poster</span>
          </PublicationLink>
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
        {publication.demoId && (
            <button
                type="button"
                onClick={() => setDemoOpen((prev) => !prev)}
                className="ml-auto inline-flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800 hover:bg-gray-100"
                aria-expanded={demoOpen}
            >
                <span>{demoOpen ? 'Hide demo' : 'Show demo'}</span>
                <HiChevronDown
                    className={cn(
                        'size-3 transition-transform',
                        demoOpen && 'rotate-180',
                    )}
                />
            </button>
        )}
    </div>
    {publication.demoId && demoOpen && (
        <>
            <Spacer className="h-4" />
            <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                <Demo demoId={publication.demoId} />
            </div>
        </>
    )}
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
        'flex h-6 w-fit items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1 text-gray-700 transition-colors hover:bg-gray-200',
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
  const [copyState, setCopyState] = useState<'default' | 'copied'>('default')

  useEffect(() => {
    if (!containerRef?.current) return
    setContainer(containerRef.current)
  }, [containerRef])

  async function onCopy() {
    if (copyState === 'copied') {
      return
    }
    await navigator.clipboard.writeText(bibtex)
    setCopyState('copied')
    setTimeout(() => {
      setCopyState('default')
    }, 2000)
  }

  return (
    <Popover>
      <PopoverTrigger className="flex h-6 w-fit items-center gap-2 rounded-md bg-gray-100 px-3 py-1 txt-preset-9 text-gray-700 transition-colors hover:bg-gray-200">
        bib
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-content-available-width)] overflow-x-auto"
        collisionBoundary={container}
      >
        <pre className="txt-preset-mono">{bibtex}</pre>
        <Button
          className="absolute top-2 right-2 rounded-md bg-white hover:bg-gray-200"
          variant="ghost"
          size="sm"
          onClick={onCopy}
        >
          {copyState === 'default' ? (
            <LucideClipboard className="text-gray-600/90" />
          ) : (
            <LucideCheck className="text-gray-600/90" />
          )}
        </Button>
      </PopoverContent>
    </Popover>
  )
}