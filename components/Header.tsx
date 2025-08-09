import { ExternalLink, InlineExternalLink } from '@/components/ExternalLink'
import { cn } from '@/lib/utils'
import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa6'

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
        <span className="txt-preset-6 font-light text-gray-500 capitalize">
          / PhD candidate
        </span>
      </div>
    </div>
  )
}

function Description() {
  return (
    <div className="items-center gap-4 txt-preset-6-regular text-gray-500">
      I am a postdoctoral fellow at{' '}
      <InlineExternalLink href="http://cispa.de">CISPA</InlineExternalLink>{' '}
      supervised by Prof. Stefanie Jegelka. Before that, I received my PhD in
      the Learning & Adaptive Systems group at ETH Zurich under the supervision
      of Prof. Andreas Krause.
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
      <ExternalLink href="">
        <FaLinkedinIn />
      </ExternalLink>
    </div>
  )
}
