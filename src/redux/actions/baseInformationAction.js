import httpClient from '../../network/httpClient'
export const POPULATION_ACTION = 'population_action'

/**
 * 获取概览数据
 */

export function getOrgainzationList (params) {
  return dispatch => {
    httpClient.post('meta/querypersons', params)
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
    httpClient.post('person/record', params)
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
