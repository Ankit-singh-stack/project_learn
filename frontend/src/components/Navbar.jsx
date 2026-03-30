import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">&lt;/&gt;</span>
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Project_learn
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-purple-400'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-600"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
              LinkedIn
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-purple-400 transition-colors text-2xl"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-purple-600/20 hover:text-purple-400'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex space-x-4 px-3 py-2">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                     className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    GitHub
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                     className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    Twitter
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                     className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar