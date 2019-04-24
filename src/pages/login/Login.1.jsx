import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CanvasNest from 'canvas-nest.js'
import VerifyCode from './VerifyCode'
import { AUTH_TYPE_LOGIN, login } from '../../redux/actions/authAction'
import { Checkbox, message } from 'antd'

import './login.less'

const config = {
  color: '255,255,255',
  count: 188,
  zIndex: 1,
  opacity: 0.8
}

class Login extends PureComponent {
  constructor (props) {
    super(props)
    this.cn = null
  }

  componentDidMount () {
    this.cn = new CanvasNest(document.getElementById('canvasNest'), config)
    this.verifyCodeComponent = new VerifyCode({
      wrapperId: 'verifyCodeWrapper',
      width: 128,
      height: 44
    })
  }

  componentWillUnmount () {
    this.cn.destroy()
  }

  /**
   * 登录按钮点击事件
   */
  loginClick () {
    const { login } = this.props
    const userName = this.userNameInput.value
    if (!userName) {
      message.warning('请输入用户名')
      return null
    }
    const password = this.passwordInput.value
    if (!password) {
      message.warning('请输入密码')
      return null
    }
    const verifyCode = this.verifyCodeInput.value
    if (!verifyCode) {
      message.warning('请输入验证码')
      return null
    }
    if (verifyCode.length !== 4 || !this.verifyCodeComponent.validate(verifyCode)) {
      message.warning('验证码不正确')
      return null
    }
    login(userName, password)
  }

  render () {
    const { authType, location } = this.props
    if (authType === AUTH_TYPE_LOGIN) {
      return <Redirect to={location.from || { from: { pathname: '/manage' } } }/>
    }
    return (
      <div id="canvasNest" className="login">
        <div className="login-content">
          <p className="login-title">智慧平安社区汇聚平台</p>
          <div className="login-input">
            <i style={{ backgroundImage: 'url(' + require('../../assets/images/login-user.png') + ')' }}/>
            <input
              ref={(el) => { this.userNameInput = el }}
              placeholder="请输入用户名"/>
          </div>
          <div className="login-input">
            <i style={{ backgroundImage: 'url(' + require('../../assets/images/login-password.png') + ')' }}/>
            <input
              ref={(el) => { this.passwordInput = el }}
              type="password"
              placeholder="请输入密码"/>
          </div>
          <div>
            <div className="login-input" style={{ width: 240, display: 'inline-block' }}>
              <i style={{ backgroundImage: 'url(' + require('../../assets/images/login-verify.png') + ')' }}/>
              <input
                ref={(el) => { this.verifyCodeInput = el }}
                placeholder="验证码"/>
            </div>
            <div id='verifyCodeWrapper' className="verify-root">
            </div>
          </div>
          <div style={{ textAlign: 'right', color: '#3399cc', marginTop: 17 }}>
            <Checkbox />
            <span>记住账号</span>
          </div>
          <div className="login-button">
            <button className="confirm-button" onClick={() => { this.loginClick() }}>登录</button>
            <button className="cancel-button">取消</button>
          </div>
          <p className="login-copy-right">Copyright&nbsp;©&nbsp;2018&nbsp;新疆智翔科技有限公司版权所有</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    authType: state.default.authReducer.get('authType')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ login }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
