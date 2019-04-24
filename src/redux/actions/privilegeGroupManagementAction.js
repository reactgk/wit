import httpClient from '../../network/httpClient.js'

export const PRIVILEGE_GROUP_MANAGEMENT_ACTION = 'privilege_group_management_action'

export function setPrivilegeGroupList (params) {
  return dispatch => {
    httpClient.post1('urmservice/api/power/group/query', params)
      .then((result) => {
        dispatch({
          type: PRIVILEGE_GROUP_MANAGEMENT_ACTION,
          content: {
            privilegeGroup: result.data || []
          }
        })
      })
      .catch(error => {
      })
  }
}

/**
 * 权限组添加操作
 * params Object params 数据信息
 * params function callback 回调函数
 */
export function privilegeGroupAdd (params, callback) {
  return dispatch => {
    httpClient.post1('urmservice/api/power/group/save', params)
      .then((result) => {
        callback()
        dispatch({
          type: PRIVILEGE_GROUP_MANAGEMENT_ACTION
          // content: {
          //   privilegeGroup: result.data || []
          // }
        })
      })
      .catch(error => {
      })
  }
}

/**
 * 权限组删除操作
 * params Object params 数据信息
 * params function callback 回调函数
 */
export function privilegeGroupDelete (params, callback) {
  return dispatch => {
    let url = 'urmservice/api/power/group/delete/' + params.powerTypeGroupCode
    httpClient.post1(url)
      .then((result) => {
        dispatch({
          type: PRIVILEGE_GROUP_MANAGEMENT_ACTION
          // content: {
          //   privilegeGroup: result.data || []
          // }
        })
        callback()
      })
      .catch(error => {
      })
  }
}
