import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { loadTabs, onTabChange, closeTab } from '../../../redux/actions/manageAction'
import { Tabs } from 'antd'
import PersonInOutRealTimeDataManage from '../realtimedatamanage/PersonInOutRealTimeDataManage'
import CarInOutRealTimeDataManage from '../realtimedatamanage/CarInOutRealTimeDataManage'
import PointRealTimeDataManage from '../realtimedatamanage/PointRealTimeDataManage'
// import CarManage from '../carmanage/CarManage'
// import PopulationManage from '../personmange/PersonManage'
// import HouseManage from '../housemanage/HouseManage'
// import PersonInOutManage from '../personinoutmanage/PersonInOutManage'
// import MotorInOutManage from '../carinoutmanage/MotorInOutManage'
// import NonMotorInOutManage from '../carinoutmanage/NonMotorInOutManage'
// import PopulationFloatingTopic from '../topic/specialpopulation'
// import CarManage from '../commonmanage/CarManage'
import PopulationManage from '../commonmanage/PersonManage'
import PersonManageDetail from '../commonmanage/PersonManageDetail'
import HouseManage from '../commonmanage/HouseManage'
import PersonInOutManage from '../inoutmanage/PersonInOutManage'
import MotorInOutManage from '../inoutmanage/MotorInOutManage'
import NonMotorInOutManage from '../inoutmanage/NonMotorInOutManage'
import PlaceManage from '../baseinfomanage/PlaceManage'
import PersonControlWarningManage from '../controlwaringmanage/PersonControlWarningManage'
import CarControlWarningManage from '../controlwaringmanage/CarControlWarningManage'
import PopulationFloatingTopic from '../topic/specialpopulation'
import OrganizationaManagement from '../basicInformation/organizationaManagement'
import CarManage from '../commonmanage/CarManage'
import DeviceManagement from '../basicInformation/deviceManagement'
import LabelTypeManagement from '../labelManage/labelTypeManagement'
import VehicleLabelManagement from '../labelManage/vehicleLabelManagement'
import DistributionControlManagement from '../controlAndEarlyWarning/distributionControlManagement'
import EarlyWarningManagement from '../controlAndEarlyWarning/earlyWarningManagement'
import AnalysisTrajectory from '../commonmanage/analysisTrajectory'
import PeopleDetails from '../basicInformation/peopleDetails'
import carDetails from '../basicInformation/carDetails'
import bikeleDetails from '../basicInformation/bikeleDetails'
import houseleDetails from '../basicInformation/houseleDetails'
import PrivilegeGroupManagement from '../privilegemanage/PrivilegeGroupManagement'
import PowerOperation from '../privilegemanage/PowerOperation'
import RoleOperation from '../privilegemanage/RoleOperation'
import OrganizationalManagement from '../organizationalmanagement/OrganizationalManagement'
import UserOperation from '../usermanagement/UserOperation'
import PersonManageEdit from '../commonmanage/PersonManageEdit'
import actualChange from '../actualChange/actualChange'
import './tab.less'

const TabPane = Tabs.TabPane

const tabConfig = {
  'active_link_person_real_time_data': PersonInOutRealTimeDataManage,
  'active_link_car_real_time_data': CarInOutRealTimeDataManage,
  'active_link_point_real_time_data': PointRealTimeDataManage,
  'active_link_person_manage': PopulationManage,
  'active_link_person_details': PersonManageDetail,
  'active_link_car_manage': CarManage,
  'active_link_house_manage': HouseManage,
  'active_link_person_in_out': PersonInOutManage,
  'active_link_motor_in_out': MotorInOutManage,
  'active_link_non_motor_in_out': NonMotorInOutManage,
  'active_link_population_floating_topic': PopulationFloatingTopic,
  'active_link_person_control_warning': PersonControlWarningManage,
  'active_link_car_control_warning': CarControlWarningManage,
  'active_link_organization_formation': OrganizationaManagement,
  // 'active_link_place_information': PlaceManagement,
  'active_link_device_formation': DeviceManagement,
  'active_link_label_type': LabelTypeManagement,
  'active_link_vehicle_label': VehicleLabelManagement,
  'active_link_distribution_contorl': DistributionControlManagement,
  'active_link_early_warning': EarlyWarningManagement,
  'active_link_analysis_trajectory': AnalysisTrajectory,
  'active_link_people_details': PeopleDetails,
  'active_link_car_details': carDetails,
  'active_link_bike_details': bikeleDetails,
  'active_link_house_details': houseleDetails,
  'active_link_place_manage': PlaceManage,
  'active_link_privilege_group_management': PrivilegeGroupManagement,
  'active_link_power_operation': PowerOperation,
  'active_link_role_operation': RoleOperation,
  'active_link_organizational_management': OrganizationalManagement,
  'active_link_user_operation': UserOperation,
  'active_link_person_edit': PersonManageEdit,
  'active_link_actual_change': actualChange
}

const tabLabelConfig = {
  'active_link_person_real_time_data': '人员实时数据',
  'active_link_car_real_time_data': '车辆实时数据',
  'active_link_point_real_time_data': '点位实时数据',
  'active_link_person_manage': '人口管理',
  'active_link_car_manage': '机动车管理',
  'active_link_house_manage': '房屋管理',
  'active_link_person_in_out': '人员进出管理',
  'active_link_motor_in_out': '机动车',
  'active_link_non_motor_in_out': '非机动车',
  'active_link_population_floating_topic': '外来流动人口',
  'active_link_person_control_warning': '人员布控预警',
  'active_link_car_control_warning': '车辆布控预警',
  'active_link_organization_formation': '非机动车管理',
  'active_link_place_information': '机动车管理',
  'active_link_label_type': '标签类型管理',
  'active_link_vehicle_label': '人车标签管理',
  'active_link_distribution_contorl': '布控管理',
  'active_link_early_warning': '预警管理',
  'active_link_analysis_trajectory': '轨迹分析',
  'active_link_people_details': '人员详情',
  'active_link_car_details': '车辆详情',
  'active_link_bike_details': '二轮车详情',
  'active_link_house_details': '房屋详情',
  'active_link_person_details': '人口详情',
  'active_link_place_manage': '场所管理',
  'active_link_privilege_group_management': '权限分组',
  'active_link_power_operation': '权限操作',
  'active_link_role_operation': '角色操作',
  'active_link_bicycle_real_time_data': '非机动车实时数据',
  'active_link_organizational_management': '机构管理',
  'active_link_user_operation': '用户管理',
  'active_link_person_edit': '新增用户',
  'active_link_actual_change': '人口实有化'
}

class Tab extends PureComponent {
  componentDidMount () {
    const { location, loadTabs } = this.props
    if (location && location.state) {
      loadTabs(location.state.activeLink)
    } else {
      loadTabs()
    }
  }

  onEdit (targetKey, action) {
    const { tabs, closeTab, activeLink } = this.props
    if (action === 'remove') {
      closeTab(targetKey, tabs, activeLink)
    }
  }

  render () {
    const { tabs, activeLink, onTabChange } = this.props
    return (
      <Tabs
        hideAdd
        onChange={onTabChange}
        onEdit={(targetKey, action) => this.onEdit(targetKey, action)}
        activeKey={activeLink}
        type="editable-card">
        {
          tabs.map(key =>
            <TabPane
              key={key}
              className="tab-page-root"
              style={{ height: document.body.clientHeight - 120 }}
              tab={tabLabelConfig[key]} closable={tabs.size !== 1}>
              <Route component={tabConfig[key]} />
            </TabPane>
          )
        }
      </Tabs>
    )
  }
}

function mapStateToProps (state) {
  return {
    tabs: state.default.manageReducer.get('tabs'),
    activeLink: state.default.manageReducer.get('activeLink')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ loadTabs, onTabChange, closeTab }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab)
