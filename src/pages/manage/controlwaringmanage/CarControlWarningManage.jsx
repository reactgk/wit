import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { message } from 'antd'
import IotTable from '../component/table/IotTable'
import {
  getCarList, setCarTagStatus, setCarWarningStatus
} from '../../../redux/actions/carControlWarningManageAction'

import { PAGE_SIZE } from '../../../redux/actions/constant.js'

class CarControlWarningManage extends PureComponent {
  constructor (props) {
    super(props)
    this.pageIndex = 0
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
            {
              props.location && props.location.state && props.location.state.category === '0'
                ? <a href="javascript:" onClick={() => { this.carControl(record) }}>{record.tagStatus === 'TAGGED' ? '撤销布控' : '布控'}</a>
                : null
            }
            {
              props.location && props.location.state && props.location.state.category === '1'
                ? <a href="javascript:" onClick={() => { this.carWarning(record) } }>{record.alertStatus === 'ALERTING' ? '忽略预警' : ''}</a>
                : null
            }
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
      this.getDataList(this.pageIndex)
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
      this.getDataList(this.pageIndex)
    }, (errorMessage) => { message.error(`忽略预警失败，${errorMessage}`) })
  }

  /**
   * 获取数据列表
   * @param pageIndex
   */
  getDataList (pageIndex) {
    this.pageIndex = pageIndex
    const { location, getCarList } = this.props
    let category = ''
    if (location && location.state) {
      category = location.state.category
    }
    let params = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE,
      category
    }
    getCarList(params)
  }

  render () {
    const { totalPage, carControlWarningManageList } = this.props
    return (
      <div>
        <IotTable
          columns={this.tableColumns}
          dataSource={carControlWarningManageList}
          totalPage={totalPage}
          onChange={(pagination) => { this.getDataList(pagination.current - 1) }}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    carControlWarningManageList: state.default.carControlWarningManageReducer.get('carControlWarningManageList'),
    totalPage: state.default.carManageReducer.get('totalPage')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getCarList, setCarTagStatus, setCarWarningStatus }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CarControlWarningManage)
