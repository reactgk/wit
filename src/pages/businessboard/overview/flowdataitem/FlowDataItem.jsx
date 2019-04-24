import React, { PureComponent } from 'react'
import './flow-data-item.less'

class FlowDataItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: props.data,
      label: props.label
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
    const { style, label } = this.props
    return (
      <div className="flow-data-item" style={style}>
        <p className="value">{this.state.data}</p>
        <p className="label">{label}</p>
      </div>
    )
  }
}

FlowDataItem.defaultProps = {
  style: {},
  data: '',
  label: ''
}

export default FlowDataItem
