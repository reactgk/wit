import React, { Fragment, PureComponent } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import immutable from 'immutable'
import {
  TAB_PERSON_CONTROL_WARNING,
  TAB_CAR_CONTROL_WARNING,
  setActiveTab,
  setSearchNumber,
  setStartDate,
  setEndDate,
  setStartTime,
  setEndTime,
  search,
  getDataList,
  getWeather,
  setCurrentPointInfo
} from '../../../redux/actions/trajectoryAnalysisAction.js'
import { ACTIVE_LINK_PERSON_CONTROL_WARNING, ACTIVE_LINK_CAR_CONTROL_WARNING } from '../../../redux/actions/manageAction'
import { Input, DatePicker, TimePicker, message } from 'antd'
import Scrollbars from 'react-custom-scrollbars'
import Header from '../header/Header'
import List from '../component/list/List'
import TimeSelect from './timeselect/TimeSelect'
import PointInfoModal from './pointinfomodal/PointInfoModal'

import mapStyleConfig from '../mapStyleConfig'

import './trajectory-analysis.less'

import calendar from '../../../assets/images/search-icon-calendar.png'
import clock from '../../../assets/images/search-icon-clock.png'
import car from '../../../assets/images/search-icon-car.png'
import person from '../../../assets/images/search-icon-person.png'
import defaultAvatar from '../../../assets/images/person-default-avater-blue.png'
// import pointIcon from '../../../assets/images/icon-map-point.png'

class TrajectoryAnalysis extends PureComponent {
  constructor (props) {
    super(props)
    this.mapLocation = this.location.bind(this)
  }

  componentDidMount () {
    this.initMap()
    this.props.getDataList()
  }

  initMap () {
    if (window.BMap) {
      this.map = new window.BMap.Map('trajectoryAnalysisMap')
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
      this.map.setCenter(cityName)
      getWeather('和田')
    }
    let city = new window.BMap.LocalCity()
    city.get(setCity)
  }

  componentDidUpdate (prevProps, prevState) {
    const { pathDataList } = this.props
    if (!immutable.is(immutable.fromJS(pathDataList), immutable.fromJS(prevProps.pathDataList)) && this.map) {
      this.drawMapPath(pathDataList)
    }
  }

  componentWillUnmount () {
    if (this.map) {
      this.map.removeEventListener('tilesloaded', this.mapLocation)
    }
  }

  /**
   * 在地图上绘制路径
   * @param pathDataList
   */
  drawMapPath (pathDataList) {
    this.map.clearOverlays()
    const points = []
    pathDataList.forEach(item => {
      points.push(new window.BMap.Point(item.devLongitude, item.devLatitude))
    })
    if (points.length > 0) {
      this.map.centerAndZoom(points[0], 13)
      const sy = new window.BMap.Symbol(1, {
        scale: 0.6,
        strokeColor: '#fff',
        strokeWeight: '2'
      })
      const icons = new window.BMap.IconSequence(sy, '5', '5', true)
      const curve = new window.BMapLib.CurveLine(points, {
        strokeColor: '#7DD2F9',
        strokeWeight: 6,
        strokeOpacity: 0.6,
        icons: [icons]
      })
      // this.map.addOverlay(polyLine)
      this.map.addOverlay(curve)
      // let icon = new window.BMap.Icon(pointIcon, new window.BMap.Size(20, 28))
      points.forEach((point, index) => {
        let marker = new window.BMap.Marker(point)
        this.map.addOverlay(marker)
        marker.addEventListener('click', (e) => {
          let currentPointInfo = pathDataList[index]
          this.props.setCurrentPointInfo(currentPointInfo || {})
        })
      })
    }
  }

  /**
   * 搜索
   */
  doSearch () {
    const { activeTab, searchNumber, startDate, endDate, startTime, endTime, search } = this.props
    console.log(searchNumber, 212)

    if (!searchNumber) {
      if (activeTab === TAB_PERSON_CONTROL_WARNING) {
        message.warning('请输入身份证号')
      } else {
        message.warning('请输入车牌号')
      }
      return null
    }
    if (!startDate) {
      message.warning('请输入开始日期')
      return null
    }
    if (!endDate) {
      message.warning('请输入结束日期')
      return null
    }
    if (!startTime) {
      message.warning('请输入开始时间')
      return null
    }
    if (!endTime) {
      message.warning('请输入结束时间')
      return null
    }
    search(activeTab, searchNumber, `${startDate} ${startTime}:00`, `${endDate} ${endTime}:00`)
  }

  /**
   * 时间选择器数据变化事件
   * @param time
   */
  onTimeSelectDataChange (time) {
    const { pathDataList } = this.props
    const timeAreaPathList = []
    pathDataList.forEach((path) => {
      let hour = moment(path.detectTime).get('hour')
      if (hour <= time[1] && hour >= time[0]) {
        timeAreaPathList.push(path)
      }
    })
    this.drawMapPath(timeAreaPathList)
  }

  /**
   * list 行双击事件
   */
  onListRowDoubleClick (isPerson) {
    const { history } = this.props
    const state = { activeLink: ACTIVE_LINK_CAR_CONTROL_WARNING, category: '0' }
    if (isPerson) {
      state.activeLink = ACTIVE_LINK_PERSON_CONTROL_WARNING
    }
    history.push({ pathname: '/manage', state })
  }

  renderItem (item, isPerson) {
    if (!isPerson) {
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

  render () {
    const { activeTab, setActiveTab,
      carList, personList, weather,
      searchNumber, startDate, endDate, startTime, endTime,
      setSearchNumber, setStartDate, setEndDate,
      setStartTime, setEndTime } = this.props
    const isPerson = activeTab === TAB_PERSON_CONTROL_WARNING
    const dataList = isPerson ? personList : carList
    const searchPlaceholder = isPerson ? '请输入身份证号' : '请输入车牌号码'
    const searchImage = isPerson ? person : car
    return (
      <div className="business-board">
        <div id="trajectoryAnalysisMap" className="business-board-map"/>
        <Header title="轨迹分析" weather={weather}/>
        <div className="business-board-content-list-root">
          <Fragment>
            <div className="trajectory-analysis-tab">
              <span
                className={activeTab === TAB_PERSON_CONTROL_WARNING ? 'tab tab-active' : 'tab'}
                onClick={() => { setActiveTab(TAB_PERSON_CONTROL_WARNING, activeTab !== TAB_PERSON_CONTROL_WARNING) }}>
                  布控人员
              </span>
            </div>
            <div className="trajectory-analysis-tab">
              <span
                className={activeTab === TAB_CAR_CONTROL_WARNING ? 'tab tab-active' : 'tab'}
                onClick={() => { setActiveTab(TAB_CAR_CONTROL_WARNING, activeTab !== TAB_CAR_CONTROL_WARNING) }}>
                  布控车辆
              </span>
            </div>
          </Fragment>
          <div className="trajectory-analysis-content">
            <Scrollbars style={{ height: document.body.clientHeight - 360 }} >
              <List
                dataList={ dataList }
                listItemClassName="business-board-car-list-item"
                onRowClick={(item) => { setSearchNumber(isPerson ? item.idNumber : item.licenseNumber) }}
                onRowDoubleClick={() => { this.onListRowDoubleClick(isPerson) }}
                renderRow={(item) => { return this.renderItem(item, isPerson) }}/>
            </Scrollbars>
            <div className="trajectory-analysis-search">
              <i className="left-top-mark"/>
              <div className="search-item">
                <span className="label">{isPerson ? '人' : '车'}</span>
                <div className="input-root">
                  <Input
                    value={searchNumber}
                    placeholder={searchPlaceholder}
                    onChange={(event) => { setSearchNumber(event.target.value) }}/>
                  <img
                    className="search-img"
                    src={searchImage}/>
                </div>
              </div>
              <div className="search-item">
                <span className="label">日期</span>
                <div className="input-root">
                  <DatePicker
                    placeholder="开始日期"
                    value={startDate ? moment(startDate) : ''}
                    onChange={(mo, date) => { setStartDate(date) }}/>
                  <span style={{ color: '#cccccc' }}>~</span>
                  <DatePicker
                    placeholder="结束日期"
                    value={endDate ? moment(endDate) : ''}
                    onChange={(mo, date) => { setEndDate(date) }}/>
                  <img className="search-img" src={calendar}/>
                </div>
              </div>
              <div className="search-item">
                <span className="label">时间</span>
                <div className="input-root">
                  <TimePicker
                    format="HH:mm"
                    value={startTime ? moment(startTime, 'HH:mm') : ''}
                    placeholder="开始时间"
                    onChange={(mo, time) => { setStartTime(time) }}/>
                  <span style={{ color: '#cccccc' }}>~</span>
                  <TimePicker
                    format="HH:mm"
                    value={endTime ? moment(endTime, 'HH:mm') : ''}
                    placeholder="结束时间"
                    onChange={(mo, time) => { setEndTime(time) }}/>
                  <img className="search-img" src={clock}/>
                </div>
              </div>
              <input
                type="button"
                value="查询"
                className="input-root button"
                onClick={() => { this.doSearch() }}/>
            </div>
          </div>
        </div>
        <TimeSelect
          onTimeDataChange={(value) => { this.onTimeSelectDataChange(value) }}/>
        <Route component={PointInfoModal}/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    activeTab: state.default.trajectoryAnalysisReducer.get('activeTab'),
    carList: state.default.trajectoryAnalysisReducer.get('carList'),
    personList: state.default.trajectoryAnalysisReducer.get('personList'),
    pathDataList: state.default.trajectoryAnalysisReducer.get('pathDataList'),
    searchNumber: state.default.trajectoryAnalysisReducer.get('searchNumber'),
    startDate: state.default.trajectoryAnalysisReducer.get('startDate'),
    endDate: state.default.trajectoryAnalysisReducer.get('endDate'),
    startTime: state.default.trajectoryAnalysisReducer.get('startTime'),
    endTime: state.default.trajectoryAnalysisReducer.get('endTime'),
    weather: state.default.trajectoryAnalysisReducer.get('weather')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setActiveTab,
      setSearchNumber,
      setStartDate,
      setEndDate,
      setStartTime,
      setEndTime,
      search,
      getDataList,
      getWeather,
      setCurrentPointInfo
    },
    dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TrajectoryAnalysis)
