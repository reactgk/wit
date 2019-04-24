import { BASE_INFORMATING_MANAGE_ACTION } from '../actions/baseInformationManageAction'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  carControlWarningManageList: [],
  totalPage: 1
})

export default (state = initialState, action) => {
  if (action.type === BASE_INFORMATING_MANAGE_ACTION) {
    return state.merge(action.content)
  }
  return state
}
