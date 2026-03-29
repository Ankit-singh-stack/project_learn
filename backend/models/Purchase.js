import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  projectId: {
    type: Number,
    required: true,
    index: true
  },
  projectTitle: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentId: {
    type: String,
    required: true,
    unique: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
  accessGranted: {
    type: Boolean,
    default: false
  },
  paymentDetails: {
    type: Object,
    default: {}
  },
  purchasedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index for faster queries
purchaseSchema.index({ userId: 1, projectId: 1 });

export default mongoose.model('Purchase', purchaseSchema);