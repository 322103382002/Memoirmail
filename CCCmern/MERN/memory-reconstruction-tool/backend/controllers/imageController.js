const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.generateKeyframe = async (req, res) => {
    const { sceneDescription } = req.body;
    
    if (!sceneDescription) {
        return res.status(400).json({ error: 'Scene description is required' });
    }

    try {
        // Using the free Stable Diffusion model
        const response = await axios.post(
            'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0',
            { 
                inputs: sceneDescription,
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

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const timestamp = Date.now();
        const filename = `keyframe_${timestamp}.png`;
        const uploadPath = path.join(uploadsDir, filename);

        fs.writeFileSync(uploadPath, response.data);

        res.status(200).json({ 
            message: 'Image generated successfully', 
            imagePath: `/uploads/${filename}`,
            description: sceneDescription
        });
    } catch (error) {
        console.error('Image generation failed:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Image generation failed',
            details: error.response?.data || error.message
        });
    }
};