import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import Purchase from '../models/Purchase.js';

dotenv.config();

const router = express.Router();

const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

const invalidRazorpayKey = !razorpayKeyId || razorpayKeyId.startsWith('http');
if (invalidRazorpayKey) {
  console.error('Invalid Razorpay key configuration. RAZORPAY_KEY_ID must be the actual key ID (rzp_test_xxx or rzp_live_xxx), not a Razorpay.me URL.');
}

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

// Create Order
router.post('/create-order', async (req, res) => {
  if (invalidRazorpayKey) {
    return res.status(500).json({
      success: false,
      error: 'Invalid Razorpay configuration: RAZORPAY_KEY_ID must be your actual Razorpay API key id, not the merchant link.',
    });
  }
  try {
    const { amount, projectId, projectTitle, userId } = req.body;

    if (!amount || !projectId || !userId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        projectId: projectId.toString(),
        projectTitle: projectTitle,
        userId: userId
      }
    };

    const order = await razorpay.orders.create(options);
    
    // Create pending purchase record
    const pendingPurchase = new Purchase({
      userId,
      projectId,
      projectTitle,
      amount,
      orderId: order.id,
      paymentId: `pending_${order.id}`,
      status: 'pending',
      accessGranted: false
    });
    
    await pendingPurchase.save();
    
    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to create order'
    });
  }
});

// Verify Payment
router.post('/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      projectId,
      projectTitle,
      amount,
      userId
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update existing purchase record
      const purchase = await Purchase.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          status: 'success',
          accessGranted: true,
          paymentDetails: {
            signature: razorpay_signature,
            verifiedAt: new Date()
          }
        },
        { new: true, upsert: true }
      );

      res.json({
        success: true,
        message: 'Payment verified successfully',
        purchase
      });
    } else {
      await Purchase.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          status: 'failed',
          paymentDetails: {
            error: 'Invalid signature',
            failedAt: new Date()
          }
        }
      );
      
      res.status(400).json({
        success: false,
        message: 'Invalid signature'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Payment verification failed'
    });
  }
});

// Check if user has purchased a project
router.post('/check-purchase', async (req, res) => {
  try {
    const { userId, projectId } = req.body;
    
    const purchase = await Purchase.findOne({
      userId,
      projectId,
      status: 'success',
      accessGranted: true
    });

    res.json({
      purchased: !!purchase,
      purchase: purchase ? {
        id: purchase._id,
        projectId: purchase.projectId,
        purchasedAt: purchase.purchasedAt
      } : null
    });
  } catch (error) {
    console.error('Error checking purchase:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to check purchase status'
    });
  }
});

// Get user's purchased projects
router.post('/my-purchases', async (req, res) => {
  try {
    const { userId } = req.body;
    
    const purchases = await Purchase.find({
      userId,
      status: 'success',
      accessGranted: true
    }).sort({ purchasedAt: -1 });

    res.json({
      success: true,
      purchases
    });
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to fetch purchases'
    });
  }
});

export default router;