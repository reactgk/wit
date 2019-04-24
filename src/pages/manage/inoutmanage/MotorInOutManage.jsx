import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Col, Popover, Row } from 'antd'
import SearchForm from '../component/searchform/SearchForm'
import IotTable from '../component/table/IotTable'
import { inOrOutOptions, carTypeOptions } from '../../../data/selectOptions.js'

import { getList } from '../../../redux/actions/carInOutManageAction'
import { PAGE_SIZE } from '../../../redux/actions/constant.js'
import TableSummaryPie from '../component/piechart/PieChart'
import TableSummaryBar from '../component/barchart/BarChart'

class MotorInOutManage extends PureComponent {
  constructor (props) {
    super(props)
    this.searchValues = {}
    this.formConfig = [
      { value: 'licenseNumber', placeholder: '请输入车牌号' },
      { value: 'ownerName', placeholder: '请输入户主', width: 100 },
      { value: 'driverName', placeholder: '请输入驾驶人', width: 120 },
      { value: 'placeCode', placeholder: '请选择通行场所', width: 145, type: 'select', options: [], defaultValue: 'all' },
      { value: 'carType', placeholder: '请选择车辆类型', width: 145, type: 'select', options: carTypeOptions, defaultValue: 'all' },
      { value: 'inOrOut', placeholder: '请选择出入类型', width: 140, type: 'select', options: inOrOutOptions, defaultValue: 'all' },
      { value: 'lastTime', type: 'rangeDate', placeholder1: '通行开始时间', placeholder2: '通行结束时间' }
    ]
    this.tableTopButtons = [
      { label: '批量导出' }
    ]
    this.tableColumns = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      { title: '车牌号', dataIndex: 'idplate', key: 'idplate' },
      { title: '通行时间', dataIndex: 'recordTime', key: 'recordTime' },
      { title: '车辆类型', dataIndex: 'devImport', key: 'devImport',
        render: value => <span>{value === '1' ? '进' : value === '2' ? '出' : '--'}</span>
      },
      {
        title: '出入类型', dataIndex: 'carCompare', key: 'carCompare' },
      { title: '通行场所', dataIndex: 'placeName', key: 'placeName' },
      { title: '通行点位', dataIndex: 'pointName', key: 'pointName' },
      { title: '设备名称', dataIndex: 'devName', key: 'devName' },
      {
        title: '车牌照片', dataIndex: 'imagePlate', key: 'imagePlate',
        render: (data) =>
          <Popover title="车牌照片" content={<img src={data}/>} trigger="hover">
            <img style={{ height: 40 }} src={data}/>
          </Popover>
      },
      {
        title: '全车照片', dataIndex: 'imageFullPlate', key: 'imageFullPlate',
        render: (data) =>
          <Popover title="全车照片" content={<img src={data}/>} trigger="hover">
            <img style={{ height: 40 }} src={data}/>
          </Popover>
      },
      {
        title: '车主', dataIndex: 'ownerName', key: 'ownerName',
        render: (data, record) =>
          <Popover title="车主信息" content={ this.renderPersonInfo(record.owner || {}) } trigger="hover">
            <a>{data}</a>
          </Popover>
      },
      {
        title: '驾驶人', dataIndex: 'driver', key: 'driver',
        render: (data, record) => {
          if (record.driverReged === '1') {
            return (
              <Popover title="车主信息" content={ this.renderPersonInfo(data || {}) } trigger="hover">
                <a>{(data || {})['name'] || '--'}</a>
              </Popover>
            )
          } else {
            return <span>{(data || {})['name'] || '--'}</span>
          }
        }
      }
    ]
  }

  componentDidMount () {
    this.getDataList(0)
  }

  renderPersonInfo (person) {
    return (
      <Fragment>
        <p>姓名：{person.name}</p>
        <p>联系方式1：{person.telePhonr}</p>
        <p>联系方式2：{person.telePhonr2 || '--'}</p>
        <p>身份证号：{person.idNumber}</p>
        <p>现居住地：{person.homeAddress}</p>
        <p>居住类型：{person.bloodType}</p>
      </Fragment>
    )
  }

  getDataList (pageIndex, searchValues) {
    const { getList } = this.props
    let params = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE
    }
    if (searchValues) {
      this.searchValues = searchValues
      params.licenseNumber = searchValues.licenseNumber
      params.ownerName = searchValues.ownerName
      params.driverName = searchValues.driverName
      params.placeCode = searchValues.placeCode === 'all' ? '' : searchValues.placeCode
      params.carType = searchValues.carType === 'all' ? '' : searchValues.carType
      params.inOrOut = searchValues.inOrOut === 'all' ? '' : searchValues.inOrOut
      params.startTime = searchValues['lastTimeStartDate']
      params.endTime = searchValues['lastTimeEndDate']
    }
    getList(params)
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
    const { isRequestPlaceTypesEnd, placeTypes, motorInOutManageList, motorTotalPage, carByLocation, carInday, carDaily } = this.props
    if (!isRequestPlaceTypesEnd) {
      return null
    }
    this.formConfig[3].options = placeTypes
    return (
      <div>
        <SearchForm
          formConfig={this.formConfig}
          doSearch={(values) => { this.getDataList(1, values) }}
        />
        <div className='middleChart' id="charts" style={{ marginBottom: '20px' }}>
          <Row>
            <Col span={8}>
              <TableSummaryPie title = {'车辆通行场所统计'} id = {'carByLocationChart'} legendDataList = {carByLocation.xAxis} seriesDataList = {this.createSeries(carByLocation.xAxis, carByLocation.yAxis)}/>
            </Col>
            <Col span={8}>
              <TableSummaryBar title = {'七日流量统计'} id = {'carDailyChart'} xAxisDataList = {carDaily.xAxis} yAxisDataList = {carDaily.yAxis}/>
            </Col>
            <Col span={8}>
              <TableSummaryBar title = {'当日分时段流量统计'} id = {'carIndayChart'} xAxisDataList = {carInday.xAxis} yAxisDataList = {carInday.yAxis}/>
            </Col>
          </Row>
        </div>
        <IotTable
          topButtons={this.tableTopButtons}
          columns={this.tableColumns}
          dataSource={ motorInOutManageList }
          totalPage={motorTotalPage}
          onChange={(pagination) => { this.getDataList(pagination.current, this.searchValues) }}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isRequestPlaceTypesEnd: state.default.manageReducer.get('isRequestPlaceTypesEnd'),
    placeTypes: state.default.manageReducer.get('placeTypes'),
    motorInOutManageList: state.default.carInOutManageReducer.get('motorInOutManageList'),
    motorTotalPage: state.default.carInOutManageReducer.get('motorTotalPage'),
    carByLocation: state.default.carInOutManageReducer.get('carByLocation'),
    carDaily: state.default.carInOutManageReducer.get('carDaily'),
    carInday: state.default.carInOutManageReducer.get('carInday')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MotorInOutManage)
