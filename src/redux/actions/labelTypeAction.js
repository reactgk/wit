import httpClient from '../../network/httpClient.js'
import {
  selectContent
} from '../../data/selectOptions'
export const LABEL_TYPE_ACTION = 'label_type_action'
// 人员标签类型
export function delPeopleLabel (params) {
  return dispatch => {
    httpClient.post('meta/tagType/personTagTypeDelete', params)
      .then(result => {
        console.log(result.status)
        dispatch({
          type: LABEL_TYPE_ACTION,
          content: {
            returnType: result.status || ''
          }
        })
      })
      .catch(error => { console.log(error) })
  }
}
// 人员标签类型新增
export function savePeopleTypeLabel (params) {
  return dispatch => {
    httpClient.post('meta/tagType/personTagTypeSave', params)
      .then(result => {
        console.log(result)
        dispatch({
          type: LABEL_TYPE_ACTION,
          content: {
            tagTypeSelectList: 4445555 || []
          }
        })
      })
      .catch(error => { console.log(error) })
  }
}
// 人员标签类型数据
export function tagTypePersonSelect () {
  return dispatch => {
    httpClient.post('meta/tag/personTagList', { data: {} })
      .then(result => {
        // let tagTypes = []
        console.log(result.data, '哈哈哈哈')
        dispatch({
          type: LABEL_TYPE_ACTION,
          content: {
            tagList: selectContent(result.data, 'tagName', 'id') || [],
            newTagList: result.data,
            selectTagList: selectContent(result.data, 'tagTyepName', 'id') || []
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
// 人员标签xinzeng
export function tagPersonAdd (params) {
  return dispatch => {
    httpClient.post('meta/tag/personTagSave', params)
      .then(result => {
        // let tagTypes = []
        console.log(result.data, '哈哈哈哈2')
        dispatch({
          type: LABEL_TYPE_ACTION,
          content: {
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
// 新增车辆标签
export function tagCarAdd (params) {
  return dispatch => {
    httpClient.post('meta/tag/carTagSave', params)
      .then(result => {
        // let tagTypes = []
        console.log(result.data, '哈哈哈哈2')
        dispatch({
          type: LABEL_TYPE_ACTION,
          content: {
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
