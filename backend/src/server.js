import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper function to generate TV-specific prompts
const generateTVPrompt = (userQuery, context = {}) => {
  const basePrompt = `As a Smart TV assistant, ${userQuery}. Please provide a detailed and helpful response.`;
  if (context.viewingHistory) {
    return `${basePrompt}\nBased on the viewing history: ${context.viewingHistory.join(', ')}`;
  }
  return basePrompt;
};

// Routes
app.post('/api/recommendations', async (req, res) => {
  try {
    const { viewingHistory = [] } = req.body;
    const prompt = generateTVPrompt(
      "provide personalized content recommendations",
      { viewingHistory }
    );
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ recommendations: text });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/content-info', async (req, res) => {
  try {
    const { title, question } = req.body;
    const prompt = generateTVPrompt(
      `Provide information about "${title}". Specifically: ${question}`
    );
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ information: text });
  } catch (error) {
    console.error('Content info error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/feature-guide', async (req, res) => {
  try {
    const { question } = req.body;
    const prompt = generateTVPrompt(
      `Help with TV feature: ${question}. Provide step-by-step instructions.`
    );
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ guide: text });
  } catch (error) {
    console.error('Feature guide error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment:', {
    port: process.env.PORT,
    hasApiKey: !!process.env.GEMINI_API_KEY
  });
}); 