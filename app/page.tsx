'use client'

import Header from '@/components/Header'
import Publications from '@/components/Publications'
import { useRef } from 'react'
import Projects from "@/components/Projects";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex min-h-dvh justify-center px-(--x-padding) py-8 [--x-padding:--spacing(5)] tablet:pt-16">
      <main className="flex max-w-[700px] flex-col gap-16" ref={containerRef}>
        <Header />
        <Publications containerRef={containerRef} />
          {/* <Projects containerRef={containerRef}  */}
      </main>
    </div>
  )
}
