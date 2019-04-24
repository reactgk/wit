import React, { PureComponent } from 'react'
import immutable from 'immutable'
import echarts from 'echarts'

class PopulationInOutLine extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      xAxisDataList: props.xAxisDataList,
      personChartDataList: props.personChartDataList,
      carChartDataList: props.carChartDataList
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
    this.chart = echarts.init(document.getElementById('inOutLineFloatingCharts'))
    this.chart.setOption(this.getChartConfig())
  }

  getChartConfig () {
    return {
      tooltip: {
        trigger: 'axis'
      },
      title: {
        show: false
      },
      legend: {
        bottom: 0
      },
      grid: {
        left: 15,
        right: 20,
        top: 15,
        bottom: 28,
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisTick: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true
          }
        }
      ],
      series: [
        {
          type: 'bar',
          name: '人流量',
          barWidth: '20',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#86D9FD'
              }, {
                offset: 1, color: '#4EB2FA'
              }]
            }
          },
          data: []
        }, {
          type: 'bar',
          name: '车流量',
          barWidth: '20',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#C480F4'
              }, {
                offset: 1, color: '#9039CD'
              }]
            }
          },
          data: []
        }
      ]
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!immutable.is(immutable.fromJS(nextProps.xAxisDataList), immutable.fromJS(prevState.xAxisDataList)) ||
        !immutable.is(immutable.fromJS(nextProps.personChartDataList), immutable.fromJS(prevState.personChartDataList)) ||
        !immutable.is(immutable.fromJS(nextProps.carChartDataList), immutable.fromJS(prevState.carChartDataList))) {
      return {
        xAxisDataList: nextProps.xAxisDataList,
        personChartDataList: nextProps.personChartDataList,
        carChartDataList: nextProps.carChartDataList
      }
    }
    return null
  }

  componentDidUpdate (prevProps, prevState) {
    if (!immutable.is(immutable.fromJS(prevState.xAxisDataList), immutable.fromJS(this.state.xAxisDataList)) ||
        !immutable.is(immutable.fromJS(prevState.personChartDataList), immutable.fromJS(this.state.personChartDataList)) ||
        !immutable.is(immutable.fromJS(prevState.carChartDataList), immutable.fromJS(this.state.carChartDataList))) {
      const option = {
        xAxis: [
          {
            type: 'category',
            data: this.state.xAxisDataList
          }
        ],
        series: [
          {
            type: 'bar',
            data: this.state.personChartDataList
          }, {
            type: 'bar',
            data: this.state.carChartDataList
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
      <div id="inOutLineFloatingCharts" style={{ height: 180, top: '20px' }} >
      </div>
    )
  }
}

PopulationInOutLine.defaultProps = {
  xAxisDataList: [],
  personChartDataList: [],
  carChartDataList: []
}
export default PopulationInOutLine
