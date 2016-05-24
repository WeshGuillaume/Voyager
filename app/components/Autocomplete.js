
import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

if (process.env.BROWSER) {
  require('styles/Autocomplete.scss')
}

@connect(
  state => ({
    autocompleteCursor: state.autocomplete.cursor,
    shortcut: state.shortcuts.emitter,
  })
)
class Autocomplete extends Component {

  state = {
    active: 0,
  }

  setActive = index => () => {
    this.setState({ active: index })
  }

  componentDidMount () {
    const { shortcut } = this.props
  
    shortcut.on('up', () => {
      const { suggestions } = this.props
      const { active } = this.state

      this.setState({
        active: active === 0 ? suggestions.length - 1 : active - 1,
      })
    })

    shortcut.on('down', () => {
      const { suggestions } = this.props
      const { active } = this.state

      this.setState({
        active: active === suggestions.length - 1 ? 0 : active + 1,
      })
    })
  }

  render () {

    const { suggestions, edit } = this.props
    const { active } = this.state
  
    return (
      <div className='Autocomplete'>
        {edit && suggestions.map((s, key) => {
          return (
            <div
              key={key}
              className={cx('item', { active: active === key })}
              onMouseEnter={this.setActive(key)}>
              <span>{s}</span>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Autocomplete
