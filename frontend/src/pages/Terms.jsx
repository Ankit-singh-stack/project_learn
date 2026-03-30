import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Terms = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="glass-effect rounded-3xl p-10 border border-white/10">
          <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
          <div className="space-y-6 text-slate-300">
            <div>
              <h2 className="text-2xl font-semibold mb-2">General Terms</h2>
              <p>
                These terms govern your use of Project Learn and any purchases made through the website. By accessing this site,
                you agree to the terms described here.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Digital Product Sales</h2>
              <p>
                All products sold on Project Learn are delivered as digital downloads. Renewals are not automatic; each purchase is a
                one-time license to use the included source code for your own projects.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Refunds</h2>
              <p>
                Refunds are considered on a case-by-case basis. Because these are digital products delivered instantly, refunds may be
                limited once access has been granted.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Support</h2>
              <p>
                We provide support for purchase-related questions, delivery issues, and access problems. For customization or development
                support, additional fees may apply.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Terms
