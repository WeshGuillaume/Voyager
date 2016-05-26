
import React, { Component } from 'react'
import cx from 'classnames'

if (process.env.BROWSER) {
  require('styles/Suggestions.scss')
}

class Suggestions extends Component {

  render () {
  
    const { list, active, className = '' } = this.props

    return (
      <div className={`Suggestions ${className}`}>
        {list && list.map((item, index) => {
          return (
            <div
              key={index}
              className={cx('item', { active: active === index })}>
              <span>{item}</span>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Suggestions
