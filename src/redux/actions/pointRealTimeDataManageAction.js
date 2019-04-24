import httpClient from '../../network/httpClient.js'

export const POINT_REAL_TIME_DATA_ACTION = 'point_real_time_action'

export function getRealTimeRecord (provinceCode, cityCode, areaCode, streetCode, communityCode, placeCode, pointCode, callback) {
  return dispatch => {
    httpClient.post('media/realtimerecords', { provinceCode, cityCode, areaCode, streetCode, communityCode, placeCode, pointCode })
      .then(result => {
        const { data } = result
        let carList = data.carList || []
        let lastCarInfo = carList[0] || {}
        let personList = data.personList || []
        let lastPersonInfo = personList[0] || {}
        dispatch({
          type: POINT_REAL_TIME_DATA_ACTION,
          content: {
            carList: carList,
            lastCarInfo: lastCarInfo,
            personList: personList,
            lastPersonInfo: lastPersonInfo
          }
        })
        callback()
      })
      .catch(error => {
        callback()
      })
  }
}

export function setCascadeData (data) {
  return dispatch => {
    httpClient.get('meta/placesByCommunity', data.community)
      .then(placeResult => {
        let placeList = placeResult.data || []
        placeList.unshift({ id: -1, departCode: '', departName: '全部', departPCode: data.community })
        let placeValue = (placeList[0] || {}).departCode || ''
        httpClient.get('meta/pointsByPlace', placeValue).then(
          pointResult => {
            let pointList = pointResult.data || []
            pointList.unshift({ id: -1, departCode: '', departName: '全部', departPCode: placeValue })
            let pointValue = (pointList[0] || {}).departCode || ''
            dispatch({
              type: POINT_REAL_TIME_DATA_ACTION,
              content: {
                provinceValue: data.province,
                cityValue: data.city,
                areaValue: data.area,
                streetValue: data.street,
                communityValue: data.community,
                placeList: placeList,
                placeValue: placeValue,
                pointList: pointList,
                pointValue: pointValue
              }
            })
          }
        ).catch(error => {})
      })
      .catch(error => {
      })
  }
}

export function placeSelectChange (value) {
  return dispatch => {
    httpClient.get('meta/pointsByPlace', value).then(
      pointResult => {
        let pointList = pointResult.data || [ { id: -1, departCode: '', departName: '全部', departPCode: value } ]
        let pointValue = (pointList[0] || {}).departCode || ''
        dispatch({
          type: POINT_REAL_TIME_DATA_ACTION,
          content: {
            placeValue: value,
            pointList: pointList,
            pointValue: pointValue
          }
        })
      }
    ).catch(error => {})
  }
}

export function pointSelectChange (value) {
  return {
    type: POINT_REAL_TIME_DATA_ACTION,
    content: {
      pointValue: value
    }
  }
}
