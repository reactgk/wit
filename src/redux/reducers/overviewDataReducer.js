import {
  OVERVIEW_DATA_ACTION
} from '../actions/overviewDataAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  // 天气
  weather: {},
  // 实有房屋
  houseCount: 0,
  selfHouseCount: 0,
  rentalHoseCount: 0,
  // 实有人口
  personCount: 0,
  hjPersonCount: 0,
  livePersonCount: 0,
  flowPersonCount: 0,
  keyPersonCount: 0,
  // 实有车辆
  carCount: 0,
  nativeCarCount: 0,
  foreignCarCount: 0
})

export default (state = initialState, action) => {
  if (action.type === OVERVIEW_DATA_ACTION) {
    return state.merge(action.content)
  }
  return state
}
