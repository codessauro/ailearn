import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateConversation = async (
  language: string,
  category: string,
  level: number
): Promise<string> => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a language learning assistant. Generate a natural conversation in ${language} for ${category} context at level ${level}/5. Include common phrases and expressions.`
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating conversation:', error);
    throw new Error('Failed to generate conversation');
  }
};