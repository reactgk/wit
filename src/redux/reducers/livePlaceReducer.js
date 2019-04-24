import { LIVE_PLACE_ACTION } from '../actions/livePlaceAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  streetValue: '',
  communityValue: '',
  placeValue: '',
  cascadeData: [],
  streetList: [],
  communityList: [],
  placeList: [],
  carList: [],
  personList: [],
  islivePlacePlotEnd: false,
  livePlacePlot: '',
  aaaData: [],
  bulidingList: [],
  bulidValue: '',
  roomValue: '',
  roomList: [],
  tagTypeSelectList: [],
  tagList: [],
  bikeTagsList: [],
  carCheckBoxList: [],
  bikeCheckBoxList: []
})

export default (state = initialState, action) => {
  if (action.type === LIVE_PLACE_ACTION) {
    return state.merge(action.content)
  }
  return state
}
// export const  = ''
