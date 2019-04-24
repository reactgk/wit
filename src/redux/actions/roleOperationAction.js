import httpClient from '../../network/httpClient.js'

export const ROLE_OPERATION_ACTION = 'role_operation_action'

/*
  * 获取角色列表
  * param Object params 搜索条件对象
*/
export function roleAllList (params) {
  return dispatch => {
  // const init = {
  //  method: 'POST',
  //  body: JSON.stringify(params),
  //  headers: {
  //    'Content-Type': 'application/json',
  //   },
  // }

    //    fetch('http://192.168.1.22:7788/api/power/role/list/query', init)
    //    .then((response) => response.json())
    httpClient.post1('urmservice/api/power/role/list/query', params)
      .then((result) => {
        console.log(result)
        dispatch({
          type: ROLE_OPERATION_ACTION,
          content: {
            roleList: result.data || [],
            totalPage: result.data.length || 1
          }
        })
      })
      .catch(error => { })
  }
}

/*
  * 角色添加操作
  * param Object params 添加角色信息对象
*/
export function roleAdd (params, callback) {
  return dispatch => {
    // const init = {
    //  method: 'POST',
    //  body: JSON.stringify(params),
    //  headers: {
    //    'Content-Type': 'application/json',
    //  },
    // }

    // let url = "http://192.168.1.22:7788/api/power/role/save";
    // fetch(url, init)
    // .then((response) => response.json())
    httpClient.post1('urmservice/api/power/role/save', params)
      .then((result) => {
        callback()
        dispatch({
          type: ROLE_OPERATION_ACTION,
          content: {
            powerList: result.data || [],
            totalPage: result.data.length || 1
          }
        })
      })
      .catch(error => { })
  }
}

/*
  * 角色删除
*/
export function roleDelete (params, callback) {
  return dispatch => {
    // const init = {
    //  method: 'POST',
    //  headers: {
    //    'Content-Type': 'application/json',
    //  }
    // }

    // let url = 'http://192.168.1.22:7788/api/power/role/delete/' + params.roleID;

    // fetch(url, init)
    // .then((response) => response.json())
    httpClient.post1('urmservice/api/power/role/delete/' + params.roleID)
      .then((result) => {
        callback()
        dispatch({
          type: ROLE_OPERATION_ACTION,
          content: {
            powerList: result.data || [],
            totalPage: result.data.length || 1
          }
        })
      })
      .catch(error => { })
  }
}
