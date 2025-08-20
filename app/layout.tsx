import type { Metadata } from 'next'
import { Geist_Mono, Mulish } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'

const sansFont = Mulish({
  variable: '--font-default-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sarah Mameche',
  description: 'TODO',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansFont.variable} ${geistMono.variable} antialiased bg-[#f5f5f5]`}
      >
        {children}
      </body>
    </html>
  )
}
