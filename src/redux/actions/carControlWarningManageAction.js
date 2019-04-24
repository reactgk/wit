import httpClient from '../../network/httpClient'
export const CAR_CONTROL_WARNING_MANAGE_ACTION = 'car_control_warning_manage_action'

/**
 * 获取布控预警车辆管理列表
 * @param params
 * @returns {Function}
 */
export function getCarList (params) {
  return dispatch => {
    httpClient.post('meta/querycars', params)
      .then(result => {
        const { data, total } = result
        dispatch({
          type: CAR_CONTROL_WARNING_MANAGE_ACTION,
          content: {
            totalPage: total || 1,
            carControlWarningManageList: data || []
          }
        })
      })
      .catch(error => {})
  }
}

/**
 * 设置车辆布控/取消布控
 * @param params
 * @param successCallback
 * @param errorCallback
 * @returns {Function}
 */
export function setCarTagStatus (params, successCallback, errorCallback) {
  return dispatch => {
    httpClient.post('meta/setcartagstatus', params)
      .then(result => {
        successCallback()
        dispatch({
          type: CAR_CONTROL_WARNING_MANAGE_ACTION,
          content: {}
        })
      })
      .catch(error => { errorCallback(error.message) })
  }
}

/**
 * 设置忽略车辆预警
 * @param params
 * @param successCallback
 * @param errorCallback
 * @returns {Function}
 */
export function setCarWarningStatus (params, successCallback, errorCallback) {
  return dispatch => {
    httpClient.post('meta/setcaralertstatus', params)
      .then(result => {
        successCallback()
        dispatch({
          type: CAR_CONTROL_WARNING_MANAGE_ACTION,
          content: {}
        })
      })
      .catch(error => { errorCallback(error.message) })
  }
}
