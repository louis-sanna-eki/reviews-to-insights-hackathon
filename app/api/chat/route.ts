import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { Client, QueryBuilder } from '@relevanceai/dataset'
import { Readable, ReadableOptions } from 'stream'

// export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  if (previewToken) {
    configuration.apiKey = previewToken
  }

  const client = new Client({
    endpoint: 'https://api-d7b62b.stack.tryrelevance.com'
  })
  const dataset = client.dataset('reviews-json')

  const lastQuery = messages.slice(-1)[0].content
  const query = QueryBuilder().vector('docs_vector_', {
    query: lastQuery,
    model: 'all-mpnet-base-v2'
  })

  const { results } = await dataset.search(query)
  const context = results.map(({ docs }: any) => docs).join('\n\n')

  const improvedMessages = [
    {
      role: 'system',
      content: `Your are a question answering assistant used to analyze customer reviews.        
        Then answer the user prompt based on the reviews. If the context is not useful, say you cannot answer the question.`
    },
    ...messages.filter(({ role }: any) => role !== 'system').slice(0, -1), // HACK...
    {
      role: 'user',
      content: `### Context:\n\n ${context} \n ### Query:\n\n ${lastQuery}`
    }
  ]

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: improvedMessages,
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res)

  return new StreamingTextResponse(stream)
}
