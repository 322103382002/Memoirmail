const axios = require('axios');
const fs = require('fs');
const path = require('path');

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models';
const IMAGE_MODEL = 'stabilityai/stable-diffusion-xl-base-1.0';

async function generateKeyframes(sceneDescription) {
  try {
    // Split the scene description into key moments
    const keyMoments = sceneDescription.split(/[.!?]+/).filter(moment => moment.trim().length > 0);
    
    const keyframes = [];
    const uploadsDir = path.join(__dirname, '../../uploads');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    for (const moment of keyMoments) {
      const response = await axios.post(
        `${HUGGINGFACE_API_URL}/${IMAGE_MODEL}`,
        {
          inputs: moment.trim(),
          parameters: {
            num_inference_steps: 20,
            guidance_scale: 7.5
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
            'Content-Type': 'application/json'
          },
          responseType: 'arraybuffer'
        }
      );

      // Save the image
      const timestamp = Date.now();
      const filename = `keyframe_${timestamp}.png`;
      const filePath = path.join(uploadsDir, filename);
      
      fs.writeFileSync(filePath, response.data);
      
      // Add the relative path to the keyframes array
      keyframes.push(`/uploads/${filename}`);
    }

    return keyframes;
  } catch (error) {
    console.error('Error generating keyframes:', error);
    throw error;
  }
}

module.exports = {
  generateKeyframes
}; 