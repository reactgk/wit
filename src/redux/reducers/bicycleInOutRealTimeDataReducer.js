import { BICYCLE_IN_OUT_REAL_TIME_DATA_ACTION } from '../actions/bicycleInOutRealTimeDataAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  bicycleList: []
})

export default (state = initialState, action) => {
  if (action.type === BICYCLE_IN_OUT_REAL_TIME_DATA_ACTION) {
    return state.merge(action.content)
  }
  return state
}
