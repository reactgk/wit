import httpClient from '../../network/httpClient.js'

export const POWER_OPERATION_ACTION = 'power_operation_action'

export function powerAllList (params) {
  return dispatch => {
    httpClient.post1('urmservice/api/power/list/query', params)
      .then((result) => {
        dispatch({
          type: POWER_OPERATION_ACTION,
          content: {
            powerList: result.data || [],
            totalPage: result.data.length || 1
          }
        })
      })
      .catch(error => {})
  }
}

export function powerAdd (params, callback) {
  return dispatch => {
    httpClient.post1('urmservice/api/power/save/info', params)
      .then((result) => {
        callback()
      })
      .catch(error => {})
  }
}

export function powerDelete (params, callback) {
  return dispatch => {
    let url = 'urmservice/api/power/delete/power/' + params.powerCode
    httpClient.post1(url)
      .then((result) => {
        callback()
      })
      .catch(error => {})
  }
}
