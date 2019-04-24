import httpClient from '../../network/httpClient'

export const PERSON_MANAGE_ACTION = 'person_manage_action'

/**
 * 获取人员列表
 * @returns {Function}
 */
export function getPersonList (params) {
  return dispatch => {
    httpClient.post('meta/querypersons', params)
      .then(result => {
        const { data, total } = result
        dispatch({
          type: PERSON_MANAGE_ACTION,
          content: {
            totalPage: total || 1,
            personManageList: data || []
          }
        })
      })
      .catch(error => {})
  }
}
