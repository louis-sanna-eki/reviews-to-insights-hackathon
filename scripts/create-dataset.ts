import { Client, QueryBuilder } from '@relevanceai/dataset'

run()

async function run() {
  const client = new Client({
    endpoint: 'https://api-d7b62b.stack.tryrelevance.com'
  })
  const dataset = client.dataset('reviews-json')

  const query = QueryBuilder().vector('docs_vector_', {
    query: 'breakfast',
    model: 'all-mpnet-base-v2'
  })

  const { results } = await dataset.search(query)
  console.log('results', results)
}
