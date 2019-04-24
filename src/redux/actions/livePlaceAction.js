import httpClient from '../../network/httpClient.js'
import { selectContent
  // , checkboxContent
} from '../../data/selectOptions'
import { message } from 'antd'
export const LIVE_PLACE_ACTION = 'live_place_action'
// 获取场所option
export function getLivePlacePlot () {
  return dispatch => {
    httpClient.post('topic/houseplacelist', {})
      .then(result => {
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            quartersValue: undefined,
            streetList: result.data,
            bulidValue: undefined,
            unitValue: undefined,
            roomValue: undefined
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
// 场所onchange
export function streetSelectChange (value, item) {
  window.localStorage.setItem('build', value)
  return dispatch => {
    httpClient.post('topic/houseplacelist', {
      BelongedPlace: value
    })
      .then(result => {
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            quartersValue: value,
            bulidingList: result.data,
            bulidValue: undefined,
            unitValue: undefined,
            roomValue: undefined
          }
        })
      })
  }
}
// 楼栋onchange
export function buildSelectChange (value, bulidValue) {
  let belong = window.localStorage.getItem('build')
  window.localStorage.setItem('palce', value)
  return dispatch => {
    httpClient.post('topic/houseplacelist', {
      BelongedPlace: belong,
      HouseBuilding: value
    })
      .then(result => {
        const {
          data
        } = result
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            bulidValue: value,
            roomValue: undefined,
            placeList: data
          }
        })
      })
      .catch(error => {})
  }
}
// 单元onchange
export function placeSelectChange (value, item) {
  let belong = window.localStorage.getItem('build')
  let house = window.localStorage.getItem('palce')
  return dispatch => {
    httpClient.post('topic/houseplacelist', {
      BelongedPlace: belong,
      HouseBuilding: house,
      HouseUnit: value
    })
      .then(result => {
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            unitValue: value,
            roomValue: undefined,
            roomList: result.data
          }
        })
      })
  }
}
// 房号value
export function roomSelectChange (value) {
  return dispatch => {
    dispatch({
      type: LIVE_PLACE_ACTION,
      content: {
        roomValue: value
      }
    })
  }
}
// 人员标签类型下拉
export function tagTypeSelect () {
  return dispatch => {
    httpClient.post('meta/tagType/allList', {
      data: {}
    })
      .then(result => {
        console.log(result.data, 888)
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            tagTypeSelectList: selectContent(result.data, 'tagTyepName', 'id')
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
// 人员标签类型数据
export function tagTypePersonSelect () {
  return dispatch => {
    httpClient.post('meta/tag/personTagList', {
      data: {}
    })
      .then(result => {
        // let tagTypes = []
        var oldDataRule = []
        var oldData = result.data
        // var oldData = list
        oldData.forEach(el => {
          var oldObj = {
            name: el.tagTyepName,
            id: el.tagTypeID,
            lists: []
          }
          var listObj = {
            name: el.tagName,
            id: el.id
          }
          oldObj.lists.push(listObj)
          oldDataRule.push(oldObj)
        })
        console.log(oldDataRule, 555888)
        var newData = []
        var newObj = {}
        oldDataRule.forEach((el, i) => {
          if (!newObj[el.name]) {
            newData.push(el)
            newObj[el.name] = true
          } else {
            newData.forEach(el => {
              if (el.name === oldDataRule[i].name) {
                el.lists = el.lists.concat(oldDataRule[i].lists)
              }
            })
          }
        })
        console.log(result.data, '哈哈哈哈')
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            tagList: selectContent(result.data, 'tagName', 'id') || [],
            newTagList: result.data,
            selectTagList: selectContent(newData, 'name', 'id') || []
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
// 机动车标签非机动车查询
export function getbikeTagsSearch () {
  return dispatch => {
    httpClient.post('meta/tag/carTagList', {
      data: {}
    })
      .then(result => {
        var carList = []
        var bikeList = []
        for (var i = 0; i < result.data.length; i++) {
          console.log(parseInt(result.data[i].tagType) === 0, 454545)
          if (parseInt(result.data[i].tagType) === 0) {
            console.log(444444)
            carList.push({
              id: result.data[i].id,
              name: result.data[i].tagName
            })
          }
          if (parseInt(result.data[i].tagType) === 1) {
            console.log(11111)
            bikeList.push({
              id: result.data[i].id,
              name: result.data[i].tagName
            })
          }
        }
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            bikeTagsList: selectContent(bikeList, 'name', 'id'),
            carList: selectContent(carList, 'name', 'id'),
            bikeCheckBoxList: bikeList,
            carCheckBoxList: carList
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
// 人员标签类型
export function personTagRelList (params) {
  return dispatch => {
    httpClient.post('meta/tag/personTagRelList', params)
      .then(result => {
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            tagTypeSelectList: result.data || []
          }
        })
      })
      .catch(error => { console.log(error) })
  }
}
// 机动车标签类型
export function carTagRelList (params) {
  return dispatch => {
    httpClient.post('meta/tag/carTagRelList', params)
      .then(result => {
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            carTagRelSelectList: result.data || []
            // carTagRelSelectList: []
          }
        })
      })
      .catch(error => { console.log(error) })
  }
}
// fei机动车标签类型
export function getNonmotorTagRelList (params) {
  return dispatch => {
    httpClient.post('meta/tag/nonmotorTagRelList', params)
      .then(result => {
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            nonmotorTagRelList: result.data || []
            // carTagRelSelectList: []
          }
        })
      })
      .catch(error => { console.log(error) })
  }
}
// fei机动车信息带出
export function getNonmotorByDeviceNo (params) {
  return dispatch => {
    httpClient.post('meta/nonmotorByDeviceNo', params)
      .then(result => {
        console.log(result.data)
        // bikeTypeName bikevehicleColor
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            bikeTypeName: result.data.placeName || '未知',
            bikevehicleColor: result.data.model === 0 ? '自行车' : (result.data.model === 1 ? '电动车' : (result.data.model === 2) ? '摩托车' : (result.data.model === 4) ? '三轮车' : '其他') || '未知',
            bikeId: result.data.id || ''
          }
        })
      })
      .catch(error => {
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            bikeTypeName: '',
            bikevehicleColor: '',
            bikeId: ''

          }
        })
      })
  }
}
// fei机动车信息新增
export function addNonmotorByDeviceNo (params) {
  return dispatch => {
    httpClient.post('meta/tag/nonmotorRelSave', params)
      .then(result => {
        message.success('保存成功')
        dispatch({

        })
      })
      .catch(error => {
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            bikeTypeName: '',
            bikevehicleColor: ''

          }
        })
      })
  }
}
// xinzeng人员标签
export function addNePeopleTags (params) {
  return dispatch => {
    httpClient.post('meta/tag/personTagRelSave', params)
      .then(result => {
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {

          }
        })
      })
      .catch(error => {
        message.success('保存失败', 4)
      })
  }
}
// 根据身份证查人员信息
export function queryByIdNum (params) {
  return dispatch => {
    httpClient.post('meta/person/queryByIdNum', params)
      .then(result => {
        console.log(result.data.name, result.data.telePhonr)
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            peopleSearchName: result.data.name || '未知',
            peopleSearchId: result.data.id || '--',
            peopleSearchPhone: result.data.telePhonr || '未知',
            peopleSearchnation: result.data.nation || '未知'
          }
        })
      })
      .catch(error => {
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            peopleSearchName: '未知',
            peopleSearchId: '',
            peopleSearchPhone: '未知',
            peopleSearchnation: '未知'
          }
        })
      })
  }
}
// 车辆详情
export function carLicenseNumList (params) {
  return dispatch => {
    httpClient.get('meta/car', params)
      .then(result => {
        let tagNameArr = []
        console.log(result.data, 5556655)
        const { data } = result
        console.log(data.carTagRels, 555)
        data.carTagRels.map((items, item) => {
          tagNameArr.push(items.tagName)
        })
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            aaa: result.data || [],
            carTypeName: data.carType || '--',
            vehicleCategoryCode: data.vehicleCategoryCode || '--',
            vehicleColor: data.vehicleColor || '--',
            carTypeNames: data.carTypeName || '--',
            regTime: data.regTime || '--',
            frameNumber: data.frameNumber || '--',
            regAddress: data.regAddress || '--',
            plateColorCode: data.plateColor || '--',
            recordTime: data.latestRecord.recordTime || '--',
            parkingInfo: data.parkingInfo || '--',
            devImport: data.latestRecord.devImport || '--',
            pointName: data.latestRecord.pointName || '--',
            tagNameList: tagNameArr || ['暂无'],
            inOutTpye: '--',
            imagePlate: data.latestRecord.imagePlate || '--',
            driversList: data.drivers || [],
            licenseNumber: data.licenseNumber || '--'
          }
        })
      })
      .catch(error => { console.log(error) })
  }
}
// 车辆详情
export function getSearchCarList (params) {
  return dispatch => {
    httpClient.post('meta/queryByLicenseNum', params)
      .then(result => {
        const { data } = result
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            carId: data.id,
            carTypeName: data.carTypeName,
            vehicleColor: data.vehicleColor
          }
        })
      })
      .catch(error => { console.log(error) })
  }
}
// 房产管理列表
export function getqueryHouses (params) {
  return dispatch => {
    httpClient.post('meta/queryHouses', params)
      .then(result => {
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            houseManageList: result.data,
            count: result.total
          }
        })
      })
      .catch(error => { console.log(error) })
  }
}
// 房产管理详情
export function houseLicenseNumList (params) {
  return dispatch => {
    httpClient.get('meta/house', params)
      .then(result => {
        console.log(result, 'xiang')
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            houseBuilding: result.data.houseBuilding || '--',
            houseAddress: result.data.houseAddress || '--',
            houseUnit: result.data.houseUnit || '--',
            houseNumber: result.data.houseNumber || '--',
            houseFloor: result.data.houseFloor || '--',
            houseArea: result.data.houseArea || '--',
            houseStructure: result.data.houseStructure || '--',
            houseLayoutImage: result.data.houseLayoutImage || '--',
            housePeople: result.data.housePeople || '--',
            houseType: result.data.houseType || '--',
            houseUseType: result.data.houseUseType || '--',
            created: result.data.created || '--',
            houseBuildTime: result.data.houseBuildTime || '--'

          }
        })
      })
      .catch(error => { console.log(error) })
  }
}
// 房产管理renyuanguanxi详情
export function houseLivePeopleList (params) {
  return dispatch => {
    httpClient.get('meta/personsByHouseId', params)
      .then(result => {
        console.log(result, 'ren')
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            houseList: result.data
          }
        })
      })
      .catch(error => { console.log(error) })
  }
}
// 车辆标签新增
export function getAddSearchCarList (params) {
  return dispatch => {
    httpClient.post('meta/tag/carTagRelSave', params)
      .then(result => {
        console.log(result)

        dispatch({
          type: LIVE_PLACE_ACTION
        })
      })
      .catch(error => { console.log(error) })
  }
}
// 车辆
export function getCarList (params) {
  return dispatch => {
    httpClient.post('meta/carlist', params)
      .then(result => {
        const { list } = result.data
        dispatch({
          type: LIVE_PLACE_ACTION,
          carListss: list || []
        })
      })
      .catch(error => { console.log(error) })
  }
}
export function aaaaa (params) {
  return dispatch => {
    httpClient.post('meta/carlist', params)
      .then(result => {
        const { list, count } = result.data
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            carLists: list,
            counts: count
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
// 布控
export function queryControlLisat (params) {
  return dispatch => {
    httpClient.post('meta/monitor/queryList', params)
      .then(result => {
        console.log(result.data)
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            distributionControlList: result.data || [],
            conut: result.total || []
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
// 预警管理列表
export function earlyControlList (params) {
  return dispatch => {
    httpClient.post('meta/alert/queryList', params)
      .then(result => {
        console.log(result.data)
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            earlyWarningControlList: result.data || [],
            earlyWarnincount: result.total
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
// 非机动车管理
export function getBikeManageList (params) {
  return dispatch => {
    httpClient.post('meta/nonmotorslist', params)
      .then(result => {
        console.log(result.data)
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            bikeManageList: result.data.list || [],
            bikeManagecount: result.data.count || 0
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
// 非机动车详情
export function getBikeDetailsList (params) {
  return dispatch => {
    httpClient.get('meta/nonmotor', params)
      .then(result => {
        console.log(result.data)
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            brand: result.data.list[0].brand || '--',
            deviceNo: result.data.list[0].deviceNo || '--',
            color: result.data.list[0].color || '--',
            sealno: result.data.list[0].sealno || '--',
            place: result.data.list[0].place || '--',
            pruchasedate: result.data.list[0].pruchasedate || '--',
            phone: result.data.list[0].phone || '--',
            owner: result.data.list[0].owner || '--',
            idCard: result.data.list[0].idCard || '--',
            lastPointName: result.data.list[0].lastPointName || '--',
            lastPlaceName: result.data.list[0].lastPlaceName || '--',
            ragTime: '--',
            okTime: result.data.list[0].installtime || '--',
            lastTime: result.data.list[0].lastime || '--',
            inOut: result.data.list[0].inOut === 0 ? '进' : '出' || '--',
            model: result.data.list[0].model === 0 ? '自行车' : (result.data.list[0].model === 1 ? '电动车' : (result.data.list[0].model === 2) ? '摩托车' : (result.data.list[0].model === 4) ? '三轮车' : '其他') || '未知'
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
// 新增布控
export function addControlLisat (params) {
  return dispatch => {
    httpClient.post('meta/monitor/save', params)
      .then(result => {
        console.log(result.data)
        message.success('保存成功', 4)
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            returnVal: result.status || ''
          }
        })
      })
      .catch(error => {
        message.success('保存失败', 4)
      })
  }
}

// 设备三级联动布控场所
export function warningPlaceList () {
  return dispatch => {
    httpClient.post('meta/point/getpoints', {})
      .then(result => {
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            warningPlace: undefined,
            streetList: result.data
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
export function warningPlaceSelect () {
  return dispatch => {
    httpClient.post('meta/point/getpoints', {})
      .then(result => {
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            warningPlace: undefined,
            streetList: result.data
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
// 设备三级联动 布控点位
// export function warningPointSelect (value, item) {
//   window.localStorage.setItem('build', value)
//   return dispatch => {
//     httpClient.post('meta/house/placelist', {
//       PlaceCode: value
//     })
//       .then(result => {
//         dispatch({
//           type: LIVE_PLACE_ACTION,
//           content: {
//             warningPoint: value,
//             bulidingList: result.data,
//             bulidValue: undefined,
//             unitValue: undefined,
//             roomValue: undefined
//           }
//         })
//       })
//   }
// }
// 设备三级联动 布控设备
export function warningDeviceSelect (value, bulidValue) {
  window.localStorage.setItem('palce', value)
  return dispatch => {
    httpClient.post('topic/houseplacelist', {
      PlaceCode: value
    })
      .then(result => {
        const {
          data
        } = result
        dispatch({
          type: LIVE_PLACE_ACTION,
          content: {
            bulidValue: value,
            roomValue: undefined,
            placeList: data
          }
        })
      })
      .catch(error => {})
  }
}
