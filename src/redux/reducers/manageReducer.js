import { MANAGE_ACTION } from '../actions/manageAction.js'
import immutable from 'immutable'

const initialState = immutable.fromJS({
  // 页面看板菜单是否展开
  isBusinessBoardSpread: false,
  // 车辆进出菜单是否展开
  isCarExitSpread: false,
  // 实时数据是否展开
  isRealTimeDataSpread: true,

  // 权限管理是否展开
  isPrivilegeManagement: false,
  // 用户管理
  isUserManagement: false,
  // 当前选中的菜单
  activeLink: '',
  // tab页数据
  tabs: [],
  isRequestDepartmentsEnd: false,
  departments: [],
  isRequestDeviceTypesEnd: false,
  deviceTypes: [],
  // 民族
  isRequestNationTypesEnd: false,
  nationTypes: [],
  // 场所
  isRequestPlaceTypesEnd: false,
  placeTypes: [],
  isRequestPowerTypesEnd: false,
  powerTypes: [],
  isRequestUserTypesEnd: false,
  userTypes: [],
  // renyuanbiaoqian xiala
  tagTypeList: [],
  tagPersonList: [],
  carLists: [],
  placeFloating: [],
  pointList: [],
  deviceList: [],
  placeFloatingIdList: [],
  pointListID: [],
  deviceListID: [],
  pointListIDSe: [],
  deviceListIDSe: []
})

export default (state = initialState, action) => {
  if (action.type === MANAGE_ACTION) {
    return state.merge(action.content)
  }
  return state
}
