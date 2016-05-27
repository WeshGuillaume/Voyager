
import React, { Component } from 'react'
import cx from 'classnames'

if (process.env.BROWSER) {
  require('styles/Suggestions.scss')
}

class Suggestions extends Component {

  handleClick = index => e => {
    const { onClick } = this.props
    onClick(index)
  }

  mouseEnter = index => e => {
    const { onActiveChange } = this.props
    onActiveChange(index)
  }

  renderListItem = groupIsAcive => (item, index) => {

    const { active } = this.props

    return (
      <div
        onClick={this.handleClick(index)}
        onMouseEnter={this.mouseEnter(index)}
        key={index}
        className={cx('item', { active: groupIsAcive && active[1] === index })}>
        <span>{item}</span>
      </div>
    )
  }

  renderGroup = (group, index) => {

    const { active } = this.props

    return (
      <div
        className='group'
        key={index}>
        <span>{group.name}</span>
        {group.list && group.list.map(this.renderListItem(index === active[0]))}
      </div>
    )
  }

  render () {
  
    const { groups, className = '' } = this.props

    return (
      <div className={`Suggestions ${className}`}>
        {groups.map(this.renderGroup)}
      </div>
    )
  }
}

export default Suggestions
