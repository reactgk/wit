import httpClient from '../../network/httpClient'
import { transform, selectContent } from '../../data/selectOptions'
import immutable from 'immutable'
export const MANAGE_ACTION = 'manage_action'

// // 综合概览
// export const ACTIVE_LINK_BUSINESS_BOARD_OVERVIEW = 'active_link_business_board_overview'
// // 轨迹分析
// export const ACTIVE_LINK_BUSINESS_BOARD_TRAJECTORY_ANALYSIS = 'active_link_business_board_trajectory_analysis'
// // 布控预警
// export const ACTIVE_LINK_BUSINESS_BOARD_CONTROL_WARNING = 'active_link_business_board_control_warning'

// 非机动车实时数据
export const ACTIVE_LINK_BICYCLE_REAL_TIME_DATA = 'active_link_bicycle_real_time_data'
// 点位实时数据
export const ACTIVE_LINK_POINT_REAL_TIME_DATA = 'active_link_point_real_time_data'
// 人员管理
export const ACTIVE_LINK_PERSON_MANAGE = 'active_link_person_manage'
// 车辆管理
export const ACTIVE_LINK_CAR_MANAGE = 'active_link_car_manage'
// 房屋管理
export const ACTIVE_LINK_HOUSE_MANAGE = 'active_link_house_manage'
// 人员进出
export const ACTIVE_LINK_PERSON_IN_OUT = 'active_link_person_in_out'
// 机动车进出
export const ACTIVE_LINK_MOTOR_IN_OUT = 'active_link_motor_in_out'
// 非机动车进出
export const ACTIVE_LINK_NON_MOTOR_IN_OUT = 'active_link_non_motor_in_out'
// 流动ren口专题
export const ACTIVE_LINK_POPULATION_FLOATING_TOPIC = 'active_link_population_floating_topic'
// 人员布控预警
export const ACTIVE_LINK_PERSON_CONTROL_WARNING = 'active_link_person_control_warning'
// 车辆布控预警
export const ACTIVE_LINK_CAR_CONTROL_WARNING = 'active_link_car_control_warning'
// 房屋管理
export const ACTIVE_LINK_ORGANIZATION_FORMATION = 'active_link_organization_formation'
// 场所管理信息维护
// export const ACTIVE_LINK_PLACE_INFORMATION = 'active_link_place_information'
// 设备管理信息维护
export const ACTIVE_LINK_DEVICE_FORMATION = 'active_link_device_formation'
// 标签类型管理
export const ACTIVE_LINK_LABEL_TYPE = 'active_link_label_type'
// 人车标签管理
export const ACTIVE_LINK_VEHICLE_LABEL = 'active_link_vehicle_label'
// 布控管理
export const ACTIVE_LINK_DISTRIBUTION_CONTORL = 'active_link_distribution_contorl'
// 预警管理
export const ACTIVE_LINK_EARLY_WARNING = 'active_link_early_warning'
// 预警管理
export const ACTIVE_LINK_ANALYSIS_TRAJECTORY = 'active_link_analysis_trajectory'
// 人员详情
export const ACTIVE_LINK_PEOPLE_DETAILS = 'active_link_people_details'
// 人口详情
export const ACTIVE_LINK_PERSON_DETAILS = 'active_link_person_details'
// 编辑人口详情
export const ACTIVE_LINK_PERSON_EDIT = 'active_link_person_edit'
// 车辆详情
export const ACTIVE_LINK_CAR_DETAILS = 'active_link_car_details'
// 二轮车详情
export const ACTIVE_LINK_BIKE_DETAILS = 'active_link_bike_details'
// 二轮车详情
export const ACTIVE_LINK_HOUSE_DETAILS = 'active_link_house_details'
// 场所管理
export const ACTIVE_LINK_PLACE_MANAGE = 'active_link_place_manage'
// 权限分组
export const ACTIVE_LINK_PRIVILEGE_GROUP_MANAGEMENT = 'active_link_privilege_group_management'

// 权限管理
export const ACTIVE_LINK_POWER_OPERATION = 'active_link_power_operation'

// 角色管理
export const ACTIVE_LINK_ROLE_OPERATION = 'active_link_role_operation'

// 机构管理
export const ACTIVE_LINK_ORGANIZTTIONAL_MANAGEMENT = 'active_link_organizational_management'

// 用户管理
export const ACTIVE_LINK_USER_OPERATION = 'active_link_user_operation'
// 人口实有划
export const ACTIVE_LINK_ACTUAL_CHANGE = 'active_link_actual_change'

const TABS = 'tabs'
/**
 * 设置业务看板菜单是否展开
 * @param isSpread
 * @returns {{type: string, content: {isBusinessBoardSpread: boolean}}}
 */
export function setBusinessBoardSpread (isSpread) {
  return {
    type: MANAGE_ACTION,
    content: {
      isBusinessBoardSpread: !isSpread
    }
  }
}

/**
 * 设置车辆进出管理菜单是否展开
 * @param isSpread
 * @returns {{type: string, content: {isCarExitSpread: boolean}}}
 */
export function setCarExitSpread (isSpread) {
  return {
    type: MANAGE_ACTION,
    content: {
      isCarExitSpread: !isSpread
    }
  }
}

/**
 * 设置人口专题菜单是否展开
 * @param isSpread
 * @returns {{type: string, content: {businessManagementMenu: boolean}}}
 */
export function setbusinessManagement (isSpread) {
  return {
    type: MANAGE_ACTION,
    content: {
      businessManagementMenu: !isSpread
    }
  }
}

/** 设置权限管理
 * @param isSpread
 * @returns {{type: string, content: {isCarExitSpread: boolean}}}
 */
export function setPrivilegeManagement (isSpread) {
  return {
    type: MANAGE_ACTION,
    content: {
      isPrivilegeManagement: !isSpread
    }
  }
}

/**
 * 设置用户管理
 * @param isSpread
 * @returns {{type: string, content: {isCarExitSpread: boolean}}}
 */
export function setUserManagement (isSpread) {
  return {
    type: MANAGE_ACTION,
    content: {
      isUserManagement: !isSpread
    }
  }
}

/**
>>>>>>> .theirs
 * 设置实时数据菜单是否展开
 * @param isSpread
 * @returns {{type: string, content: {isRealTimeDataSpread: boolean}}}
 */
export function setRealTimeDataSpread (isSpread) {
  return {
    type: MANAGE_ACTION,
    content: {
      isRealTimeDataSpread: !isSpread
    }
  }
}
/**
 * 设置房屋管理菜单是否展开
 * @param isMaintain
 * @returns {{type: string, content: {isInformationMaintain: boolean}}}
 */
export function setInformationMaintain (isMaintain) {
  return {
    type: MANAGE_ACTION,
    content: {
      isInformationMaintain: !isMaintain
    }
  }
}

/**
<<<<<<< .mine
 * 设置标签类型菜单是否展开
 * @param iLabelType
 * @returns {{type: string, content: {iLabelTypeMaintain: boolean}}}
 */
export function setLabelType (iLabelType) {
  return {
    type: MANAGE_ACTION,
    content: {
      iLabelTypeMaintain: !iLabelType
    }
  }
}
/**
 * 设置布控预警菜单是否展开
 * @param isWarning
 * @returns {{type: string, content: {iControlWarning: boolean}}}
 */
export function setControlWarning (isWarning) {
  return {
    type: MANAGE_ACTION,
    content: {
      iControlWarning: !isWarning
    }
  }
}
/**
=======
 * 设置基础信息管理菜单是否展开
 * @param isSpread
 * @returns {{type: string, content: {isBaseInfoSpread: boolean}}}
 */
export function setBaseInfoSpread (isSpread) {
  return {
    type: MANAGE_ACTION,
    content: {
      isBaseInfoSpread: !isSpread
    }
  }
}
/** 加载tab
 * @param activeLink
 * @returns {{type: string, content: {activeLink: *, tabs: any}}}
 */
export function loadTabs (activeLink) {
  let localStorageTabs = window.localStorage.getItem(TABS)
  let tabs
  if (localStorageTabs) {
    tabs = immutable.fromJS(JSON.parse(localStorageTabs))
    if (activeLink) {
      if (!tabs.contains(activeLink)) {
        tabs = tabs.push(activeLink)
      }
    } else {
      if (tabs.size > 0) {
        activeLink = tabs.get(tabs.size - 1)
      } else {
        activeLink = ACTIVE_LINK_POINT_REAL_TIME_DATA
        tabs = tabs.push(activeLink)
      }
    }
  } else {
    activeLink = ACTIVE_LINK_POINT_REAL_TIME_DATA
    tabs = immutable.fromJS([activeLink])
  }
  window.localStorage.setItem(TABS, JSON.stringify(tabs.toJS()))
  return {
    type: MANAGE_ACTION,
    content: {
      activeLink: activeLink,
      tabs: tabs
    }
  }
}

/**
 * 设置当前选择的菜单
 * @param activeLink
 * @param tabs
 * @returns {Function}
 */
export function setActiveLink (activeLink, tabs) {
  if (!tabs.contains(activeLink)) {
    tabs = tabs.push(activeLink)
  }
  window.localStorage.setItem(TABS, JSON.stringify(tabs.toJS()))
  return {
    type: MANAGE_ACTION,
    content: {
      activeLink: activeLink,
      tabs: tabs
    }
  }
}

/**
 * 标签页变化事件
 * @param activeLink
 * @returns {{type: string, content: {activeLink: *}}}
 */
export function onTabChange (activeLink) {
  return {
    type: MANAGE_ACTION,
    content: {
      activeLink: activeLink
    }
  }
}

/**
 * 关闭标签
 * @param key
 * @param tabs
 * @param activeLink
 */
export function closeTab (key, tabs, activeLink) {
  let index = tabs.indexOf(key)
  tabs = tabs.splice(index, 1)
  if (key === activeLink) {
    activeLink = tabs.get(tabs.size - 1)
  }
  window.localStorage.setItem(TABS, JSON.stringify(tabs.toJS()))
  return {
    type: MANAGE_ACTION,
    content: {
      tabs: tabs,
      activeLink: activeLink
    }
  }
}

/**
 * 获取行政机构
 * @returns {Function}
 */
export function getDepartments () {
  return dispatch => {
    httpClient.get('meta/departments')
      .then(result => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestDepartmentsEnd: true,
            departments: result.data || []
          }
        })
      })
      .catch(error => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestDepartmentsEnd: true
          }
        })
      })
  }
}

/**
 * 获取设备类型
 * @returns {Function}
 */
export function getDeviceTypes () {
  return dispatch => {
    httpClient.get('meta/deviceTypes')
      .then(result => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestDeviceTypesEnd: true,
            deviceTypes: result.data || []
          }
        })
      })
      .catch(error => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestDeviceTypesEnd: true
          }
        })
      })
  }
}

/**
 * 获取民族
 * @returns {Function}
 */
export function getNationTypes () {
  return dispatch => {
    httpClient.get('meta/nationTypes')
      .then(result => {
        let data = result.data || []
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestNationTypesEnd: true,
            nationTypes: transform(data, 'nationName', 'nationCode')
          }
        })
      })
      .catch(error => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestNationTypesEnd: true
          }
        })
      })
  }
}

/**
 * 获取场所类型
 * @returns {Function}
 */
export function getPlaceTypes () {
  return dispatch => {
    httpClient.get('meta/placeTypes')
      .then(result => {
        let data = result.data || []
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestPlaceTypesEnd: true,
            placeTypes: transform(data, 'placeTypeName', 'placeTypeCode')
          }
        })
      })
      .catch(error => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestPlaceTypesEnd: true
          }
        })
      })
  }
}

/**
 * 获取权限类型
 * @returns {Function}
 */
export function getPowerTypes () {
  return dispatch => {
    httpClient.post('meta/powerTypes')
      .then(result => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestPowerTypesEnd: true,
            powerTypes: result.data || []
          }
        })
      })
      .catch(error => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestPowerTypesEnd: true
          }
        })
      })
  }
}

/**
 * 获取用户类型
 * @returns {Function}
 */
export function getUserTypes () {
  return dispatch => {
    httpClient.get('meta/userTypes')
      .then(result => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestUserTypesEnd: true,
            userTypes: result.data || []
          }
        })
      })
      .catch(error => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestUserTypesEnd: true
          }
        })
      })
  }
}
/**
 * 获取场所
 * @returns {Function}
 */
export function getplaceTopic () {
  return dispatch => {
    httpClient.post('meta/place/allList')
      .then(result => {
        let data = result.data || []
        let idCodePlaceList = []
        data.forEach((items) => {
          idCodePlaceList.push({ label: items.placeName, value: items.placeCode, id: items.id })
        })

        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestPlaceTopicEnd: true,
            placeFloating: selectContent(data, 'placeName', 'placeCode') || [],
            placeFloatingIdList: idCodePlaceList || [],
            placeValue: undefined,
            pointValue: undefined,
            deviceValue: undefined
          }
        })
      })
      .catch(error => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestPlaceTopicEnd: true
          }
        })
      })
  }
}
/**
 * 获取居住地
 * @returns {Function}
 */
export function getLivePlace () {
  return dispatch => {
    httpClient.get('topic/houselist')
      .then(result => {
        let data = result.data || []
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestGetsLiveEnd: true,
            livePlace: selectContent(data, 'houseaddress', 'housecode')
          }
        })
      })
      .catch(error => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestGetsLiveEnd: true
          }
        })
      })
  }
}
// 获取现居住地四级联动（1）
export function getCascader () {
  return dispatch => {
    httpClient.post('topic/houseplacelist', {})
      .then(result => {
        let data = result.data || []
        // this.props.todos || []).map(() => {})
        // let transformArray = []
        // data.forEach((data) => {
        //   transformArray.push({ label: data['name'], value: data['name'] })
        // })
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isCascaderEnd: true,
            CascaderEnd: selectContent(data, 'name', 'name')
          }
        })
      })
      .catch(error => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isCascaderEnd: true
          }
        })
      })
  }
}
/**
 * 获取户籍地
 * @returns {Function}
 */

export function getDomicileTypes () {
  return dispatch => {
    // httpClient.post('topic/personOverview')
    httpClient.get('topic/nativeplacelist')
      .then(result => {
        let data = result.data || []
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestDomicilePlaceEnd: true,
            DomicilePlace: selectContent(data, 'provinceName', 'provinceCode')
          }
        })
      })
      .catch(error => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isRequestDomicilePlaceEnd: true
          }
        })
      })
  }
}
/**
 * 获取车辆标签，二轮车标签
 * @returns {Function}
 */
export function aaa (dataArray = [], labelKey, valueKey) {
  let selectContentArray = [{ label: '全部', value: '' }]
  dataArray.forEach((data) => {
    selectContentArray.push({ label: data[labelKey], value: data[valueKey] })
  })
  return selectContentArray
}
export function getCarTagsTypes () {
  return dispatch => {
    // httpClient.post('topic/personOverview')
    httpClient.post('meta/tag/carTagList')
      .then(result => {
        let data = result.data || []
        let dataArrayCar = []
        let dataArrayBike = []
        // selectContent(data, 'tagName', 'id')
        for (var i = 0; i < data.length; i++) {
          if (parseInt(data[i].tagType) === 0) {
            dataArrayCar.push({ label: data[i].tagName, value: data[i].id })
          } else if (parseInt(data[i].tagType) === 1) {
            dataArrayBike.push({ label: data[i].tagName, value: data[i].id })
          }
        }
        console.log(dataArrayCar, 990009090)
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isdataArrayBikeEnd: true,
            isdataArrayCarEnd: true,
            dataArrayBike: selectContent(dataArrayBike, 'label', 'value'),
            dataArrayCar: selectContent(dataArrayCar, 'label', 'value')
          }
        })
      })
      .catch(error => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
            isdataArrayBikeEnd: true,
            isdataArrayCarEnd: true
          }
        })
      })
  }
}
// 人员标签下拉（一级）getNationTypes
export function selectPresonTypeList () {
  return dispatch => {
    httpClient.post('meta/tagType/allList')
      .then(result => {
        let data = result.data || []
        dispatch({
          type: MANAGE_ACTION,
          content: {
            tagTypeList: selectContent(data, 'tagTyepName', 'id') || [],
            personVal: undefined
          }
        })
      })
      .catch(error => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
          }
        })
      })
  }
}
// 人员标签下拉（二级）
export function personTypeChange (value, params) {
  return dispatch => {
    httpClient.post('meta/tag/tagByTagType', params)
      .then(result => {
        let data = result.data || []
        dispatch({
          type: MANAGE_ACTION,
          content: {
            tagPersonList: selectContent(data, 'tagName', 'id') || [],
            personVal: undefined,
            personTypeVal: value
          }
        })
      })
      .catch(error => {
        dispatch({
          type: MANAGE_ACTION,
          content: {
          }
        })
      })
  }
}
// 房号value
export function presonTagSelectChange (value) {
  return dispatch => {
    dispatch({
      type: MANAGE_ACTION,
      content: {
        personVal: value
      }
    })
  }
}
// 设备三级联动 布控设备
export function warningPlaceSelect (value, e) {
  window.localStorage.setItem('palce', value)
  console.log(222, e.key)
  return dispatch => {
    httpClient.post('meta/point/getpoints', {
      PlaceCode: value
    })
      .then(result => {
        const { data } = result
        let pointListList = []
        data.forEach((items) => {
          pointListList.push({ label: items.pointName, value: items.pointName, id: items.id })
        })
        dispatch({
          type: MANAGE_ACTION,
          content: {
            pointList: selectContent(data, 'pointName', 'pointName'),
            pointListID: pointListList,
            placeValue: value,
            pointValue: undefined,
            deviceValue: undefined,
            placeValueSearch: value,
            pointValueSearch: undefined,
            deviceValueSearch: undefined,
            palceID: e.key
          }
        })
      })
      .catch(error => {})
  }
}
// 设备三级联动 dianwei设备
export function warningPointSelect (value, e) {
  window.localStorage.setItem('palce', value)
  return dispatch => {
    httpClient.post('meta/device/getdevices', {
      PointCode: value
      // PlaceCode: 650105001001008
    })
      .then(result => {
        const { data } = result
        let deviceListList = []
        data.forEach((items) => {
          deviceListList.push({ label: items.placeName, value: items.placeCode, id: items.id })
        })

        dispatch({
          type: MANAGE_ACTION,
          content: {
            pointValue: value,
            deviceList: selectContent(data, 'devName', 'devType'),
            deviceListID: deviceListList,
            pointValueSearch: value,
            deviceValueSearch: undefined,
            pointID: e.key
          }
        })
      })
      .catch(error => {})
  }
}
// 设备三级联动 布控设备
export function warningDeviceSelect (value, e) {
  return dispatch => {
    dispatch({
      type: MANAGE_ACTION,
      content: {
        deviceValue: value,
        deviceValueSearch: value,
        deviceID: e.key
      }
    })
  }
}
export function reSetSelect (value) {
  return dispatch => {
    dispatch({
      type: MANAGE_ACTION,
      content: {
        placeValue: undefined,
        pointValue: undefined,
        deviceValue: undefined
      }
    })
  }
}
// 设备三级联动 布控设备
export function warningPlaceSearch (value, e) {
  window.localStorage.setItem('palce', value)
  return dispatch => {
    httpClient.post('meta/point/getpoints', {
      PlaceCode: value
    })
      .then(result => {
        const { data } = result
        let pointListIDSe = []
        data.forEach((items) => {
          pointListIDSe.push({ label: items.pointName, value: items.pointCode, id: items.id })
        })
        dispatch({
          type: MANAGE_ACTION,
          content: {
            pointList: selectContent(data, 'pointName', 'pointCode'),
            pointListIDSe: pointListIDSe || [],
            placeValueSearch: value,
            palceIDs: e.key,
            pointValueSearch: undefined,
            deviceValueSearch: undefined
          }
        })
      })
      .catch(error => {})
  }
}
// 设备三级联动 dianwei设备
export function warningPointSearch (value, e) {
  window.localStorage.setItem('palce', value)
  return dispatch => {
    httpClient.post('meta/device/getdevices', {
      PointCode: value
      // PlaceCode: 650105001001008
    })
      .then(result => {
        const { data } = result
        let deviceListIDSe = []
        data.forEach((items) => {
          deviceListIDSe.push({ label: items.pointName, value: items.pointCode, id: items.id })
        })
        dispatch({
          type: MANAGE_ACTION,
          content: {
            deviceList: selectContent(data, 'devName', 'devType'),
            deviceListIDSe: deviceListIDSe || [],
            pointValueSearch: value,
            pointIDs: e.key,
            deviceValueSearch: undefined
          }
        })
      })
      .catch(error => {})
  }
}
// 设备三级联动 布控设备
export function warningDeviceSearch (value, e) {
  return dispatch => {
    dispatch({
      type: MANAGE_ACTION,
      content: {
        deviceValueSearch: value,
        deviceIDs: e.key
      }
    })
  }
}
// 人口列表
export function getpeopleList (params) {
  return dispatch => {
    httpClient.post('meta/person/list', params)
      .then(result => {
        const { data } = result
        dispatch({
          type: MANAGE_ACTION,
          content: {
            peopleList: data,
            totalPage: result.total || ''
          }
        })
      })
      .catch(error => {})
  }
}
