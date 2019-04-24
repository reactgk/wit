export const menuConfig = [
  { key: 'overview', name: '场所数据概览', link: '/overview' },
  {
    key: 'realTimeData', name: '实时数据', iconType: 'fund',
    subMenu: [
      { key: 'realTimeDataPopulation', name: '人员实时数据', link: '/realtimedatamanage/personmange', iconType: 'user' },
      { key: 'realTimeDataVehicle', name: '车辆实时数据', link: '/realtimedatamanage/vehicle', iconType: 'carmanage' },
      { key: 'realTimeDataPoint', name: '点位实时数据', link: '/realtimedatamanage/point', iconType: 'fund' }
    ]
  },
  { key: 'personmange', name: '人口管理', link: '/personmange/manage', iconType: 'user' },
  { key: 'carManage', name: '车辆管理', link: '/carmanage/manage', iconType: 'carmanage' },
  { key: 'houseManage', name: '房屋管理', link: '/commonmanage/manage', iconType: 'home' },
  { key: 'exitPersonnelManage ', name: '人员出入管理', link: '/personinoutmanage/manage', iconType: 'user' },
  {
    key: 'VehicleEntryExitManage', name: '车辆出入管理', iconType: 'carmanage',
    subMenu: [
      { key: 'motor', name: '机动车', link: '/inoutmanage/manage/motor', iconType: 'carmanage' },
      { key: 'nonMotor', name: '非机动车', link: '/inoutmanage/manage/nonmotor', iconType: 'carmanage' }
    ]
  },
  {
    key: 'Speciatopiconmigrantpopulation', name: '流动人口', iconType: 'carmanage',
    subMenu: [
      { key: 'motor', name: 'DAAD', link: '/topic/manage/specialpopulation', iconType: 'carmanage' }
      // { key: 'nonMotor', name: '非机动车', link: '/carinoutmanage/manage/nonmotor', iconType: 'carmanage' }
    ]
  },
  {
    key: 'BasicInformation', name: '车辆管理', iconType: 'carmanage',
    subMenu: [
      { key: 'organizationI', name: '非机动车管理', link: '/basicInformation/manage/organizationaManagement', iconType: 'carmanage' },
      { key: 'carManage', name: '机动车管理', link: '/commonmanage/CarManage', iconType: 'carmanage' }
      // { key: 'pointI', name: '房屋管理', link: '/basicInformation/manage/houseManagement', iconType: 'carmanage' }
      // { key: 'deviceI', name: '设备管理', link: '/basicInformation/manage/organizationaManagement', iconType: 'carmanage' }
    ]
  },
  {
    key: 'labelManage', name: '标签管理', iconType: 'carmanage',
    subMenu: [
      { key: 'labelTypeM', name: '标签类型管理', link: '/labelManage/manage/labelTypeManagement', iconType: 'carmanage' },
      { key: 'vehicleLabel', name: '人车标签管理', link: '/labelManage/manage/vehicleLabelManagement', iconType: 'carmanage' }
    ]
  },
  {
    key: 'labelManage', name: '布控预警', iconType: 'carmanage',
    subMenu: [
      { key: 'labelTypeM', name: '布控管理', link: '/controlAndEarlyWarning/manage/distributionControlManagement', iconType: 'carmanage' },
      { key: 'vehicleLabel', name: '预警管理', link: '/controlAndEarlyWarning/manage/earlyWarningManagement', iconType: 'carmanage' }
    ]
  },
  { key: 'personmange', name: '轨迹分析', link: '/analysisTrajectory/manage', iconType: 'user' },
  {
    key: 'BaseInfoManage', name: '基础信息维护', iconType: 'baseinfomanage',
    subMenu: [
      { key: 'place', name: '场所', link: '/baseinfomanage/manage/place', iconType: 'placemanage' }
    ]
  }

























>>>>>>> .theirs
]
