
import { handleActions } from 'redux-actions'

const initial = {
  history: [],
  suggestions: [],
  cursor: 0,
}

export default handleActions({

  PUSH_HISTORY: (state, { payload: page }) => {
    return { ...state, history: [ ...state.history, page ] }
  },

  SET_SUGGESTIONS: (state, { payload: suggestions }) => ({ ...state, suggestions }),

  EMPTY_SUGGESTIONS: state => ({ ...state, suggestions: [] }),

  CURSOR_DOWN: state => {
    const { cursor, suggestions } = state
    if (cursor === suggestions.length - 1) { return ({ ...state, cursor: 0 }) }
    return ({ ...state, cursor: cursor + 1 })
  },

  CURSOR_UP: state => {
    const { cursor, suggestions } = state
    if (cursor === 0) { return ({ ...state, cursor: suggestions.length - 1 }) }
    return ({ ...state, cursor: cursor - 1 })
  }

}, initial)
