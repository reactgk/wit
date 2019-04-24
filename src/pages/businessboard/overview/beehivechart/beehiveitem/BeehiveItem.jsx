import React, { PureComponent } from 'react'
import immutable from 'immutable'
import './beehive-item.less'

class BeehiveItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!immutable.is(immutable.fromJS(nextProps.data), immutable.fromJS(prevState.data))) {
      return {
        data: nextProps.data
      }
    }
    return null
  }

  render () {
    const { data } = this.state
    return (
      <div
        onMouseEnter={() => { this.props.onHoverEvent(data) }}
        className="beehive-item"
        style={this.props.style}>
        <div className="beehive-item-child">
          <div className="beehive-item-child-child">
            <span>{data.title || '--'}</span>
          </div>
        </div>
      </div>
    )
  }
}

BeehiveItem.defaultProps = {
  style: {},
  data: {},
  onHoverEvent: () => {}
}

export default BeehiveItem
