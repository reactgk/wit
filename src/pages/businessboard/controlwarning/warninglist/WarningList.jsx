import React, { PureComponent } from 'react'
import immutable from 'immutable'
import Scrollbars from 'react-custom-scrollbars'

import './warning-list.less'

class WarningList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      dataList: props.dataList
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!immutable.is(immutable.fromJS(nextProps.dataList), immutable.fromJS(prevState.dataList))) {
      return {
        dataList: nextProps.dataList
      }
    }
    return null
  }

  renderItemList () {
    return this.state.dataList.map((item) => {
      if (this.props.isCarList) {
        return this.renderCarItem(item)
      } else {
        return this.renderPersonItem(item)
      }
    })
  }

  renderPersonItem (item) {
    return (
      <div
        className="warning-list-item person-item"
        onClick={() => { this.props.onRowClick(item) }}
        onDoubleClick={() => { this.props.onRowDoubleClick(item) }}>
        <span className="text" style={{ fontSize: 16 }}>{item.name || '--'}</span>
        <span className="text">{item.sex === 0 ? '男' : '女'}</span>
        <span className="text">{item.nation || '--'}</span>
        <p style={{ lineHeight: 'normal' }}>{item.devName || '--'}</p>
      </div>
    )
  }

  renderCarItem (item) {
    return (
      <div
        className="warning-list-item car-item"
        onClick={() => { this.props.onRowClick(item) }}
        onDoubleClick={() => { this.props.onRowDoubleClick(item) }}>
        <span className="text" style={{ fontSize: 16, lineHeight: 'normal' }}>{item.idPlate || '--'}</span>
        <span className="text">{item.driverName || '--'}</span>
        <p>{item.devAddress || '--'}</p>
      </div>
    )
  }

  render () {
    return (
      <Scrollbars className="warning-list" style={{ backgroundColor: 'transparent' }}>
        {this.renderItemList()}
      </Scrollbars>
    )
  }
}

WarningList.defaultProps = {
  rootClassName: '',
  dataList: [],
  onRowClick: () => {},
  onRowDoubleClick: () => {},
  isCarList: false
}

export default WarningList
