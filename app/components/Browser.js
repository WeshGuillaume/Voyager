
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeTab, goLeft, goRight } from 'actions/tabs'

import Content from 'components/Content'
import Frame from 'components/Frame'

if (process.env.BROWSER) {
  require('styles/Browser.scss')
}

@connect(
  state => ({
    current: state.tabs.current,
    tabs: state.tabs.tabs,
    shortcut: state.shortcuts.emitter,
  })
)
class Browser extends Component {

  state = {
    addressFocus: false,
  }

  render () {

    const { current, tabs } = this.props

    return (
      <div className='Browser'>
        <Frame />
        <div className='web-wrapper'>
          {tabs.map((tab, index) => {
            return (
              <Content
                addressFocus={this.state.addressFocus}
                src={tab.history[tab.url]}
                active={current === index}
                index={index}
                key={index} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Browser
