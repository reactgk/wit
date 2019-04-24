import React, { PureComponent } from 'react'
import { Table, Button } from 'antd'
import immutable from 'immutable'

import './iot-table.less'

class IotTable extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: this.performData(props.dataSource),
      totalPage: props.totalPage
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!immutable.is(immutable.fromJS(nextProps.dataSource), immutable.fromJS(prevState.dataSource)) ||
      nextProps.totalPage !== prevState.totalPage) {
      let dataSource = nextProps.dataSource
      dataSource.forEach((data, index) => {
        data.serialNumber = index + 1
      })
      return {
        dataSource: nextProps.dataSource,
        totalPage: nextProps.totalPage
      }
    }
    return null
  }

  performData (dataArray) {
    if (immutable.isImmutable(dataArray)) {
      dataArray = dataArray.toJS()
    }
    dataArray.forEach((data, index) => {
      data.serialNumber = index + 1
    })
    return dataArray
  }

  renderTopButtons () {
    const { topButtons } = this.props
    return topButtons.map((buttonItem, index) => {
      return (
        <Button
          key={index}
          type="primary"
          className="table-button"
          style={buttonItem.style}>
          {buttonItem.label}
        </Button>
      )
    })
  }

  showTotal (total) {
    return `共 ${total} 条`
  }

  render () {
    const { isShowPagination } = this.props
    return (
      <div className="iot-table">
        <Table
          rowKey={(record) => record.serialNumber}
          size={this.props.size}
          pagination={isShowPagination && {
            showQuickJumper: true,
            defaultCurrent: 1,
            total: this.state.totalPage,
            showTotal: this.showTotal
          }}
          dataSource={this.state.dataSource}
          columns={this.props.columns}
          onChange={this.props.onChange}
        />
      </div>
    )
  }
}

IotTable.defaultProps = {
  size: 'default',
  topButtons: [],
  columns: [],
  dataSource: [],
  totalPage: 10,
  isShowPagination: true,
  onChange: () => {}
}

export default IotTable
