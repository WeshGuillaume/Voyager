
import React, { Component } from 'react'

import Input from './Input'
import Suggestions from './Suggestions'

if (process.env.BROWSER) {
  require('styles/Address.scss')
}

class Address extends Component {

  state = {
    suggestions: [],
    active: 0,
    inputValue: '',
    empty: true,
  }

  getSuggestions (value) {
    return [ 'guillaume', 'nicolas', 'arnaud' ]
  }

  handleKey = e => {
    const { active, suggestions } = this.state

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

    if (!value) { return this.setState({ empty: true, inputValue: value }) }

    this.setState({
      suggestions: this.getSuggestions(value),
      empty: false,
      inputValue: value,
    })
  }

  componentWillMount () {
    this.setState({ suggestions: this.getSuggestions('') })
  }

  render () {

    const { suggestions, active, empty } = this.state
    const { inputValue } = this.state

    return (
      <div className='Address'>
        <Input
          value={inputValue}
          complete={suggestions[0]}
          onKeyDown={this.handleKey}
          onChange={this.onInputChange} />
          {!empty && <Suggestions
            active={active}
            list={suggestions}/>}
      </div>
    )
  }
}

export default Address
