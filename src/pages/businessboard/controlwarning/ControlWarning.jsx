import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import immutable from 'immutable'
import {
  getDataList,
  getAlertRecords,
  getWeather
} from '../../../redux/actions/controlWarningAction.js'
import { ACTIVE_LINK_PERSON_CONTROL_WARNING, ACTIVE_LINK_CAR_CONTROL_WARNING } from '../../../redux/actions/manageAction'
import Header from '../header/Header'
import List from '../component/list/List'
import CarPersonControl from './carpersoncontrol/CarPersonControl'
import WarningItem from './wraningitem/WarningItem'
import WarningList from './warninglist/WarningList'
import Scrollbars from 'react-custom-scrollbars'

import mapStyleConfig from '../mapStyleConfig'

import './control-warning.less'

import defaultAvatar from '../../../assets/images/person-default-avater-blue.png'
import pointIcon from '../../../assets/images/icon-map-point.png'

class ControlWarning extends PureComponent {
  constructor (props) {
    super(props)
    this.mapLocation = this.location.bind(this)
  }

  componentDidMount () {
    const { getDataList, getAlertRecords } = this.props
    this.initMap()
    getDataList()
    getAlertRecords()
  }

  initMap () {
    if (window.BMap) {
      this.map = new window.BMap.Map('controlWarningMap')
      this.map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 13)
      this.map.addEventListener('tilesloaded', this.mapLocation)
      this.map.enableScrollWheelZoom(true)
    }
  }

  /**
   * 定位
   */
  location () {
    const { getWeather } = this.props
    this.map.setMapStyleV2({ styleJson: mapStyleConfig })
    const setCity = (result) => {
      let cityName = result.name
      getWeather(cityName)
      this.map.setCenter(cityName)
    }
    let city = new window.BMap.LocalCity()
    city.get(setCity)
  }

  componentDidUpdate (prevProps, prevState) {
    const { carWarningList, personWarningList } = this.props
    if ((!immutable.is(immutable.fromJS(carWarningList), immutable.fromJS(prevProps.carWarningList)) ||
      !immutable.is(immutable.fromJS(personWarningList), immutable.fromJS(prevProps.personWarningList))) && this.map) {
      this.map.clearOverlays()
      let points = []
      carWarningList.forEach(item => {
        points.push(new window.BMap.Point(item.devLongitude, item.devLatitude))
      })
      personWarningList.forEach(item => {
        points.push(new window.BMap.Point(item.devLongitude, item.devLatitude))
      })
      if (points.length > 0) {
        this.map.centerAndZoom(points[0], 13)
        let icon = new window.BMap.Icon(pointIcon, new window.BMap.Size(24, 32))
        points.forEach(point => {
          let marker = new window.BMap.Marker(point, { icon: icon })
          this.map.addOverlay(marker)
        })
      }
    }
  }

  componentWillUnmount () {
    if (this.map) {
      this.map.removeEventListener('tilesloaded', this.mapLocation)
    }
  }

  /**
   * 渲染人每一行数据
   * @param item
   * @returns {*}
   */
  renderPersonItem (item) {
    return (
      <Fragment>
        <div className="business-board-list-item-avatar">
          <img src={item.imageCard ? item.imageCard : defaultAvatar}/>
          <i className="left-top"/>
          <i className="left-bottom"/>
          <i className="right-top"/>
          <i className="right-bottom"/>
        </div>
        <div className="business-board-list-item-content-right">
          <div>
            <span className="label-key">姓名：</span>
            <span className="label-value">{item.name}</span>
          </div>
          <div>
            <span className="label-key">性别：</span>
            <span className="label-value">{item.sex || '--'}</span>
            <span className="label-key" style={{ marginLeft: 10 }}>族别：</span>
            <span className="label-value">{'--'}</span>
          </div>
          <div>
            <span className="label-key">身份证：</span>
            <span className="label-value">{item.idNumber}</span>
          </div>
          <div>
            <span className="label-key">户籍地：</span>
            <span className="label-value">{'--'}</span>
          </div>
        </div>
      </Fragment>
    )
  }

  /**
   * 渲染车每一行数据
   * @param item
   * @returns {*}
   */
  renderCarItem (item) {
    return (
      <Fragment>
        <span className="business-board-list-item-car-number">{item.licenseNumber}</span>
        <div className="business-board-list-item-content-right">
          <div>
            <span className="label-key">车主：</span>
            <span className="label-value">{item.driverName}</span>
          </div>
          <div>
            <span className="label-key">车籍地：</span>
            <span className="label-value">{item.driverName}</span>
          </div>
          <div>
            <span className="label-key">身份证：</span>
            <span className="label-value">{item.driverIDNumber}</span>
          </div>
        </div>
      </Fragment>
    )
  }

  render () {
    const { history, carList, personList,
      carWarningList, personWarningList,
      personControlTotal, personWarningTotal,
      carControlTotal, carWarningTotal,
      personSevenDaysWarningTotal, personCurrentDayWarningTotal,
      carSevenDaysWarningTotal, carCurrentDayWarningTotal,
      personSevenDaysPieDataList, personCurrentDayPieDataList,
      carSevenDaysPieDataList, carCurrentDayPieDataList,
      weather
    } = this.props

    console.log(carList, 999888)
    console.log(22222)

    return (
      <div className="business-board">
        <div id="controlWarningMap" className="business-board-map"/>
        <div className="business-board-content">
          <Header title="布控预警" weather={weather}/>
          <div className="control-warning-list-root">
            <Scrollbars>
              <p className="control-warning-list-title">布控人员</p>
              <List
                dataList={ personList }
                renderRow={this.renderPersonItem}/>
              <p className="control-warning-list-title" style={{ marginTop: 20 }}>布控车辆</p>
              <List
                dataList={ carList }
                renderRow={this.renderCarItem}/>
            </Scrollbars>
          </div>
          <CarPersonControl
            personControlTotal={personControlTotal}
            personWarningTotal={personWarningTotal}
            carControlTotal={carControlTotal}
            carWarningTotal={carWarningTotal}/>
          <div className="control-warning-right-person-list">
            <WarningList
              dataList={personWarningList}
              onRowDoubleClick={ (item) => { history.push({ pathname: '/manage', state: { activeLink: ACTIVE_LINK_PERSON_CONTROL_WARNING, category: '1' } }) } }/>
          </div>
          <div className="control-warning-right-car-list">
            <WarningList
              dataList={carWarningList}
              isCarList={true}
              onRowDoubleClick={ (item) => { history.push({ pathname: '/manage', state: { activeLink: ACTIVE_LINK_CAR_CONTROL_WARNING, category: '1' } }) } }/>
          </div>
          <div className="control-warning-bottom-data-root">
            <WarningItem
              id="sevenDaysPerson"
              title="七日预警人数"
              commonDataLabel={['常驻人员', '流动人员', '陌生人员']}
              totalData={personSevenDaysWarningTotal}
              pieDataList={personSevenDaysPieDataList}/>
            <WarningItem
              id="currentDayPerson"
              title="当日预警人数"
              commonDataLabel={['常驻人员', '流动人员', '陌生人员']}
              totalData={personCurrentDayWarningTotal}
              pieDataList={personCurrentDayPieDataList}/>
            <WarningItem
              id="sevenDaysCar"
              title="七日预警车辆"
              commonDataLabel={['外埠车辆', '流动车辆', '本地车辆']}
              totalData={carSevenDaysWarningTotal}
              pieDataList={carSevenDaysPieDataList}/>
            <WarningItem
              id="currentDayCar"
              title="当日预警车辆"
              commonDataLabel={['外埠车辆', '流动车辆', '本地车辆']}
              totalData={carCurrentDayWarningTotal}
              pieDataList={carCurrentDayPieDataList}/>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    carList: state.default.controlWarningReducer.get('carList'),
    personList: state.default.controlWarningReducer.get('personList'),
    personWarningList: state.default.controlWarningReducer.get('personWarningList'),
    carWarningList: state.default.controlWarningReducer.get('carWarningList'),
    personControlTotal: state.default.controlWarningReducer.get('personControlTotal'),
    personWarningTotal: state.default.controlWarningReducer.get('personWarningTotal'),
    carControlTotal: state.default.controlWarningReducer.get('carControlTotal'),
    carWarningTotal: state.default.controlWarningReducer.get('carWarningTotal'),
    personSevenDaysWarningTotal: state.default.controlWarningReducer.get('personSevenDaysWarningTotal'),
    personCurrentDayWarningTotal: state.default.controlWarningReducer.get('personCurrentDayWarningTotal'),
    carSevenDaysWarningTotal: state.default.controlWarningReducer.get('carSevenDaysWarningTotal'),
    carCurrentDayWarningTotal: state.default.controlWarningReducer.get('carCurrentDayWarningTotal'),
    personSevenDaysPieDataList: state.default.controlWarningReducer.get('personSevenDaysPieDataList'),
    personCurrentDayPieDataList: state.default.controlWarningReducer.get('personCurrentDayPieDataList'),
    carSevenDaysPieDataList: state.default.controlWarningReducer.get('carSevenDaysPieDataList'),
    carCurrentDayPieDataList: state.default.controlWarningReducer.get('carCurrentDayPieDataList'),
    weather: state.default.controlWarningReducer.get('weather')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getDataList, getAlertRecords, getWeather }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlWarning)
