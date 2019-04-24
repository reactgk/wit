import { PERSON_MANAGE_ACTION } from '../actions/personManageAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  personManageList: [],
  totalPage: 1
})

export default (state = initialState, action) => {
  if (action.type === PERSON_MANAGE_ACTION) {
    return state.merge(action.content)
  }
  return state
}
