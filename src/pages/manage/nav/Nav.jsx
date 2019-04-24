import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {

  ACTIVE_LINK_POINT_REAL_TIME_DATA,
  ACTIVE_LINK_PERSON_MANAGE,
  ACTIVE_LINK_PERSON_IN_OUT,
  ACTIVE_LINK_MOTOR_IN_OUT,
  ACTIVE_LINK_NON_MOTOR_IN_OUT,
  ACTIVE_LINK_CAR_MANAGE,
  ACTIVE_LINK_POPULATION_FLOATING_TOPIC,
  ACTIVE_LINK_ORGANIZATION_FORMATION,
  ACTIVE_LINK_LABEL_TYPE,
  ACTIVE_LINK_VEHICLE_LABEL,
  ACTIVE_LINK_DISTRIBUTION_CONTORL,
  ACTIVE_LINK_EARLY_WARNING,
  ACTIVE_LINK_HOUSE_MANAGE,
  // ACTIVE_LINK_PEOPLE_DETAILS,
  // ACTIVE_LINK_DEVICE_FORMATION,
  ACTIVE_LINK_PLACE_MANAGE,
  setBusinessBoardSpread,
  setCarExitSpread,
  setRealTimeDataSpread,
  setActiveLink,
  setbusinessManagement,
  setInformationMaintain,
  setLabelType,
  setControlWarning,
  // ACTIVE_LINK_SPECIAL_PULATION
  setBaseInfoSpread,
  // 权限分组
  ACTIVE_LINK_PRIVILEGE_GROUP_MANAGEMENT,
  setPrivilegeManagement,
  // 权限操作
  ACTIVE_LINK_POWER_OPERATION,
  // 角色操作
  ACTIVE_LINK_ROLE_OPERATION,

  // 机构管理
  ACTIVE_LINK_ORGANIZTTIONAL_MANAGEMENT,

  // 用户管理
  setUserManagement,
  ACTIVE_LINK_USER_OPERATION
} from '../../../redux/actions/manageAction'
import './nav.less'

import navBg from '../../../assets/images/manage-nav-bg.png'

class Nav extends PureComponent {
  renderBusinessBoardMenu () {
    const { isBusinessBoardSpread, setBusinessBoardSpread } = this.props
    return (
      <Fragment>
        <div className={isBusinessBoardSpread ? 'nav-item nav-item-active' : 'nav-item'}
          onClick={() => {
            setBusinessBoardSpread(isBusinessBoardSpread)
          }}>
          <span className="icon-wrapper">
            <i className="iconfont icon-board"/>
          </span>
          <span className="label">业务看板</span>
          <span className={isBusinessBoardSpread ? 'triangle-down' : 'triangle-up'}/>
        </div>
        <div style={{ display: isBusinessBoardSpread ? '' : 'none' }}>
          <a className="nav-item nav-sub-item"
            href="/overviewOfdata"
            target="_blank">
            <span className="icon-wrapper">
              <i className="iconfont icon-summary" />
            </span>
            <span className="label">一张图</span>
          </a>
          <a className="nav-item nav-sub-item"
            href="/overview"
            target="_blank">
            <span className="icon-wrapper">
              <i className="iconfont icon-summary"/>
            </span>
            <span className="label">综合概览</span>
          </a>
          <a className="nav-item nav-sub-item"
            href="/trajectoryanalysis"
            target="_blank">
            <span className="icon-wrapper">
              <i className="iconfont icon-trajectory-analysis"/>
            </span>
            <span className="label">轨迹分析</span>
          </a>
          <a className="nav-item nav-sub-item"
            href="/controlwarning"
            target="_blank">
            <span className="icon-wrapper">
              <i className="iconfont icon-control-warning" style={{ marginBottom: 4 }}/>
            </span>
            <span className="label">布控预警</span>
          </a>
        </div>
      </Fragment>
    )
  }

  renderRealTimeMenu () {
    const { isRealTimeDataSpread, tabs, activeLink, setRealTimeDataSpread, setActiveLink } = this.props
    return (
      <Fragment>
        <div className={isRealTimeDataSpread ? 'nav-item nav-item-active' : 'nav-item'}
          onClick={() => {
            setRealTimeDataSpread(isRealTimeDataSpread)
          }}>
          <span className="icon-wrapper">
            <i className="iconfont icon-real-time"/>
          </span>
          <span className="label">实时数据</span>
          <span className={isRealTimeDataSpread ? 'triangle-down' : 'triangle-up'}/>
        </div>
        <div style={{ display: isRealTimeDataSpread ? '' : 'none' }}>
          <div
            className={activeLink === ACTIVE_LINK_POINT_REAL_TIME_DATA ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_POINT_REAL_TIME_DATA, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-real-time"/>
            </span>
            <span className="label">点位实时数据</span>
          </div>
        </div>
      </Fragment>
    )
  }

  renderCarExitMenu () {
    const { isCarExitSpread, tabs, activeLink, setCarExitSpread, setActiveLink } = this.props
    return (
      <Fragment>
        <div className={isCarExitSpread ? 'nav-item nav-item-active' : 'nav-item'}
          onClick={() => {
            setCarExitSpread(isCarExitSpread)
          }}>
          <span className="icon-wrapper">
            <i className="iconfont icon-car-in-out"/>
          </span>
          <span className="label">车行记录查询</span>
          <span className={isCarExitSpread ? 'triangle-down' : 'triangle-up'}/>
        </div>
        <div style={{ display: isCarExitSpread ? '' : 'none' }}>
          <div
            className={activeLink === ACTIVE_LINK_MOTOR_IN_OUT ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_MOTOR_IN_OUT, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-motor"/>
            </span>
            <span className="label">机动车</span>
          </div>
          <div
            className={activeLink === ACTIVE_LINK_NON_MOTOR_IN_OUT ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_NON_MOTOR_IN_OUT, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-non-motor"/>
            </span>
            <span className="label">非机动车</span>
          </div>
        </div>
      </Fragment>
    )
  }

  thematicBusinessManagementMenu () {
    const { businessManagementMenu, tabs, activeLink, setbusinessManagement, setActiveLink } = this.props
    return (
      <Fragment>
        <div className={businessManagementMenu ? 'nav-item nav-item-active' : 'nav-item'}
          onClick={() => {
            setbusinessManagement(businessManagementMenu)
          }}>
          <span className="icon-wrapper">
            <i className="iconfont icon-car-in-out"/>
          </span>
          <span className="label">专题业务管理</span>
          <span className={businessManagementMenu ? 'triangle-down' : 'triangle-up'}/>
        </div>
        <div style={{ display: businessManagementMenu ? '' : 'none' }}>
          <div
            className={activeLink === ACTIVE_LINK_POPULATION_FLOATING_TOPIC ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_POPULATION_FLOATING_TOPIC, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-motor"/>
            </span>
            <span className="label">外来流动人口</span>
          </div>

        </div>
      </Fragment>
    )
  }

  BasicInformationMaintenanceMenu () {
    const { isInformationMaintain, tabs, activeLink, setInformationMaintain, setActiveLink } = this.props
    return (
      <Fragment>
        <div className={isInformationMaintain ? 'nav-item nav-item-active' : 'nav-item'}
          onClick={() => {
            setInformationMaintain(isInformationMaintain)
          }}>
          <span className="icon-wrapper">
            <i className="iconfont icon-car-in-out"/>
          </span>
          <span className="label">车辆管理</span>
          <span className={isInformationMaintain ? 'triangle-down' : 'triangle-up'}/>
        </div>
        <div style={{ display: isInformationMaintain ? '' : 'none' }}>
          <div
            className={activeLink === ACTIVE_LINK_ORGANIZATION_FORMATION ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_ORGANIZATION_FORMATION, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-motor"/>
            </span>
            <span className="label">非机动车管理</span>
          </div>
          <div
            className={activeLink === ACTIVE_LINK_CAR_MANAGE ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_CAR_MANAGE, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-motor"/>
            </span>
            <span className="label">机动车管理</span>
          </div>
        </div>
      </Fragment>
    )
  }

  LabelTypeMenu () {
    const { iLabelTypeMaintain, tabs, activeLink, setLabelType, setActiveLink } = this.props
    return (
      <Fragment>
        <div className={iLabelTypeMaintain ? 'nav-item nav-item-active' : 'nav-item'}
          onClick={() => {
            setLabelType(iLabelTypeMaintain)
          }}>
          <span className="icon-wrapper">
            <i className="iconfont icon-car-in-out"/>
          </span>
          <span className="label">标签管理</span>
          <span className={iLabelTypeMaintain ? 'triangle-down' : 'triangle-up'}/>
        </div>
        <div style={{ display: iLabelTypeMaintain ? '' : 'none' }}>
          <div
            className={activeLink === ACTIVE_LINK_LABEL_TYPE ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_LABEL_TYPE, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-motor"/>
            </span>
            <span className="label">标签类型管理</span>
          </div>
          <div
            className={activeLink === ACTIVE_LINK_VEHICLE_LABEL ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_VEHICLE_LABEL, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-motor"/>
            </span>
            <span className="label">人车标签管理</span>
          </div>
        </div>
      </Fragment>
    )
  }

  controlAndEarlyWarningMenu () {
    const { iControlWarning, tabs, activeLink, setControlWarning, setActiveLink } = this.props
    return (
      <Fragment>
        <div className={iControlWarning ? 'nav-item nav-item-active' : 'nav-item'}
          onClick={() => {
            setControlWarning(iControlWarning)
          }}>
          <span className="icon-wrapper">
            <i className="iconfont icon-car-in-out"/>
          </span>
          <span className="label">布控预警</span>
          <span className={iControlWarning ? 'triangle-down' : 'triangle-up'}/>
        </div>
        <div style={{ display: iControlWarning ? '' : 'none' }}>
          <div
            className={activeLink === ACTIVE_LINK_DISTRIBUTION_CONTORL ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_DISTRIBUTION_CONTORL, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-motor"/>
            </span>
            <span className="label">布控管理</span>
          </div>
          <div
            className={activeLink === ACTIVE_LINK_EARLY_WARNING ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_EARLY_WARNING, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-motor"/>
            </span>
            <span className="label">预警管理</span>
          </div>
        </div>
      </Fragment>
    )
  }

  renderBaseInfoMenu () {
    const { isBaseInfoSpread, tabs, activeLink, setBaseInfoSpread, setActiveLink } = this.props
    return (
      <Fragment>
        <div className={isBaseInfoSpread ? 'nav-item nav-item-active' : 'nav-item'}
          onClick={() => {
            setBaseInfoSpread(isBaseInfoSpread)
          }}>
          <span className="icon-wrapper">
            <i className="iconfont icon-real-time"/>
          </span>
          <span className="label">基础信息维护</span>
          <span className={isBaseInfoSpread ? 'triangle-down' : 'triangle-up'}/>
        </div>
        <div style={{ display: isBaseInfoSpread ? '' : 'none' }}>
          <div
            className={activeLink === ACTIVE_LINK_PLACE_MANAGE ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_PLACE_MANAGE, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-person-real-time"/>
            </span>
            <span className="label">场所管理</span>
          </div>
        </div>
      </Fragment>
    )
  }

  // 权限菜单列表
  renderPrivilegeManagement () {
    const { isPrivilegeManagement, tabs, activeLink, setPrivilegeManagement, setActiveLink } = this.props
    return (
      <Fragment>
        <div className={isPrivilegeManagement ? 'nav-item nav-item-active' : 'nav-item'}
          onClick={() => {
            setPrivilegeManagement(isPrivilegeManagement)
          }}>
          <span className="icon-wrapper">
            <i className="iconfont icon-car-in-out"/>
          </span>
          <span className="label">角色权限管理</span>
          <span className={isPrivilegeManagement ? 'triangle-down' : 'triangle-up'}/>
        </div>
        <div style={{ display: isPrivilegeManagement ? '' : 'none' }}>
          <div
            className={activeLink === ACTIVE_LINK_PRIVILEGE_GROUP_MANAGEMENT ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_PRIVILEGE_GROUP_MANAGEMENT, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-motor"/>
            </span>
            <span className="label">权限分组</span>
          </div>
        </div>
        <div style={{ display: isPrivilegeManagement ? '' : 'none' }}>
          <div
            className={activeLink === ACTIVE_LINK_POWER_OPERATION ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_POWER_OPERATION, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-motor"/>
            </span>
            <span className="label">权限操作</span>
          </div>
        </div>
        <div style={{ display: isPrivilegeManagement ? '' : 'none' }}>
          <div
            className={activeLink === ACTIVE_LINK_ROLE_OPERATION ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_ROLE_OPERATION, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-motor"/>
            </span>
            <span className="label">角色操作</span>
          </div>
        </div>
      </Fragment>
    )
  }

  // 用户菜单列表
  renderUserManagement () {
    const { isUserManagement, tabs, activeLink, setUserManagement, setActiveLink } = this.props
    return (
      <Fragment>
        <div className={isUserManagement ? 'nav-item nav-item-active' : 'nav-item'}
          onClick={() => {
            setUserManagement(isUserManagement)
          }}>
          <span className="icon-wrapper">
            <i className="iconfont icon-car-in-out"/>
          </span>
          <span className="label">用户管理</span>
          <span className={isUserManagement ? 'triangle-down' : 'triangle-up'}/>
        </div>
        <div style={{ display: isUserManagement ? '' : 'none' }}>
          <div
            className={activeLink === ACTIVE_LINK_USER_OPERATION ? 'nav-item nav-sub-item nav-sub-item-active' : 'nav-item nav-sub-item'}
            onClick={() => {
              setActiveLink(ACTIVE_LINK_USER_OPERATION, tabs)
            }}>
            <span className="icon-wrapper">
              <i className="iconfont icon-motor"/>
            </span>
            <span className="label">用户操作</span>
          </div>
        </div>
      </Fragment>
    )
  }

  render () {
    const { tabs, activeLink, setActiveLink } = this.props
    return (
      <div className="nav">
        <img className="nav-image" src={navBg}/>
        <div className="nav-item nav-item-title">
          <span className="icon-wrapper">
            <i className="iconfont icon-function"/>
          </span>
          <span className="label">功能导航</span>
          <span className="icon-wrapper" style={{ right: 6 }}>
            <i className="iconfont icon-function-fold"/>
          </span>
        </div>
        {this.renderBusinessBoardMenu()}
        {this.renderRealTimeMenu()}
        <div className={activeLink === ACTIVE_LINK_PERSON_MANAGE ? 'nav-item nav-sub-item-active' : 'nav-item'}
          onClick={() => {
            setActiveLink(ACTIVE_LINK_PERSON_MANAGE, tabs)
          }}>
          <span className="icon-wrapper">
            <i className="iconfont icon-person-manage"/>
          </span>
          <span className="label">人口管理</span>
        </div>
        <div className={activeLink === ACTIVE_LINK_HOUSE_MANAGE ? 'nav-item nav-sub-item-active' : 'nav-item'}
          onClick={() => {
            setActiveLink(ACTIVE_LINK_HOUSE_MANAGE, tabs)
          }}>
          <span className="icon-wrapper">
            <i className="iconfont icon-car-manage"/>
          </span>
          <span className="label">房屋管理</span>
        </div>

        {this.BasicInformationMaintenanceMenu()}
        <div className={activeLink === ACTIVE_LINK_PERSON_IN_OUT ? 'nav-item nav-sub-item-active' : 'nav-item'}
          onClick={() => {
            setActiveLink(ACTIVE_LINK_PERSON_IN_OUT, tabs)
          }}>
          <span className="icon-wrapper">
            <i className="iconfont icon-person-in-out"/>
          </span>
          <span className="label">人行记录查询</span>
        </div>
        {this.renderCarExitMenu()}
        {this.controlAndEarlyWarningMenu()}
        {this.thematicBusinessManagementMenu()}
        {this.renderBaseInfoMenu()}
        {this.LabelTypeMenu()}
        <div
          className={activeLink === ACTIVE_LINK_ORGANIZTTIONAL_MANAGEMENT ? 'nav-item nav-sub-item-active' : 'nav-item'}
          onClick={() => {
            setActiveLink(ACTIVE_LINK_ORGANIZTTIONAL_MANAGEMENT, tabs)
          }}>
          <span className="icon-wrapper">
            <i className="iconfont icon-person-in-out"/>
          </span>
          <span className="label">机构管理</span>
        </div>
        {this.renderPrivilegeManagement()}
        {this.renderUserManagement()}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isBaseInfoSpread: state.default.manageReducer.get('isBaseInfoSpread'),
    isBusinessBoardSpread: state.default.manageReducer.get('isBusinessBoardSpread'),
    isRealTimeDataSpread: state.default.manageReducer.get('isRealTimeDataSpread'),
    isCarExitSpread: state.default.manageReducer.get('isCarExitSpread'),
    activeLink: state.default.manageReducer.get('activeLink'),
    tabs: state.default.manageReducer.get('tabs'),
    businessManagementMenu: state.default.manageReducer.get('businessManagementMenu'),
    isInformationMaintain: state.default.manageReducer.get('isInformationMaintain'),
    iLabelTypeMaintain: state.default.manageReducer.get('iLabelTypeMaintain'),
    iControlWarning: state.default.manageReducer.get('iControlWarning'),
    isPrivilegeManagement: state.default.manageReducer.get('isPrivilegeManagement'),
    isUserManagement: state.default.manageReducer.get('isUserManagement')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setBaseInfoSpread,
    setBusinessBoardSpread,
    setCarExitSpread,
    setRealTimeDataSpread,
    setActiveLink,
    setbusinessManagement,
    setInformationMaintain,
    setLabelType,
    setControlWarning,
    setPrivilegeManagement,
    setUserManagement
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
