import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConfigProvider, Empty } from 'antd'
import { AUTH_TYPE_LOGOUT, checkAuth } from '../redux/actions/authAction'
import auth from '../network/auth'
import Login from './login/Login'
import Manage from './manage/Manage'
import TrajectoryAnalysis from './businessboard/trajectoryanalysis/TrajectoryAnalysis'
import ControlWarning from './businessboard/controlwarning/ControlWarning'
import Overview from './businessboard/overview/Overview'
import overviewOfdata from './businessboard/overviewOfdata/overviewOfdata'

/**
 * 验证权限路由
 * @param Component 需要验证的组件
 * @param rest 参数
 * @returns {*}
 * @constructor
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render = {props =>
        rest.authType !== AUTH_TYPE_LOGOUT ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}
class App extends PureComponent {
  componentDidMount () {
    auth.registerTokenEffect(() => {
    })
    this.props.checkAuth()
  }

  render () {
    const { authType } = this.props
    return (
      <ConfigProvider renderEmpty={() => <Empty />}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/manage"
            authType={authType}
            component={Manage}
          />
          <PrivateRoute
            exact
            path="/trajectoryanalysis"
            authType={authType}
            component={TrajectoryAnalysis}
          />
          <PrivateRoute
            exact
            path="/controlwarning"
            authType={authType}
            component={ControlWarning}
          />
          <PrivateRoute
            exact
            path="/overview"
            authType={authType}
            component={Overview}
          />
          <PrivateRoute
            exact
            path="/overviewOfdata"
            authType={authType}
            component={overviewOfdata}
          />
          <PrivateRoute
            exact
            path="/"
            authType={authType}
            component={Manage}
          />
        </Switch>
      </ConfigProvider>
    )
  }
}

function mapStateToProps (state) {
  return {
    authType: state.default.authReducer.get('authType')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ checkAuth }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
