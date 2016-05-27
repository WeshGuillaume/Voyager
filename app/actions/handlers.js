
import { createHandler } from 'logic/createHandler'
import fetch from 'superagent'
import jsonp from 'superagent-jsonp'

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
  suggestGroup: true,
}, {
  name: 'Google',

  exec (query, { redirect }) {
  
    redirect(`https://www.google.fr/search?q=${query.replace(/\s+/g, '%20')}`)
    return true
  },

  suggest (query) {
    return new Promise((resolve, reject) => {
      fetch
        .get(`http://clients1.google.com/complete/search?jsonhl=en&output=toolbar&client=firefox&q=${query}`)
        .use(jsonp)
        .end((err, results) => {
          if (err) { reject(err) }
          resolve({
            name: 'Google Search',
            list: results.body[1],
          })
        })
    })
  }
})
