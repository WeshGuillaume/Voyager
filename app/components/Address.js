
import React, { Component } from 'react'

import Input from './Input'
import Suggestions from './Suggestions'

if (process.env.BROWSER) {
  require('styles/Address.scss')
}

class Address extends Component {

  state = {
    active: 0,
    inputValue: '',
    empty: true,
  }

  handleKey = e => {
    const { active } = this.state
    const { suggestions, onEnter } = this.props

    if (e.key === 'ArrowUp') {

      const { value } = e.target
      const isActive = active === 0 ? suggestions.length - 1 : active - 1

      if (suggestions.length && value) {
        this.setState({
          active: isActive,
          inputValue: suggestions[isActive]
        })
      }
    }

    if (e.key === 'ArrowDown') {

      const isActive = active === suggestions.length - 1 ? 0 : active + 1
      const { value } = e.target

      if (suggestions.length && value) {
        this.setState({
          active: isActive,
         inputValue: suggestions[isActive],
        }) 
      }
    }

    if (e.key === 'Enter') {
      const { value } = e.target
      onEnter(value)
    }
  }

  onInputChange = value => {

    const { onChange } = this.props

    if (!value) { return this.setState({ empty: true, inputValue: value }) }

    this.setState({
      empty: false,
      inputValue: value,
    })

    onChange(value)
  }

  setInactive = () => {
    const { inactiveValue } = this.props
    this.setState({ inputValue: inactiveValue, empty: true, active: 0 })
  }

  componentWillMount () {
    this.setInactive()
  }

  render () {

    const { active, empty, inputValue } = this.state
    const { inputClassName, suggestionsClassName, suggestions, inactiveValue } = this.props

    return (
      <div className='Address'>
        <Input
          className={inputClassName}
          onBlur={this.setInactive}
          value={inputValue}
          complete={suggestions[0]}
          onKeyDown={this.handleKey}
          onChange={this.onInputChange} />
          {!empty && <Suggestions
            className={suggestionsClassName}
            active={active}
            list={suggestions}/>}
      </div>
    )
  }
}

export default Address
