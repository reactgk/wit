/**
 * http请求封装
 */
import axios from 'axios'
import { getHttpUrl } from './domain'
import auth from './auth'

const httpUrl = getHttpUrl()

const httpClient = {}

/**
 * 处理错误
 * @param reject
 * @param error
 */
function handlerError (reject, error) {
  reject({ status: -1, message: '网络错误' })
}

/**
 * 处理结果
 * @param resolve
 * @param reject
 * @param result
 */
function handlerResult (resolve, reject, result) {
  const { status, statusText, data } = result
  if (status === 200) {
    if (data.status === 0) {
      resolve(data)
    } else {
      reject({ status, message: data.message })
    }
  } else {
    reject({ status, message: statusText })
  }
}

/**
 * 请求
 * @param method 方法
 * @param url 拼接在域名后面的url
 * @param data 请求数据
 */
function request (method, url, data) {
  const fullUrl = `${httpUrl}/${url}`
  // 原有获取token方式
  // const token = auth.getToken()
  // 新获取token方式
  let token = ''
  if (auth.getToken() === '') {
    token = window.localStorage.token
  } else {
    token = auth.getToken()
  }
  return new Promise((resolve, reject) => {
    axios.request({
      method: method,
      url: fullUrl,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*',
        'Content-Encoding': 'deflate; g-zip',
        'Cache-Control': 'no-cache',
        'Token': token
      },
      withCredentials: true
    }).then(result => { handlerResult(resolve, reject, result) })
      .catch(error => { handlerError(reject, error) })
  })
}

/**
 * get 请求
 * @param url 拼接在域名后面的url
 * @param params 可变参数
 */
httpClient.get = (url, ...params) => {
  let getRequestUrl = url
  if (params) {
    getRequestUrl = `${getRequestUrl}/${params.join('/')}`
  }
  return request('GET', getRequestUrl)
}

/**
 * post 请求
 * @param url 拼接在域名后面的url
 * @param params 请求参数
 */
httpClient.post = (url, params) => {
  let data = { data: params }
  return request('POST', url, data)
}
/**
 * post 请求-不封装参数
 * @param url 拼接在域名后面的url
 * @param params 请求参数
 */
httpClient.post1 = (url, params) => {
  // let data = { data: params }
  return request('POST', url, params)
}

export default httpClient
