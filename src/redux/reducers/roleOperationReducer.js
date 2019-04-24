import { ROLE_OPERATION_ACTION } from '../actions/roleOperationAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  roleList: [],
  totalPage: 1
})

export default (state = initialState, action) => {
  if (action.type === ROLE_OPERATION_ACTION) {
    return state.merge(action.content)
  }
  return state
}
