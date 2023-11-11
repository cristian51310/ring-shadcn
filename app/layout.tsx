import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import CartProvider from '@/providers/CartProvider'
import type { Metadata } from 'next'
import { Inter as FontSans } from "next/font/google"
import { Toaster } from "sonner"
import './globals.css'

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Ring! Tu comida favorita en minutos',
  description: 'Ring! Tu comida favorita en minutos',
  manifest: '/manifest.webmanifest',
  icons: {
    apple: "/icon.png"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <CartProvider>
          <Toaster
            expand={true}
            richColors
            position='top-right'
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  )
}
