import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-full px-4 py-2"
            >
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="text-sm">Premium Source Code</span>
              </div>
            </motion.div>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent bg-300% animate-gradient">
              Transform Ideas
            </span>
            <br />
            <span className="text-white">Into Reality</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Discover premium projects with source code, live previews, and instant access after purchase. 
            Built with modern technologies for developers by developers.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                Explore Projects
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </motion.button>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-3 glass-effect rounded-full font-semibold text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <span className="text-xl">⌨️</span>
                View on GitHub
              </motion.button>
            </a>
          </motion.div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {[
              { icon: '💻', label: 'Premium Source Code', value: '10+ Projects' },
              { icon: '⚡', label: 'Instant Access', value: 'After Purchase' },
              { icon: '🛡️', label: 'Secure Payment', value: '100% Safe' },
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                whileHover={{ y: -5 }}
                className="glass-effect rounded-2xl p-6 text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <div className="text-xl font-bold text-purple-400 mb-2">{feature.value}</div>
                <div className="text-gray-300">{feature.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {[
              { label: 'Projects', value: '10+' },
              { label: 'Happy Clients', value: '50+' },
              { label: 'Lines of Code', value: '10k+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="glass-effect rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-purple-400">{stat.value}</div>
                <div className="text-gray-300 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero