import { OVERVIEW_ACTION, BASE_DATA_PLACE, FLOW_TAB_COLLECT_TODAY, FLOW_TAB_CAR_PERSON_TODAY } from '../actions/overviewAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  // 基础信息选中
  baseDataActive: BASE_DATA_PLACE,
  // 流量汇总tab选中页
  flowCollectActiveTab: FLOW_TAB_COLLECT_TODAY,
  // 人/车流量tab选中页
  flowCarPersonActiveTab: FLOW_TAB_CAR_PERSON_TODAY,
  // 产所数总量
  placeTotal: 0,
  // 场所饼图数据
  placePieChartDataList: [],
  // 点位数总量
  pointTotal: 0,
  // 点位饼图数据
  pointPieChartDataList: [],
  // 设备数总量
  deviceTotal: 0,
  // 设备饼图数据
  devicePieChartDataList: [],
  // 人员归属总量
  personAscriptionTotal: 0,
  // 人员归属饼图数据
  personAscriptionPieChartDataList: [],
  // 当日人流量
  personInDay: 0,
  // 累计人流量
  personTotal: 0,
  // 当日陌生人流量
  strangerInDay: 0,
  // 累计陌生人流量
  strangerTotal: 0,
  // 当日车流量
  motorInDay: 0,
  // 累计车流量
  motorTotal: 0,
  // 当日非机动车流量
  nonMotorInDay: 0,
  // 累计非机动车流量
  nonMotorTotal: 0,
  // 车辆历史流量数据
  carHistoryFlowDataList: [],
  // 车辆当日流量数据
  carInDayFlowDataList: [],
  // 人员历史流量数据
  personHistoryFlowDataList: [],
  // 人员当日流量数据
  personInDayFlowDataList: [],
  // 蜂窝图数据
  beehiveDataList: [],
  // 当前蜂窝数据
  currentBeehiveData: {},
  // 本地人口数据
  localPersonList: [0, 0, 0],
  // 外来人口数据
  outsidePersonList: [0, 0, 0],
  // 陌生人数据
  strangerPersonList: [0, 0, 0],
  // 预警车辆数据
  alertCarList: [0, 0],
  // 车辆数据
  carList: [0, 0],
  // 车流量数据
  flowCarList: [0, 0]
})

export default (state = initialState, action) => {
  if (action.type === OVERVIEW_ACTION) {
    return state.merge(action.content)
  }
  return state
}
