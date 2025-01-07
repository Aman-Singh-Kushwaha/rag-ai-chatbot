import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

//Response stream upto 30s
export const maxDuration = 30;

export async function POST(req:Request) {
  const { messages } = await req.json();

  const result = streamText({
    model:openai('gpt-4o'),
    system: `You are a helpful assistant. Check your knowledge base before answering any questions.
    Only respond to questions using information from tool calls.
    if no relevant information is found in the tool calls, respond humbly, "Sorry, I don't know."`,
    messages,
  })

  return result.toDataStreamResponse();
}