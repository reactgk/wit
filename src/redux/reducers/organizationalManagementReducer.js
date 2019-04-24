import { ORGANIZTTIONAL_MANAGEMENT_ACTION } from '../actions/organizationalManagementAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  departList: [],
  totalPage: 1
})

export default (state = initialState, action) => {
  if (action.type === ORGANIZTTIONAL_MANAGEMENT_ACTION) {
    return state.merge(action.content)
  }
  return state
}
