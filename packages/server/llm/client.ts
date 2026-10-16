import OpenAI from 'openai';

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
   baseURL: 'https://api.avalai.ir/v1',
});

type GenerateTextOptions = {
   model?: string;
   prompt: string;
   instructions?: string;
   temperature?: number;
   maxTokens?: number;
   previousResponseId?: string;
};
type GenerateTextResult = {
   id: string;
   text: string;
};

export const llmClient = {
   async generateText({
      model = 'gpt-4o-mini',
      prompt,
      instructions,
      temperature = 0.2,
      maxTokens = 250,
      previousResponseId,
   }: GenerateTextOptions): Promise<GenerateTextResult> {
      const result = await client.responses.create({
         model,
         input: prompt,
         instructions,
         temperature,
         max_output_tokens: maxTokens,
         previous_response_id: previousResponseId,
      });

      return { id: result.id, text: result.output_text };
   },
};
