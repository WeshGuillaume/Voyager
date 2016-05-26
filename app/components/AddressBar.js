
import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import { updateAddress, exec} from 'actions/tabs'
import { updateSuggestions, emptySuggestions } from 'actions/autocomplete'

import Input from './Input'
import Like from './Like'
import Autocomplete from './Autocomplete'
import Address from './Address'

if (process.env.BROWSER) {
  require('styles/AddressBar.scss')
}

@connect(
  state => ({
    suggestions: state.autocomplete.suggestions,
    tabs: state.tabs.tabs,
    current: state.tabs.current,
    shortcut: state.shortcuts.emitter,
  })
)
class AddressBar extends Component {

  state = {
    edit: false,
  }

  onChange = e => {
    const { value } = e.target
    const { dispatch } = this.props

    dispatch(updateAddress(value))

    if (value) {
      return dispatch(updateSuggestions(value))
    }

    dispatch(emptySuggestions())
  }

  submit = value => {
    const { dispatch } = this.props
    this.setState({ edit: false })
    return dispatch(exec(value))
  }

  render () {

    const { address, dispatch, suggestions, current, tabs, src } = this.props
    const { edit } = this.state

    const formattedCurrent = tabs[current].history[tabs[current].url]
    const https = !edit && formattedCurrent.indexOf('https') === 0

    const formattedAddress =
      !edit ?
        formattedCurrent
        .replace('https://', '')
        .replace('http://', '') :
      address

      /*
       *
          <span className='https'>{https ? 'https://' : ''}</span>
          <Input
            suggestions={suggestions}
            onChange={value => dispatch(updateSuggestions(value))} />
       */

    return (
      <div className='AddressBar'>
        <Like />
        <div className='input-content'>
          <Address
            onEnter={this.submit}
            inactiveValue={src}
            inputClassName='Input'
            suggestionsClassName='Suggestions'
            suggestions={suggestions}
            onChange={value => dispatch(updateSuggestions(value))}/>
        </div>
      </div>
    )
  }
}

export default AddressBar
