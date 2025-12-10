import type { Metadata } from 'next'
import { Geist_Mono, Mulish, Wix_Madefor_Text } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'

const sansFont = Wix_Madefor_Text({
  variable: '--font-default-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sarah Mameche',
  description: 'Personal website of Sarah Mameche, PhD candidate at CISPA',
  openGraph: {
    title: 'Sarah Mameche',
    description: 'Personal website of Sarah Mameche, PhD candidate at CISPA',
    url: 'https://sarahmameche.com',
    siteName: 'Sarah Mameche',
    images: [
      {
        url: '/sarahc.png',
        width: 600,
        height: 600,
        alt: 'Sarah Mameche',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarah Mameche',
    description: 'Personal website of Sarah Mameche, PhD candidate at CISPA',
    images: ['/sarahc.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansFont.variable} ${geistMono.variable} bg-gradient-to-b from-prim-50 via-white to-white antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
