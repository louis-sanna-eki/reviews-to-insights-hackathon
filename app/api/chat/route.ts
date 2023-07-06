import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { Client, QueryBuilder } from '@relevanceai/dataset'
import { Readable } from 'stream'

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

  const stream = OpenAIStream(res)

  return new StreamingTextResponse(
    wrapStreamWithPrefix(
      stream,
      `### Context:\n\n ${context} \n ### Completion:\n\n `
    )
  )
}

function wrapStreamWithPrefix(
  originalStream: ReadableStream<any>,
  prefix: string
): any {
  let firstChunk = true
  return new Readable({
    async read() {
      for await (const chunk of originalStream as any) {
        if (firstChunk) {
          this.push(prefix)
          this.push(chunk)
          firstChunk = false
        } else {
          this.push(chunk)
        }
      }
      this.push(null)
    }
  })
}
