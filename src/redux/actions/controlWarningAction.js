import httpClient from '../../network/httpClient'
export const CONTROL_WARNING_ACTION = 'control_warning_action'

/**
 * 获取数据列表
 */
export function getDataList () {
  return dispatch => {
    httpClient.get('mega/taggedrecords')
      .then(result => {
        const { data } = result
        dispatch({
          type: CONTROL_WARNING_ACTION,
          content: {
            carList: data.cars || [],
            personList: data.persons || [],
            personControlTotal: data.taggedCarTotal || 0,
            carControlTotal: data.taggedPersonTotal || 0
          }
        })
      })
      .catch(error => {})
  }
}

/**
 * 获取弹框列表
 * @returns {Function}
 */
export function getAlertRecords () {
  return dispatch => {
    httpClient.get('mega/alertedrecords')
      .then(result => {
        const { data } = result
        const { cars, persons, alertedPersonTotal, alertedCarTotal, personSevenDay, personInday, carSevenDay, carInday } = data
        dispatch({
          type: CONTROL_WARNING_ACTION,
          content: {
            personWarningList: persons || [],
            carWarningList: cars || [],
            personWarningTotal: alertedPersonTotal || 0,
            carWarningTotal: alertedCarTotal || 0,
            personSevenDaysWarningTotal: personSevenDay.total || 0,
            personCurrentDayWarningTotal: personInday.total || 0,
            carSevenDaysWarningTotal: carSevenDay.total || 0,
            carCurrentDayWarningTotal: carInday.total || 0,
            personSevenDaysPieDataList: [personSevenDay.outer || 0, personSevenDay.mid || 0, personSevenDay.inner || 0],
            personCurrentDayPieDataList: [personInday.outer || 0, personInday.mid || 0, personInday.inner || 0],
            carSevenDaysPieDataList: [carSevenDay.outer || 0, carSevenDay.mid || 0, carSevenDay.inner || 0],
            carCurrentDayPieDataList: [carInday.outer || 0, carInday.mid || 0, carInday.inner || 0]
          }
        })
      })
      .catch(error => {})
  }
}

/**
 * 获取天气
 * @param city
 * @returns {Function}
 */
export function getWeather (city) {
  return dispatch => {
    httpClient.get('mega/getweatherbyname', city)
      .then(result => {
        const { data } = result
        dispatch({
          type: CONTROL_WARNING_ACTION,
          content: {
            weather: data
          }
        })
      })
      .catch(error => {})
  }
}
