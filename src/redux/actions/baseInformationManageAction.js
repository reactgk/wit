import httpClient from '../../network/httpClient'

export const BASE_INFORMATING_MANAGE_ACTION = 'base_informating_manage_action'

/**
 * 获取布控预警人员列表
 * @returns {Function}
 */
export function getPersonList (params) {
  return dispatch => {
    httpClient.post('meta/querypersons', params)
      .then(result => {
        const { data, total } = result
        dispatch({
          type: BASE_INFORMATING_MANAGE_ACTION,
          content: {
            totalPage: total || 1,
            personControlWarningManageList: data || []
          }
        })
      })
      .catch(error => {})
  }
}
/**
 * 设置人员布控/取消布控
 * @param params
 * @param successCallback
 * @param errorCallback
 * @returns {Function}
 */
export function setPersonTagStatus (params, successCallback, errorCallback) {
  return dispatch => {
    httpClient.post('meta/setpersontagstatus', params)
      .then(result => {
        successCallback()
        dispatch({
          type: BASE_INFORMATING_MANAGE_ACTION,
          content: {}
        })
      })
      .catch(error => { errorCallback(error.message) })
  }
}

/**
 * 设置忽略人员预警
 * @param params
 * @param successCallback
 * @param errorCallback
 * @returns {Function}
 */
export function setPersonWarningStatus (params, successCallback, errorCallback) {
  return dispatch => {
    httpClient.post('meta/setpersonalertstatus', params)
      .then(result => {
        successCallback()
        dispatch({
          type: BASE_INFORMATING_MANAGE_ACTION,
          content: {}
        })
      })
      .catch(error => { errorCallback(error.message) })
  }
}
export function getPopulationFloating (params) {
  return dispatch => {
    httpClient.post('topic/staticPerson/queryList', params)
      .then(result => {
        const { data } = result
        const { list, count } = data
        console.log(555545451211 + 'dsadas')

        dispatch({
          type: BASE_INFORMATING_MANAGE_ACTION,
          content: {
            getPopulationList: list || [],
            count: count
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
