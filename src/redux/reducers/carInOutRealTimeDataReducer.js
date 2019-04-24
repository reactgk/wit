import { CAR_IN_OUT_REAL_TIME_DATA_ACTION } from '../actions/carInOutRealTimeDataAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  carList: []
})

export default (state = initialState, action) => {
  if (action.type === CAR_IN_OUT_REAL_TIME_DATA_ACTION) {
    return state.merge(action.content)
  }
  return state
}
