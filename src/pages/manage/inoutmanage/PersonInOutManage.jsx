import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchForm from '../component/searchform/SearchForm'
import IotTable from '../component/table/IotTable'
import { Col, Popover, Row } from 'antd'
import { modeOfPassageOptions, inOrOutOptions } from '../../../data/selectOptions.js'

import { getList } from '../../../redux/actions/personInOutManageAction.js'
import { PAGE_SIZE } from '../../../redux/actions/constant.js'
import TableSummaryPie from '../component/piechart/PieChart'
import TableSummaryBar from '../component/barchart/BarChart'

class PersonInOutManage extends PureComponent {
  constructor (props) {
    super(props)
    this.searchValues = {}
    this.formConfig = [
      { value: 'name', placeholder: '请输入姓名', width: 100 },
      { value: 'idNumber', placeholder: '请输入身份证号', width: 200 },
      { value: 'devImport', placeholder: '请选择出入类型', width: 140, type: 'select', options: inOrOutOptions, defaultValue: 'all' },
      { value: 'placeCode', placeholder: '请选择通行场所', width: 140, type: 'select', options: [], defaultValue: 'all' },
      { value: 'detectType', placeholder: '请选择通行方式', width: 140, type: 'select', options: modeOfPassageOptions, defaultValue: 'all' },
      { value: 'lastTime', width: 330, type: 'rangeDate', placeholder1: '通行开始时间', placeholder2: '通行结束时间' }
    ]
    this.tableTopButtons = [
      { label: '批量导出' }
    ]
    this.tableColumns = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      {
        title: '姓名', dataIndex: 'name', key: 'name',
        render: (data, itemData) =>
          <Popover title="人员信息" content={ this.renderOwnerInfo(itemData.person || {}) } trigger="hover">
            <a>{data}</a>
          </Popover>
      },
      { title: '身份证号', dataIndex: 'idNumber', key: 'idNumber' },
      { title: '通行时间', dataIndex: 'detectTime', key: 'detectTime' },
      {
        title: '通行方式', dataIndex: 'detectType', key: 'detectType',
        render: value => {
          let mode = modeOfPassageOptions.find((item) => item.value === value) || {}
          return <span>{mode.label}</span>
        }
      },
      {
        title: '人证对比', dataIndex: 'detectResult', key: 'detectResult',
        render: value => value === '1' ? '通过' : '不通过'
      },
      {
        title: '出入类型', dataIndex: 'devImport', key: 'devImport',
        render: value => value === '1' ? '进' : value === '2' ? '出' : '--'
      },
      { title: '通行场所', dataIndex: 'placeName', key: 'placeName' },
      { title: '通行点位', dataIndex: 'pointName', key: 'pointName' },
      { title: '设备类型', dataIndex: 'devType', key: 'devType' },
      { title: '设备名称', dataIndex: 'devName', key: 'devName' },
      {
        title: '图片', dataIndex: 'imageFace', key: 'imageFace',
        render: (data) =>
          <Popover title="图片" content={<img src={data}/>} trigger="hover">
            <img style={{ height: 40 }} src={data}/>
          </Popover>
      }
    ]
  }

  componentDidMount () {
    this.getDataList(0)
  }

  renderOwnerInfo (person) {
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

  /**
   * 获取数据列表
   * @param pageIndex
   * @param searchValues
   */
  getDataList (pageIndex, searchValues) {
    const { getList } = this.props
    let params = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE
    }
    if (searchValues) {
      this.searchValues = searchValues
      params.detectType = searchValues.detectType === 'all' ? '' : searchValues.detectType
      params.idNumber = searchValues.idNumber
      params.name = searchValues.name
      params.devImport = searchValues.devImport === 'all' ? '' : searchValues.devImport
      params.placeCode = searchValues.placeCode === 'all' ? '' : searchValues.placeCode
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
    const { isRequestPlaceTypesEnd, placeTypes, personInOutManageList, totalPage, personByLocation, personDaily, personInday } = this.props
    if (!isRequestPlaceTypesEnd) {
      return null
    }
    this.formConfig[3].options = placeTypes
    return (
      <div>
        <SearchForm
          formConfig={this.formConfig}
          doSearch={(values) => { this.getDataList(0, values) }}
        />
        <div className='middleChart' id="charts" style={{ marginBottom: '20px' }}>
          <Row>
            <Col span={8}>
              <TableSummaryPie title = {'人员通行场所统计'} id = {'personByLocationChart'} legendDataList = {personByLocation.xAxis} seriesDataList = {this.createSeries(personByLocation.xAxis, personByLocation.yAxis)}/>
            </Col>
            <Col span={8}>
              <TableSummaryBar title = {'七日流量统计'} id = {'personDailyChart'} xAxisDataList = {personDaily.xAxis} yAxisDataList = {personDaily.yAxis}/>
            </Col>
            <Col span={8}>
              <TableSummaryBar title = {'当日分时段流量统计'} id = {'personIndayChart'} xAxisDataList = {personInday.xAxis} yAxisDataList = {personInday.yAxis}/>
            </Col>
          </Row>
        </div>
        <IotTable
          topButtons={this.tableTopButtons}
          columns={this.tableColumns}
          dataSource={personInOutManageList}
          totalPage={totalPage}
          onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isRequestPlaceTypesEnd: state.default.manageReducer.get('isRequestPlaceTypesEnd'),
    placeTypes: state.default.manageReducer.get('placeTypes'),
    personInOutManageList: state.default.personInOutManageReducer.get('personInOutManageList'),
    totalPage: state.default.personInOutManageReducer.get('totalPage'),
    personByLocation: state.default.personInOutManageReducer.get('personByLocation'),
    personDaily: state.default.personInOutManageReducer.get('personDaily'),
    personInday: state.default.personInOutManageReducer.get('personInday')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonInOutManage)
