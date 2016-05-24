
import { handleActions } from 'redux-actions'

const initial = {
  history: [],
  suggestions: [],
}

export default handleActions({

  PUSH_HISTORY: (state, { payload: page }) => {
    return { ...state, history: [ ...state.history, page ] }
  },

  SET_SUGGESTIONS: (state, { payload: suggestions }) => ({ ...state, suggestions }),

  EMPTY_SUGGESTIONS: state => ({ ...state, suggestions: [] })

}, initial)
