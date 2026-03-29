import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://project-learn-frontend.onrender.com'
];

// CORS configuration - restrict allowed origins explicitly
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy blocked origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ============= ROUTES =============

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    name: 'Project Portfolio API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      root: '/',
      health: '/health',
      test: '/api/test',
      projects: '/api/projects',
      projects_list: '/api/projects/list',
      payment_create: '/api/payment/create-order',
      payment_verify: '/api/payment/verify-payment'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API is working correctly!',
    timestamp: new Date().toISOString()
  });
});

// Projects list endpoint
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      title: "AI Image Generator",
      description: "Generate stunning images from text descriptions using AI. Built with React and OpenAI API.",
      price: 49,
      image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=500&h=300&fit=crop",
      livePreview: "https://example.com/ai-image-generator",
      sourceCode: "https://github.com/yourusername/ai-image-generator",
      github: "https://github.com/yourusername/ai-image-generator",
      techStack: ["React", "OpenAI", "Tailwind", "Node.js"],
      featured: true
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Full-featured e-commerce platform with cart, payments, and admin dashboard.",
      price: 79,
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop",
      livePreview: "https://example.com/ecommerce",
      sourceCode: "https://github.com/yourusername/ecommerce-platform",
      github: "https://github.com/yourusername/ecommerce-platform",
      techStack: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      featured: true
    },
    {
      id: 3,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with real-time data.",
      price: 59,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      livePreview: "https://example.com/social-dashboard",
      sourceCode: "https://github.com/yourusername/social-dashboard",
      github: "https://github.com/yourusername/social-dashboard",
      techStack: ["React", "Chart.js", "Firebase", "Tailwind", "D3.js"],
      featured: false
    },
    {
      id: 4,
      title: "Task Management App",
      description: "Beautiful task management app with drag-and-drop and team collaboration.",
      price: 39,
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=300&fit=crop",
      livePreview: "https://example.com/task-manager",
      sourceCode: "https://github.com/yourusername/task-manager",
      github: "https://github.com/yourusername/task-manager",
      techStack: ["React", "DND Kit", "Redux", "Express", "MongoDB"],
      featured: false
    },
    {
      id: 5,
      title: "Weather Forecast App",
      description: "Real-time weather forecasting with interactive maps and alerts.",
      price: 29,
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
      livePreview: "https://example.com/weather-app",
      sourceCode: "https://github.com/yourusername/weather-app",
      github: "https://github.com/yourusername/weather-app",
      techStack: ["React", "OpenWeather API", "Chart.js", "Tailwind", "Leaflet"],
      featured: false
    },
    {
      id: 6,
      title: "Portfolio Generator",
      description: "Generate stunning developer portfolios with drag-and-drop builder.",
      price: 45,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&h=300&fit=crop",
      livePreview: "https://example.com/portfolio-builder",
      sourceCode: "https://github.com/yourusername/portfolio-builder",
      github: "https://github.com/yourusername/portfolio-builder",
      techStack: ["React", "Framer Motion", "Tailwind", "Vite", "LocalStorage"],
      featured: true
    }
  ];
  
  res.json({
    success: true,
    projects: projects,
    total: projects.length,
    timestamp: new Date().toISOString()
  });
});

// Get single project
app.get('/api/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const projects = {
    1: { id: 1, title: "AI Image Generator", price: 49, description: "Generate images with AI" },
    2: { id: 2, title: "E-Commerce Platform", price: 79, description: "Full e-commerce solution" },
    3: { id: 3, title: "Social Media Dashboard", price: 59, description: "Analytics dashboard" }
  };
  
  const project = projects[projectId];
  
  if (project) {
    res.json({ success: true, project });
  } else {
    res.status(404).json({ success: false, error: 'Project not found' });
  }
});

// Payment endpoints
app.post('/api/payment/create-order', (req, res) => {
  const { amount, projectId, projectTitle, userId } = req.body;
  
  console.log('💰 Creating payment order:', { amount, projectId, projectTitle, userId });
  
  res.json({
    success: true,
    orderId: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    amount: amount * 100,
    currency: 'INR',
    key: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_key',
    message: 'Test mode - Payment processing is simulated'
  });
});

app.post('/api/payment/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, projectId, userId } = req.body;
  
  console.log('✅ Verifying payment:', { razorpay_order_id, razorpay_payment_id, projectId, userId });
  
  res.json({
    success: true,
    message: 'Payment verified successfully!',
    purchase: {
      id: Date.now(),
      projectId: projectId,
      userId: userId,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      accessGranted: true
    }
  });
});

app.post('/api/payment/check-purchase', (req, res) => {
  const { userId, projectId } = req.body;
  
  console.log('🔍 Checking purchase:', { userId, projectId });
  
  // For testing, return false (not purchased)
  res.json({
    purchased: false,
    message: 'Project not purchased yet'
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  console.log(`❌ 404 Not Found: ${req.method} ${req.url}`);
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.url,
    method: req.method,
    availableRoutes: [
      'GET /',
      'GET /health',
      'GET /api/test',
      'GET /api/projects',
      'GET /api/projects/:id',
      'POST /api/payment/create-order',
      'POST /api/payment/verify-payment',
      'POST /api/payment/check-purchase'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 SERVER STARTED SUCCESSFULLY`);
  console.log(`${'='.repeat(50)}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🕐 Time: ${new Date().toISOString()}`);
  console.log(`\n📋 Available Endpoints:`);
  console.log(`   🏠 Root:        GET  http://localhost:${PORT}/`);
  console.log(`   ❤️  Health:      GET  http://localhost:${PORT}/health`);
  console.log(`   🧪 Test:        GET  http://localhost:${PORT}/api/test`);
  console.log(`   📦 Projects:    GET  http://localhost:${PORT}/api/projects`);
  console.log(`   💳 Payment:     POST http://localhost:${PORT}/api/payment/create-order`);
  console.log(`\n✨ Ready to accept requests!\n`);
});