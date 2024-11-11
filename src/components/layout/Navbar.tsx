'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
    { href: '/login', label: 'Client Login', isButton: true }
  ]

  return (
    <motion.header 
      className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-mednavi-blue">MedNavi</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            item.isButton ? (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="text-mednavi-blue hover:bg-mednavi-blue/10">
                  {item.label}
                </Button>
              </Link>
            ) : (
              <Link 
                key={item.href} 
                href={item.href} 
                className="text-gray-600 hover:text-mednavi-blue transition-colors"
              >
                {item.label}
              </Link>
            )
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 hover:text-mednavi-blue transition-colors p-2 -mr-2"
        >
          <Menu className="h-7 w-7" />
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                style={{ top: '64px' }}
              />

              {/* Menu */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 bg-white shadow-lg border-b md:hidden z-50"
              >
                <div className="container mx-auto px-4 py-4">
                  <div className="flex flex-col space-y-4">
                    {menuItems.map((item) => (
                      item.isButton ? (
                        <Link 
                          key={item.href} 
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                        >
                          <Button 
                            variant="ghost" 
                            className="w-full text-left text-mednavi-blue hover:bg-mednavi-blue/10"
                          >
                            {item.label}
                          </Button>
                        </Link>
                      ) : (
                        <Link 
                          key={item.href} 
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="text-gray-600 hover:text-mednavi-blue transition-colors py-2"
                        >
                          {item.label}
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Navbar