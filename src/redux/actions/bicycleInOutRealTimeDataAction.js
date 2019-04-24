import httpClient from '../../network/httpClient'

export const BICYCLE_IN_OUT_REAL_TIME_DATA_ACTION = 'bicycle_in_out_real_time_data_action'

/**
 * 获取车行数据
 * @param callback
 * @returns {Function}
 */
export function getBicycleList (callback) {
  return dispatch => {
    httpClient.get('media/realtimecarrecords')
      .then(result => {
        dispatch({
          type: BICYCLE_IN_OUT_REAL_TIME_DATA_ACTION,
          content: {
            bicycleList: result.data || []
          }
        })
        callback()
      })
      .catch(error => {
        callback()
      })
  }
}
