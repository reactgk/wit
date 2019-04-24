import httpClient from '../../network/httpClient'

export const PLACE_MANAGE_ACTION = 'place_manage_action'

/**
 * 获取场所列表
 * @returns {Function}
 */
export function getPlaceList (params) {
  return dispatch => {
    httpClient.post('meta/place/list', params)
      .then(result => {
        const { data, total } = result
        dispatch({
          type: PLACE_MANAGE_ACTION,
          content: {
            totalPage: total || 1,
            placeManageList: data || []
          }
        })
      })
      .catch(error => {})
  }
}
