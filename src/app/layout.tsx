import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import ModalProvider from '@/components/ui/ModalProvider'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gemarawana — Mapala Telkom University',
  description: 'Gemarawana adalah organisasi mahasiswa pecinta alam Telkom University yang menjadi ruang untuk menjelajah, belajar, berkembang, dan membangun pengalaman bersama.',
  icons: {
    icon: '/gemarawana_color.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  )
}
