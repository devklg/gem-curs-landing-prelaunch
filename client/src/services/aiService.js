import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { HfInference } from '@huggingface/inference';

class AIService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: import.meta.env.VITE_OPENAI_API_KEY
        });

        this.anthropic = new Anthropic({
            apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY
        });

        this.gemini = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
        
        this.huggingface = new HfInference(import.meta.env.VITE_HF_API_KEY);
    }

    async generateWithGPT4(prompt) {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4",
                messages: [{ role: "user", content: prompt }]
            });
            return response.choices[0].message.content;
        } catch (error) {
            console.error('GPT-4 Error:', error);
            throw error;
        }
    }

    async generateWithClaude(prompt) {
        try {
            const response = await this.anthropic.messages.create({
                model: "claude-2",
                max_tokens: 1000,
                messages: [{ role: "user", content: prompt }]
            });
            return response.content;
        } catch (error) {
            console.error('Claude Error:', error);
            throw error;
        }
    }

    async generateWithGemini(prompt) {
        try {
            const model = this.gemini.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error('Gemini Error:', error);
            throw error;
        }
    }

    async generateWithHuggingFace(prompt, model = "gpt2") {
        try {
            const response = await this.huggingface.textGeneration({
                model: model,
                inputs: prompt,
            });
            return response.generated_text;
        } catch (error) {
            console.error('Hugging Face Error:', error);
            throw error;
        }
    }
}

export default new AIService(); 