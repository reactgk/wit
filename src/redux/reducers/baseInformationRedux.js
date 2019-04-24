import { POPULATION_ACTION } from '../actions/baseInformationAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  getPopulationList: [],
  totalPage: 1
})

export default (state = initialState, action) => {
  if (action.type === POPULATION_ACTION) {
    return state.merge(action.content)
  }
  return state
}
