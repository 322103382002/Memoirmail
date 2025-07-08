// utils/textToImage.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.generateImagesFromText = async (memoryText) => {
  const prompts = splitMemoryIntoScenes(memoryText); // You can define your own logic
  const imagePaths = [];

  for (let i = 0; i < prompts.length; i++) {
    // Replace with real API request
    const response = await axios.post('https://api.example.com/generate', {
      prompt: prompts[i]
    });

    const imageBuffer = Buffer.from(response.data.image, 'base64');
    const filePath = path.join(__dirname, `../uploads/scene${i}.png`);
    fs.writeFileSync(filePath, imageBuffer);
    imagePaths.push(filePath);
  }

  return imagePaths;
};

function splitMemoryIntoScenes(text) {
  // Example: naive split into sentences or segments
  return text.split('.').filter(p => p.trim().length > 5).slice(0, 5);
}
