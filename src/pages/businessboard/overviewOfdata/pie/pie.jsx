import React, { PureComponent } from 'react'
import immutable from 'immutable'
import echarts from 'echarts'
import 'echarts/theme/macarons'

class TablePies extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      seriesDataList: props.seriesDataList
    }
    this.resize = this.windowResize.bind(this)
  }

  componentDidMount () {
    this.initChart()
    console.log('饼图')
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
        trigger: 'item'
      },
      color: [
        '#B8E986',
        '#F19622',
        '#F24056',
        '#68C5F0',
        '#88F419',
        '#FF0505',
        '#B5051B'
      ],
      series: [
        {
          name: '场所数量',
          type: 'pie',
          radius: ['20%', '70%'],
          // hoverAnimation: false,
          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            // { value: 335, name: '直接访问' },
            // { value: 310, name: '邮件营销' },
            // { value: 234, name: '联盟广告' },
            // { value: 135, name: '视频广告' },
            // { value: 1548, name: '搜索引擎' }
          ]
        }
      ]
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (
      !immutable.is(
        immutable.fromJS(nextProps.seriesDataList),
        immutable.fromJS(prevState.seriesDataList)
      )
    ) {
      return {
        seriesDataList: nextProps.seriesDataList
      }
    }
    return null
  }

  componentDidUpdate (prevProps, prevState) {
    // if (
    //   !immutable.is(
    //     immutable.fromJS(prevState.seriesDataList),
    //     immutable.fromJS(this.state.seriesDataList)
    //   )
    // ) {
    const option = {
      series: [
        {
          type: 'pie',
          data: this.state.seriesDataList
        }
      ]
    }
    this.chart.setOption(option)
    // }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  render () {
    return <div id={this.props.id}/>
  }
}

TablePies.defaultProps = {
  id: '',
  seriesDataList: []
}

export default TablePies
