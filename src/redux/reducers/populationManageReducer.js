import {
  POPULATION_MANAGE_ACTION
} from '../actions/populationManageAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  populationManageList: [],
  totalPage: 1,
  populationManageEdit: {},
  populationManageDetail: {},
  populationHouseList: [],
  populationCarList: [],
  populationByLiveType: {},
  populationByNation: {},
  populationByLivingTime: {}
})

export default (state = initialState, action) => {
  if (action.type === POPULATION_MANAGE_ACTION) {
    return state.merge(action.content)
  }
  return state
}
