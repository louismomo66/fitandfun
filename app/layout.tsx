import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fit & Fun',
  description: 'Your ultimate destination for entertainment, dining, and sports',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
