const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

async function createAnimation(keyframes) {
  try {
    const uploadsDir = path.join(__dirname, '../../uploads');
    const tempDir = path.join(uploadsDir, 'temp');
    
    // Create directories if they don't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Download keyframes
    const downloadedFrames = [];
    for (let i = 0; i < keyframes.length; i++) {
      const framePath = path.join(tempDir, `frame_${i}.png`);
      // If keyframe is a URL, download it. If it's a local path, copy it.
      if (keyframes[i].startsWith('http')) {
        const response = await axios.get(keyframes[i], { responseType: 'arraybuffer' });
        fs.writeFileSync(framePath, response.data);
      } else {
        fs.copyFileSync(path.join(__dirname, '../..', keyframes[i]), framePath);
      }
      downloadedFrames.push(framePath);
    }

    // Create animation filename
    const animationFilename = `animation_${Date.now()}.mp4`;
    const outputPath = path.join(uploadsDir, 'animations', animationFilename);
    
    // Create animations directory if it doesn't exist
    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }
    
    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(path.join(tempDir, 'frame_%d.png'))
        .inputFPS(1)
        .outputFPS(24)
        .outputOptions([
          '-c:v libx264',
          '-pix_fmt yuv420p',
          '-crf 23',
          '-preset medium',
          '-tune animation'
        ])
        .duration(5) // 5-second video
        .on('end', () => {
          // Clean up temporary files
          downloadedFrames.forEach(frame => {
            try {
              fs.unlinkSync(frame);
            } catch (err) {
              console.warn('Error cleaning up frame:', err);
            }
          });
          
          // Return the public URL
          resolve(`/uploads/animations/${animationFilename}`);
        })
        .on('error', (err) => {
          console.error('Error creating animation:', err);
          reject(err);
        })
        .save(outputPath);
    });
  } catch (error) {
    console.error('Error in animation service:', error);
    throw error;
  }
}

module.exports = {
  createAnimation
}; 