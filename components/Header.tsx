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
        src="/sarahc.png"
        alt="Profile Picture"
        width={128}
        height={128}
        className="rounded-full"
      />
      <div className="flex items-baseline gap-3">
        <h1 className="txt-preset-3 font-extrabold">Sarah Mameche</h1>
        <span className="txt-preset-7 font-extrabold text-prim-200">/</span>
        <h2 className="font-regular txt-preset-7 text-gray-500 capitalize">
          PhD candidate
        </h2>
      </div>
    </div>
  )
}

function Description() {
  return (
    <p className="items-center gap-4 txt-preset-6-regular whitespace-pre-wrap text-gray-600">
      I am a PhD candidate at{' '}
      <InlineExternalLink href="https://cispa.de">
        CISPA Helmholtz Center for Information Security
      </InlineExternalLink>{' '}
      supervised by Prof.{' '}
      <InlineExternalLink href="https://vreeken.eu/">
        Jilles Vreeken
      </InlineExternalLink>
      . I am
      interested in causal machine learning, with focus on addressing distribution shifts
      through causality. Example applications that motivate this
      research are studies over heterogeneous diseases or patient groups,
      interventional data from genomics, or time series data from the
      environmental sciences.
    </p>
  )
}

function Socials({ className }: { className?: string }) {
  return (
    <ul className={cn('flex gap-x-2.5', className)}>
      <li>
        <ExternalLink href="mailto:sarah.mameche@cispa.de">
          <FaEnvelope />
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href="https://github.com/srhmm">
          <FaGithub />
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href="https://www.linkedin.com/in/sarah-m-51247820b/">
          <FaLinkedinIn />
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href="https://scholar.google.com/citations?user=uRajBQEAAAAJ">
          <FaGoogleScholar />
        </ExternalLink>
      </li>
    </ul>
  )
}
