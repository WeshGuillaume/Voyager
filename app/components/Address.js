
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
    const { suggestions } = this.props

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

  render () {

    const { active, empty, inputValue } = this.state
    const { inputClassName, suggestionsClassName, suggestions } = this.props

    return (
      <div className='Address'>
        <Input
          className={inputClassName}
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
