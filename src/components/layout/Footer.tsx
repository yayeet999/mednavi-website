import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-mednavi-blue">MedNavi</h3>
            <p className="text-gray-600 text-sm">
              Transforming dental practices with powerful analytics and insights.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-mednavi-blue">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-mednavi-blue">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-mednavi-blue">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-600 hover:text-mednavi-blue">
                  Client Login
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services#analytics" className="text-gray-600 hover:text-mednavi-blue">
                  Real-Time Analytics
                </Link>
              </li>
              <li>
                <Link href="/services#claims" className="text-gray-600 hover:text-mednavi-blue">
                  Insurance Claims Analysis
                </Link>
              </li>
              <li>
                <Link href="/services#integration" className="text-gray-600 hover:text-mednavi-blue">
                  PMS Integration
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">Email: info@mednavi.com</li>
              <li className="text-gray-600">Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} MedNavi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
