import { CAR_CONTROL_WARNING_MANAGE_ACTION } from '../actions/carControlWarningManageAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  carControlWarningManageList: [],
  totalPage: 1
})

export default (state = initialState, action) => {
  if (action.type === CAR_CONTROL_WARNING_MANAGE_ACTION) {
    return state.merge(action.content)
  }
  return state
}
