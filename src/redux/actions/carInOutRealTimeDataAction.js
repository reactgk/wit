import httpClient from '../../network/httpClient'

export const CAR_IN_OUT_REAL_TIME_DATA_ACTION = 'car_in_out_real_time_data_action'

/**
 * 获取车行数据
 * @param callback
 * @returns {Function}
 */
export function getCarList (callback) {
  return dispatch => {
    httpClient.get('media/realtimecarrecords')
      .then(result => {
        dispatch({
          type: CAR_IN_OUT_REAL_TIME_DATA_ACTION,
          content: {
            carList: result.data || []
          }
        })
        callback()
      })
      .catch(error => {
        callback()
      })
  }
}
