
import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { setCurrent, updateFavicon, addTab, removeTab } from 'actions/tabs'

if (process.env.BROWSER) {
  require('styles/Frame.scss')
}

@connect(
  state => ({
    tabs: state.tabs.tabs,
    current: state.tabs.current,
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
            onClick={() => dispatch(addTab('https://google.com', true))} />
        </div>
      </div>
    )
  }
}

export default Frame
