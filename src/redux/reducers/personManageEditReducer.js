import {
  PERSON_MANAGE_EDIT_ACTION
} from '../actions/personManageEditAction'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  populationManageEdit: {}
})

export default (state = initialState, action) => {
  if (action.type === PERSON_MANAGE_EDIT_ACTION) {
    return state.merge(action.content)
  }
  return state
}
