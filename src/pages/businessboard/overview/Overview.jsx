import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  BASE_DATA_PLACE,
  BASE_DATA_HOUSE,
  BASE_DATA_POINT,
  FLOW_TAB_COLLECT_TODAY,
  FLOW_TAB_COLLECT_TOTAL,
  FLOW_TAB_CAR_PERSON_TODAY,
  FLOW_TAB_CAR_PERSON_SEVEN_DAYS,
  setBaseDataActive,
  setFlowCollectActiveTab,
  setFlowCarPersonActiveTab,
  getOverviewData,
  setCurrentBeehiveData
} from '../../../redux/actions/overviewAction'
import BaseCollectItem from './basecollectitem/BaseCollectItem'
import BaseDataItem from './basedataitem/BaseDataItem'
import OtherItem from './basedataotheritem/OtherItem'
import FlowDataItem from './flowdataitem/FlowDataItem'
import CarPersonFlowChart from './carpersonflowchart/CarPersonFlowChart'
import CollectPersonFlowChart from './collectpersonflowchart/CollectPersonFlowChart'
import CollectCarFlowChart from './collectcarflowchart/CollectCarFlowChart'
import BeehiveChart from './beehivechart/BeehiveChart'

import './overview.less'

import headerBg from '../../../assets/images/overview-header.png'
import point from '../../../assets/images/overview-point-icon.png'
import house from '../../../assets/images/overview-house-icon.png'
import place from '../../../assets/images/overview-place-icon.png'

const flowDataInDayXAxisDataList = [
  '00:00', '01:00', '02:00', '03:00',
  '04:00', '05:00', '06:00', '07:00',
  '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00', '23:00'
]

const flowDataHistoryXAxisDataList = [
  '周一', '周二', '周三', '周四', '周五', '周六', '周日'
]

class Overview extends PureComponent {
  componentDidMount () {
    this.props.getOverviewData()
  }

  render () {
    const { baseDataActive, flowCollectActiveTab, flowCarPersonActiveTab,
      placeTotal, placePieChartDataList,
      pointTotal, pointPieChartDataList,
      deviceTotal, devicePieChartDataList,
      personAscriptionTotal, personAscriptionPieChartDataList,
      personInDay, personTotal, strangerInDay, strangerTotal,
      motorInDay, motorTotal, nonMotorInDay, nonMotorTotal,
      carHistoryFlowDataList, carInDayFlowDataList, personHistoryFlowDataList, personInDayFlowDataList,
      beehiveDataList, currentBeehiveData,
      localPersonList, outsidePersonList, strangerPersonList,
      alertCarList, carList, flowCarList,
      setBaseDataActive, setFlowCollectActiveTab, setFlowCarPersonActiveTab, setCurrentBeehiveData } = this.props
    const baseDataChartCenterLabel = baseDataActive === BASE_DATA_PLACE ? '场所数据汇总' : baseDataActive === BASE_DATA_HOUSE ? '房屋数据汇总' : '点位数据汇总'
    const baseDataTotal = baseDataActive === BASE_DATA_PLACE ? placeTotal : baseDataActive === BASE_DATA_HOUSE ? 0 : pointTotal
    const basePieChartDataList = baseDataActive === BASE_DATA_PLACE ? placePieChartDataList : baseDataActive === BASE_DATA_HOUSE ? [] : pointPieChartDataList
    const isInDayFlow = flowCollectActiveTab === FLOW_TAB_COLLECT_TOTAL
    const isCarPersonInDayFlow = flowCarPersonActiveTab === FLOW_TAB_CAR_PERSON_TODAY
    return (
      <div className="overview">
        <header className="header">
          <img className="header-img" src={headerBg}/>
          <p className="header-title">综合数据概览</p>
        </header>
        <div className="overview-base-data-root">
          <p className="content-data-title">基础数据汇总</p>
          <BaseCollectItem
            id="baseChart"
            totalData={baseDataTotal}
            totalLabel={baseDataChartCenterLabel}
            chartDataList={basePieChartDataList}/>
          <BaseDataItem
            onClick={() => { setBaseDataActive(BASE_DATA_PLACE) }}
            icon={place}
            data={placeTotal}
            label="场所数"/>
          <BaseDataItem
            style={{ marginLeft: 18, marginRight: 18 }}
            icon={house}
            data={'--'}
            label="房屋数"/>
          <BaseDataItem
            onClick={() => { setBaseDataActive(BASE_DATA_POINT) }}
            icon={point}
            data={pointTotal}
            label="点位数"/>
          <div className="overview-other-data-root">
            <div className="other-data-row">
              <OtherItem
                id="otherChart1"
                style={{ marginRight: 20 }}
                totalData={placeTotal}
                label="场所"
                chartDataList={placePieChartDataList}/>
              <OtherItem
                id="otherChart2"
                totalData={pointTotal}
                label="点位"
                chartDataList={pointPieChartDataList}/>
            </div>
            <div className="other-data-row">
              <OtherItem
                id="otherChart3"
                style={{ marginRight: 20 }}
                totalData={deviceTotal}
                label="设备"
                chartDataList={devicePieChartDataList}/>
              <OtherItem
                id="otherChart4"
                totalData={personAscriptionTotal}
                label="人员属地"
                chartDataList={personAscriptionPieChartDataList}/>
            </div>
          </div>
          <BaseCollectItem
            id="deviceChart"
            totalData={deviceTotal}
            totalLabel="设备数据汇总"
            chartDataList={devicePieChartDataList}/>
        </div>
        <div className="overview-flow-data-root">
          <div style={{ paddingLeft: 20, paddingRight: 20 }}>
            <span className="content-data-title">流量数据汇总</span>
            <span
              className={ flowCollectActiveTab === FLOW_TAB_COLLECT_TOTAL ? 'flow-data-tab flow-data-tab-active' : 'flow-data-tab' }
              onClick={() => { setFlowCollectActiveTab(FLOW_TAB_COLLECT_TOTAL) }}
              style={{ marginLeft: 20 }}>
              累计
            </span>
            <span
              onClick={() => { setFlowCollectActiveTab(FLOW_TAB_COLLECT_TODAY) }}
              className={ flowCollectActiveTab === FLOW_TAB_COLLECT_TODAY ? 'flow-data-tab flow-data-tab-active' : 'flow-data-tab' }>
              今日
            </span>
          </div>
          <div className="flow-data-top">
            <FlowDataItem
              style={{ marginRight: 10 }}
              data={isInDayFlow ? personInDay : personTotal}
              label="今日人流总量"/>
            <FlowDataItem
              style={{ marginRight: 10 }}
              data={isInDayFlow ? strangerInDay : strangerTotal}
              label="今日陌生人流总量"/>
            <FlowDataItem
              style={{ marginRight: 10 }}
              data={isInDayFlow ? motorInDay : motorTotal}
              label="今日车流总量"/>
            <FlowDataItem
              data={isInDayFlow ? nonMotorInDay : nonMotorTotal}
              label="今日非机动车流总量"/>
          </div>
          <div className="flow-data-middle">
            <div className="left-root">
              <p style={{ marginLeft: 24, marginTop: 4 }}>人流量</p>
              <p style={{ marginLeft: 24 }} className="value">{currentBeehiveData['人流量'] || 0}</p>
              <p style={{ marginLeft: 4, marginTop: 10 }}>常住人数</p>
              <p style={{ marginLeft: 4 }} className="value">{currentBeehiveData['常住人口'] || 0}</p>
              <p style={{ marginLeft: 20, marginTop: 10 }}>陌生人数</p>
              <p style={{ marginLeft: 20 }} className="value">{currentBeehiveData['陌生人数'] || 0}</p>
            </div>
            <BeehiveChart
              itemHoverEvent={(data) => { setCurrentBeehiveData(data) }}
              dataList={beehiveDataList}/>
            <div className="right-root">
              <p style={{ marginRight: 24, marginTop: 4 }}>车流量</p>
              <p style={{ marginRight: 24 }} className="value">{currentBeehiveData['车流量'] || 0}</p>
              <p style={{ marginRight: 4, marginTop: 10 }}>车辆数</p>
              <p style={{ marginRight: 4 }} className="value">{currentBeehiveData['车辆数'] || 0}</p>
              <p style={{ marginLeft: 30, marginTop: 10 }}>外地车辆数</p>
              <p style={{ marginLeft: 30 }} className="value">{currentBeehiveData['外地车辆数'] || 0}</p>
            </div>
            <p className="point-value">{`点位数 ${currentBeehiveData['点位数'] || 0}`}</p>
          </div>

          <div className="flow-data-bottom">
            <div style={{ marginBottom: 40 }}>
              <span className="overview-chart-title">人/车流量</span>
              <span
                className={ flowCarPersonActiveTab === FLOW_TAB_CAR_PERSON_SEVEN_DAYS ? 'flow-data-tab flow-data-tab-active' : 'flow-data-tab' }
                onClick={() => { setFlowCarPersonActiveTab(FLOW_TAB_CAR_PERSON_SEVEN_DAYS) }}
                style={{ marginLeft: 20 }}>
                七日
              </span>
              <span
                className={ flowCarPersonActiveTab === FLOW_TAB_CAR_PERSON_TODAY ? 'flow-data-tab flow-data-tab-active' : 'flow-data-tab' }
                onClick={() => { setFlowCarPersonActiveTab(FLOW_TAB_CAR_PERSON_TODAY) }}>
                今日
              </span>
            </div>
            <CarPersonFlowChart
              xAxisDataList={isCarPersonInDayFlow ? flowDataInDayXAxisDataList : flowDataHistoryXAxisDataList}
              personChartDataList={isCarPersonInDayFlow ? personInDayFlowDataList : personHistoryFlowDataList}
              carChartDataList={isCarPersonInDayFlow ? carInDayFlowDataList : carHistoryFlowDataList}/>
          </div>
        </div>
        <div className="overview-collect-data-root">
          <p className="content-data-title">数据汇总</p>
          <div className="overview-collect-content">
            <div style={{ marginBottom: 30 }}>
              <span className="overview-chart-title">人口流量</span>
            </div>
            <CollectPersonFlowChart
              localPersonList={localPersonList}
              outsidePersonList={outsidePersonList}
              strangerPersonList={strangerPersonList}
            />
            <div style={{ marginBottom: 16, marginTop: 40 }}>
              <span className="overview-chart-title">车流量</span>
            </div>
            <div className="overview-collect-car-flow-legend-container">
              <div className="overview-collect-car-flow-legend-item">
                <p className="overview-collect-car-flow-legend">
                  <i
                    className="overview-collect-car-flow-legend-icon"
                    style={{ backgroundColor: 'rgb(246,244,42)' }}/>
                  外地车流量
                </p>
                <p className="overview-collect-car-flow-legend">
                  <i
                    className="overview-collect-car-flow-legend-icon"
                    style={{ backgroundColor: 'rgb(23,20,246)' }}/>
                  本地车流量
                </p>
              </div>
              <div
                className="overview-collect-car-flow-legend-item"
                style={{ marginLeft: 20, marginRight: 20 }}>
                <p className="overview-collect-car-flow-legend">
                  <i
                    className="overview-collect-car-flow-legend-icon"
                    style={{ backgroundColor: 'rgb(50,171,250)' }}/>
                  外地车数量
                </p>
                <p className="overview-collect-car-flow-legend">
                  <i
                    className="overview-collect-car-flow-legend-icon"
                    style={{ backgroundColor: 'rgb(250,68,22)' }}/>
                  本地车数量
                </p>
              </div>
              <div className="overview-collect-car-flow-legend-item">
                <p className="overview-collect-car-flow-legend">
                  <i
                    className="overview-collect-car-flow-legend-icon"
                    style={{ backgroundColor: 'rgb(61,223,139)' }}/>
                  外地车预警
                </p>
                <p className="overview-collect-car-flow-legend">
                  <i
                    className="overview-collect-car-flow-legend-icon"
                    style={{ backgroundColor: 'rgb(249,18,69)' }}/>
                  本地车预警
                </p>
              </div>
            </div>
            <CollectCarFlowChart
              alertCarList={alertCarList}
              carList={carList}
              flowCarList={flowCarList}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    dataList: state.default.overviewReducer.get('dataList'),
    baseDataActive: state.default.overviewReducer.get('baseDataActive'),
    flowCollectActiveTab: state.default.overviewReducer.get('flowCollectActiveTab'),
    flowCarPersonActiveTab: state.default.overviewReducer.get('flowCarPersonActiveTab'),
    placeTotal: state.default.overviewReducer.get('placeTotal'),
    placePieChartDataList: state.default.overviewReducer.get('placePieChartDataList'),
    pointTotal: state.default.overviewReducer.get('pointTotal'),
    pointPieChartDataList: state.default.overviewReducer.get('pointPieChartDataList'),
    deviceTotal: state.default.overviewReducer.get('deviceTotal'),
    devicePieChartDataList: state.default.overviewReducer.get('devicePieChartDataList'),
    personAscriptionTotal: state.default.overviewReducer.get('personAscriptionTotal'),
    personAscriptionPieChartDataList: state.default.overviewReducer.get('personAscriptionPieChartDataList'),
    personInDay: state.default.overviewReducer.get('personInDay'),
    personTotal: state.default.overviewReducer.get('personTotal'),
    strangerInDay: state.default.overviewReducer.get('strangerInDay'),
    strangerTotal: state.default.overviewReducer.get('strangerTotal'),
    motorInDay: state.default.overviewReducer.get('motorInDay'),
    motorTotal: state.default.overviewReducer.get('motorTotal'),
    nonMotorInDay: state.default.overviewReducer.get('nonMotorInDay'),
    nonMotorTotal: state.default.overviewReducer.get('nonMotorTotal'),
    carHistoryFlowDataList: state.default.overviewReducer.get('carHistoryFlowDataList'),
    carInDayFlowDataList: state.default.overviewReducer.get('carInDayFlowDataList'),
    personHistoryFlowDataList: state.default.overviewReducer.get('personHistoryFlowDataList'),
    personInDayFlowDataList: state.default.overviewReducer.get('personInDayFlowDataList'),
    beehiveDataList: state.default.overviewReducer.get('beehiveDataList'),
    currentBeehiveData: state.default.overviewReducer.get('currentBeehiveData'),
    localPersonList: state.default.overviewReducer.get('localPersonList'),
    outsidePersonList: state.default.overviewReducer.get('outsidePersonList'),
    strangerPersonList: state.default.overviewReducer.get('strangerPersonList'),
    alertCarList: state.default.overviewReducer.get('alertCarList'),
    carList: state.default.overviewReducer.get('carList'),
    flowCarList: state.default.overviewReducer.get('flowCarList')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ setBaseDataActive, setFlowCollectActiveTab, setFlowCarPersonActiveTab, getOverviewData, setCurrentBeehiveData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
