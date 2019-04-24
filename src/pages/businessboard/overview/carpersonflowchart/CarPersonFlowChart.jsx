import React, { PureComponent } from 'react'
import immutable from 'immutable'
import echarts from 'echarts'

class CarPersonFlowChart extends PureComponent {
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
    this.chart = echarts.init(document.getElementById('carPersonFlowChart'))
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
          },
          axisLabel: {
            color: '#67C4FF'
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
          name: '人流量',
          barWidth: '60%',
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
          type: 'line',
          name: '车流量',
          lineStyle: {
            color: '#FF9A45'
          },
          itemStyle: {
            color: '#FF9A45'
          },
          symbol: 'circle',
          symbolSize: 8,
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
            type: 'line',
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
      <div id="carPersonFlowChart" style={{ height: 160 }}>
      </div>
    )
  }
}

CarPersonFlowChart.defaultProps = {
  xAxisDataList: [],
  personChartDataList: [],
  carChartDataList: []
}

export default CarPersonFlowChart
