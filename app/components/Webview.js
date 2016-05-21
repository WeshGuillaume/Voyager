
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateLocation, updateTitle, updateAddress, updateFavicon, exec, goBack, goForward } from 'actions/tabs'
import cx from 'classnames'

import Like from './Like'

if (process.env.BROWSER) {
  require('../styles/Webview.scss')
}

@connect(
  state => ({
    current: state.tabs.current,
    tabs: state.tabs.tabs,
    address: state.tabs.currentAddress,
    shortcut: state.shortcuts.emitter,
  })
)
class Webview extends Component {

  state = {
    back: false,
    forward: true,
    edit: false,
  }

  canGoBack = () => {
    const { tabs, current } = this.props

    return tabs[current].url < tabs[current].history.length - 1
  }

  canGoForward = () => {
    const { tabs, current } = this.props

    return tabs[current].url > 0
  }

  reload = () => {
    this.refs.webview.reload()
  }

  select = () => {
    this.refs.input.focus()
    this.refs.input.select()
  }

  back = () => {
    if (this.canGoBack()) {
      this.props.dispatch(goBack())
    }
  }

  forward = () => {
    if (this.canGoForward()) {
      this.props.dispatch(goForward())
    }
  }

  submit = e => {
    const { address, dispatch } = this.props
    if (e.key === 'Enter') {
      return dispatch(exec(address))
      dispatch(updateLocation(address))
    }
  }

  componentDidMount () {

    const { index, dispatch, addressFocus, active, shortcut } = this.props
    const { webview } = this.refs

    shortcut.on('address:focus', () => {
      if (this.refs.input) {
        this.select()
      }
    })

    if (addressFocus && active) { this.select() }
    
    webview.addEventListener('new-window', e => {
      const { ipcRenderer } = window.require('electron')
      ipcRenderer.send('popup', e.url)
    })

    webview.addEventListener('will-navigate', e => {
      dispatch(updateLocation(e.url))
    })

    webview.addEventListener('did-navigate', e => {
      this.setState({
        back: webview.canGoBack(),
        forward: webview.canGoForward(),
      })
    })

    webview.addEventListener('did-finish-load', e => {
      const title = webview.getTitle()
      dispatch(updateTitle(index, title))
    })

    webview.addEventListener('page-favicon-updated', e => {
      dispatch(updateFavicon(index, e.favicons))
    })
  }

  render () {

    const { src, active, address, dispatch } = this.props
    const { edit } = this.state

    const https = !edit && address.indexOf('https') === 0

    const formattedAddress =
      !edit ?
      address
        .replace('https://', '')
        .replace('http://', '') :
      address

    return (
      <div className={cx('Webview', { active })}>
        <div className='toolbar'>
          <div className='back-forward'>
            <i
              className={cx('ion-ios-arrow-back', { disabled: !this.canGoBack() })}
              onClick={this.back} />
            <i
              className={cx('ion-ios-arrow-forward', { disabled: !this.canGoForward() })}
              onClick={this.forward}/>
          </div>
          <i className='ion-refresh' onClick={this.reload} />
          <div className='address'>
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
        </div>
      <webview
        className='webview-element'
        ref='webview'
        src={src}
        plugins
        allowpopups />
      </div>
    )
  }
}

export default Webview
