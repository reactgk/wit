import React, { PureComponent } from 'react'
import immutable from 'immutable'
import echarts from 'echarts'
import 'echarts/theme/macarons'

class TableSummaryBar extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      title: props.title,
      xAxisDataList: props.xAxisDataList,
      yAxisDataList: props.yAxisDataList
    }
    this.resize = this.windowResize.bind(this)
  }

  componentDidMount () {
    this.initChart()
    window.addEventListener('resize', this.resize)
  }

  windowResize () {
    this.chart.resize()
  }

  initChart () {
    this.chart = echarts.init(document.getElementById(this.props.id), 'macarons')
    this.chart.setOption(this.getChartConfig())
  }

  getChartConfig () {
    return {
      tooltip: {
        trigger: 'axis'
      },
      title: {
        text: '',
        textStyle: {
          color: '#333',
          fontSize: 16
        },
        textAlign: 'center',
        padding: [10, 50, 50, 200]
      },
      legend: {
        show: false
      },
      grid: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 0,
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            color: '#67C4FF'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          type: 'bar',
          data: []
        }
      ]
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!immutable.is(immutable.fromJS(nextProps.xAxisDataList), immutable.fromJS(prevState.xAxisDataList)) ||
      !immutable.is(immutable.fromJS(nextProps.yAxisDataList), immutable.fromJS(prevState.yAxisDataList))) {
      return {
        xAxisDataList: nextProps.xAxisDataList,
        yAxisDataList: nextProps.yAxisDataList
      }
    }
    return null
  }

  componentDidUpdate (prevProps, prevState) {
    if (!immutable.is(immutable.fromJS(prevState.xAxisDataList), immutable.fromJS(this.state.xAxisDataList)) ||
      !immutable.is(immutable.fromJS(prevState.yAxisDataList), immutable.fromJS(this.state.yAxisDataList))) {
      const option = {
        title: {
          text: this.state.title
        },
        xAxis: [
          {
            type: 'category',
            data: this.state.xAxisDataList
          }
        ],
        series: [
          {
            type: 'bar',
            data: this.state.yAxisDataList
          }
        ]
      }
      this.chart.setOption(option)
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  render () {
    return (
      <div id={this.props.id} style={{ height: 240 }}>
      </div>
    )
  }
}

TableSummaryBar.defaultProps = {
  title: '',
  id: '',
  xAxisDataList: [],
  yAxisDataList: []
}

export default TableSummaryBar
