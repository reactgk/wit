import { POWER_OPERATION_ACTION } from '../actions/powerOperationAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  powerList: [],
  totalPage: 1
})

export default (state = initialState, action) => {
  if (action.type === POWER_OPERATION_ACTION) {
    return state.merge(action.content)
  }
  return state
}
