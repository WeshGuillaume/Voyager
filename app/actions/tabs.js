
import { createAction } from 'redux-actions'
import { createFinder } from 'logic/exec'
import * as handlers from './handlers'

export const exec = query => dispatch => {

  const functions = {
    redirect: url => dispatch(updateLocation(url)),
  }

  const finder = createFinder(handlers, functions)

  finder(query)

}

export const addTab = (query, toCurrent) => (dispatch, getState) => {

  const add = createAction('ADD_TAB', tab => tab)
  const { tabs, shortcuts } = getState()


  dispatch(add({ title: query.slice(0, 9) + '...', url: query } ))

  dispatch(setCurrent(tabs.tabs.length))
  shortcuts.emitter.emit('address:focus')
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

export const loadGoogleSearch = query => dispatch => {

  dispatch(updateLocation(`https://www.google.fr/search?btnG=1&pws=0&q=${query}`))
}
