import fs from 'fs';
import path from 'path';
import { conversationRepository } from '../repositories/conversation.repository';
import template from '../prompts/chatbot.txt';
import { llmClient } from '../llm/client';

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);

const instructions = template.replace('{{parkInfo}}', parkInfo);

interface ChatResponse {
   id: string;
   message: string;
}

export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const history = await conversationRepository.getMessages(conversationId);
      const response = await llmClient.generateText({
         model: 'gpt-5.6-sol',
         instructions,
         history,
         prompt,
         temperature: 0.2,
         maxTokens: 100,
      });

      conversationRepository.addMessage(conversationId, {
         role: 'user',
         content: prompt,
      });

      conversationRepository.addMessage(conversationId, {
         role: 'assistant',
         content: response.text,
      });

      return {
         id: response.id,
         message: response.text,
      };
   },
};
