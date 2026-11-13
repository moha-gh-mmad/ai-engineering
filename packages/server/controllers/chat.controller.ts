import type { Request, Response } from 'express';
import { z } from 'zod';
import { chatService } from '../services/chat.service';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required.')
      .max(1000, 'Prompt is too long.'),

   conversationId: z.string().uuid(),
});

export const chatController = {
   async sendMessage(req: Request, res: Response): Promise<void> {
      const parseResult = chatSchema.safeParse(req.body);

      if (!parseResult.success) {
         res.status(400).json({
            error: 'Invalid request data.',
            details: parseResult.error.issues,
         });

         return;
      }

      try {
         const { prompt, conversationId } = parseResult.data;

         const response = await chatService.sendMessage(prompt, conversationId);

         res.status(200).json({
            message: response.message,
         });
      } catch (error) {
         console.error('Chat error:', error);

         res.status(500).json({
            error: 'Failed to generate a response.',
         });
      }
   },
};
