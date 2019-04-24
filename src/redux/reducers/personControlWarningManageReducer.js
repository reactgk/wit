import { PERSON_CONTROL_WARNING_MANAGE_ACTION } from '../actions/personControlWarningManageAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  personControlWarningManageList: [],
  totalPage: 1
})

export default (state = initialState, action) => {
  if (action.type === PERSON_CONTROL_WARNING_MANAGE_ACTION) {
    return state.merge(action.content)
  }
  return state
}
