'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Loader, Lock, Mail, Key } from 'lucide-react'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    accessKey: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login attempt
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-white to-blue-50">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg className="absolute right-0 w-1/2 h-full text-blue-100/20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L100 0 L100 100 L50 100 Q30 50 0 0" fill="currentColor" />
        </svg>
        <svg className="absolute left-0 w-1/3 h-full text-blue-100/10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L50 0 L0 0 L0 100" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-mednavi-blue mb-2">Client Portal</h1>
            <p className="text-gray-600">Access your dental practice analytics</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4 mr-2 text-mednavi-blue" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-mednavi-blue focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Lock className="w-4 h-4 mr-2 text-mednavi-blue" />
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-mednavi-blue focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <label htmlFor="accessKey" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Key className="w-4 h-4 mr-2 text-mednavi-blue" />
                  MedNavi Client Access Key
                </label>
                <input
                  type="password"
                  id="accessKey"
                  required
                  value={formData.accessKey}
                  onChange={(e) => setFormData({ ...formData, accessKey: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-mednavi-blue focus:border-transparent"
                  placeholder="Enter your access key"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader className="animate-spin mr-2" size={18} />
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </Button>

              <div className="text-center">
                <a href="#" className="text-sm text-mednavi-blue hover:underline">
                  Forgot your access credentials?
                </a>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-center text-sm text-gray-600"
          >
            Need help? Contact your account manager or support@mednavidata.com
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}