import { PLACE_MANAGE_ACTION } from '../actions/placeManageAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  placeManageList: [],
  totalPage: 1
})

export default (state = initialState, action) => {
  if (action.type === PLACE_MANAGE_ACTION) {
    return state.merge(action.content)
  }
  return state
}
