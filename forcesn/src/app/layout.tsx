import type { Metadata } from 'next'
import { Syne } from 'next/font/google'
import './globals.css'

const syne = Syne({ subsets: ['latin'], weight: ['400', '600', '700', '800'] })

export const metadata: Metadata = {
  title: 'ForceSN — Protéines au Sénégal',
  description: 'Compléments protéinés livrés partout au Sénégal',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={syne.className}>{children}</body>
    </html>
  )
}