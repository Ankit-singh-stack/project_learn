import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import connectDB from './config/db.js';

dotenv.config();

const projects = [
  {
    id: 1,
    title: "AI Image Generator",
    description: "Generate stunning images from text descriptions using AI. Built with React and OpenAI API. Features include prompt engineering, image variations, and gallery storage.",
    price: 49,
    image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=500&h=300&fit=crop",
    livePreview: "https://example.com/ai-image-generator",
    sourceCode: "https://github.com/yourusername/ai-image-generator",
    github: "https://github.com/yourusername/ai-image-generator",
    techStack: ["React", "OpenAI", "Tailwind", "Node.js", "Express"],
    featured: true
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce platform with cart, payments, and admin dashboard. Includes product management, order tracking, and user authentication.",
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
    description: "Analytics dashboard for social media management with real-time data. Track engagement, followers, and post performance across platforms.",
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
    description: "Beautiful task management app with drag-and-drop and team collaboration. Features include task assignments, deadlines, and progress tracking.",
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
    description: "Real-time weather forecasting with interactive maps and alerts. Get detailed weather data, 7-day forecasts, and severe weather warnings.",
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
    description: "Generate stunning developer portfolios with drag-and-drop builder. Choose from multiple templates and customize colors, fonts, and layouts.",
    price: 45,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&h=300&fit=crop",
    livePreview: "https://example.com/portfolio-builder",
    sourceCode: "https://github.com/yourusername/portfolio-builder",
    github: "https://github.com/yourusername/portfolio-builder",
    techStack: ["React", "Framer Motion", "Tailwind", "Vite", "LocalStorage"],
    featured: true
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    
    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');
    
    // Insert new projects
    await Project.insertMany(projects);
    console.log(`✅ Inserted ${projects.length} projects`);
    
    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();