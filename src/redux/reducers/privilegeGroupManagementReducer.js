import { PRIVILEGE_GROUP_MANAGEMENT_ACTION } from '../actions/privilegeGroupManagementAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  privilegeGroup: []
})

export default (state = initialState, action) => {
  if (action.type === PRIVILEGE_GROUP_MANAGEMENT_ACTION) {
    return state.merge(action.content)
  }
  return state
}
