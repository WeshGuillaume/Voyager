
import { createHandler } from 'logic/createHandler'

export const localhost = createHandler({
  redirect: true,
}, {
  name: 'Localhost',
  exec (query, { redirect }) {

    if (!query.indexOf('localhost') === 0) {
      return false
    }

    redirect(query)
    return true
  }
})

export const urlHandler = createHandler({
  redirect: true,
}, {
  name: 'URL handler',
  exec (query, { redirect }) {

    if (query
        .trim()
        .replace(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/, '')
        .length > 0) { return }

    redirect(query)
    return true
  },
})

export const googleSearch = createHandler({
  redirect: true,
}, {
  name: 'Google',
  exec (query, { redirect }) {
  
    redirect(`https://www.google.fr/search?q=${query.replace(/\s+/g, '%20')}`)
    return true
  }
})
