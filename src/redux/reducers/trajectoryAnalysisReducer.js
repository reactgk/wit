import { TRAJECTORY_ANALYSIS_ACTION, TAB_PERSON_CONTROL_WARNING } from '../actions/trajectoryAnalysisAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  isShowPointInfoModal: false,
  setCurrentPointInfo: {},
  // 当前tab
  activeTab: TAB_PERSON_CONTROL_WARNING,
  // 车牌或者身份证号
  searchNumber: '',
  // 开始日期
  startDate: '',
  // 结束日期
  endDate: '',
  // 开始时间
  startTime: '',
  // 结束时间
  endTime: '',
  // 车辆列表数据
  carList: [],
  // 人员列表数据
  personList: [],
  // 路径数据集合
  pathDataList: [],
  // 天气
  weather: {}
})

export default (state = initialState, action) => {
  if (action.type === TRAJECTORY_ANALYSIS_ACTION) {
    return state.merge(action.content)
  }
  return state
}
