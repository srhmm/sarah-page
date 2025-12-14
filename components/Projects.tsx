import { Project } from '@/types/main'
import { programmingProjects } from '@/data/projects'
import { cn } from '@/lib/utils'
import { RefObject, useState } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'
import Spacer from '@/components/Spacer'
import { PublicationExternalLink} from "@/components/ExternalLink"
import {PublicationLink, Bibtex} from "@/components/Publications"

import Demo from "@/components/demo/Demo";
import { HiChevronDown } from "react-icons/hi"

export default function Projects({
  containerRef,
}: {
  containerRef?: RefObject<HTMLDivElement | null>
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="txt-preset-5 text-gray-700">Libraries</h2>
      <div className="h-px w-full bg-gray-300" />
      <ul className="flex flex-col gap-y-4">
        {programmingProjects.map((project: Project) => (
          <li key={project.title}>
            <ProjectCard
              project={project}
              containerRef={containerRef}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

function ProjectCard({
  project,
  containerRef,
}: {
  project: Project
  containerRef?: RefObject<HTMLDivElement | null>
}) {

  const [demoOpen, setDemoOpen] = useState(false) // @A check
  return (
    <div className="flex flex-col rounded-md py-4">
      <div className="txt-preset-9 font-normal text-gray-500">
        {project.language}
      </div>
      <Spacer className="h-1.5" />
      <h3 className="txt-preset-5 font-semibold text-gray-700"> {project.urls?.documentation &&
          (<PublicationExternalLink href={project.urls.documentation}>
              {project.title}
          </PublicationExternalLink>)}
      </h3>
      <Spacer className="h-1" />
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {
          <div className="flex items-center">
            <span
              className={cn(
                'txt-preset-7 leading-[140%] text-gray-600'
              )}
            >
              {project.subtitle}
            </span>
          </div>
        }
      </div>
      <Spacer className="h-5" />
      <div className="flex gap-2.5">
        {project.bibtex && (
          <Bibtex bibtex={project.bibtex} containerRef={containerRef} />
        )}
        {project.urls?.zip && (
          <PublicationLink url={project.urls.zip}>
            <span className="text-semibold txt-preset-9">.zip</span>
          </PublicationLink>
        )}
        {project.urls?.sty && (
          <PublicationLink url={project.urls.sty}>
            <span className="text-semibold txt-preset-9">.sty</span>
          </PublicationLink>
        )}
        {project.urls?.code && (
          <PublicationLink
            url={project.urls.code}
            type="external"
            className="h-6 txt-preset-9"
          >
            code
            <HiArrowUpRight className="size-2 stroke-1 text-gray-900" />
          </PublicationLink>
        )}
        {project.demoId && (
            <button
                type="button"
                onClick={() => setDemoOpen((prev) => !prev)}
                className="ml-auto inline-flex items-center gap-1 rounded-md px-3 py-1 text-xs font-medium text-prim-800 bg-prim-100 hover:bg-prim-200"
                aria-expanded={demoOpen}
            >
                <HiChevronDown
                    className={cn(
                        'size-3 transition-transform',
                        demoOpen && 'rotate-180',
                    )}
                />
            </button>
        )}
    </div>
    {project.demoId && demoOpen && (
        <>
            <Spacer className="h-4" />
            <div className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                <Demo demoId={project.demoId} />
            </div>
        </>
    )}
</div>
  )
}
