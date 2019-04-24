import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchForm from '../component/searchform/SearchForm'
import IotTable from '../component/table/IotTable'
import Cascade from '../component/cascade/Cascade'
import { Popover } from 'antd'
import { getqueryHouses, houseLicenseNumList, houseLivePeopleList } from '../../../redux/actions/livePlaceAction'
import './commonmange.less'
import { houseUseTypeOptions, houseDurationOptions, houseStructureOptions, houseTypeOptions,
  houseBuildTimeTypeOptions } from '../../../data/selectOptions.js'
import {
  setActiveLink, ACTIVE_LINK_HOUSE_DETAILS, getplaceTopic } from '../../../redux/actions/manageAction'
import { PAGE_SIZE } from '../../../redux/actions/constant.js'
class HouseManage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = ({
      visible: false
    })
    this.formConfig = [
      { value: 'placeCode', width: 200, placeholder: '场所名称', type: 'select', options: [] },
      { value: 'landloard', width: 200, placeholder: '户主', type: 'input' },
      { value: 'houseUseType', width: 200, placeholder: '当前状态', type: 'select', options: houseUseTypeOptions },
      { value: 'houseType', width: 200, placeholder: '房屋性质', type: 'select', options: houseTypeOptions },
      { value: 'houseBuildTimeType', width: 200, placeholder: '建造年份', type: 'select', options: houseBuildTimeTypeOptions },
      { value: 'houseDuration', width: 200, type: 'select', placeholder: '使用年限', options: houseDurationOptions },
      { value: 'date', type: 'rangeDate', placeholder1: '平台登记开始时间', placeholder2: '平台登记结束时间', width: 350 },
      { value: 'houseStructure', width: 200, type: 'select', placeholder: '结构', options: houseStructureOptions }

      // { value: 'name', placeholder: '请选择场所名称', width: 145, type: 'select', options: [], defaultValue: 'all' },
      // { value: 'carOwner', placeholder: '户主', width: 80, type: 'input' },
      // { value: 'color', placeholder: '请选择当前状态', width: 145, type: 'select', options: [], defaultValue: 'all' },
      // { value: 'carType', placeholder: '请选择房屋性质', width: 145, type: 'select', options: [], defaultValue: 'all' },
      // { value: 'carAttr', placeholder: '请选择建造年份', width: 145, type: 'select', options: [], defaultValue: 'all' },
      // { value: 'carIdColora', placeholder: '请选择使用年限', width: 145, type: 'select', options: [], defaultValue: 'all' },
      // { value: 'lastTime', width: 330, type: 'rangeDate', placeholder1: '平台登记开始时间', placeholder2: '平台登记结束时间' },
      // { value: 'carIdColoraa', placeholder: '请选择结构', type: 'select', options: [], defaultValue: 'all' },
      // { value: 'carIdColoraaa', placeholder: '请选择居住人数', width: 145, type: 'select', options: [], defaultValue: 'all' }
    ]
    this.tableTopButtons = [
      { label: '批量导出' },
      { label: '批量导入', style: { marginLeft: 24 } }
    ]
    const { tabs, setActiveLink } = this.props
    this.tableColumns = [
      // { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber',
      //   render: (text, record) => {
      //     let content = ''
      //     content = (
      //       <div>
      //         <p>所属机构：{record.areaName}</p>
      //         <p>地址：{record.placeAddress}</p>
      //       </div>
      //     )
      //     return (
      //       <Popover title='' content={ content } trigger="hover">
      //         <a>{record.personName}</a>
      //       </Popover>)
      //   } },
      { title: '场所名称', dataIndex: 'placeName', key: 'placeName' },
      { title: '楼栋名', dataIndex: 'houseBuilding', key: 'houseBuilding' },
      { title: '单元号', dataIndex: 'houseUnit', key: 'houseUnit' },
      // { title: '层号', dataIndex: 'houseFloor', key: 'houseFloor' },
      { title: '户号', dataIndex: 'houseNumber', key: 'houseNumber' },
      { title: '户主', dataIndex: 'housePeople', key: 'housePeople',
        render: (text, record) => {
          let content = ''
          content = (
            <div>
              <p>车主：{record.name}</p>
              <p>联系方式1：{record.telePhonr}</p>
              <p>联系方式2：</p>
              <p>身份证号：{record.idnumber}</p>
              <p>现居住地：{record.personLiveType}</p>
              <p>居住类型：{record.throughType}</p>
            </div>
          )
          return (
            <Popover title='' content={ content } trigger="hover">
              <a>{record.personName}</a>
            </Popover>)
        }
      },
      { title: '结构', dataIndex: 'houseStructure', key: 'houseStructure' },
      { title: '建造年份', dataIndex: 'houseBuildTime', key: 'houseBuildTime' },
      { title: '房屋性质', dataIndex: 'houseType', key: 'houseType' },
      { title: '平台登记时间', dataIndex: 'registerTime', key: 'registerTime' },
      { title: '使用年限', dataIndex: 'houseDuration', key: 'houseDuration' },
      { title: '当前状态', dataIndex: 'houseUseType', key: 'houseUseType' },
      { title: '当前居住人数', dataIndex: 'personNum', key: 'personNum' },
      { title: '详情', dataIndex: 'name77', key: 'houseAddress',
        render: (text, record) =>
          <div className='nav-item nav-sub-item-active'
            onClick={() => {
              setActiveLink(ACTIVE_LINK_HOUSE_DETAILS, tabs)
              this.props.houseLicenseNumList(record.id)
              this.props.houseLivePeopleList(record.id)
            }}>
            <span className="label">详情</span>
          </div>
      }
    ]
  }

  componentDidMount () {
    this.getDataList(0)
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
      // params.proviceCode = this.state.province
      // params.cityCode = this.state.city
      // params.countyCode = this.state.area
      // params.cityCode = this.state.street
      // params.townsCode = this.state.community
      // params.communityCode = searchValues.province
      params.placeCode = searchValues.placeCode
      params.landloard = searchValues.landloard
      params.houseUseType = searchValues.houseUseType
      params.houseType = searchValues.houseType
      params.houseBuildTimeType = searchValues.houseBuildTimeType
      params.houseDuration = searchValues.houseDuration
      params.houseStructure = searchValues.houseStructure
      params.registerStartTime = searchValues.dateStartDate
      params.registerEndTime = searchValues.dateStartDate
      params.personNum = searchValues.personNum
    }
    this.props.getqueryHouses(params)
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
  render () {
    const { houseManageList, count, placeFloating } = this.props

    this.formConfig[0].options = placeFloating
    console.log(count, 'zongshu', placeFloating)

    return (
      <div className='houseManage'>
        <div className='levelFour' style={{ paddingTop: '10px', marginBottom: '0PX', paddingBottom: '0px' }}>
          <Cascade onDataChange={(e) => this.getCommiy(e)}></Cascade>
        </div>
        <SearchForm
          formConfig={this.formConfig}
          doSearch={(values) => { this.getDataList(0, values) }}
        />
        <IotTable
          topButtons={this.tableTopButtons}
          columns={this.tableColumns}
          dataSource={houseManageList}
          totalPage={count}
          onChange={() => {}}
        />
        {/* <div className='' onClick={() => this.showModal()}>xjkadklda</div> */}

      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    houseManageList: state.default.livePlaceReducer.get('houseManageList'),
    count: state.default.livePlaceReducer.get('count'),
    activeLink: state.default.manageReducer.get('activeLink'),
    placeFloating: state.default.manageReducer.get('placeFloating'),
    tabs: state.default.manageReducer.get('tabs')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getqueryHouses, setActiveLink, houseLicenseNumList, houseLivePeopleList, getplaceTopic }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseManage)
