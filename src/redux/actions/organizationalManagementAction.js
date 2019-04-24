import httpClient from '../../network/httpClient'

export const ORGANIZTTIONAL_MANAGEMENT_ACTION = 'organizational_management_action'

/**
 * 获取机构列表
 * @returns {Function}
 */
export function departMentInfoList (params) {
  return dispatch => {
    httpClient.post1('urmservice/api/department/infos', params)
      .then((result) => {
        dispatch({
          type: ORGANIZTTIONAL_MANAGEMENT_ACTION,
          content: {
            departList: result.data.list || [],
            totalPage: result.data.count || 1
          }
        })
      })
      .catch(error => {
      })
  }
}

// 添加组织机构
export function departMentAdd (params, callback) {
  return dispatch => {
    httpClient.post1('urmservice/api/department/save', params)
      .then((result) => {
        dispatch({
          type: ORGANIZTTIONAL_MANAGEMENT_ACTION,
          content: {
            departList: result.data.list || [],
            totalPage: result.data.count || 1
          }
        })
        callback()
      })
      .catch(error => {
      })
  }
}

// 删除组织机构
export function departDelete (params, callback) {
  return dispatch => {
    let url = 'urmservice/api/department/delete/' + params.departCode

    httpClient.post1(url)
      .then((result) => {
        dispatch({
          type: ORGANIZTTIONAL_MANAGEMENT_ACTION,
          content: {
            departList: result.data.list || [],
            totalPage: result.data.count || 1
          }
        })
        callback()
      })
      .catch(error => {
      })
  }
}
