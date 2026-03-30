import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Privacy = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="glass-effect rounded-3xl p-10 border border-white/10">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-slate-300 leading-relaxed mb-6">
            At Project Learn, protecting your privacy is a priority. We collect only the information necessary to process purchases,
            communicate order details, and improve our service.
          </p>

          <div className="space-y-6 text-slate-300">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
              <p>
                We may collect your name, email address, purchase details, and payment confirmation information solely to deliver
                purchased digital products and support your order.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">How We Use Your Data</h2>
              <p>
                Your information is used to process payments, send receipts, respond to support inquiries, and maintain secure access
                to purchased downloads.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
              <p>
                We use trusted payment providers such as Razorpay. These services may collect payment details directly and are governed
                by their own privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
              <p>
                You may contact us to review or delete your account information. We do not sell personal data to third parties.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Privacy
