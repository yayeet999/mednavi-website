import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const Navbar = () => {
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

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-600 hover:text-mednavi-blue transition-colors">
            Home
          </Link>
          <Link href="/services" className="text-gray-600 hover:text-mednavi-blue transition-colors">
            Services
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-mednavi-blue transition-colors">
            Contact
          </Link>
          <Link href="/login">
            <Button variant="ghost" className="text-mednavi-blue hover:bg-mednavi-blue/10">
              Client Login
            </Button>
          </Link>
        </div>

        <button className="md:hidden text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </motion.header>
  )
}

export default Navbar
