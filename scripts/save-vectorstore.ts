import { HNSWLib } from 'langchain/vectorstores'
import { OpenAIEmbeddings } from 'langchain/embeddings'
import { CSVLoader, TextLoader } from 'langchain/document_loaders'

run()

async function run() {
  const loader = new CSVLoader('data/raw/reviews.csv')
  const docs = await loader.load()
  // Create a vector store through any method, here from texts as an example
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings())

  // Save the vector store to a directory
  const directory = 'vector-store'
  await vectorStore.save(directory)
}
