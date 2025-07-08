// utils/animate.js
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

exports.animateImages = (imagePaths) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(__dirname, `../uploads/memory_${Date.now()}.mp4`);

    const command = ffmpeg();
    imagePaths.forEach(img => command.input(img));
    
    command
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err))
      .outputOptions('-r', '1') // 1 frame per second (change as needed)
      .save(outputPath);
  });
};
