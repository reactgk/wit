import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchForm from '../component/searchform/SearchForm'
import Cascade from '../component/cascade/Cascade'
import IotTable from '../component/table/IotTable'
import { getCarList, aaaaa, carLicenseNumList } from '../../../redux/actions/livePlaceAction'
import { setActiveLink, ACTIVE_LINK_CAR_DETAILS } from '../../../redux/actions/manageAction'
import { PAGE_SIZE } from '../../../redux/actions/constant.js'
import { carColorOptions, carTypeOptions, carNumberColorOptions, carAttributeOptions } from '../../../data/selectOptions.js'
import { Popover } from 'antd'
class CarManageUpdated extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      pointVisible: false,
      place: ''
    }
    this.searchValues = {}
    this.formConfig = [
      { value: 'licenseNumber', placeholder: '车牌号', type: 'input' },
      { value: 'ownerName', placeholder: '车主', type: 'input', options: [] },
      { value: 'vehicleColorCode', placeholder: '车辆颜色', type: 'select', options: carColorOptions },
      // { value: 'vehicleCategoryCode', width: 160, placeholder: '通行场所', type: 'select', options: [] },
      { value: 'vehicleCategoryCode', width: 160, placeholder: '车辆类型', type: 'select', options: carTypeOptions },
      { value: 'simpleTag', width: 160, placeholder: '车属性', type: 'select', options: carAttributeOptions },
      { value: 'plateColorCode', placeholder: '车牌颜色', type: 'select', options: carNumberColorOptions },
      { value: 'rangdate', width: 400, type: 'rangeDate', placeholder1: '平台登记时间', placeholder2: '平台登记时间' }
    ]
    this.tableTopButtons = [
      { label: '批量导出' }
    ]
    const { tabs, setActiveLink } = this.props
    this.tableColumns = [
      { title: '车牌号', dataIndex: 'licenseNumber', key: 'licenseNumber' },
      { title: '车牌颜色', dataIndex: 'plateColor', key: 'plateColor' },
      { title: '车辆类型', dataIndex: 'vehicleCategory', key: 'vehicleCategory' },
      { title: '车辆颜色', dataIndex: 'vehicleColor', key: 'vehicleColor' },
      { title: '车主', dataIndex: 'name', key: 'name' },
      { title: '车辆使用人',
        render: (text, record) => {
          var html = []
          let content = ''
          // var boxList = []
          for (var i = 0; i < record.userPerson.length; i++) {
            var aaa = record.userPerson[0].name
            console.log(record.userPerson[i].name, 88888)
            html.push({
              '车辆使用人': record.userPerson[i].name,
              '手机号': record.userPerson[i].phone
            })
            let div = document.createElement('p')
            div.innerHTML = '<p>车主:' + record.userPerson[i].name + '</p>' +
            '<p>手机号:' + record.userPerson[i].phone + '</p>'
            document.getElementById('ddd').appendChild(div)
            // var _html = document.getElementById('ddd').innerText
            var _html = document.getElementById('ddd').outerHTML
            console.log(_html)
            document.getElementById('bbb').append(_html)
            content = (
              <div>
                <p>车主:{record.userPerson[i].name}</p>
                <p>手机号:{record.userPerson[i].phone}</p>
              </div>
            )
          }
          return (
            <Popover title='' content={content} trigger="hover">
              <a>{aaa}</a>
            </Popover>)
        }
      },
      { title: '车属性', dataIndex: 'simpleTag', key: 'simpleTag' },
      { title: '平台登记时间', dataIndex: 'inTime', key: 'inTime' },
      { title: '最后一次通行信息', dataIndex: 'inTime', key: 'inTime',
        render: (text, record) => {
          let content = ''
          content = (
            <div>
              <p>通行时间：{record.inTime}</p>
              <p>通行场所：{record.throughPlace}</p>
              <p>通行点位：{record.throughPoint}</p>
              <p>出入类型：{record.throughType}</p>
            </div>
          )
          return (
            <Popover title='' content={ content } trigger="hover">
              <a>{record.inTime}</a>
            </Popover>)
        } },
      { title: '详情',
        dataIndex: 'inPerson',
        key: 'inPerson',
        render: (text, record) =>
          <div className='nav-item nav-sub-item-active'
            onClick={() => {
              setActiveLink(ACTIVE_LINK_CAR_DETAILS, tabs)
              this.props.carLicenseNumList(record.id)
            }}>
            <span className="label">详情</span>
          </div>
      }
    ]
    this.tablePoint = [
      { title: '详情', dataIndex: 'placeName', key: 'placeCode' },
      { title: '操作',
        dataIndex: 'inPerson',
        key: 'inPerson',
        render: (text, record) =>
          <p>
            <a>{text}</a>
          </p>
      }
    ]
    this.that = this
    this.mapLocation = this.showInfo.bind(this)
  }
  // handleMouseEnter (text, record) {
  //   console.log(444)
  // }
  componentDidMount () {
    this.getDataList(0)
  }
  initMap () {
    if (window.BMap) {
      this.map = new window.BMap.Map('mapContainer')
      this.map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 13)
      this.map.enableScrollWheelZoom(true)
      this.map.addEventListener('click', this.mapLocation)
    }
  }
  showInfo (e) {
    this.map.clearOverlays()
    var geoc = new window.BMap.Geocoder()
    var pt = e.point
    var marker = new window.BMap.Marker(pt) // 创建标注
    this.map.addOverlay(marker) // 将标注添加到地图中
    geoc.getLocation(pt, function (rs) {
      document.getElementById('placeDiv').value = rs.address
    })
  }
  getCommiy (e) {
    console.log(e)
    this.setState({
      province: e.province,
      city: e.city,
      area: e.area,
      street: e.street,
      community: e.community
    })
  }
  /**
   * 获取数据列表（tab1）
   * @param pageIndex
   * @param searchValues
   */
  getDataList (pageIndex, searchValues) {
    this.searchValues = searchValues
    let params = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE
    }
    if (searchValues) {
      params.licenseNumber = searchValues.licenseNumber
      params.ownerName = searchValues.ownerName
      params.driver = searchValues.driver
      params.vehicleColorCode = searchValues.vehicleColorCode === 'all' ? searchValues.vehicleColorCode = '' : searchValues.vehicleColorCode
      params.vehicleCategoryCode = searchValues.vehicleCategoryCode === 'all' ? searchValues.vehicleCategoryCode = '' : searchValues.vehicleCategoryCode
      params.plateColorCode = searchValues.plateColorCode === 'all' ? searchValues.plateColorCode = '' : searchValues.plateColorCode
      params.simpleTag = searchValues.simpleTag
      params.plateColorCode = searchValues.plateColorCode
      params.registerStartTime = searchValues.rangdateStartDate
      params.registerEndTime = searchValues.rangdateEndDate
      // params.provinceCode = this.state.province
      // params.cityCode = this.state.city
      // params.areaCode = this.state.area
      // params.jdCode = this.state.street
      // params.sqCode = this.state.community
    }
    this.props.getCarList(params)
    this.props.aaaaa(params)
  }
  render () {
    const { counts, carLists } = this.props
    return (
      <div>
        <div id='ddd' style={{ display: 'none' }}></div>
        <div id='bbb' style={{ display: 'none' }}></div>
        <SearchForm
          formConfig={this.formConfig}
          doSearch={(values) => { this.getDataList(0, values) }}
        />
        <div className='levelFour'>
          <Cascade onDataChange={(e) => this.getCommiy(e)}></Cascade>
        </div>
        <IotTable
          topButtons={this.tableTopButtons}
          columns={this.tableColumns}
          dataSource={carLists}
          totalPage={counts}
          onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
        />
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    carLists: state.default.livePlaceReducer.get('carLists'),
    counts: state.default.livePlaceReducer.get('counts'),
    tagList: state.default.livePlaceReducer.get('tagList'),
    tabs: state.default.manageReducer.get('tabs')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getCarList, aaaaa, setActiveLink, carLicenseNumList }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CarManageUpdated)
