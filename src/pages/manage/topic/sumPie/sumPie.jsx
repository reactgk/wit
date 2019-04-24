/**
 * 人口总量饼状图
*/
import React, { PureComponent } from 'react'
import echarts from 'echarts'
import immutable from 'immutable'
import './sumPie.less'

class PopulationSumItem extends PureComponent {
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
      // color: function (d) { return '#' + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16) },
      legend: {
        // data: ['流入量', '流出量', '平均温度']
        orient: 'vertical',
        top: '40%',
        right: '-1%'
      },
      series: [
        {
          type: 'pie',
          hoverOffset: 0,
          radius: [75, 55],
          hoverAnimation: false,
          data: [],
          itemStyle: {
            normal: {
              label: { // 此处为指示线文字
                show: true,
                position: 'inner', // 标签的位置
                textStyle: {
                  fontWeight: 200,
                  fontSize: 10, // 文字的字体大小
                  color: '#888',
                  left: 20
                },
                formatter: '{d}%'
              },
              labelLine: { // 指示线状态
                show: true,
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            }
          }
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
      <div className="population-gross-item-topic">
        <div id={this.props.id} className="center-chart"/>
        <div className="population-gross-data-root">
          <p className="data">{this.state.totalData}</p>
          <p className="label">{this.state.totalLabel}</p>
        </div>
      </div>
    )
  }
}

PopulationSumItem.defaultProps = {
  id: '',
  totalLabel: '--',
  totalData: '--',
  chartDataList: []
}

export default PopulationSumItem
