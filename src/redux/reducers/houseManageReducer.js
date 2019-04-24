import { HOUSE_MANAGE_ACTION } from '../actions/houseManageAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  houseManageList: [],
  totalPage: 1
})

export default (state = initialState, action) => {
  if (action.type === HOUSE_MANAGE_ACTION) {
    return state.merge(action.content)
  }
  return state
}
