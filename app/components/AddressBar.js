
import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import { updateAddress, exec} from 'actions/tabs'

import Like from './Like'

if (process.env.BROWSER) {
  require('styles/AddressBar.scss')
}

@connect()
class AddressBar extends Component {

  state = {
    edit: false,
  }

  select = () => {
    this.refs.input.focus()
    this.refs.input.select()
  }

  submit = e => {
    const { address, dispatch } = this.props
    if (e.key === 'Enter') {
      return dispatch(exec(address))
    }
  }

  componentDidMount () {
  
    const { active, addressFocus, shortcut } = this.props

    shortcut.on('address:focus', () => {
      if (this.refs.input) {
        this.select()
      }
    })

    if (addressFocus && active) { this.select() }
    
  }

  render () {

    const { address, dispatch } = this.props
    const { edit } = this.state

    const https = !edit && address.indexOf('https') === 0
  
    const formattedAddress =
      !edit ?
      address
        .replace('https://', '')
        .replace('http://', '') :
      address

    return (
      <div className='AddressBar'>
        <Like />
        <div className='input-content'>
          <span className='https'>{https ? 'https://' : ''}</span>
          <input
            className={cx('input', { 'https-input': https })}
            type='text'
            ref='input'
            onClick={this.select}
            onFocus={e => this.setState({ edit: true })}
            onBlur={e => this.setState({ edit: false })}
            onChange={e => dispatch(updateAddress(e.target.value))}
            onKeyPress={this.submit}
            value={formattedAddress} />
        </div>
      </div>
    )
  }
}

export default AddressBar
