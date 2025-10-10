import { ExternalLink, InlineExternalLink } from '@/components/ExternalLink'
import { cn } from '@/lib/utils'
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaGoogleScholar,
} from 'react-icons/fa6'
import Image from 'next/image'

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
      <Image
        src="/sarah.png"
        alt="Profile Picture"
        width={128}
        height={128}
        className="rounded-full"
      />
      <div className="flex items-baseline gap-3">
        <span className="txt-preset-3 font-extrabold">Sarah Mameche</span>
        <span className="txt-preset-7 font-extrabold text-[#e3e2ec]">/</span>
        <span className="font-regular txt-preset-7 text-gray-500 capitalize">
          PhD candidate
        </span>
      </div>
    </div>
  )
}

function Description() {
  return (
    <div className="items-center gap-4 txt-preset-6-regular whitespace-pre-wrap text-gray-600">
      I am a PhD candidate at{' '}
      <InlineExternalLink href="https://cispa.de">
        CISPA Helmholtz Center for Information Security
      </InlineExternalLink>{' '}
      supervised by Prof.{' '}
      <InlineExternalLink href="https://vreeken.eu/">
        Jilles Vreeken
      </InlineExternalLink>
      . Before that, I studied Computer Science at Saarland University. I am
      interested in causality, especially in addressing distribution shifts
      through causal models. For example, I am interested in causal discovery
      from multiple contexts, in mixtures of populations, and over
      non-stationary time series. Example applications that motivate this
      research are medical studies over heterogeneous patient groups,
      interventional data from genomics, or time series data from the
      environmental sciences. You can find my{' '}
      <InlineExternalLink href="/sarahcv.pdf">CV</InlineExternalLink> here.
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
