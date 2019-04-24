import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route } from 'react-router-dom'
import { Select } from 'antd'
import PointPersonTable from './component/PointPersonTable'
import PointCarTable from './component/PointCarTable'
import Cascade from '../component/cascade/Cascade'
import {
  getRealTimeRecord,
  setCascadeData,
  placeSelectChange,
  pointSelectChange
} from '../../../redux/actions/pointRealTimeDataManageAction.js'
import './point-real-time-data.less'

const Option = Select.Option

class PointRealTimeDataManage extends PureComponent {
  /**
   * 获取数据列表
   */
  getDataList (provinceValue, cityValue, areaValue, streetValue, communityValue, placeValue, pointValue) {
    const { getRealTimeRecord } = this.props
    const requestEndCallback = () => {
      this.timer = setTimeout(() => {
        if (!this.isDestory) {
          if (
            provinceValue === this.props.provinceValue &&
            cityValue === this.props.cityValue &&
            areaValue === this.props.areaValue &&
            streetValue === this.props.streetValue &&
            communityValue === this.props.communityValue &&
            placeValue === this.props.placeValue &&
            pointValue === this.props.pointValue) {
            this.getDataList(
              this.props.provinceValue, this.props.cityValue,
              this.props.areaValue, this.props.streetValue,
              this.props.communityValue, this.props.placeValue, this.props.pointValue)
          }
        }
      }, 1000)
    }
    getRealTimeRecord(provinceValue, cityValue, areaValue, streetValue, communityValue, placeValue, pointValue, requestEndCallback)
  }

  componentDidUpdate (prevProps, prevState) {
    const { provinceValue, cityValue, areaValue, streetValue, communityValue, placeValue, pointValue } = this.props
    if (
      provinceValue !== prevProps.provinceValue ||
      cityValue !== prevProps.cityValue ||
      areaValue !== prevProps.areaValue ||
      streetValue !== prevProps.streetValue ||
      communityValue !== prevProps.communityValue ||
      placeValue !== prevProps.placeValue ||
      pointValue !== prevProps.pointValue) {
      this.getDataList(provinceValue, cityValue, areaValue, streetValue, communityValue, placeValue, pointValue)
    }
  }

  componentWillUnmount () {
    this.isDestory = true
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  render () {
    const { placeList, pointList,
      placeValue, pointValue,
      placeSelectChange, pointSelectChange, setCascadeData } = this.props
    return (
      <div>
        <div className="point-real-time-data-form">
          <Cascade onDataChange={(data) => { setCascadeData(data) }}/>
          <Select
            value={placeValue}
            style={{ width: 260, marginRight: 20, marginTop: 10 }}
            onChange={(value) => { placeSelectChange(value) }}>
            {
              placeList.map(item =>
                <Option key={item.departCode} value={item.departCode}>{item.departName}</Option>
              )
            }
          </Select>
          <Select
            value={pointValue}
            style={{ width: 220, marginTop: 10 }}
            onChange={(value) => { pointSelectChange(value) }}>
            {
              pointList.map(item =>
                <Option key={item.departCode} value={item.departCode}>{item.departName}</Option>
              )
            }
          </Select>
        </div>
        <Route component={ PointPersonTable }/>
        <Route component={ PointCarTable }/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    placeList: state.default.pointRealTimeDataReducer.get('placeList'),
    communityList: state.default.pointRealTimeDataReducer.get('communityList'),
    streetList: state.default.pointRealTimeDataReducer.get('streetList'),
    pointList: state.default.pointRealTimeDataReducer.get('pointList'),
    provinceValue: state.default.pointRealTimeDataReducer.get('provinceValue'),
    cityValue: state.default.pointRealTimeDataReducer.get('cityValue'),
    areaValue: state.default.pointRealTimeDataReducer.get('areaValue'),
    streetValue: state.default.pointRealTimeDataReducer.get('streetValue'),
    communityValue: state.default.pointRealTimeDataReducer.get('communityValue'),
    placeValue: state.default.pointRealTimeDataReducer.get('placeValue'),
    pointValue: state.default.pointRealTimeDataReducer.get('pointValue')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getRealTimeRecord, setCascadeData, placeSelectChange, pointSelectChange }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PointRealTimeDataManage)
