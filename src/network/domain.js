import config from './config'

const env = process.env.NODE_ENV

/**
 * 检查域名是否合法
 * @param domain 域名
 */
function checkDomain (domain = '') {
  if (domain === '' ||
    (!domain.startsWith('http') && !domain.startsWith('https') && !domain.startsWith('ws') && !domain.startsWith('ws'))) {
    let extendMessage = 'src/network/config.js'
    if (env !== 'production') {
      extendMessage = '.env.production'
    }
    throw new Error(`Domain is invalid, please edit file ${extendMessage}.`)
  }
}

/**
 * 获取http url
 * @returns {string}
 */
function getHttpUrl () {
  let requestUrl = ''
  console.log(process.env)
  if (env !== 'production') {
    requestUrl = config.HTTP_DOMAIN
  } else {
    requestUrl = process.env.REACT_APP_HTTP_DOMAIN
  }
  checkDomain(requestUrl)
  return requestUrl
}

/**
 * 获取ws url
 * @returns {string}
 */
function getWsUrl () {
  let requestUrl = ''
  if (env !== 'production') {
    requestUrl = config.WS_DOMAIN
  } else {
    requestUrl = process.env.REACT_APP_WS_DOMAIN
  }
  checkDomain(requestUrl)
  return requestUrl
}

export { getHttpUrl, getWsUrl }
