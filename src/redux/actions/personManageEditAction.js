import httpClient from '../../network/httpClient'

export const PERSON_MANAGE_EDIT_ACTION = 'person_manage_edit_action'

// 保存人员信息
export function savePopulationDetail (params, callback) {
  console.log('保存人员详情', params)
  return dispatch => {
    httpClient.post('meta/person/save', params)
      .then(result => {
        dispatch({
          type: PERSON_MANAGE_EDIT_ACTION,
          content: {
          }
        })
        callback()
      })
      .catch(error => {
      })
  }
}
