import express from 'express';
import Project from '../models/Project.js';
import Purchase from '../models/Purchase.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to fetch projects'
    });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ id: req.params.id });
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        error: 'Project not found' 
      });
    }
    res.json({ success: true, project });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to fetch project'
    });
  }
});

// Get project source code (only if purchased)
router.post('/:id/source-code', async (req, res) => {
  try {
    const { userId } = req.body;
    const projectId = parseInt(req.params.id);
    
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        error: 'User ID required' 
      });
    }
    
    const project = await Project.findOne({ id: projectId });
    
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        error: 'Project not found' 
      });
    }

    // Check if user has purchased this project
    const purchase = await Purchase.findOne({
      userId,
      projectId: project.id,
      status: 'success',
      accessGranted: true
    });

    if (!purchase) {
      return res.status(403).json({ 
        success: false, 
        error: 'You need to purchase this project to access source code' 
      });
    }

    res.json({ 
      success: true, 
      sourceCode: project.sourceCode,
      livePreview: project.livePreview,
      project: {
        id: project.id,
        title: project.title
      }
    });
  } catch (error) {
    console.error('Error fetching source code:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to fetch source code'
    });
  }
});

// Create new project (Admin only - you can protect this with auth middleware)
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ success: true, project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to create project'
    });
  }
});

export default router;