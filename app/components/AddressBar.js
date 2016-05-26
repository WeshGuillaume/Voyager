
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

  select = () => {
    this.refs.input.focus()
    this.refs.input.select()
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

  submit = e => {
    const { address, dispatch } = this.props
    if (e.key === 'Enter') {
      this.setState({ edit: false })
      return dispatch(exec(address))
    }
  }

  componentDidMount () {
  
    const { active, addressFocus, shortcut } = this.props

    shortcut.on('address:focus', () => {
      if (this.refs.input && active) {
        this.select()
      }
    })

    if (addressFocus && active) { this.select() }
    
  }

  render () {

    const { address, dispatch, suggestions, current, tabs } = this.props
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
            inactiveValue={formattedCurrent}
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
