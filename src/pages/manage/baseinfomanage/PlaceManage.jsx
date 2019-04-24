import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getPlaceList
} from '../../../redux/actions/placeManageAction.js'

import IotTable from '../component/table/IotTable'
import Cascade from '../component/cascade/Cascade'

import { PAGE_SIZE } from '../../../redux/actions/constant.js'

class PlaceManage extends PureComponent {
  constructor (props) {
    super(props)
    this.pageIndex = 0
    this.tableTopButtons = [
      { label: '批量导出' },
      { label: '批量导入', style: { marginLeft: 24 } }
    ]
    this.tableColumns = [
      { title: '所属机构', dataIndex: 'sqName', key: 'serialNumber' },
      { title: '场所编码', dataIndex: 'placeCode', key: 'name' },
      { title: '场所名称', dataIndex: 'placeName', key: 'idNumber' },
      { title: '场所类型', dataIndex: 'placeTypeName', key: 'homeAddress' },
      { title: '警务站编码', dataIndex: 'stationCode', key: 'nation' },
      { title: '警务站名称', dataIndex: 'stationName', key: 'nation' },
      { title: '联系人信息', dataIndex: 'placeContact', key: 'sex' },
      { title: '管理单位', dataIndex: 'placeManageUnit', key: 'sex' },
      { title: '承建厂商', dataIndex: 'devInstallCompany', key: 'sex' },
      { title: '黑名单数量', dataIndex: 'blacklistCount', key: 'sex' },
      { title: '白名单数量', dataIndex: 'whitelistCount', key: 'sex' },
      {
        title: '操作',
        dataIndex: 'control',
        key: 'control',
        render: (text, record) => (
          <span>
            <a href="javascript:" onClick={() => { this.personControl(record) }}>点位管理</a>
            <a href="javascript:" onClick={() => { this.personControl(record) }}>设备管理</a>
            <a href="javascript:" onClick={() => { this.personControl(record) }}>编辑</a>
            <a href="javascript:" onClick={() => { this.personWarning(record) } }>删除</a>
          </span>
        )
      }
    ]
  }

  componentDidMount () {
    console.log('init')
    this.getDataList(this.pageIndex)
  }

  /**
   * 获取数据列表
   * @param pageIndex
   * @param searchValues
   */
  getDataList (pageIndex, searchValues) {
    this.pageIndex = pageIndex
    const { getPlaceList } = this.props
    let params = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE
    }
    if (searchValues) {
      this.searchValues = searchValues
      params.name = searchValues.name
      params.nationCode = searchValues.nationCode === 'all' ? '' : searchValues.nationCode
      params.sexCode = searchValues.sexCode === 'all' ? '' : searchValues.sexCode
      params.idNumber = searchValues.idNumber
      params.validDateBegin = searchValues.gradeStartDate
      params.validDateEnd = searchValues.gradeEndDate
    }
    getPlaceList(params)
  }

  render () {
    const { placeManageList, totalPage } = this.props
    return (
      <div>
        <Cascade onDataChange={(data) => { console.log(data) }}/>
        <IotTable
          topButtons={this.tableTopButtons}
          columns={this.tableColumns}
          dataSource={placeManageList}
          totalPage={totalPage}
          onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    placeManageList: state.default.placeManageReducer.get('placeManageList'),
    totalPage: state.default.placeManageReducer.get('totalPage')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getPlaceList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceManage)
