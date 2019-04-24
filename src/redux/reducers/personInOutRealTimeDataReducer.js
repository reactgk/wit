import { PERSON_IN_OUT_REAL_TIME_DATA_ACTION } from '../actions/personInOutRealTimeDataAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  personList: []
})

export default (state = initialState, action) => {
  if (action.type === PERSON_IN_OUT_REAL_TIME_DATA_ACTION) {
    return state.merge(action.content)
  }
  return state
}
