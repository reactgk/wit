import { CAR_MANAGE_ACTION } from '../actions/carManageAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  carManageList: [],
  totalPage: 1,
  carByCategory: {},
  carByPlace: {}
})

export default (state = initialState, action) => {
  if (action.type === CAR_MANAGE_ACTION) {
    return state.merge(action.content)
  }
  return state
}
