import React, { PureComponent } from 'react'
import echarts from 'echarts'
import immutable from 'immutable'
import './base-collect-item.less'

class BaseCollectItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      totalData: props.totalData,
      totalLabel: props.totalLabel,
      chartDataList: props.chartDataList
    }
  }

  componentDidMount () {
    this.chart = echarts.init(document.getElementById(this.props.id))
    this.chart.setOption(this.getChartConfig())
  }

  getChartConfig () {
    return {
      title: {
        show: false
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        show: false
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      series: [
        {
          type: 'pie',
          hoverOffset: 0,
          radius: [90, 60],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: []
        }
      ]
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.totalData !== prevState.totalData ||
      nextProps.totalLabel !== prevState.totalLabel ||
      !immutable.is(immutable.fromJS(nextProps.chartDataList), immutable.fromJS(prevState.chartDataList))) {
      return {
        totalData: nextProps.totalData,
        totalLabel: nextProps.totalLabel,
        chartDataList: nextProps.chartDataList
      }
    }
    return null
  }

  componentDidUpdate (prevProps, prevState) {
    if (!immutable.is(immutable.fromJS(prevState.chartDataList), immutable.fromJS(this.state.chartDataList))) {
      const option = {
        series: [
          {
            type: 'pie',
            data: this.state.chartDataList
          }
        ]
      }
      this.chart.setOption(option)
    }
  }

  render () {
    return (
      <div className="collect-item">
        <div id={this.props.id} className="center-chart"/>
        <div className="middle-data-root">
          <p className="data">{this.state.totalData}</p>
          <p className="label">{this.state.totalLabel}</p>
        </div>
      </div>
    )
  }
}

BaseCollectItem.defaultProps = {
  id: '',
  totalLabel: '--',
  totalData: '--',
  chartDataList: []
}

export default BaseCollectItem
