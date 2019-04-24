import httpClient from '../../network/httpClient'

export const USER_OPERATION_ACTION = 'user_operation_action'

/**
 * 获取用户列表
 * @returns {Function}
 */
export function userInfoList (params) {
  return dispatch => {
    httpClient.post1('urmservice/api/user/infos/query', params)
      .then((result) => {
        dispatch({
          type: USER_OPERATION_ACTION,
          content: {
            userList: result.data || [],
            totalPage: result.data.length || 1
          }
        })
      })
      .catch(error => {})
  }
}

export function userDelete (params, callback) {
  return dispatch => {
    let url = 'urmservice/api/user/delete/' + params.loginName

    httpClient.post1(url)
      .then((result) => {
        dispatch({
          type: USER_OPERATION_ACTION,
          content: {
            userList: result.data.list || [],
            totalPage: result.data.count || 1
          }
        })
        callback()
      })
      .catch(error => {})
  }
}

export function userInfoAdd (params, callback) {
  return dispatch => {
    httpClient.post1('urmservice/api/user/save', params)
      .then(result => {
        dispatch({
          type: USER_OPERATION_ACTION,
          content: {
            departList: result.data.list || [],
            totalPage: result.data.count || 1
          }
        })
        callback()
      })
      .catch(error => {})
  }
}
