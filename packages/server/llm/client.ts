import OpenAI from 'openai';

const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
   throw new Error('Missing OPENROUTER_API_KEY in environment variables.');
}

const client = new OpenAI({
   apiKey,
   baseURL: 'https://openrouter.ai/api/v1',
});

export type ChatMessage = {
   role: 'user' | 'assistant';
   content: string;
};

type GenerateTextOptions = {
   model?: string;
   prompt: string;
   instructions?: string;
   history?: ChatMessage[];
   temperature?: number;
   maxTokens?: number;
};

type GenerateTextResult = {
   id: string;
   text: string;
};

export const llmClient = {
   async generateText({
      model = 'gpt-5.6-sol',
      prompt,
      instructions,
      history = [],
      temperature = 0.2,
      maxTokens = 250,
   }: GenerateTextOptions): Promise<GenerateTextResult> {
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
         ...(instructions
            ? [{ role: 'system' as const, content: instructions }]
            : []),

         ...history.map((message) => ({
            role: message.role,
            content: message.content,
         })),

         {
            role: 'user',
            content: prompt,
         },
      ];

      const result = await client.chat.completions.create({
         model,
         messages,
         temperature,
         max_tokens: maxTokens,
      });

      return {
         id: result.id,
         text: result.choices[0]?.message.content ?? '',
      };
   },
};
