
import { createHandler } from './createHandler'

export const createFinder = handlers => query => {

  for (const handler of handlers) {
    handler(query)
  }

  throw new Error(`No handler has been found for query ${query}`)
}

export const test = () => {

  const define = createHandler({
    version: true,
  })

  const myHandler = define({
    command: 'map',
    description: 'Google maps',
    exec: (query, { version }) => console.log(`Handler executed with version ${version}`) || false,
  })

  const find = createFinder([ myHandler ])

  const query = { content: 'lyon paris', command: 'map' }


  const handler = find(query)

  console.log(handler(query))
}

test()
