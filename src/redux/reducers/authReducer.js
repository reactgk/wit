import { AUTH_ACTION, AUTH_TYPE_NONE } from '../actions/authAction'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  authType: AUTH_TYPE_NONE,
  userInfo: '',
  unit: ''
})

export default (state = initialState, action) => {
  if (action.type === AUTH_ACTION) {
    return state.merge(action.content)
  }
  return state
}
