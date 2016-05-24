
import { createAction } from 'redux-actions'
import fetch from 'superagent'
import jsonp from 'superagent-jsonp'

export const updateSuggestions = query => dispatch => {

  const setSuggestion = createAction('SET_SUGGESTIONS', item => item)
  if (!query) { return }

  fetch
    .get(`http://clients1.google.com/complete/search?jsonhl=en&output=toolbar&client=firefox&q=${query}`)
    .use(jsonp)
    .end((err, results) => {
      if (err) { return console.log(err) }

      dispatch(setSuggestion(results.body[1]))
    })
}

export const emptySuggestions = createAction('EMPTY_SUGGESTIONS')
