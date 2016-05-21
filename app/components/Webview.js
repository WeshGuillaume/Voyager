
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateLocation, updateTitle, updateAddress, updateFavicon } from 'actions/tabs'
import cx from 'classnames'

if (process.env.BROWSER) {
  require('../styles/Webview.scss')
}

@connect(
  state => ({
    current: state.tabs.current,
    tabs: state.tabs.tabs,
    address: state.tabs.currentAddress,
  })
)
class Webview extends Component {

  submit = e => {
    const { address, dispatch } = this.props
    if (e.key === 'Enter') {
      dispatch(updateLocation(address))
    }
  }

  componentDidMount () {

    const { index } = this.props

    this.refs.webview.addEventListener('new-window', e => {
      const { ipcRenderer } = window.require('electron')
      ipcRenderer.send('popup', e.url)
    })

    this.refs.webview.addEventListener('will-navigate', e => {
      this.props.dispatch(updateLocation(e.url))
    })

    if (index === undefined) { return }

    this.refs.webview.addEventListener('did-finish-load', e => {
      const title = this.refs.webview.getTitle()
      this.props.dispatch(updateTitle(index, title))
    })

    this.refs.webview.addEventListener('page-favicon-updated', e => {
      this.props.dispatch(updateFavicon(index, e.favicons))
    })
  }

  render () {

    const { src, active, address, dispatch } = this.props

    return (
      <div className={cx('Webview', { active })}>
        <div className='toolbar'>
          <div className='back-forward'>
            <i className='ion-ios-arrow-back' />
            <i className='ion-ios-arrow-forward' />
          </div>
          <i className='ion-refresh' />
          <div className='address'>
            <i className='ion-android-star-outline' />
            <input
              type='text'
              onChange={e => dispatch(updateAddress(e.target.value))}
              onKeyPress={this.submit}
              value={address} />
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
