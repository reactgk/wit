import httpClient from '../../network/httpClient.js'

export const PERSON_IN_OUT_MANAGE_ACTION = 'person_in_out_manage_action'

export function getList (params) {
  return dispatch => {
    httpClient.post('media/querypersonrecords', params)
      .then(result => {
        const {
          data
        } = result
        dispatch({
          type: PERSON_IN_OUT_MANAGE_ACTION,
          content: {
            personInOutManageList: data.list || [],
            totalPage: data.count || 1,
            personByLocation: data.personByLocation || {},
            personDaily: data.personDaily || {},
            personInday: data.personInday || {}
          }
        })
      })
      .catch(error => {
      })
  }
}
