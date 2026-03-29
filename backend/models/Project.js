import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  livePreview: {
    type: String,
    required: true
  },
  sourceCode: {
    type: String,
    required: true
  },
  github: {
    type: String,
    required: true
  },
  techStack: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Project', projectSchema);