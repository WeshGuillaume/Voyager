
import { createHandler } from './createHandler'

export const createFinder = handlers => query => {

  for (const handler of handlers) {

    if ((query.command && query.command !== handler.command) ||
        (handler.test && !handler.test(query))) { continue }

    return handler
  }

  const define = createHandler({
    search: true,
  })

  return define({
    command: 'search',
    description: 'Web search',
    exec: (query, { search }) => console.log(`Searching the web for ${search}`)
  })

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
