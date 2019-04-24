import React, { PureComponent } from 'react'
import immutable from 'immutable'
import echarts from 'echarts'
import './other-item.less'

class OtherItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      totalData: props.totalData,
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
          radius: [67, 47],
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
      !immutable.is(immutable.fromJS(nextProps.chartDataList), immutable.fromJS(prevState.chartDataList))) {
      return {
        totalData: nextProps.totalData,
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
      <div className="other-item" style={this.props.style}>
        <div id={this.props.id} className="chart"/>
        <div className="center-data-root">
          <p className="data">{this.state.totalData}</p>
          <p className="label">{this.props.label}</p>
        </div>
      </div>
    )
  }
}

OtherItem.defaultProps = {
  id: '',
  style: {},
  totalData: '--',
  chartDataList: [],
  label: ''
}

export default OtherItem
