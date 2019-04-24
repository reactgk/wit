import { combineReducers } from 'redux'
import authReducer from './authReducer'
import manageReducer from './manageReducer'
import carInOutRealTimeDataReducer from './carInOutRealTimeDataReducer'
import personInOutRealTimeDataReducer from './personInOutRealTimeDataReducer'
import pointRealTimeDataReducer from './pointRealTimeDataReducer'
import carManageReducer from './carManageReducer'
import personManageReducer from './personManageReducer'
import populationManageReducer from './populationManageReducer'
import houseManageReducer from './houseManageReducer'
import personInOutManageReducer from './personInOutManageReducer'
import carInOutManageReducer from './carInOutManageReducer'
import carControlWarningManageReducer from './carControlWarningManageReducer'
import personControlWarningManageReducer from './personControlWarningManageReducer'
import overviewReducer from './overviewReducer'
import trajectoryAnalysisReducer from './trajectoryAnalysisReducer'
import controlWarningReducer from './controlWarningReducer'
import placeManageReducer from './placeManageReducer'
import livePlaceReducer from './livePlaceReducer'
import overviewDataReducer from './overviewDataReducer'
import labelTypeReducer from './labelTypeReducer'
// 权限组操作
import privilegeGroupManagementReducer from './privilegeGroupManagementReducer'
// 权限操作
import powerOperationReducer from './powerOperationReducer'
// 角色操作
import roleOperationReducer from './roleOperationReducer'
// 非机动车实时数据
import bicycleInOutRealTimeDataReducer from './bicycleInOutRealTimeDataReducer'
// 机构管理
import organizationalManagementReducer from './organizationalManagementReducer'

// 用户管理
import userOperationReducer from './userOperationReducer'

import populationFloatingReducer from './populationFloatingReducer'
import personManageEditReducer from './personManageEditReducer'

const rootReducer = combineReducers({
  authReducer,
  manageReducer,
  personInOutRealTimeDataReducer,
  carInOutRealTimeDataReducer,
  pointRealTimeDataReducer,
  carManageReducer,
  personManageReducer,
  populationManageReducer,
  houseManageReducer,
  personInOutManageReducer,
  carInOutManageReducer,
  carControlWarningManageReducer,
  personControlWarningManageReducer,
  overviewReducer,
  trajectoryAnalysisReducer,
  livePlaceReducer,
  // selectOptionReducer
  controlWarningReducer,
  placeManageReducer,
  // 权限组操作
  privilegeGroupManagementReducer,
  // 权限操作
  powerOperationReducer,
  // 角色操作
  roleOperationReducer,
  // 非机动车实时数据
  bicycleInOutRealTimeDataReducer,
  // 机构管理
  organizationalManagementReducer,
  // 用户管理
  userOperationReducer,
  populationFloatingReducer,
  personManageEditReducer,
  // 一张图
  overviewDataReducer,
  // 标签
  labelTypeReducer
})

export default rootReducer
