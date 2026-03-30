import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Services = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="pt-32 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Services & Products</h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
            We sell premium web application source code packages and developer-ready products.
            Each item comes with easy setup instructions, polished visuals, and fast purchase flow.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className="glass-effect rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4">Premium Projects</h2>
            <p className="text-slate-300 mb-4">
              Ready-made application templates built with React, Node.js, Express, and modern tooling.
              Use these projects to launch your portfolio, MVP, SaaS, or client product quickly.
            </p>
            <ul className="space-y-3 text-slate-300">
              <li>• Fully coded front-end and back-end projects.</li>
              <li>• Complete with payment integration, admin panels, and authentication.</li>
              <li>• Easy customization and deployment guidance.</li>
            </ul>
          </article>

          <article className="glass-effect rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4">Instant Downloads</h2>
            <p className="text-slate-300 mb-4">
              After completing a purchase, you receive secure access to download the complete source code package.
              No waiting, no manual approvals — just instant delivery.
            </p>
            <ul className="space-y-3 text-slate-300">
              <li>• Download ready-to-use source code immediately after payment.</li>
              <li>• Includes installation instructions and dependency setup.</li>
              <li>• Secure checkout powered by Razorpay compatibility.</li>
            </ul>
          </article>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <article className="glass-effect rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4">Customization Support</h2>
            <p className="text-slate-300">
              Need help adapting a project to your brand or requirements? We offer optional customization guidance and support so your purchase fits your goals.
            </p>
          </article>

          <article className="glass-effect rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4">Secure Payments</h2>
            <p className="text-slate-300">
              We provide a secure purchase process with Razorpay-compatible checkout to ensure user trust and approval readiness.
            </p>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Services
