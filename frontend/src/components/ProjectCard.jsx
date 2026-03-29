import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PaymentModal from './PaymentModal'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const ProjectCard = ({ project, userId }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [purchased, setPurchased] = useState(false)
  const [sourceCode, setSourceCode] = useState(null)

  useEffect(() => {
    if (userId) {
      checkPurchaseStatus()
    }
  }, [userId, project.id])

  const checkPurchaseStatus = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/payment/check-purchase`, {
        userId,
        projectId: project.id
      })
      
      if (data.purchased) {
        setPurchased(true)
        fetchSourceCode()
      }
    } catch (error) {
      console.error('Error checking purchase:', error)
    }
  }

  const fetchSourceCode = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/projects/${project.id}/source-code`, {
        userId
      })
      
      if (data.success) {
        setSourceCode(data.sourceCode)
      }
    } catch (error) {
      console.error('Error fetching source code:', error)
    }
  }

  const handlePurchaseSuccess = () => {
    setPurchased(true)
    fetchSourceCode()
    toast.success('Project purchased successfully! Source code is now available.')
  }

  const handleGetSourceCode = () => {
    if (sourceCode) {
      window.open(sourceCode, '_blank')
    } else {
      toast.error('Source code not available yet. Please try again.')
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -10 }}
        className="glass-effect rounded-2xl overflow-hidden group cursor-pointer"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x300?text=Project+Image'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          
          <div className="absolute top-4 right-4 flex gap-2">
            {project.featured && (
              <span className="px-2 py-1 bg-purple-600 rounded-full text-xs font-semibold">
                Featured
              </span>
            )}
            <span className="px-2 py-1 bg-green-600 rounded-full text-xs font-semibold">
              ₹{project.price}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-4 text-sm line-clamp-2">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack && project.techStack.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-600/20 rounded-full text-xs text-purple-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 mb-4">
            <a
              href={project.livePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600/20 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-colors text-sm"
            >
              <span>👁️</span>
              Live Preview
            </a>
            
            {purchased ? (
              <button
                onClick={handleGetSourceCode}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600/20 rounded-lg text-green-400 hover:bg-green-600/30 transition-colors text-sm"
              >
                <span>📦</span>
                Get Source Code
              </button>
            ) : (
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-600/20 rounded-lg text-purple-400 hover:bg-purple-600/30 transition-colors text-sm"
              >
                <span>🛒</span>
                Buy Now
              </button>
            )}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm"
          >
            <span>🐙</span>
            View on GitHub
          </a>

          {purchased && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-center gap-2 text-xs text-green-400">
                <span>✓</span>
                Purchased ✓ Access Granted
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        project={project}
        userId={userId}
        onSuccess={handlePurchaseSuccess}
      />
    </>
  )
}

export default ProjectCard