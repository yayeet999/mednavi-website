'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MedNavi - Dental Practice Analytics Platform',
  description: 'Transform your dental practice with real-time analytics and insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const cleanup = () => {
      const elements = document.querySelectorAll('.framer-motion-elements')
      elements.forEach(el => {
        if (el && el.parentNode) {
          try {
            el.parentNode.removeChild(el)
          } catch (error) {
            console.log('Global cleanup error handled:', error)
          }
        }
      })
    }

    window.addEventListener('beforeunload', cleanup)
    return () => {
      cleanup()
      window.removeEventListener('beforeunload', cleanup)
    }
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
