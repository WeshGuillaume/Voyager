
import React, { Component } from 'react'
import Mousetrap from 'mousetrap'

if (process.env.BROWSER) {
  require('styles/Input.scss')
}

class Input extends Component {

  state = {
    left: null,
  }

  addComplete = input => {
    const { complete, completeDidMatch = v => v, onEmpty } = this.props
    const { value } = input

    if (complete === value) {
      this.setState({ left: null })
      return completeDidMatch()
    }

    const left = complete.substr(value.length, complete.length)

    this.setState({
      left,
    })

    setTimeout(() => {
      input.focus()
      input.setSelectionRange(value.length, complete.length)
    }, 0)
  }

  /*
   * TODO: escape regexes
   */
  handleCaret = ({ target }) => {

    const { onChange, complete, completeDidntMatch = v => 0 } = this.props
    const { value } = target

    onChange(value)

    if (complete && value && value.length && !complete.indexOf(value)) {
      this.addComplete(target)
    } else {
      this.setState({ shouldComplete: false, left: null })
    }
  }

  onKeyDown = e => {
    const { onKeyDown } = this.props

    if (e.key === 'ArrowUp') {
      this.setState({ left: null })
      e.preventDefault()
    }
    if (e.key === 'ArrowDown') {
      this.setState({ left: null })
      e.preventDefault()
    }

    onKeyDown(e)
  }

  render () {

    const { onKeyDown, value } = this.props
    const { left } = this.state

    return (
      <input
        className='Input'
        ref='input'
        type='search'
        value={value + (left || '')}
        onKeyDown={this.onKeyDown}
        onChange={this.handleCaret} />
    )
  }
}

export default Input
