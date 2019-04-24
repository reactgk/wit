import httpClient from '../../network/httpClient'
export const TRAJECTORY_ANALYSIS_ACTION = 'trajectory_analysis_action'

// 人员布控
export const TAB_PERSON_CONTROL_WARNING = 'tab_person_control_warning'
// 车辆布控
export const TAB_CAR_CONTROL_WARNING = 'tab_car_control_warning'

/**
 * 设置当前tab
 * @param activeTab
 * @param isChange
 */
export function setActiveTab (activeTab, isChange) {
  let clearData = {}
  if (isChange) {
    clearData = {
      searchNumber: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: ''
    }
  }
  return {
    type: TRAJECTORY_ANALYSIS_ACTION,
    content: {
      activeTab,
      ...clearData
    }
  }
}

/**
 * 设置id和车牌搜索条件
 * @param value
 * @returns {{type: string, content: {searchNumber: *}}}
 */
export function setSearchNumber (value) {
  return {
    type: TRAJECTORY_ANALYSIS_ACTION,
    content: {
      searchNumber: value
    }
  }
}

/**
 * 设置开始日期
 * @param date
 * @returns {{type: string, content: {searchNumber: *}}}
 */
export function setStartDate (date) {
  return {
    type: TRAJECTORY_ANALYSIS_ACTION,
    content: {
      startDate: date
    }
  }
}

/**
 * 设置结束日期
 * @param date
 * @returns {{type: string, content: {searchNumber: *}}}
 */
export function setEndDate (date) {
  return {
    type: TRAJECTORY_ANALYSIS_ACTION,
    content: {
      endDate: date
    }
  }
}

/**
 * 设置开始时间
 * @param time
 * @returns {{type: string, content: {searchNumber: *}}}
 */
export function setStartTime (time) {
  return {
    type: TRAJECTORY_ANALYSIS_ACTION,
    content: {
      startTime: time
    }
  }
}

/**
 * 设置结束时间
 * @param time
 * @returns {{type: string, content: {searchNumber: *}}}
 */
export function setEndTime (time) {
  return {
    type: TRAJECTORY_ANALYSIS_ACTION,
    content: {
      endTime: time
    }
  }
}

/**
 * 搜索
 * @param activeTab
 * @param searchNumber
 * @param startDate
 * @param endDate
 * @returns {Function}
 */
export function search (activeTab, searchNumber, startDate, endDate) {
  const isPerson = activeTab === TAB_PERSON_CONTROL_WARNING
  const url = isPerson ? 'mega/querypersonpath' : 'mega/querycarpath'
  let params = {}
  if (isPerson) {
    params = {
      idNumber: searchNumber,
      startDate,
      endDate
    }
  } else {
    params = {
      licenseNumber: searchNumber,
      startDate,
      endDate
    }
  }
  return dispatch => {
    httpClient.post(url, params)
      .then(result => {
        const { data } = result
        dispatch({
          type: TRAJECTORY_ANALYSIS_ACTION,
          content: {
            pathDataList: data
          }
        })
      })
      .catch(error => {})
  }
}

/**
 * 获取数据列表
 */
export function getDataList () {
  return dispatch => {
    httpClient.get('mega/taggedrecords')
      .then(result => {
        const { data } = result
        dispatch({
          type: TRAJECTORY_ANALYSIS_ACTION,
          content: {
            carList: data.cars || [],
            personList: data.persons || []
          }
        })
      })
      .catch(error => {})
  }
}

/**
 * 获取天气
 * @param city
 * @returns {Function}
 */
export function getWeather (city) {
  return dispatch => {
    httpClient.get('mega/getweatherbyname', city)
      .then(result => {
        const { data } = result
        dispatch({
          type: TRAJECTORY_ANALYSIS_ACTION,
          content: {
            weather: data
          }
        })
      })
      .catch(error => {})
  }
}

/**
 * 关闭modal
 * @returns {{type: string, content: {isShowPointInfoModal: *}}}
 */
export function closePointInfoModal () {
  return {
    type: TRAJECTORY_ANALYSIS_ACTION,
    content: {
      isShowPointInfoModal: false
    }
  }
}

/**
 * 设置当前点位信息
 * @param pointInfo
 * @returns {{type: string, content: {currentPointInfo: *}}}
 */
export function setCurrentPointInfo (pointInfo) {
  return {
    type: TRAJECTORY_ANALYSIS_ACTION,
    content: {
      isShowPointInfoModal: true,
      currentPointInfo: pointInfo
    }
  }
}
