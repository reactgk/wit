import auth from '../../network/auth'
import httpClient from '../../network/httpClient'
// import Axios from 'axios'
export const AUTH_ACTION = 'auth_action'

export const AUTH_TYPE_NONE = 'auth_type_none'
export const AUTH_TYPE_LOGIN = 'auth_type_login_success'
export const AUTH_TYPE_LOGOUT = 'auth_type_logout'

/**
 * 登录
 * @returns {{type: string, content: {isLogin: boolean}}}
 */
// export function login () {
//   const token = '89uy12iujghty156bvnf'
//   auth.authenticate(token, () => { })
//   window.localStorage.setItem('token', token)
//   return {
//     type: AUTH_ACTION,
//     content: {
//       authType: AUTH_TYPE_LOGIN
//     }
//   }
// }

export function login (user, pass) {
  return dispatch => {
    let params = {}
    params.loginName = user
    params.loginPWD = pass
    params.key = ''

    httpClient.post1('urmservice/api/user/login', params)
      .then((result) => {
        auth.authenticate(result.data.token, () => { })
        window.localStorage.setItem('token', result.data.token)
        window.localStorage.setItem('userInfo', result.data.userName)
        window.localStorage.setItem('unit', result.data.unit)
        dispatch({
          type: AUTH_ACTION,
          content: {
            authType: result.status === 0 ? AUTH_TYPE_LOGIN : '',
            userInfo: result.data.userName,
            unit: result.data.unit
          }
        })
      })
      .catch(error => { console.log(error) })
  }
}

/**
 * 登出
 */
export function logout () {
  auth.authenticate('', () => { })
  window.localStorage.setItem('token', '')
  return {
    type: AUTH_ACTION,
    content: {
      authType: AUTH_TYPE_LOGOUT
    }
  }
}

/**
 * 检查是否登录
 * @returns {{type: string, content: {authType: string}}}
 */
export function checkAuth () {
  const token = window.localStorage.getItem('token')
  auth.authenticate(token, () => { })
  const authType = token ? AUTH_TYPE_LOGIN : AUTH_TYPE_LOGOUT
  return {
    type: AUTH_ACTION,
    content: {
      authType: authType
    }
  }
}
