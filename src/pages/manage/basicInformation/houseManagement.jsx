import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getPersonList,
  setPersonTagStatus, setPersonWarningStatus
} from '../../../redux/actions/baseInformationManageAction'
import { Popover } from 'antd'
import SearchForm from '../component/searchform/SearchForm'
import IotTable from '../component/table/IotTable'
import { warningLevelOptions } from '../../../data/selectOptions.js'
// import { houseUseTypeOptions, houseDurationOptions, houseStructureOptions, houseTypeOptions,
//   houseBuildTimeTypeOptions } from '../../../data/selectOptions.js'
import { PAGE_SIZE } from '../../../redux/actions/constant.js'
import {
  ACTIVE_LINK_PEOPLE_DETAILS, setActiveLink
} from '../../../redux/actions/manageAction'
class houseManage extends PureComponent {
  constructor (props) {
    super(props)
    this.pageIndex = 0
    this.formConfig = [
      { value: 'warnLevel', placeholder: '预警级别', type: 'select', options: warningLevelOptions },
      // { value: 'placeCode', width: 200, placeholder: '场所名称', type: 'select', options: [] },
      // { value: 'landloard', width: 200, placeholder: '户主', type: 'input' },
      // { value: 'houseUseType', width: 200, placeholder: '当前状态', type: 'select', options: houseUseTypeOptions },
      // { value: 'houseType', placeholder: '房屋性质', type: 'select', options: houseTypeOptions },
      // { value: 'houseBuildTimeType', placeholder: '建造年份', type: 'select', options: houseBuildTimeTypeOptions },
      // { value: 'houseDuration', width: 200, type: 'select', placeholder: '使用年限', options: houseDurationOptions },
      // { value: 'date', type: 'rangeDate', placeholder1: '平台登记开始时间', placeholder2: '平台登记结束时间', width: 350 },
      // { value: 'houseStructure', width: 200, type: 'select', placeholder: '结构', options: houseStructureOptions },
      { value: 'personNum', width: 200, type: 'input', placeholder: '居住人数' }
    ]
    this.tableColumns = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '身份证号', dataIndex: 'idNumber', key: 'idNumber' },
      { title: '居住地', dataIndex: 'homeAddress', key: 'homeAddress' },
      { title: '民族', dataIndex: 'nation', key: 'nation' },
      { title: '性别', dataIndex: 'sex', key: 'sex' },
      {
        title: '图片',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (data) =>
          <Popover title="图片" content={<img src={data}/>} trigger="hover">
            <img style={{ height: 40 }} src={data}/>
          </Popover>
      },
      {
        title: '操作',
        dataIndex: 'control',
        key: 'control',
        render: (text, record) => (
          <span>
            <a href="javascript:" onClick={() => { this.personControl(record) }}>{record.tagStatus === 'TAGGED' ? '撤销布控' : '布控'}</a>
            <a href="javascript:" onClick={() => { this.personWarning(record) } }>{record.alertStatus === 'ALERTING' ? '忽略预警' : ''}</a>
          </span>
        )
      }
    ]
  }

  componentDidMount () {
    this.getDataList(this.pageIndex)
  }

  /**
   * 获取数据列表
   * @param pageIndex
   * @param searchValues
   */
  getDataList (pageIndex, searchValues) {
    this.pageIndex = pageIndex
    const { getPersonList } = this.props
    let params = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE
    }
    if (searchValues) {
      this.searchValues = searchValues
      // params.proviceCode = searchValues.placeCode
      // params.cityCode = searchValues.placeCode
      // params.countyCode = searchValues.placeCode
      // params.townsCode = searchValues.placeCode
      // params.communityCode = searchValues.communityCode
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
      // params.sexCode = searchValues.sexCode === 'all' ? '' : searchValues.sexCode
    }
    getPersonList(params)
  }

  render () {
    const { personManageList, totalPage, tabs, setActiveLink } = this.props

    return (
      <div>
        <SearchForm
          formConfig={this.formConfig}
          doSearch={(values) => { this.getDataList(0, values) }}
        />
        <div className='nav-item nav-sub-item-active'
          onClick={() => { setActiveLink(ACTIVE_LINK_PEOPLE_DETAILS, tabs) }}>
          <span className="label">详奥术大师大a情</span>
        </div>
        <IotTable
          topButtons={this.tableTopButtons}
          columns={this.tableColumns}
          dataSource={personManageList}
          totalPage={totalPage}
          onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isRequestNationTypesEnd: state.default.manageReducer.get('isRequestNationTypesEnd'),
    nationTypes: state.default.manageReducer.get('nationTypes'),
    personManageList: state.default.personManageReducer.get('personManageList'),
    totalPage: state.default.personManageReducer.get('totalPage'),
    activeLink: state.default.manageReducer.get('activeLink'),
    tabs: state.default.manageReducer.get('tabs')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getPersonList, setPersonTagStatus, setPersonWarningStatus, setActiveLink }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(houseManage)
