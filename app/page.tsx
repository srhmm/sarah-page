import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex h-dvh bg-black px-5">
      <div className="flex flex-col gap-5">
        <Title />
      </div>
    </div>
  )
}

function Title() {
  return (
    <div className="flex items-center">
      <Image
        className="rounded-full"
        src="/assets/sarah.jpg"
        alt="Image of Sarah"
        width={100}
        height={100}
      />
      <div className="flex flex-col gap-3">
        <span className="txt-preset-3">Sarah Mameche</span>
        <span className="txt-preset-4 capitalize text-gray-700">
          PhD candidate
        </span>
      </div>
    </div>
  )
}
