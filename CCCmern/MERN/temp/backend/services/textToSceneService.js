const axios = require('axios');

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models';
const TEXT_TO_SCENE_MODEL = 'facebook/blenderbot-400M-distill';

async function generateSceneDescription(memoryText) {
  try {
    const prompt = `Convert this childhood memory into a vivid scene description suitable for animation. 
    Focus on visual details, emotions, and key moments. Memory: ${memoryText}`;

    const response = await axios.post(
      `${HUGGINGFACE_API_URL}/${TEXT_TO_SCENE_MODEL}`,
      {
        inputs: prompt,
        parameters: {
          max_length: 500,
          temperature: 0.7,
          top_p: 0.9
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data[0].generated_text;
  } catch (error) {
    console.error('Error generating scene description:', error);
    throw error;
  }
}

module.exports = {
  generateSceneDescription
}; 