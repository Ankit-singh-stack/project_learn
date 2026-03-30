import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white">What We Sell</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              We sell premium digital source code projects designed for developers who want to ship products faster.
              Each purchase includes a full project package, setup instructions, and secure checkout access.
            </p>
            <ul className="space-y-3 text-slate-300">
              <li>• Ready-to-use web applications built with modern technologies.</li>
              <li>• Complete code, assets, and deployment guidance.</li>
              <li>• Secure payments and instant digital delivery.</li>
              <li>• Suitable for portfolios, MVPs, SaaS products, and client work.</li>
            </ul>
          </div>
          <div className="glass-effect rounded-3xl p-8 border border-white/10 bg-slate-900/70">
            <h3 className="text-3xl font-semibold mb-4">How It Works</h3>
            <div className="space-y-4 text-slate-300">
              <p>
                Browse our collection, choose the product that fits your needs, and complete checkout. After payment,
                download the full source code package instantly and start customizing right away.
              </p>
              <p>
                Our projects are delivered as developer-friendly packages with clear instructions,
                so you can get started immediately without extra setup delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home