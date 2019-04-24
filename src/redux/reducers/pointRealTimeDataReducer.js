import { POINT_REAL_TIME_DATA_ACTION } from '../actions/pointRealTimeDataManageAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  provinceValue: '',
  cityValue: '',
  areaValue: '',
  streetValue: '',
  communityValue: '',
  placeValue: '',
  pointValue: '',
  placeList: [],
  pointList: [],
  carList: [],
  personList: [],
  lastCarInfo: {},
  lastPersonInfo: {}
})

export default (state = initialState, action) => {
  if (action.type === POINT_REAL_TIME_DATA_ACTION) {
    return state.merge(action.content)
  }
  return state
}
