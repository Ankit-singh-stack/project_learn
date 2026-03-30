import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Contact = () => {
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
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
            Have a question about a purchase, product feature, or customization? Use the form below to send us a message.
            We&apos;re here to help you with orders, downloads, and service details.
          </p>
        </section>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="glass-effect rounded-3xl p-8 border border-white/10 bg-slate-900/90">
            <h2 className="text-2xl font-semibold mb-4">Reach Us</h2>
            <p className="text-slate-300 mb-6">
              Send your support request directly through the form, or email us if you prefer.
            </p>
            <div className="space-y-4 text-slate-300">
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>support@projectlearn.dev</p>
              </div>
              <div>
                <h3 className="font-semibold">Response Time</h3>
                <p>Typically under 24 hours during business days.</p>
              </div>
              <div>
                <h3 className="font-semibold">Support</h3>
                <p>For order or download issues, include your purchase details in the message.</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-slate-900/90 p-8 border border-white/10 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="contact-name">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-purple-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="contact-email">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-purple-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                rows="6"
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
      </main>

      <Footer />
    </div>
  )
}

export default Contact
