import React, { PureComponent } from 'react'
import echarts from 'echarts'
import immutable from 'immutable'

class CollectPersonFlowChart extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      localPersonList: props.localPersonList,
      outsidePersonList: props.outsidePersonList,
      strangerPersonList: props.strangerPersonList
    }
  }

  componentDidMount () {
    this.chart = echarts.init(document.getElementById('collectPersonFlowChart'))
    this.chart.setOption(this.getChartConfig())
  }

  getChartConfig () {
    const { localPersonList, outsidePersonList, strangerPersonList } = this.state
    return {
      title: {
        show: false
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        align: 'left',
        data: ['常驻人口', '流动人口', '陌生人'],
        right: 0,
        itemWidth: 16,
        itemHeight: 12,
        padding: 4,
        textStyle: {
          color: '#9EF1FF'
        }
      },
      grid: {
        left: 10,
        right: 10,
        top: 70,
        bottom: 0,
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '人口流量', '人口数量', '人口预警'
          ],
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#5285DC'
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
            lineStyle: {
              color: ['#555555']
            }
          }
        }
      ],
      series: [
        {
          type: 'bar',
          name: '常驻人口',
          barWidth: 20,
          barGap: 0,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#9039CD'
              }, {
                offset: 1, color: '#C480F4'
              }]
            }
          },
          data: localPersonList
        }, {
          type: 'bar',
          name: '流动人口',
          barWidth: 20,
          barGap: 0,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#009BFF'
              }, {
                offset: 1, color: '#61C1FF'
              }]
            }
          },
          data: outsidePersonList
        }, {
          type: 'bar',
          name: '陌生人',
          barWidth: 20,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#FF9A45'
              }, {
                offset: 1, color: '#FFC08B'
              }]
            }
          },
          data: strangerPersonList
        }
      ]
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!immutable.is(immutable.fromJS(nextProps.localPersonList), immutable.fromJS(prevState.localPersonList)) ||
      !immutable.is(immutable.fromJS(nextProps.outsidePersonList), immutable.fromJS(prevState.outsidePersonList)) ||
      !immutable.is(immutable.fromJS(nextProps.strangerPersonList), immutable.fromJS(prevState.strangerPersonList))) {
      return {
        localPersonList: nextProps.localPersonList,
        outsidePersonList: nextProps.outsidePersonList,
        strangerPersonList: nextProps.strangerPersonList
      }
    }
    return null
  }

  componentDidUpdate (prevProps, prevState) {
    if (!immutable.is(immutable.fromJS(prevState.localPersonList), immutable.fromJS(this.state.localPersonList)) ||
      !immutable.is(immutable.fromJS(prevState.outsidePersonList), immutable.fromJS(this.state.outsidePersonList)) ||
      !immutable.is(immutable.fromJS(prevState.strangerPersonList), immutable.fromJS(this.state.strangerPersonList))) {
      const option = {
        series: [
          {
            type: 'bar',
            data: this.state.localPersonList
          }, {
            type: 'bar',
            data: this.state.outsidePersonList
          }, {
            type: 'bar',
            data: this.state.strangerPersonList
          }
        ]
      }
      this.chart.setOption(option)
    }
  }

  render () {
    return (
      <div id="collectPersonFlowChart"
        style={{ height: 300, width: '100%', marginTop: -54 }}>
      </div>
    )
  }
}

CollectPersonFlowChart.defaultProps = {
  localPersonList: [0, 0, 0],
  outsidePersonList: [0, 0, 0],
  strangerPersonList: [0, 0, 0]
}

export default CollectPersonFlowChart
