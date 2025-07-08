const path = require('path');
const fs = require('fs');
const { generateImagesFromText } = require('../utils/textToImage');
const { animateImages } = require('../utils/animate');

exports.createMemory = async (req, res) => {
  try {
    const { memoryText } = req.body;

    // Step 1: Generate Images from Text
    const imagePaths = await generateImagesFromText(memoryText);

    // Step 2: Animate those images into a video
    const videoPath = await animateImages(imagePaths);

    res.status(200).json({ success: true, videoPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create memory animation.' });
  }
};
