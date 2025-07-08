const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateSceneDescription(memoryText) {
  try {
    const prompt = `Convert this childhood memory into a vivid scene description suitable for animation. 
    Focus on visual details, emotions, and key moments. Memory: ${memoryText}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative writer who specializes in converting memories into vivid scene descriptions for animation."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating scene description:', error);
    throw error;
  }
}

module.exports = {
  generateSceneDescription
}; 