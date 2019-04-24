import React, { PureComponent } from 'react'
import './collect-car-flow-chart.less'
import echarts from 'echarts'
import immutable from 'immutable'

class CollectCarFlowChart extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      alertCarList: props.alertCarList,
      carList: props.carList,
      flowCarList: props.flowCarList
    }
  }

  componentDidMount () {
    this.initChart()
  }

  initChart () {
    this.firstChart = echarts.init(document.getElementById('carChart1'))
    this.secondChart = echarts.init(document.getElementById('carChart2'))
    this.thirdChart = echarts.init(document.getElementById('carChart3'))
    this.firstChart.setOption(this.getDefaultConfig([120, 108], ['rgb(23,20,246)', 'rgb(246,244,42)']))
    this.secondChart.setOption(this.getDefaultConfig([96, 84], ['rgb(250,68,22)', 'rgb(50,171,250)']))
    this.thirdChart.setOption(this.getDefaultConfig([72, 60], ['rgb(249,18,69)', 'rgb(61,223,139)']))
  }

  getDefaultConfig (radius, colors) {
    return {
      title: {
        show: false
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
      color: colors,
      series: [
        {
          type: 'pie',
          hoverOffset: 0,
          radius: radius,
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
          data: [
            { value: 0, name: '' },
            { value: 0, name: '' }
          ]
        }
      ]
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!immutable.is(immutable.fromJS(nextProps.alertCarList), immutable.fromJS(prevState.alertCarList)) ||
      !immutable.is(immutable.fromJS(nextProps.carList), immutable.fromJS(prevState.carList)) ||
      !immutable.is(immutable.fromJS(nextProps.flowCarList), immutable.fromJS(prevState.flowCarList))) {
      return {
        alertCarList: nextProps.alertCarList,
        carList: nextProps.carList,
        flowCarList: nextProps.flowCarList
      }
    }
    return null
  }

  componentDidUpdate (prevProps, prevState) {
    const { alertCarList, carList, flowCarList } = this.state
    if (!immutable.is(immutable.fromJS(prevState.alertCarList), immutable.fromJS(alertCarList))) {
      const option = {
        series: [
          {
            type: 'pie',
            data: [
              { value: alertCarList[0], name: '本地预警车辆' },
              { value: alertCarList[1], name: '外地预警车辆' }
            ]
          }
        ]
      }
      this.thirdChart.setOption(option)
    }
    if (!immutable.is(immutable.fromJS(prevState.carList), immutable.fromJS(carList))) {
      const option = {
        series: [
          {
            type: 'pie',
            data: [
              { value: carList[0], name: '本地车辆' },
              { value: carList[1], name: '外地车辆' }
            ]
          }
        ]
      }
      this.secondChart.setOption(option)
    }
    if (!immutable.is(immutable.fromJS(prevState.flowCarList), immutable.fromJS(flowCarList))) {
      const option = {
        series: [
          {
            type: 'pie',
            data: [
              { value: flowCarList[0], name: '本地车辆流量' },
              { value: flowCarList[1], name: '外地车辆流量' }
            ]
          }
        ]
      }
      this.firstChart.setOption(option)
    }
  }

  render () {
    return (
      <div className="collect-car-flow-chart">
        <div id="carChart1" className="car-chart1"></div>
        <div id="carChart2" className="car-chart2"></div>
        <div id="carChart3" className="car-chart3"></div>
      </div>
    )
  }
}

CollectCarFlowChart.defaultProps = {
  alertCarList: [0, 0],
  carList: [0, 0],
  flowCarList: [0, 0]
}

export default CollectCarFlowChart
