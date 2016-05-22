
import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { setCurrent, updateFavicon, addTab, removeCurrent, removeTab, goLeft, goRight } from 'actions/tabs'

if (process.env.BROWSER) {
  require('styles/Frame.scss')
}

@connect(
  state => ({
    tabs: state.tabs.tabs,
    current: state.tabs.current,
    shortcut: state.shortcuts.emitter,
  })
)
class Frame extends Component {

  state = {
    mouseOver: null,
  }

  setDafaultFavicon = index => e => {
    this.props.dispatch(updateFavicon(index, 'https://image.freepik.com/free-icon/text-document_318-48568.png'))
  }

  removeTab = index => e => {
    this.props.dispatch(removeTab(index))
  }

  addTab = () => {
    this.props.dispatch(addTab('http://www.google.com'))
  }

  componentDidMount () {
    const { shortcut, dispatch, current } = this.props

    shortcut.on('remove:tab', () => dispatch(removeCurrent()))
    shortcut.on('tab:left', () => dispatch(goLeft()))
    shortcut.on('tab:right', () => dispatch(goRight()))
    shortcut.on('new:tab', () => dispatch(addTab('https://www.google.com')))

  }

  render () {

    const { tabs, current, dispatch } = this.props
    const { mouseOver } = this.state

    return (
      <div className='Frame'>
        <div className='tabs'>
          {tabs.map((tab, index) => {
            return (
              <div
                key={index}
                onMouseEnter={() => this.setState({ mouseOver: index })}
                onMouseLeave={() => this.setState({ mouseOver: null })}
                className={cx('tab', { active: index === current })} >
                <div>
                {tab.favicon && <img width={15} src={tab.favicon} />}
                </div>
                <span
                  onClick={_ => dispatch(setCurrent(index))}
                  className='title'>{tab.title}</span>
                  {mouseOver === index && <i
                    className='ion-close-round'
                    onClick={this.removeTab(index)} />}
              </div>
            )
          })}
          <i
            className='ion-plus'
            onClick={this.addTab} />
        </div>
      </div>
    )
  }
}

export default Frame
