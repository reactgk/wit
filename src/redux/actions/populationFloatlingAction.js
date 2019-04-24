import httpClient from '../../network/httpClient'
export const POPULATION_ACTION = 'population_action'

/**
 * 获取概览数据
 */

export function getPopulationFloatingList (params) {
  return dispatch => {
    httpClient.post('topic/staticqueryList', params)
      .then(result => {
        const { data } = result
        const { list, count } = data
        dispatch({
          type: POPULATION_ACTION,
          content: {
            getPopulationList: list || [],
            count: count
          }
        })
      })
      .catch(error => {})
  }
}
export function detailedInformationQuery (params) {
  return dispatch => {
    httpClient.post('topic/personrecord', params)
      .then(result => {
        const { data } = result
        const { personRecordEntities, count } = data
        dispatch({
          type: POPULATION_ACTION,
          content: {
            getdetailedInformationList: personRecordEntities || [],
            counts: count
          }
        })
      })
      .catch(error => {})
  }
}
// 人口流动量
export function getPopulationFloating (params) {
  return dispatch => {
    httpClient.post('topic/staticpopCountChart', params)
      .then(result => {
        const { data } = result
        const { inFlowRateList, netflows, inFlowList, outFlowList, outFlowRateList, tagRatelist, inflows } = data
        let netFlowArr = []
        let outNetFlowArr = []
        let lineInList = []
        let lineOutList = []
        let lineX = []
        netFlowArr.push({
          value: inFlowRateList[0].inflowsRate,
          name: inFlowRateList[0].name,
          itemStyle: { normal: { color: inFlowRateList[0].color } }
        })
        netFlowArr.push({
          value: outFlowRateList[0].outflowsRate,
          name: outFlowRateList[0].name,
          itemStyle: { normal: { color: outFlowRateList[0].color } }
        })
        for (var j = 0; j < inFlowList.length; j++) {
          lineInList.push(inFlowList[j].inCount)
        }
        for (var k = 0; k < outFlowList.length; k++) {
          lineOutList.push(outFlowList[k].outCount)
        }
        for (var b = 0; b < inFlowList.length; b++) {
          lineX.push(inFlowList[b].nationName)
        }
        console.log(lineInList, 555555, lineX)

        for (var i = 0; i < tagRatelist.length; i++) {
          outNetFlowArr.push({
            value: tagRatelist[i].tagRate,
            name: tagRatelist[i].tagName,
            itemStyle: { normal: { color: tagRatelist[i].color } }
          })
        }
        dispatch({
          type: POPULATION_ACTION,
          content: {
            getPopulationsss: data || [],
            netFlow: netFlowArr,
            netflows: netflows,
            outFloatingList: outNetFlowArr,
            outSum: inflows,
            lineIn: lineInList,
            lineOut: lineOutList,
            lineX: lineX
          }
        })
      })
      .catch(error => {})
  }
}
// 图表人口数量
export function getPopulationSize (params) {
  return dispatch => {
    httpClient.post('topic/personpopCountChart', params)
      .then(result => {
        const { data } = result
        const { count, flowPersonList, personList, floatCount, nationRatelist, placeRatelist } = data
        let floatingListArr = []
        let floatNationListArr = []
        let floatPlaceListArr = []
        floatingListArr.push({
          value: flowPersonList[0].floatPop,
          name: flowPersonList[0].personType,
          itemStyle: { normal: { color: flowPersonList[0].color } }
        })
        floatingListArr.push({
          value: personList[0].permanentPop,
          name: personList[0].personType,
          itemStyle: { normal: { color: personList[0].color } }
        })

        for (var i = 0; i < nationRatelist.length; i++) {
          floatNationListArr.push({
            value: nationRatelist[i].nationRate,
            name: nationRatelist[i].nationName,
            itemStyle: { normal: { color: nationRatelist[i].color } }
          })
        }
        for (var j = 0; j < placeRatelist.length; j++) {
          floatPlaceListArr.push({
            value: placeRatelist[j].nationPlaceRate,
            name: placeRatelist[j].provinceName,
            itemStyle: { normal: { color: placeRatelist[j].color } }
          })
        }
        dispatch({
          type: POPULATION_ACTION,
          content: {
            getPopulation: data || [],
            grossPopulation: count,
            floatingList: floatingListArr,
            floatCount: floatCount,
            floatNationList: floatNationListArr,
            floatPlacelist: floatPlaceListArr
          }
        })
      })
      .catch(error => {})
  }
}
