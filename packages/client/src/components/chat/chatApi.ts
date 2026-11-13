import axios from 'axios';

export type ChatResponse = {
   message: string;
};

export const chatApi = {
   async sendMessage(prompt: string, conversationId: string): Promise<string> {
      const { data } = await axios.post<ChatResponse>('/api/chat', {
         prompt,
         conversationId,
      });

      return data.message;
   },
};
