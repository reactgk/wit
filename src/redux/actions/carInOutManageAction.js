import httpClient from '../../network/httpClient.js'
export const CAR_IN_OUT_MANAGE_ACTION = 'car_in_out_manage_action'

/**
 * 获取车辆出入记录列表
 * @param params
 * @returns {Function}
 */
export function getList (params) {
  return dispatch => {
    httpClient.post('media/querycarrecords', params)
      .then(result => {
        const {
          data
        } = result
        console.log(result)
        dispatch({
          type: CAR_IN_OUT_MANAGE_ACTION,
          content: {
            motorInOutManageList: data.list || [],
            motorTotalPage: data.count || 1,
            carByLocation: data.carByLocation || {},
            carDaily: data.carDaily || {},
            carInday: data.carInday || {}
          }
        })
      })
      .catch(error => {
      })
  }
}
