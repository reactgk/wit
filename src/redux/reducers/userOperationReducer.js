import { USER_OPERATION_ACTION } from '../actions/userOperationAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  userList: [],
  totalPage: 1
})

export default (state = initialState, action) => {
  if (action.type === USER_OPERATION_ACTION) {
    return state.merge(action.content)
  }
  return state
}
