import ExternalLink from '@/components/ExternalLink'
import { cn } from '@/lib/utils'
import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa6'

export default function Socials({ className }: { className?: string }) {
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
