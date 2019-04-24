import React, { PureComponent } from 'react'
import { Slider } from 'antd'

import './time-select.less'

class TimeSelect extends PureComponent {
  constructor (props) {
    super(props)
    this.onSliderChange = this.onChange.bind(this)
    this.state = {
      sliderValue: [0, 24]
    }
  }

  onChange (value) {
    this.props.onTimeDataChange(value)
    this.setState({ sliderValue: value })
  }

  /**
   * 渲染时间文字
   * @returns {Array}
   */
  renderTimeText () {
    const { sliderValue } = this.state
    let doms = []
    for (let i = 0; i < 25; i++) {
      doms.push(
        <span
          className={`time-select-text ${i >= sliderValue[0] && i <= sliderValue[1] ? 'time-select-text-active' : ''}`}>
          {i}
        </span>
      )
    }
    return doms
  }

  renderTimelineMark () {
    let doms = []
    for (let i = 0; i < 25; i++) {
      doms.push(
        <span className="time-select-line-mark">
          <i className="mark-line"/>
        </span>
      )
    }
    return doms
  }

  render () {
    return (
      <div className="time-select">
        <div className="time-select-text-container">
          {this.renderTimeText()}
        </div>
        <div className="time-select-line-container">
          <div className="time-select-line-slider-container">
            <Slider
              range
              max={24}
              value={this.state.sliderValue}
              tooltipVisible={false}
              onChange={this.onSliderChange}
            />
          </div>
          <p className="time-select-line"/>
          {this.renderTimelineMark()}
        </div>
      </div>
    )
  }
}

TimeSelect.defaultProps = {
  onTimeDataChange: () => {}
}

export default TimeSelect
