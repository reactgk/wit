import { SELECT_OPTION_ACTIVE } from '../actions/selectOptionAction'
// import immutable from 'immutable'

// const initialState = immutable.fromJS({
//   carManageList: [],
//   totalPage: 1
// })

export default (state, action) => {
  if (action.type === SELECT_OPTION_ACTIVE) {
    return state.merge(action.content)
  }
  return state
}
