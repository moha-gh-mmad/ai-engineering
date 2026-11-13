import { useCallback, useRef, useState } from 'react';

import type { ChatFormData } from './ChatInput';
import type { Message } from './ChatMessages';

import { chatApi } from './chatApi';

const useChatConversation = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const conversationId = useRef<string | null>(null);

   if (!conversationId.current) {
      conversationId.current = crypto.randomUUID();
   }

   const sendMessage = useCallback(
      async ({ prompt }: ChatFormData): Promise<boolean> => {
         setMessages((previousMessages) => [
            ...previousMessages,
            { content: prompt, role: 'user' },
         ]);

         setIsBotTyping(true);
         setError(null);

         try {
            const response = await chatApi.sendMessage(
               prompt,
               conversationId.current!
            );

            setMessages((previousMessages) => [
               ...previousMessages,
               { content: response, role: 'bot' },
            ]);

            return true;
         } catch (error) {
            console.error('Failed to send chat message:', error);

            setError('Something went wrong. Please try again later.');

            return false;
         } finally {
            setIsBotTyping(false);
         }
      },
      []
   );

   return {
      messages,
      isBotTyping,
      error,
      sendMessage,
   };
};

export default useChatConversation;
