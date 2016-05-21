
import { handleActions } from 'redux-actions'

const initial = {

  local: {},
}

export default handleActions({

  ADD_LOCAL: (state, { payload: shtc }) => ({ ...state, local: [ ...state.local, shtc ] }),

}, initial)
