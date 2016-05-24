
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateLocation, updateTitle, updateAddress, updateFavicon, exec, goBack, goForward } from 'actions/tabs'
import cx from 'classnames'
import AddressBar from './AddressBar'

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

  componentDidMount () {

    const { index, dispatch, active, shortcut } = this.props
    const { webview } = this.refs

    webview.addEventListener('new-window', e => {
      const { ipcRenderer } = window.require('electron')
      console.log(e.disposition)
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

    const { src, current, tabs, shortcut, active, address, addressFocus, dispatch } = this.props

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
          <AddressBar
            address={address}
            addressFocus={addressFocus}
            active={active}
            current={current}
            tabs={tabs}
            shortcut={shortcut} />
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
