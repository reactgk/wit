import httpClient from '../../network/httpClient.js'
export const OVERVIEW_ACTION = 'overview_action'

// 基础信息点位
export const BASE_DATA_POINT = 'base_data_point'
// 基础信息房屋
export const BASE_DATA_HOUSE = 'base_data_house'
// 基础信息场所
export const BASE_DATA_PLACE = 'base_data_place'

// 流量汇总当日
export const FLOW_TAB_COLLECT_TODAY = 'flow_data-collect_today'
// 流量汇总累计
export const FLOW_TAB_COLLECT_TOTAL = 'flow_data-collect_total'
// 人/车流量当日
export const FLOW_TAB_CAR_PERSON_TODAY = 'flow_tab_car_person_today'
// 人/车流量七日
export const FLOW_TAB_CAR_PERSON_SEVEN_DAYS = 'flow_tab_car_person_seven_days'

/**
 * 获取数据看板列表
 * @param params
 * @returns {Function}
 */
export function rou (params) {
  return dispatch => {
    return new Promise(function (resolve, reject) {
      httpClient.get('mega/dataOverview', params)
        .then(result => {
          resolve(dispatch({
            type: OVERVIEW_ACTION,
            content: {
              dataList: result.data || {}
            }
          }))
        })
        .catch(error => {
        })
    })
  }
}

/**
 * 设置基础信息选中
 * @param baseDataActive
 * @returns {{type: string, content: {baseDataActive: *}}}
 */
export function setBaseDataActive (baseDataActive) {
  return {
    type: OVERVIEW_ACTION,
    content: {
      baseDataActive
    }
  }
}

/**
 * 设置流量汇总选中tab
 * @param flowCollectActiveTab
 * @returns {{type: string, content: {flowCollectActiveTab: *}}}
 */
export function setFlowCollectActiveTab (flowCollectActiveTab) {
  return {
    type: OVERVIEW_ACTION,
    content: {
      flowCollectActiveTab
    }
  }
}

/**
 * 设置人/车流量选中tab
 * @param flowCarPersonActiveTab
 * @returns {{type: string, content: {flowCarPersonActiveTab: *}}}
 */
export function setFlowCarPersonActiveTab (flowCarPersonActiveTab) {
  return {
    type: OVERVIEW_ACTION,
    content: {
      flowCarPersonActiveTab
    }
  }
}

/**
 * 设置当前蜂窝数据
 * @param data
 * @returns {{type: string, content: {currentBeehiveData: *}}}
 */
export function setCurrentBeehiveData (data) {
  return {
    type: OVERVIEW_ACTION,
    content: {
      currentBeehiveData: data.detail || {}
    }
  }
}

/**
 * 获取概览数据
 */
export function getOverviewData () {
  return dispatch => {
    httpClient.get('mega/dataOverview')
      .then(result => {
        console.log(result, 999888)
        const { data } = result
        const { pieResponse, beehiveResponse, histogramResponse, circularResponse } = data
        const { pies } = pieResponse
        const [place, point, device, personAscription] = pies
        const placePieChartDataList = []
        const pointPieChartDataList = []
        const devicePieChartDataList = []
        const personAscriptionPieChartDataList = []
        getPieChartData(
          pies,
          place,
          placePieChartDataList,
          point,
          pointPieChartDataList,
          device,
          devicePieChartDataList,
          personAscription,
          personAscriptionPieChartDataList)
        const {
          personInDay, personTotal,
          strangerInDay, strangerTotal,
          carInDay, carTotal,
          nonmotorInDay, nonmotorTotal, beehives } = beehiveResponse
        const { carPerDay, carPerHour, personPerDay, personPerHour } = histogramResponse
        const {
          localCarAlertCount, localCarCount, localCarRecordCount,
          localPersonAlertCount, localPersonCount, localPersonRecordCount,
          outsideCarAlertCount, outsideCarCount, outsideCarRecordCount,
          outsidePersonAlertCount, outsidePersonCount, outsidePersonRecordCount,
          strangerAlertCount, strangerCount, strangerRecordCount } = circularResponse
        dispatch({
          type: OVERVIEW_ACTION,
          content: {
            placeTotal: place.total || 0,
            placePieChartDataList,
            pointTotal: point.total || 0,
            pointPieChartDataList,
            deviceTotal: device.total || 0,
            devicePieChartDataList,
            personAscriptionTotal: personAscription.total || 0,
            personAscriptionPieChartDataList,
            personInDay: personInDay || 0,
            personTotal: personTotal || 0,
            strangerInDay: strangerInDay || 0,
            strangerTotal: strangerTotal || 0,
            motorInDay: carInDay || 0,
            motorTotal: carTotal || 0,
            nonMotorInDay: nonmotorInDay || 0,
            nonMotorTotal: nonmotorTotal || 0,
            carHistoryFlowDataList: carPerDay || [],
            carInDayFlowDataList: carPerHour || [],
            personHistoryFlowDataList: personPerDay || [],
            personInDayFlowDataList: personPerHour || [],
            beehiveDataList: beehives,
            localPersonList: [localPersonRecordCount || 0, localPersonCount || 0, localPersonAlertCount || 0],
            outsidePersonList: [outsidePersonRecordCount || 0, outsidePersonCount || 0, outsidePersonAlertCount || 0],
            strangerPersonList: [strangerRecordCount || 0, strangerCount || 0, strangerAlertCount || 0],
            alertCarList: [localCarAlertCount || 0, outsideCarAlertCount || 0],
            carList: [localCarCount || 0, outsideCarCount || 0],
            flowCarList: [localCarRecordCount || 0, outsideCarRecordCount || 0]
          }
        })
      })
      .catch(error => {})
  }
}

/**
 * 获取饼图数据
 * @param pies
 * @param place
 * @param placePieChartDataList
 * @param point
 * @param pointPieChartDataList
 * @param device
 * @param devicePieChartDataList
 * @param personAscription
 * @param personAscriptionPieChartDataList
 */
function getPieChartData (
  pies,
  place = {},
  placePieChartDataList,
  point = {},
  pointPieChartDataList,
  device = {},
  devicePieChartDataList,
  personAscription = {},
  personAscriptionPieChartDataList) {
  if (pies) {
    (place.detail || []).forEach((item) => {
      placePieChartDataList.push({
        value: item.count,
        name: item.name,
        itemStyle: {
          color: item.color
        }
      })
    });
    (point.detail || []).forEach((item) => {
      devicePieChartDataList.push({
        value: item.count,
        name: item.name,
        itemStyle: {
          color: item.color
        }
      })
    });
    (device.detail || []).forEach((item) => {
      pointPieChartDataList.push({
        value: item.count,
        name: item.name,
        itemStyle: {
          color: item.color
        }
      })
    });
    (personAscription.detail || []).forEach((item) => {
      personAscriptionPieChartDataList.push({
        value: item.count,
        name: item.name,
        itemStyle: {
          color: item.color
        }
      })
    })
  }
}
