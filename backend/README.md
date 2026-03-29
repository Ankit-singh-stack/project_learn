# CodePortfolio - Personal Project Portfolio

A modern, full-stack web application for selling premium project source code with integrated payment processing.

## ✨ Features

- 🎨 **Modern UI** - Beautiful glass morphism design with smooth animations
- 💳 **Real Payments** - Integrated Razorpay for UPI and card payments
- 🔐 **Secure Access** - Users get source code access only after purchase
- 📱 **Responsive** - Fully responsive design for all devices
- 🚀 **Fast** - Built with Vite and React for optimal performance
- 🎭 **Animations** - Stunning animations with Framer Motion
- 🛡️ **Secure** - Payment verification and purchase records in MongoDB

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Razorpay API
- JWT for authentication
- CORS enabled

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Razorpay Account (for real payments)
- npm or yarn package manager

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/project-portfolio.git
cd project-portfolio
```

### 2. Create your local environment file
Copy the backend environment example and set your own secret values:
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and replace placeholder values like `MONGODB_URI`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `JWT_SECRET`.

- `RAZORPAY_KEY_ID` must be the actual Razorpay API key id, for example `rzp_test_1234567890abcdef`.
- Do not paste the Razorpay.me merchant link (`https://razorpay.me/@...`) into `RAZORPAY_KEY_ID`.

> `backend/.env` is ignored by git, so your private credentials stay out of source control.
