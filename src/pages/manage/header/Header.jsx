import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../../redux/actions/authAction'

import './header.less'

import headerImage from '../../../assets/images/manage-header-bg.png'

class Header extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      userInfo: props.userInfo,
      unit: props.unit
    }
  }
  render () {
    const { logout } = this.props
    return (
      <header className="manage-header">
        <span>昆玉智慧平安社区汇聚平台</span>
        <img className="manage-header-img" src={headerImage} />
        <div className="manage-header-right">
          <i className="iconfont icon-user" />
          <div className="user-info">
            <p style={{ fontSize: 16 }}>{window.localStorage.userInfo}</p>
            <p style={{ fontSize: 14, fontWeight: 300 }}>{window.localStorage.unit}</p>
          </div>
          <div className="logout-wrapper">
            <i
              className="iconfont icon-logout"
              onClick={logout} />
          </div>
        </div>
      </header>
    )
  }
}

function mapStateToProps (state) {
  return {
    userInfo: state.default.authReducer.get('userInfo'),
    unit: state.default.authReducer.get('unit')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
