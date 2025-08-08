import Socials from '@/components/Socials'

export default function Home() {
  return (
    <div className="flex h-dvh px-5 py-10">
      <div className="flex flex-col gap-6">
        <Title />
        <Description />
        <Socials className="" />
      </div>
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

function InlineExternalLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      className="inline underline decoration-gray-300 decoration-3 underline-offset-2 transition-colors hover:text-gray-700 hover:decoration-gray-400"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}
