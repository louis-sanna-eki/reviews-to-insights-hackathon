import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { Client, QueryBuilder } from '@relevanceai/dataset'

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
  const context = results.map(({ docs }: any) => docs).join('\n')

  const improvedMessages = [
    {
      role: 'system',
      content:
        'Your are a question answering assistant used to analyze customer reviews. Answer user prompt based on the reviews given as context. If the context is not useful, says you cannot answer the question.'
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

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      await kv.hmset(`chat:${id}`, payload)
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`
      })
    }
  })

  return new StreamingTextResponse(stream)
}
