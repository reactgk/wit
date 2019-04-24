import React, { PureComponent } from 'react'
import echarts from 'echarts'
import immutable from 'immutable'

import './warning-item.less'

class WarningItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      totalData: props.totalData,
      pieDataList: props.pieDataList
    }
  }

  componentDidMount () {
    this.initChart()
    this.setChartOption(this.state.totalData, this.state.pieDataList)
  }

  initChart () {
    const { id } = this.props
    this.firstChart = echarts.init(document.getElementById(`${id}FirstChart`))
    this.secondChart = echarts.init(document.getElementById(`${id}SecondChart`))
    this.thirdChart = echarts.init(document.getElementById(`${id}ThirdChart`))
    this.firstChart.setOption(this.getDefaultConfig([54, 60]))
    this.secondChart.setOption(this.getDefaultConfig([42, 48]))
    this.thirdChart.setOption(this.getDefaultConfig([30, 36]))
  }

  getDefaultConfig (radius) {
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
          data: []
        }
      ]
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.totalData !== prevState.totalData ||
      !immutable.is(immutable.fromJS(nextProps.pieDataList), immutable.fromJS(prevState.pieDataList))) {
      return {
        totalData: nextProps.totalData,
        pieDataList: nextProps.pieDataList
      }
    }
    return null
  }

  /**
   * 设置图表数据
   * @param total
   * @param pieDataList
   */
  setChartOption (total, pieDataList) {
    if (pieDataList.length === 3) {
      const pieOptionList = []
      pieDataList.forEach((value) => {
        let otherValue = total - value
        otherValue = otherValue < 0 ? 0 : otherValue
        pieOptionList.push(
          {
            series: [
              {
                type: 'pie',
                data: [
                  {
                    value: value,
                    itemStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: '#2980cd' // 0% 处的颜色
                        }, {
                          offset: 1, color: '#00ffcd' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                      }
                    }
                  },
                  { value: otherValue, itemStyle: { color: 'rgba(0, 0, 0, 0)' } }
                ]
              }
            ]
          }
        )
      })
      this.firstChart.setOption(pieOptionList[0])
      this.secondChart.setOption(pieOptionList[1])
      this.thirdChart.setOption(pieOptionList[2])
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (!immutable.is(immutable.fromJS(prevState.pieDataList), immutable.fromJS(this.state.pieDataList))) {
      this.setChartOption(this.state.totalData, this.state.pieDataList)
    }
  }

  render () {
    const { id, title, commonDataLabel } = this.props
    const { totalData, pieDataList } = this.state
    return (
      <div className="warning-item">
        <p className="title">{title}</p>
        <div className="data-toot">
          <span className="center-text">{totalData}</span>
          <div id={`${id}FirstChart`} className="first-chart"/>
          <div id={`${id}SecondChart`} className="second-chart"/>
          <div id={`${id}ThirdChart`} className="third-chart"/>
          <div className="common-data-root">
            <p className="item">{`${pieDataList[0] || 0} ${commonDataLabel[0]}`}</p>
            <p className="item" style={{ marginTop: -3 }}>{`${pieDataList[1] || 0} ${commonDataLabel[1]}`}</p>
            <p className="item" style={{ marginTop: -3 }}>{`${pieDataList[2] || 0} ${commonDataLabel[2]}`}</p>
          </div>
        </div>
      </div>
    )
  }
}

WarningItem.defaultProps = {
  id: '',
  title: '',
  commonDataLabel: [],
  totalData: 0,
  pieDataList: []
}

export default WarningItem
