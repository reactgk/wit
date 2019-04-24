import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { message } from 'antd'
import SearchForm from '../component/searchform/SearchForm'
import IotTable from '../component/table/IotTable'
import {
  getCarList
} from '../../../redux/actions/carManageAction'
import {
  setCarTagStatus, setCarWarningStatus
} from '../../../redux/actions/carControlWarningManageAction'

import { carColorOptions, carTypeOptions, carNumberColorOptions } from '../../../data/selectOptions'

import { PAGE_SIZE } from '../../../redux/actions/constant.js'

class CarManage extends PureComponent {
  constructor (props) {
    super(props)
    this.pageIndex = 0
    this.formConfig = [
      { value: 'licenseNumber', placeholder: '请输入车牌号' },
      { value: 'ownerName', placeholder: '请输入车主' },
      { value: 'carColor', width: 145, placeholder: '请选择车辆颜色', type: 'select', options: carColorOptions },
      { value: 'carType', placeholder: '请选择车型', type: 'select', options: carTypeOptions },
      // { value: 'carAttr', placeholder: '请选择车属性', type: 'select', options: [] },
      { value: 'plateColor', width: 145, placeholder: '请选择车牌颜色', type: 'select', options: carNumberColorOptions },
      { value: 'register', width: 330, type: 'rangeDate', placeholder1: '平台登记开始时间', placeholder2: '平台登记结束时间' }
    ]
    this.tableTopButtons = [
      { label: '批量导入', style: { float: 'right', marginLeft: 24 } },
      { label: '批量导出', style: { float: 'right' } }
    ]
    this.tableColumns = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      { title: '车牌号', dataIndex: 'licenseNumber', key: 'licenseNumber' },
      { title: '车牌颜色', dataIndex: 'plateColor', key: 'plateColor' },
      { title: '车型', dataIndex: 'carType', key: 'carType' },
      { title: '车辆颜色', dataIndex: 'carColor', key: 'carColor' },
      { title: '车主', dataIndex: 'ownerName', key: 'ownerName' },
      { title: '车辆使用人', dataIndex: 'drivers', key: 'drivers' },
      { title: '车属性', dataIndex: 'carProperty', key: 'carProperty' },
      { title: '车位信息', dataIndex: 'parkingInfo', key: 'parkingInfo' },
      { title: '平台登记时间', dataIndex: 'systemRegTime', key: 'systemRegTime' },
      { title: '最后一次通行信息', dataIndex: 'latestRecord', key: 'latestRecord' },
      { title: '操作',
        dataIndex: 'control',
        key: 'control',
        render: (text, record) => (
          <span>
            <a href="javascript:" onClick={() => { this.carControl(record) }}>{record.tagStatus === 'TAGGED' ? '撤销布控' : '布控'}</a>
            <a href="javascript:" onClick={() => { this.carWarning(record) } }>{record.alertStatus === 'ALERTING' ? '忽略预警' : ''}</a>
          </span>
        ) }
    ]
  }

  componentDidMount () {
    this.getDataList(this.pageIndex)
  }

  /**
   * 车辆布控取消布控
   * @param data
   */
  carControl (data) {
    const { setCarTagStatus } = this.props
    const params = {
      identification: data.licenseNumber,
      targetStatus: data.tagStatus === 'TAGGED' ? 'UNTAGGED' : 'TAGGED'
    }
    const tipMessage = data.tagStatus === 'TAGGED' ? '撤销布控' : '布控'
    setCarTagStatus(params, () => {
      message.success(`${tipMessage}成功`)
      this.getDataList(this.pageIndex, this.searchValues)
    }, (errorMessage) => { message.error(`${tipMessage}失败，${errorMessage}`) })
  }

  /**
   * 车辆取消预警
   * @param data
   */
  carWarning (data) {
    const { setCarWarningStatus } = this.props
    const params = {
      identification: data.licenseNumber,
      targetStatus: 'IGNORED'
    }
    setCarWarningStatus(params, () => {
      message.success('忽略预警成功')
      this.getDataList(this.pageIndex, this.searchValues)
    }, (errorMessage) => { message.error(`忽略预警失败，${errorMessage}`) })
  }

  /**
   * 获取数据列表
   * @param pageIndex
   * @param searchValues
   */
  getDataList (pageIndex, searchValues) {
    this.pageIndex = pageIndex
    const { getCarList } = this.props
    let params = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE
    }
    if (searchValues) {
      this.searchValues = searchValues
      params.licenseNumber = searchValues.licenseNumber
      params.ownerName = searchValues.ownerName
      params.carColor = searchValues.carColor === 'all' ? '' : searchValues.carColor
      params.carType = searchValues.carType === 'all' ? '' : searchValues.carType
      params.plateColor = searchValues.plateColor === 'all' ? '' : searchValues.plateColor
      params.systemRegBegin = searchValues.registerStartDate
      params.systemRegEnd = searchValues.registerEndDate
    }
    getCarList(params)
  }

  render () {
    const { totalPage, carManageList } = this.props
    return (
      <div>
        <SearchForm
          formConfig={this.formConfig}
          doSearch={(values) => { this.getDataList(0, values) }}
        />
        <IotTable
          topButtons={this.tableTopButtons}
          columns={this.tableColumns}
          dataSource={carManageList}
          totalPage={totalPage}
          onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    carManageList: state.default.carManageReducer.get('carManageList'),
    totalPage: state.default.carManageReducer.get('totalPage')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getCarList, setCarTagStatus, setCarWarningStatus }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CarManage)
