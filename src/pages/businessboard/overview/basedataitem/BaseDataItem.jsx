import React, { PureComponent } from 'react'
import './base-data-item.less'

class BaseDataItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: ''
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.data !== prevState.data) {
      return {
        data: nextProps.data
      }
    }
    return null
  }

  render () {
    const { icon, label, style, onClick } = this.props
    return (
      <div
        onClick={() => { onClick() }}
        className="data-item"
        style={style}>
        <img className="icon" src={icon}/>
        <div className="data-root">
          <p className="value">{this.state.data}</p>
          <p >{label}</p>
        </div>
      </div>
    )
  }
}

BaseDataItem.defaultProps = {
  style: {},
  icon: null,
  data: '',
  label: '',
  onClick: () => {}
}

export default BaseDataItem
