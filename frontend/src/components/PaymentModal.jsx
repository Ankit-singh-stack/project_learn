import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const PaymentModal = ({ isOpen, onClose, project, userId, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = async () => {
      if (document.getElementById('razorpay-script')) {
        setRazorpayLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        setRazorpayLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        toast.error('Payment gateway failed to load. Please refresh and try again.');
      };
      document.body.appendChild(script);
    };

    if (isOpen) {
      loadRazorpayScript();
    }
  }, [isOpen]);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      toast.error('Payment gateway is loading. Please wait...');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Step 1: Create order on backend
      const { data: orderData } = await axios.post(`${API_URL}/payment/create-order`, {
        amount: project.price,
        projectId: project.id,
        projectTitle: project.title,
        userId: userId || 'guest_' + Date.now()
      });

      if (!orderData.success) {
        throw new Error('Failed to create order');
      }

      // Step 2: Initialize Razorpay Checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'CodePortfolio',
        description: `Purchase: ${project.title}`,
        image: 'https://your-logo-url.com/logo.png', // Replace with your logo
        order_id: orderData.orderId,
        handler: async function (response) {
          // Step 3: Verify payment on backend
          try {
            const { data: verifyData } = await axios.post(`${API_URL}/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              projectId: project.id,
              projectTitle: project.title,
              amount: orderData.amount,
              userId: userId || 'guest_' + Date.now()
            });

            if (verifyData.success) {
              toast.success('Payment successful! You can now access the source code.');
              onSuccess(verifyData.purchase);
              onClose();
            } else {
              toast.error('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        notes: {
          project_id: project.id,
          project_title: project.title
        },
        theme: {
          color: '#8b5cf6'
        },
        modal: {
          ondismiss: function() {
            toast.error('Payment cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initialize payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md glass-effect rounded-2xl overflow-hidden"
        >
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold">Purchase Project</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-2xl">
              ✕
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-6 p-4 bg-purple-600/10 rounded-lg">
              <h3 className="font-semibold mb-1">{project.title}</h3>
              <p className="text-2xl font-bold text-purple-400">₹{project.price}</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-600/10 rounded-lg p-4">
                <p className="text-sm text-blue-300 mb-2">💡 Payment Options:</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Credit/Debit Cards</li>
                  <li>• UPI (Google Pay, PhonePe, Paytm)</li>
                  <li>• Net Banking</li>
                  <li>• Wallets</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 flex items-start gap-2 text-xs text-gray-400">
              <span>🔒</span>
              <p>Your payment is secure and encrypted. You'll get instant access to source code after successful payment.</p>
            </div>
          </div>
          
          <div className="p-6 border-t border-white/10">
            <button
              onClick={handlePayment}
              disabled={isProcessing || !razorpayLoaded}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Processing...
                </>
              ) : !razorpayLoaded ? (
                <>
                  <span>📦</span>
                  Loading Payment Gateway...
                </>
              ) : (
                <>
                  <span>💳</span>
                  Pay ₹{project.price}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;