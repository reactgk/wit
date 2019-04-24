/**
 * token管理
 * @type {{token: string, isLogin(): *, logout(): void}}
 */
const auth = {
  token: '',
  /**
   * token变化监听
   */
  tokenEffect: () => {},
  getToken () {
    return this.token
  },
  authenticate (token, callback) {
    this.token = token
    if (callback) {
      setTimeout(callback, 100)
    }
  },
  signout (callback) {
    this.token = ''
    if (this.tokenEffect) {
      this.tokenEffect()
    }
    if (callback) {
      setTimeout(callback, 100)
    }
  },
  /**
   * 注册token变化监听
   * @param callback
   */
  registerTokenEffect (callback) {
    this.tokenEffect = callback
  }
}

export default auth
