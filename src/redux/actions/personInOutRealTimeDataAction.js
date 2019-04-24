import httpClient from '../../network/httpClient'

export const PERSON_IN_OUT_REAL_TIME_DATA_ACTION = 'person_in_out_real_time_data_action'

/**
 * 获取人行数据
 * @returns {Function}
 */
export function getPersonList (callback) {
  return dispatch => {
    httpClient.get('media/realtimepersonrecords')
      .then(result => {
        dispatch({
          type: PERSON_IN_OUT_REAL_TIME_DATA_ACTION,
          content: {
            personList: result.data || []
          }
        })
        callback()
      })
      .catch(error => {
        callback()
      })
  }
}
