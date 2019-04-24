import httpClient from '../../network/httpClient'
export const SELECT_OPTION_ACTIVE = 'select_option_active'

/**
 * 获取流动人口专题场所下拉选框
 * @param params
 * @returns {Function}
 */
export function getPopulationFloatingList (params) {
  return dispatch => {
    httpClient.post('nationtype/list', params)
      .then(result => {
        const { data } = result
        // dispatch({
        //   type: SELECT_OPTION_ACTIVE,
        //   content: {
        //     totalPage: total || 1,
        //     carManageList: data || []
        //   }
        // })
        // const { pies } = pieResponse
        // const placeSelect=[]
        dispatch({
          type: SELECT_OPTION_ACTIVE,
          content: {
            placeSelect: data
          }
        })
      })
      .catch(error => {})
  }
}
