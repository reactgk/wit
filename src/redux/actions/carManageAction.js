import httpClient from '../../network/httpClient'
export const CAR_MANAGE_ACTION = 'car_manage_action'

/**
 * 获取车辆管理列表
 * @param params
 * @returns {Function}
 */
export function getCarList (params) {
  return dispatch => {
    httpClient.post('meta/querycars', params)
      .then(result => {
        const { data } = result
        dispatch({
          type: CAR_MANAGE_ACTION,
          content: {
            totalPage: data.count || 1,
            carManageList: data.list || [],
            carByCategory: data.carByCategory || {},
            carByPlace: data.carByPlace || {}
          }
        })
      })
      .catch(error => {})
  }
}
