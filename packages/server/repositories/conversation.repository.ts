import type { ChatMessage } from '../llm/client';

const conversations = new Map<string, ChatMessage[]>();

export const conversationRepository = {
   getMessages(conversationId: string): ChatMessage[] {
      return conversations.get(conversationId) ?? [];
   },

   addMessage(conversationId: string, message: ChatMessage): void {
      const history = conversations.get(conversationId) ?? [];

      history.push(message);

      conversations.set(conversationId, history);
   },
};
