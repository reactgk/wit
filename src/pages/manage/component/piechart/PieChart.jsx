import React, { PureComponent } from 'react'
import immutable from 'immutable'
import echarts from 'echarts'
import 'echarts/theme/macarons'

class TableSummaryPie extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      title: props.title,
      legendDataList: props.legendDataList,
      seriesDataList: props.seriesDataList
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
        trigger: 'item'
      },
      title: {
        text: '',
        textStyle: {
          color: '#333',
          fontSize: 16
        },
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: []
      },
      series: [
        {
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: []
        }
      ]
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!immutable.is(immutable.fromJS(nextProps.legendDataList), immutable.fromJS(prevState.legendDataList)) ||
      !immutable.is(immutable.fromJS(nextProps.seriesDataList), immutable.fromJS(prevState.seriesDataList))) {
      return {
        legendDataList: nextProps.legendDataList,
        seriesDataList: nextProps.seriesDataList
      }
    }
    return null
  }

  componentDidUpdate (prevProps, prevState) {
    if (!immutable.is(immutable.fromJS(prevState.legendDataList), immutable.fromJS(this.state.legendDataList)) ||
      !immutable.is(immutable.fromJS(prevState.seriesDataList), immutable.fromJS(this.state.seriesDataList))) {
      const option = {
        title: {
          text: this.state.title
        },
        legend: {
          data: this.state.legendDataList
        },
        series: [
          {
            type: 'pie',
            data: this.state.seriesDataList
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

TableSummaryPie.defaultProps = {
  title: '',
  id: '',
  legendDataList: [],
  seriesDataList: []
}

export default TableSummaryPie
