import { CONTROL_WARNING_ACTION } from '../actions/controlWarningAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  carList: [],
  personList: [],
  carWarningList: [],
  personWarningList: [],
  // 人员布控数量
  personControlTotal: 0,
  // 人员预警数量
  personWarningTotal: 0,
  // 车辆布控数量
  carControlTotal: 0,
  // 车辆预警数量
  carWarningTotal: 0,
  // 人员7日预警数量
  personSevenDaysWarningTotal: 0,
  // 人员当日日预警数量
  personCurrentDayWarningTotal: 0,
  // 车辆7日预警数量
  carSevenDaysWarningTotal: 0,
  // 车辆当日日预警数量
  carCurrentDayWarningTotal: 0,
  // 人员七日预警饼图数据
  personSevenDaysPieDataList: [],
  // 人员当日预警饼图数据
  personCurrentDayPieDataList: [],
  // 车辆七日预警饼图数据
  carSevenDaysPieDataList: [],
  // 车辆当日预警饼图数据
  carCurrentDayPieDataList: [],
  // 天气
  weather: {}
})

export default (state = initialState, action) => {
  if (action.type === CONTROL_WARNING_ACTION) {
    return state.merge(action.content)
  }
  return state
}
