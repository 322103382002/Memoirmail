const express = require('express');
const router = express.Router();
const Memory = require('../models/Memory');
const { generateSceneDescription } = require('../services/textToSceneService');
const { generateKeyframes } = require('../services/imageGenerationService');
const { createAnimation } = require('../services/animationService');
const auth = require('../middleware/auth');

// Create a new memory
router.post('/', auth, async (req, res) => {
  try {
    const { description } = req.body;
    
    // Create memory record
    const memory = new Memory({
      user: req.user.id,
      description
    });
    
    await memory.save();
    
    // Generate scene description using Hugging Face
    const sceneDescription = await generateSceneDescription(description);
    memory.sceneDescription = sceneDescription;
    memory.status = 'processing';
    await memory.save();
    
    // Generate keyframes using Stable Diffusion
    const keyframes = await generateKeyframes(sceneDescription);
    memory.keyframes = keyframes;
    await memory.save();
    
    // Create animation from keyframes
    const animationUrl = await createAnimation(keyframes);
    memory.animationUrl = animationUrl;
    memory.status = 'completed';
    await memory.save();
    
    res.json(memory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all memories for a user
router.get('/', auth, async (req, res) => {
  try {
    const memories = await Memory.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(memories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single memory
router.get('/:id', auth, async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    
    if (!memory) {
      return res.status(404).json({ msg: 'Memory not found' });
    }
    
    if (memory.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(memory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 