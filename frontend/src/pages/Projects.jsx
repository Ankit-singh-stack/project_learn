import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userId] = useState(() => {
    let id = localStorage.getItem('userId')
    if (!id) {
      id = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('userId', id)
    }
    return id
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${API_URL}/projects`)
      if (data.success) {
        setProjects(data.projects)
      } else {
        setError('Failed to fetch projects')
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      setError(error.message || 'Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-spin mb-4">⚙️</div>
          <p className="text-gray-400">Loading amazing projects...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-400">{error}</p>
          <button 
            onClick={fetchProjects}
            className="mt-4 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Our Projects
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Explore our collection of premium projects. Get instant access to source code after purchase.
          </p>
        </motion.div>
      </section>
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No projects available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} userId={userId} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default Projects