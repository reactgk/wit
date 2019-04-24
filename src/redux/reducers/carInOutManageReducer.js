import { CAR_IN_OUT_MANAGE_ACTION } from '../actions/carInOutManageAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  motorInOutManageList: [],
  nonMotorInOutManageList: [],
  motorTotalPage: 1,
  nonMotorTotalPage: 1,
  carByLocation: {},
  carDaily: {},
  carInday: {}
})

export default (state = initialState, action) => {
  if (action.type === CAR_IN_OUT_MANAGE_ACTION) {
    return state.merge(action.content)
  }
  return state
}
