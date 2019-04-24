import { POPULATION_ACTION } from '../actions/populationFloatlingAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  getPopulationList: [],
  carManageList: [],
  totalPage: 1
})

export default (state = initialState, action) => {
  if (action.type === POPULATION_ACTION) {
    return state.merge(action.content)
  }
  return state
}
