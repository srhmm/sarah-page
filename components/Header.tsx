import { ExternalLink, InlineExternalLink } from '@/components/ExternalLink'
import { cn } from '@/lib/utils'
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaGraduationCap,
  FaGoogleScholar,
} from 'react-icons/fa6'

export default function Header() {
  return (
    <div className="flex flex-col gap-6">
      <Title />
      <Description />
      <Socials className="" />
    </div>
  )
}

function Title() {
  return (
    <div className="flex flex-col gap-5">
      <div className="size-32 rounded-full bg-[url(/sarah.png)] bg-cover bg-center" />
      <div className="flex items-baseline gap-3">
        <span className="txt-preset-3 font-extrabold">Sarah Mameche</span>
        <span className="txt-preset-6 font-medium text-gray-500 capitalize">
          / PhD candidate
        </span>
      </div>
    </div>
  )
}

function Description() {
  return (
    <div className="items-center gap-4 txt-preset-6-regular whitespace-pre-wrap text-gray-500">
      I am a PhD candidate at{' '}
      <InlineExternalLink href="http://cispa.de">CISPA</InlineExternalLink>{' '}
      Helmholtz Center for Information Security supervised by{' '}
      <InlineExternalLink href="https://vreeken.eu/">
        Prof. Jilles Vreeken
      </InlineExternalLink>
      . My current research draws connections between causality and distribution
      shift. It is motivated from real-world problems where changes in
      distribution are common, such as medical studies over heterogeneous
      patient populations or experimental data from genomics. Our recent
      projects study{' '}
      <InlineExternalLink href="/papers/2023-neurips-learning.pdf">
        causal models
      </InlineExternalLink>{' '}
      for such data, and show which{' '}
      <InlineExternalLink href="/papers/2024-aistats-identifying.pdf">
        causal insights
      </InlineExternalLink>{' '}
      we can gain from distribution shifts.
    </div>
  )
}

function Socials({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-x-2.5', className)}>
      <ExternalLink href="mailto:sarah.mameche@cispa.de">
        <FaEnvelope />
      </ExternalLink>
      <ExternalLink href="https://github.com/srhmm">
        <FaGithub />
      </ExternalLink>
      <ExternalLink href="https://www.linkedin.com/in/sarah-m-51247820b/">
        <FaLinkedinIn />
      </ExternalLink>
      <ExternalLink href="https://scholar.google.com/citations?user=uRajBQEAAAAJ">
        <FaGoogleScholar />
      </ExternalLink>
    </div>
  )
}
