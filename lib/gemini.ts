// gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function getChatResponse(prompt: string, context: string, conversationHistory: string) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });
        const fullPrompt = `Context: ${context}\n\nConversation History:\n${conversationHistory}\n\nQuestion: ${prompt}\n\nPlease provide a relevant response and only tell answer related to context when user mentions anything related to event like if asks for Axis or Axis 25 , other wise just talk normally.`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        console.log('response', response);
        return response.text();
    } catch (error) {
        console.error('Error getting chat response:', error);
        return 'Sorry, I encountered an error while processing your request.';
    }
}