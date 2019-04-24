import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setActiveLink, ACTIVE_LINK_CAR_DETAILS } from '../../../redux/actions/manageAction'
import SearchForm from '../component/searchform/SearchForm'
import IotTable from '../component/table/IotTable'
import {
  getCarList
} from '../../../redux/actions/carManageAction'

import { carColorOptions, carTypeOptions, carNumberColorOptions } from '../../../data/selectOptions'

import { PAGE_SIZE } from '../../../redux/actions/constant.js'
import { carLicenseNumList } from '../../../redux/actions/livePlaceAction'
import { Col, Popover, Row } from 'antd'
import TableSummaryPie from '../component/piechart/PieChart'

class CarManage extends PureComponent {
  constructor (props) {
    super(props)
    this.pageIndex = 0
    this.formConfig = [
      { value: 'licenseNumber', placeholder: '请输入车牌号' },
      { value: 'ownerName', placeholder: '请输入车主' },
      { value: 'carColor', width: 145, placeholder: '请选择车辆颜色', type: 'select', options: carColorOptions, defaultValue: 'all' },
      { value: 'carType', placeholder: '请选择车型', type: 'select', options: carTypeOptions, defaultValue: 'all' },
      // { value: 'carAttr', placeholder: '请选择车属性', type: 'select', options: [] },
      { value: 'plateColor', width: 145, placeholder: '请选择车牌颜色', type: 'select', options: carNumberColorOptions, defaultValue: 'all' },
      { value: 'register', width: 330, type: 'rangeDate', placeholder1: '平台登记开始时间', placeholder2: '平台登记结束时间' }
    ]
    this.tableTopButtons = [
      { label: '批量导入', style: { float: 'right', marginLeft: 24 } },
      { label: '批量导出', style: { float: 'right' } }
    ]
    const { tabs, setActiveLink } = this.props
    this.tableColumns = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      { title: '车牌号', dataIndex: 'licenseNumber', key: 'licenseNumber' },
      { title: '车型', dataIndex: 'carType', key: 'carType',
        render: value => <span>{value === '1' ? '小轿车' : value === '2' ? '货车' : '--'}</span>
      },
      { title: '车辆颜色', dataIndex: 'carColor', key: 'carColor' },
      { title: '车主', dataIndex: 'ownerName', key: 'ownerName' },
      { title: '车辆使用人', dataIndex: 'drivers', key: 'drivers' },
      { title: '车位信息', dataIndex: 'parkingInfo', key: 'parkingInfo' },
      { title: '平台登记时间', dataIndex: 'systemRegTime', key: 'systemRegTime' },
      { title: '最后一次通行点位', dataIndex: 'throughPoint', key: 'throughPoint' },
      { title: '车辆照片', dataIndex: 'carImage', key: 'carImage',
        render: (data) =>
          <Popover title="全车照片" content={<img src={data}/>} trigger="hover">
            <img style={{ height: 40 }} src={data}/>
          </Popover>
      },
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

  createSeries (nameList, valueList) {
    let result = [];
    (nameList || []).forEach((item, index) => {
      result.push({
        value: valueList[index],
        name: item,
        itemStyle: {
          color: item.color
        }
      })
    })
    return result
  }

  render () {
    const { totalPage, carManageList, carByCategory, carByPlace } = this.props
    return (
      <div>
        <SearchForm
          formConfig={this.formConfig}
          doSearch={(values) => { this.getDataList(0, values) }}
        />
        <div className='middleChart' id="charts" style={{ marginBottom: '20px' }}>
          <Row>
            <Col span={10}>
              <TableSummaryPie title = {'车辆类型分类'} id = {'categoryChart'} legendDataList = {carByCategory.xAxis} seriesDataList = {this.createSeries(carByCategory.xAxis, carByCategory.yAxis)}/>
            </Col>
            <Col span={4}>
            </Col>
            <Col span={10}>
              <TableSummaryPie title = {'车辆属地分类'} id = {'placeChart'} legendDataList = {carByPlace.xAxis} seriesDataList = {this.createSeries(carByPlace.xAxis, carByPlace.yAxis)}/>
            </Col>
          </Row>
        </div>
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
    totalPage: state.default.carManageReducer.get('totalPage'),
    carByCategory: state.default.carManageReducer.get('carByCategory'),
    carByPlace: state.default.carManageReducer.get('carByPlace'),
    tabs: state.default.manageReducer.get('tabs')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getCarList, setActiveLink, carLicenseNumList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CarManage)
