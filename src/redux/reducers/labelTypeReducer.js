import { LABEL_TYPE_ACTION } from '../actions/labelTypeAction.js'
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
  tagTypeSelectList: []
})

export default (state = initialState, action) => {
  if (action.type === LABEL_TYPE_ACTION) {
    return state.merge(action.content)
  }
  return state
}
