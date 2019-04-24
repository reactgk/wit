import React, { PureComponent } from 'react'
import immutable from 'immutable'
import BeehiveItem from './beehiveitem/BeehiveItem'
import './beehive-chart.less'

class BeehiveChart extends PureComponent {
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

  render () {
    const { dataList } = this.state
    return (
      <div className="beehive-chart">
        <div className="first-row">
          <BeehiveItem data={dataList[0]}/>
          <BeehiveItem
            onHoverEvent={(data) => { this.props.itemHoverEvent(data) }}
            data={dataList[1]}
            style={{ marginRight: 4, marginLeft: 4 }}/>
          <BeehiveItem
            onHoverEvent={(data) => { this.props.itemHoverEvent(data) }}
            data={dataList[2]}/>
        </div>
        <div className="second-row">
          <BeehiveItem
            onHoverEvent={(data) => { this.props.itemHoverEvent(data) }}
            data={dataList[3]}/>
          <BeehiveItem
            onHoverEvent={(data) => { this.props.itemHoverEvent(data) }}
            data={dataList[4]}
            style={{ marginRight: 4, marginLeft: 4 }}/>
          <BeehiveItem
            onHoverEvent={(data) => { this.props.itemHoverEvent(data) }}
            data={dataList[5]}/>
          <BeehiveItem
            onHoverEvent={(data) => { this.props.itemHoverEvent(data) }}
            data={dataList[6]}
            style={{ marginRight: 4, marginLeft: 4 }}/>
          <BeehiveItem
            onHoverEvent={(data) => { this.props.itemHoverEvent(data) }}
            data={dataList[7]}
            style={{ marginRight: 4 }}/>
          <BeehiveItem
            onHoverEvent={(data) => { this.props.itemHoverEvent(data) }}
            data={dataList[8]}/>
        </div>
        <div className="third-row">
          <BeehiveItem
            onHoverEvent={(data) => { this.props.itemHoverEvent(data) }}
            data={dataList[9]}/>
          <BeehiveItem
            onHoverEvent={(data) => { this.props.itemHoverEvent(data) }}
            data={dataList[10]}
            style={{ marginRight: 4, marginLeft: 4 }}/>
          <BeehiveItem
            onHoverEvent={(data) => { this.props.itemHoverEvent(data) }}
            data={dataList[11]}/>
        </div>
      </div>
    )
  }
}

BeehiveChart.defaultProps = {
  dataList: [],
  itemHoverEvent: () => {}
}

export default BeehiveChart
