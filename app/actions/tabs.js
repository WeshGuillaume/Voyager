
import { createAction } from 'redux-actions'

/*
 * TODO: handlers before redirection
 */
export const addTab = (query, toCurrent) => (dispatch, getState) => {

  const add = createAction('ADD_TAB', tab => tab)
  const { tabs } = getState()

  dispatch(add({ tab: { title: query.slice(0, 9) + '...', url: query }, toCurrent }))
}

export const updateAddress = createAction('UPDATE_ADDRESS_BAR', url => url)

export const setCurrent = index => dispatch => {

  const setCurrentTab = createAction('SET_CURRENT_TAB', index => index)

  dispatch(setCurrentTab(index))
  dispatch(updateAddress())
}

export const removeTab = index => dispatch => {
  const remove = createAction('REMOVE_TAB', index => index)

  dispatch(remove(index))
}

export const updateLocation = url => dispatch => {

  const updateCurrent = createAction('UPDATE_CURRENT_TAB', updater => updater)

  dispatch(updateCurrent(tab => ({ ...tab, title: url.substr(0, 9) + '...', url })))
  dispatch(updateAddress(url))
}

export const updateTitle = (index, title) => dispatch => {

  const updateCurrent = createAction('UPDATE_INDEX', updater => updater)

  dispatch(updateCurrent(Object.assign(
    tab => ({ ...tab, title: title.substr(0, 9) + '...' }),
    { index }
  )))
}

export const updateFavicon = (index, favicons) => dispatch => {

  const updateCurrent = createAction('UPDATE_INDEX', updater => updater)

  dispatch(updateCurrent(Object.assign(
    tab => ({ ...tab, favicon: favicons[0] || null }),
    { index }
  )))
}
