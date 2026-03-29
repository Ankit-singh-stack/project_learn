import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">&lt;/&gt;</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                CodePortfolio
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium source code and projects for developers. Build amazing applications with our curated collection of high-quality projects.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/projects" className="text-gray-400 hover:text-purple-400 transition-colors">Projects</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Blog</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Refund Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Email</a>
            </div>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for updates on new projects!
            </p>
            <div className="mt-3 flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-3 py-2 bg-white/10 rounded-l-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button className="px-3 py-2 bg-purple-600 rounded-r-lg text-sm hover:bg-purple-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p className="flex items-center justify-center gap-1">
            Made with ❤️ by CodePortfolio
          </p>
          <p className="mt-2">
            © {currentYear} CodePortfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer