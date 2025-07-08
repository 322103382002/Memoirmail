const axios = require('axios');

const COMFYUI_API_URL = process.env.COMFYUI_API_URL || 'http://localhost:8188';

async function generateKeyframes(sceneDescription) {
  try {
    // Split the scene description into key moments
    const keyMoments = sceneDescription.split(/[.!?]+/).filter(moment => moment.trim().length > 0);
    
    const keyframes = [];
    
    for (const moment of keyMoments) {
      const prompt = {
        prompt: {
          "3": {
            inputs: {
              seed: Math.floor(Math.random() * 1000000),
              steps: 20,
              cfg: 7,
              sampler_name: "euler",
              scheduler: "normal",
              denoise: 1,
              model: "v1-5-pruned-emaonly.safetensors",
              positive: moment.trim(),
              negative: "blurry, low quality, distorted, bad anatomy",
              width: 512,
              height: 512,
              batch_size: 1
            },
            class_type: "KSampler"
          },
          "4": {
            inputs: {
              images: ["3", 0]
            },
            class_type: "SaveImage"
          }
        }
      };

      const response = await axios.post(`${COMFYUI_API_URL}/prompt`, prompt);
      const imageUrl = `${COMFYUI_API_URL}/view?filename=${response.data.filename}`;
      keyframes.push(imageUrl);
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