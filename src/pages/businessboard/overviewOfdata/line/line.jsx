import React, { PureComponent } from 'react'
import immutable from 'immutable'
import echarts from 'echarts'
import 'echarts/theme/macarons'

class PieCircles extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      preDataList: props.preDataList,
      carDataList: props.carDataList,
      color: props.color
    }
    this.resize = this.windowResize.bind(this)
  }

  componentDidMount () {
    this.initChart()
    console.log('折线图')
    window.addEventListener('resize', this.resize)
  }

  windowResize () {
    this.chart.resize()
  }

  initChart () {
    this.chart = echarts.init(
      document.getElementById(this.props.id),
      'macarons'
    )
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
      // legend: {
      //   bottom: 0
      // },
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
          data: ['das', 'opo', 'das'],
          axisLine: {
            show: false
          },
          axisTick: {
            show: true
          },
          splitLine: {
            show: false
          },
          boundaryGap: false
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
    if (
      !immutable.is(
        immutable.fromJS(nextProps.preDataList),
        immutable.fromJS(prevState.carDataList),
        immutable.fromJS(prevState.color)
      )
    ) {
      return {
        preDataList: nextProps.preDataList,
        color: nextProps.color,
        carDataList: nextProps.carDataList
      }
    }
    return null
  }

  componentDidUpdate (prevProps, prevState) {
    const option = {
      xAxis: [{
        data: this.state.color
      }],
      series: [
        {
          type: 'line',
          name: '人行净流量',
          data: this.state.preDataList
        },
        {
          type: 'line',
          name: '车行净流量',
          data: this.state.carDataList
        }
      ]
    }
    this.chart.setOption(option)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  render () {
    return <div id={this.props.id} style={{ height: 150 }} />
  }
}

PieCircles.defaultProps = {
  id: '',
  preDataList: [],
  carDataList: [],
  color: []
}

export default PieCircles
