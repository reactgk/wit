import httpClient from '../../network/httpClient'
export const OVERVIEW_DATA_ACTION = 'overview_data_action'
export const PEOPLE_BAR_DATA = 'people_bar_data'
export const PROTRCTIVE_RING_BAR_DATA = 'protective_ring_bar_data'
export const KEY_PERSONNE_BAR_DATA = 'key_personne_bar_data'
export const CAR_BAR_DATA = 'car_bar_data'
export const CAR_RUN_DATA = 'car_run_data'
export const PER_RUN_DATA = 'per_run_data'
export const FIRST_LEVEL = 'first_level'
export const SECOND_LEVEL = 'second_level'
export const THIRD_LEVEL = 'third_level'
export const FORTH_LEVEL = 'forth_level'
/**
 * 获取天气
 * @param city
 * @returns {Function}
 */
export function getWeather (city) {
  return dispatch => {
    console.log(888)
    httpClient.get('mega/getweatherbyname', city)
      .then(result => {
        const {
          data
        } = result
        dispatch({
          type: OVERVIEW_DATA_ACTION,
          content: {
            weather: data
          }
        })
      })
      .catch(error => {})
  }
}
export function setActiveTab (activeTab, isChange) {
  let clearData = {}
  if (isChange) {
    clearData = {
      searchNumber: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: ''
    }
  }
  return {
    type: OVERVIEW_DATA_ACTION,
    content: {
      activeTab,
      ...clearData
    }
  }
}
/**
 * 设置选中tab
 * @param flowCollectActiveTab
 * @returns {{type: string, content: {flowCollectActiveTab: *}}}
 */
export function setFlowMapActiveTab (getReActiveTab) {
  return {
    type: OVERVIEW_DATA_ACTION,
    content: {
      getReActiveTab
    }
  }
}
/**
 * 设置防护圈leveltab
 * @param flowCollectActiveTab
 * @returns {{type: string, content: {flowCollectActiveTab: *}}}
 */
export function setProtectiveTab (getProActiveTab) {
  console.log(getProActiveTab)
  return {
    type: OVERVIEW_DATA_ACTION,
    content: {
      getProActiveTab
    }
  }
}
/**
 * 设置实时数据选中tab
 * @param flowCollectActiveTab
 * @returns {{type: string, content: {flowCollectActiveTab: *}}}
 */
export function setTimeActiveTab (getTimeActiveTab) {
  console.log(getTimeActiveTab)
  return {
    type: OVERVIEW_DATA_ACTION,
    content: {
      getTimeActiveTab
    }
  }
}
export function getAllMessage () {
  return dispatch => {
    httpClient.get('mega/gispic')
      .then(result => {
        const {
          data
        } = result
        let personList = []
        let carList = []
        let keyPersonList = []
        let firstList = []
        let secondList = []
        let thirdList = []
        let forthList = []
        let placeList = []
        let lineCarBox = []
        let linePerBox = []
        let xBox = []
        data.personMap.forEach(items => {
          personList.push({
            name: items.placeName,
            value: [items.placeLongititude, items.placeLatitude, items.num]
          })
        })
        data.carMap.forEach(items => {
          carList.push({
            name: items.placeName,
            value: [items.placeLongititude, items.placeLatitude, items.num]
          })
        })
        data.keyPersonMap.forEach(items => {
          var aaa = []
          aaa.push({ name: items.name })
          // keyPersonList.push({
          //   name: items.placeName,
          //   value: [items.placeLongititude, items.placeLatitude, items.num]
          // })
          keyPersonList += aaa
        })
        data.guardRingMap.places.forEach(ele => {
          console.log(ele, 8888)
          if (ele.level === 1) {
            console.log(ele, 99999)
            ele.list.forEach(items => {
              console.log(items, 85858)
              firstList.push({
                name: items.placeName,
                value: [items.Longititude, items.Latitude]
              })
            })
          } else if (ele.level === 2) {
            ele.list.forEach(items => {
              console.log(items, 85858)
              secondList.push({
                name: items.placeName,
                value: [items.Longititude, items.Latitude]
              })
            })
          } else if (ele.level === 3) {
            ele.list.forEach(items => {
              thirdList.push({
                name: items.placeName,
                value: [items.Longititude, items.Latitude]
              })
            })
          } else if (ele.level === 4) {
            ele.list.forEach(items => {
              forthList.push({
                name: items.placeName,
                value: [items.Longititude, items.Latitude]
              })
            })
          }
        })
        data.placeMap.forEach(ele => {
          placeList.push({
            value: ele.num,
            name: ele.placetypename
          })
        })
        data.dayCountMap.forEach(items => {
          lineCarBox.push(items.carFlowCount)
        })
        data.dayCountMap.forEach(items => {
          linePerBox.push(items.personFlowCount)
        })
        data.dayCountMap.forEach(items => {
          xBox.push(items.datePoint.substring(5, 10))
        })
        console.log(xBox, data.dayCountMap, 1122336)
        dispatch({
          type: OVERVIEW_DATA_ACTION,
          content: {
            houseCount: data.houseCount || '0',
            selfHouseCount: data.selfHouseCount || '0',
            rentalHoseCount: data.rentalHoseCount || '0',
            personCount: data.personCount || '0',
            hjPersonCount: data.hjPersonCount || '0',
            livePersonCount: data.livePersonCount || '0',
            flowPersonCount: data.flowPersonCount || '0',
            keyPersonCount: data.keyPersonCount || '0',
            carCount: data.carCount || '0',
            nativeCarCount: data.nativeCarCount || '0',
            foreignCarCount: data.foreignCarCount || '0',
            personList: personList || [],
            carList: carList || [],
            keyPersonList: keyPersonList || [],
            firstList: firstList || [],
            secondList: secondList || [],
            thirdList: thirdList || [],
            forthList: forthList || [],
            placeList: placeList || [],
            lineCarBox: lineCarBox || [],
            linePerBox: linePerBox || [],
            xBox: xBox || []
          }
        })
      })
      .catch(error => {
      })
  }
}
// function objOfPropertyToArr (object) {
//   var arr = []
//   var i = 0
//   for (var item in object) {
//     arr[i] = item
//     console.log(item, object)
//     i++
//   }
//   return arr
// }
export function warningRealTimeData (city) {
  return dispatch => {
    console.log(888)
    httpClient.get('mega/gispicrecord', city)
      .then(result => {
        const {
          data
        } = result
        let carPicMap = []
        let peoPicMap = []
        data.carPicMap.forEach((data) => {
          carPicMap.push(data.img)
        })
        data.personPicMap.forEach((data) => {
          peoPicMap.push(data.img)
        })
        let warningList = []
        data.alertInfoResponse.forEach(items => {
          warningList.push({
            name: items.pointName,
            value: [items.placeLongititude, items.placeLatitude]
          })
        })
        console.log(warningList, 55666)
        dispatch({
          type: OVERVIEW_DATA_ACTION,
          content: {
            pointList: data.alertInfoResponse,
            carPicMap: carPicMap,
            peoPicMap: peoPicMap,
            warningList: warningList || [],
            carInCount: data.passCountMap.carInCount || 0,
            carOutCount: data.passCountMap.carOutCount || 0,
            carFlowCount: data.passCountMap.carFlowCount || 0,
            personInCount: data.passCountMap.personInCount || 0,
            personOutCount: data.passCountMap.personOutCount || 0,
            personFlowCount: data.passCountMap.personFlowCount || 0,
            alertInfoCount: data.alertInfoCount || 0
          }
        })
      })
      .catch(error => {})
  }
}
