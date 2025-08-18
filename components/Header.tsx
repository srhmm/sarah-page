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
        <span className="txt-preset-6 font-regular text-gray-500 capitalize">
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
      <InlineExternalLink href="http://cispa.de">CISPA Helmholtz Center for Information Security</InlineExternalLink>{' '}
      supervised by Prof.{' '}
      <InlineExternalLink href="https://vreeken.eu/">
      Jilles Vreeken
      </InlineExternalLink>
      . Before that, I obtained my B.Sc. and M.Sc. in Computer Science at Saarland University.
      I am interested in applying ideas from causality to machine learning,
      with a special interest in learning under distribution shifts.
      This research is motivated from real-world applications such as medical studies over heterogeneous
      patient populations, experimental data from genomics, or non-stationary time series.
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
