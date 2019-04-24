import { PERSON_IN_OUT_MANAGE_ACTION } from '../actions/personInOutManageAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  personInOutManageList: [],
  totalPage: 1,
  personByLocation: {},
  personDaily: {},
  personInday: {}
})

export default (state = initialState, action) => {
  if (action.type === PERSON_IN_OUT_MANAGE_ACTION) {
    return state.merge(action.content)
  }
  return state
}
