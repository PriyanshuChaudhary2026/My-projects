// api.jsx
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyB0toXCc0eL0N6au6H53HR6qw6E7iRPYbA';

const generativeAI = new GoogleGenerativeAI(apiKey);

const model = generativeAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

export const generateStory = async (input) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const response = await chatSession.sendMessage(input);
    return response.response.text();  // Ensure this matches the actual response format
  } catch (error) {
    console.error('Error generating content:', error);
    return 'Sorry, there was an error generating the story.';
  }
};
