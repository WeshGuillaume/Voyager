
import { createHandler } from './createHandler'

export const createFinder = (handlers, functions) => query => {

  const keys = Object.keys(handlers)

  for (const key of keys) {
    const handler = handlers[key](functions)

    if (handler(query)) { return }
  }

  throw new Error(`No handler has been found for query ${query}`)
}
