import httpClient from '../../network/httpClient'

export const POPULATION_MANAGE_ACTION = 'population_manage_action'

/**
 * 获取人员列表
 * @returns {Function}
 */
export function getPopulationList (params) {
  return dispatch => {
    httpClient.post('meta/person/listAndChart', params)
      .then(result => {
        const {
          data
        } = result
        dispatch({
          type: POPULATION_MANAGE_ACTION,
          content: {
            totalPage: data.count || 1,
            populationManageList: data.list || [],
            populationByLiveType: data.populationByLiveType || {},
            populationByNation: data.populationByNation || {},
            populationByLivingTime: data.populationByLivingTime || {}
          }
        })
      })
      .catch(error => {})
  }
}

// 获取人员信息
export function getPopulationDetail (params) {
  console.log('获取人员详情', params)
  return dispatch => {
    httpClient.post('meta/person/personInfo', params)
      .then(result => {
        dispatch({
          type: POPULATION_MANAGE_ACTION,
          content: {
            populationManageDetail: {
              ...result.data
            },
            tagRelList: result.data.tagRelList
          }
        })
      })
      .catch(error => {})
  }
}

// 获取房屋信息
export function getPopulationHouseList (params) {
  console.log('获取房屋详情', params)

  return dispatch => {
    httpClient.post('meta/person/houseListById', params)
      .then(result => {
        dispatch({
          type: POPULATION_MANAGE_ACTION,
          content: {
            populationHouseList: result.data
          }
        })
      })
      .catch(error => {})
  }
}

// 获取机动车信息
export function getPopulationCarList (params) {
  console.log('获取机动车详情', params)

  return dispatch => {
    httpClient.post('meta/person/carListById', params)
      .then(result => {
        dispatch({
          type: POPULATION_MANAGE_ACTION,
          content: {
            populationCarList: result.data
          }
        })
      })
      .catch(error => {})
  }
}

// 保存人员信息
export function savePopulationDetail (params, callback) {
  console.log('保存人员详情', params)
  return dispatch => {
    httpClient.post('meta/person', params)
      .then(result => {
        console.log(result)
        dispatch({
          type: POPULATION_MANAGE_ACTION,
          content: {
            populationManageDetail: {
              ...result.data
            },
            tagRelList: result.data.tagRelList
          }
        })
        callback()
      })
      .catch(error => {
        console.log(error)
      })
  }
}
