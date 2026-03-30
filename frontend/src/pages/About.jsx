import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name || !email || !message) {
      setStatus('Please fill in all fields before submitting.')
      return
    }

    const subject = encodeURIComponent(`Contact from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:support@projectlearn.dev?subject=${subject}&body=${body}`
    setStatus('Opening your email client so you can send the message.')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="pt-32 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Project Learn</h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
            Project Learn is a premium digital storefront for modern developers. We sell ready-to-use web application projects,
            templates, and full source code packages that help you launch products faster, learn advanced patterns, and ship
            high quality applications with confidence.
          </p>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-3xl">
            Every project is built with up-to-date web technologies, complete with clean code, polished design, and secure
            payment integration. Customers can browse live demos, see detailed product features, and purchase instantly.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="glass-effect rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <ul className="space-y-3 text-slate-300">
              <li>• Sell premium source-code projects for startups, portfolios, SaaS, and e-commerce.</li>
              <li>• Provide instantly downloadable code after successful payment.</li>
              <li>• Offer clean documentation, live previews, and developer-friendly integrations.</li>
              <li>• Support secure checkout with Razorpay and reliable customer service.</li>
            </ul>
          </div>

          <div className="glass-effect rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
            <ul className="space-y-3 text-slate-300">
              <li>• Ready-to-run applications that save development time.</li>
              <li>• Clean, well-structured code designed for reuse.</li>
              <li>• Professional UI/UX and polished project delivery.</li>
              <li>• Fast support and transparent purchase experience.</li>
            </ul>
          </div>
        </section>

        <section className="mt-20 glass-effect rounded-3xl p-8 border border-white/10">
          <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
          <p className="text-slate-300 mb-4">
            Have a question about a purchase, customization, or a product feature? Reach out to us and we&apos;ll get back to you quickly.
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-2xl bg-slate-900/90 p-6">
                <h3 className="text-xl font-semibold mb-3">Email</h3>
                <p className="text-slate-300">support@projectlearn.dev</p>
              </div>
              <div className="rounded-2xl bg-slate-900/90 p-6">
                <h3 className="text-xl font-semibold mb-3">Message</h3>
                <p className="text-slate-300">Use our contact form for questions about store policies or project access.</p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-slate-900/90 p-8 border border-white/10 space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-purple-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-purple-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-purple-500"
                  placeholder="Tell us how we can help you"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white hover:opacity-90 transition"
              >
                Send Message
              </button>

              {status && <p className="text-sm text-slate-300">{status}</p>}
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default About
