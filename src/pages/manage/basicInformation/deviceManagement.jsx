import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchForm from '../component/searchform/SearchForm'
import IotTable from '../component/table/IotTable'
import httpClient from '../../../network/httpClient'
import {
  getPopulationFloatingList,
  detailedInformationQuery, getPopulationSize,
  getPopulationFloating
} from '../../../redux/actions/populationFloatlingAction'
// import { getPopulationFloating } from '../../../redux/actions/manageAction.js'
import { Tabs, Modal, Select } from 'antd'
import { PAGE_SIZE } from '../../../redux/actions/constant.js'
import { timestart, timeend } from '../component/searchform/FormWrapper'
import {
  getLivePlacePlot,
  streetSelectChange,
  buildSelectChange,
  placeSelectChange,
  roomSelectChange
} from '../../../redux/actions/livePlaceAction.js'
import { peopleTypeOptions } from '../../../data/selectOptions'
// import $ from 'jquery'
const Option = Select.Option
const TabPane = Tabs.TabPane
class topicManage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      list1: [],
      list2: [],
      list3: [],
      placeSearch: '',
      buildingSearch: '',
      livePlace: '',
      untl: 'dd1',
      untl1: 'dd2',
      untl2: 'dd3'
    }
    this.searchValues = {}
    this.formConfig = [
      { value: 'placeTypeName', width: 200, placeholder: '查询场所', type: 'select', options: [] },
      { value: 'nationCode', placeholder: '选择民族', type: 'select', options: [] },
      { value: 'provinceCode', width: 145, placeholder: '户籍地', type: 'select', options: [] },
      { value: 'personTag', placeholder: '人员标签', type: 'select', options: [] },
      { value: 'livePlaceCode', placeholder: '现居住地', type: 'select', options: [] },
      { value: 'rangdate', width: 340, type: 'hasrangeDate', placeholder1: '时间跨度开始时间', placeholder2: '时间跨度结束时间' }
    ]
    this.tableColumns = [
      { title: '场所', dataIndex: 'placeName', key: 'placeCode' },
      { title: '时间跨度', dataIndex: 'timeSpan', key: 'timeSpan' },
      { title: '民族', dataIndex: 'nationName', key: 'nationName' },
      { title: '户籍地', dataIndex: 'registerPlace', key: 'registerPlace' },
      { title: '居住住地', dataIndex: 'livePlaceCode', key: 'livePlaceCode' },
      { title: '人员标签', dataIndex: 'tagName', key: 'tagName' },
      { title: '点位数',
        dataIndex: 'pointCount',
        key: 'pointCount',
        render: (text, record) =>
          <p>
            <a onClick={() => { this.getPoint(text, record) } }>{text}</a>
          </p>
      },
      { title: '流入量', dataIndex: 'inflow', key: 'inflow' },
      { title: '流出量', dataIndex: 'outflow', key: 'outflow' },
      { title: '净流量', dataIndex: 'netflow', key: 'netflow' },
      { title: '同比增长', dataIndex: 'yearGrowth', key: 'yearGrowth' },
      { title: '环比增长', dataIndex: 'ringGrowth', key: 'ringGrowth' },
      { title: '流入人次', dataIndex: 'inPerson', key: 'inPerson' },
      { title: '流出人次', dataIndex: 'outPerson', key: 'outPerson' },
      { title: '流动人口', dataIndex: 'floatPop', key: 'floatPop' }
    ]
    // tab2
    this.searchValuesq = {}
    this.formConfigs = [
      { value: 'placeCode', width: 200, placeholder: '查询场所', type: 'select', options: [] },
      { value: 'NationCode', placeholder: '选择民族', type: 'select', options: [] },
      { value: 'ProvinceCode', width: 145, placeholder: '户籍地', type: 'select', options: [] },
      { value: 'personTag', placeholder: '人员标签', type: 'select', options: [] },
      { value: 'flowType', placeholder: '流动类型', type: 'select', options: peopleTypeOptions },
      { value: 'rangdate', width: 340, type: 'hasrangeDate', placeholder1: '时间跨度开始时间', placeholder2: '时间跨度结束时间' }
    ]
    this.tableColumnsq = [
      { title: '场所', dataIndex: 'placeName', key: 'flowDate' },
      { title: '流动时间', dataIndex: 'flowDate', key: 'flowDate' },
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '性别', dataIndex: 'sex', key: 'sex' },
      { title: '身份证号', dataIndex: 'idnumber', key: 'idnumber' },
      { title: '流动类型', dataIndex: 'flowType', key: 'flowType' },
      { title: '民族', dataIndex: 'nationName', key: 'nationName' },
      { title: '户籍地', dataIndex: 'provinceName', key: 'provinceName' },
      { title: '现居住地', dataIndex: 'livePlaceName', key: 'livePlaceName' },
      { title: '人员标签', dataIndex: 'tagName', key: 'tagName' },
      { title: '人员信息详情', dataIndex: 'yearGrowth', key: 'yearGrowth',
        render: (text, record) =>
          <p>
            <a onClick={() => { this.getPoint(text, record) } }>{text}</a>
          </p> }
    ]
  }

  componentDidMount () {
    this.getDataList(0)
    this.getDatadetails(0)
    this.props.getLivePlacePlot()
  }
  getPoint (e, record) {
    let pointArray = []
    httpClient.post('staticPerson/pointInfo', { pointCode: record.pointCode, startDate: timestart, endDate: timeend })
      .then(result => {
        let data = result.data || []
        const { list } = data
        pointArray = list
        Modal.info({
          title: '点位详情',
          content: (pointArray).map((value, key) =>
            <div key={key}>
              <hr/>
              <div>点位：{value.pointCode}</div>
              <div>点位名称：{value.pointName}</div>
              <div>流出量：{value.outflow}</div>
              <div>流入量：{value.inflow}</div>
              <div>流入人次：{value.inPerson}</div>
              <div>流出人次：{value.outPerson}</div>
            </div>

          )
        })
      })
  }

  /**
   * 获取数据列表（tab1）
   * @param pageIndex
   * @param searchValues
   */
  getDataList (pageIndex, searchValues) {
    const { getPopulationFloatingList } = this.props
    const { getPopulationSize } = this.props
    const { getPopulationFloating } = this.props
    this.searchValues = searchValues
    let params = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE

    }
    let param = {}
    let floatParam = {}
    if (searchValues) {
      params.licenseNumber = searchValues.licenseNumber
      params.placeCode = searchValues.placeTypeName
      params.NationCode = searchValues.nationCode
      params.personTag = searchValues.personTag
      params.livePlaceCode = searchValues.livePlaceCode
      params.startDate = searchValues.rangdateStartDate
      params.endDate = searchValues.rangdateEndDate
      floatParam.licenseNumber = searchValues.licenseNumber
      floatParam.placeCode = searchValues.placeTypeName
      floatParam.NationCode = searchValues.nationCode
      floatParam.personTag = searchValues.personTag
      floatParam.livePlaceCode = searchValues.livePlaceCode
      floatParam.startDate = searchValues.rangdateStartDate
      floatParam.endDate = searchValues.rangdateEndDate
      param.placeTypeName = searchValues.placeTypeName
    } else {
      params.startDate = timestart
      params.endDate = timeend
      floatParam.startDate = timestart
      floatParam.endDate = timeend
    }

    getPopulationFloatingList(params)
    getPopulationSize(param)
    getPopulationFloating(floatParam)
  }
  /**
   * 获取数据列表详细信息查询（tab2）
   * @param pageIndex
   * @param searchValues
   */
  getDatadetails (pageIndex, searchValues) {
    const { detailedInformationQuery } = this.props
    let params = {
      pageIndex: pageIndex,
      pageSize: 10
    }
    if (searchValues) {
      this.searchValuesq = searchValues
      params.placeCode = searchValues.placeCode
      params.NationCode = searchValues.NationCode
      params.ProvinceCode = searchValues.ProvinceCode
      params.personTag = searchValues.personTag
      params.flowType = searchValues.flowType
      params.plateColor = searchValues.plateColor
      params.startDate = searchValues.rangdateStartDate
      params.endDate = searchValues.rangdateEndDate
      params.livePlaceCode = this.props.quartersValue
      params.Building = this.props.bulidValue
      params.Unit = this.props.unitValue
      params.Room = this.props.roomValue
    } else {
      params.startDate = timestart
      params.endDate = timeend
    }
    detailedInformationQuery(params)
  }
  render () {
    const { isRequestPlaceTopicEnd, getdetailedInformationList, counts
      , placeFloating
      , isRequestNationTypesEnd
      , nationTypes
      , isRequestGetsLiveEnd
      , livePlace
      , DomicilePlace
      , isRequestDomicilePlaceEnd

      , floatingList, floatNationList
      , getPopulationList, count, streetList, streetSelectChange, bulidingList, bulidValue
      , unitValue
      , placeList, roomList, roomValue, roomSelectChange,
      buildSelectChange, placeSelectChange, quartersValue
    } = this.props
    console.log(floatingList, 908989)

    if (!isRequestPlaceTopicEnd) {
      return null
    }
    if (!isRequestNationTypesEnd) {
      return null
    }
    if (!isRequestGetsLiveEnd) {
      return null
    }
    if (!isRequestDomicilePlaceEnd) {
      return null
    }
    this.formConfig[0].options = placeFloating
    this.formConfig[1].options = nationTypes
    this.formConfig[2].options = DomicilePlace
    this.formConfig[4].options = livePlace

    this.formConfigs[0].options = placeFloating
    console.log(floatNationList)
    return (
      <div>
        <Tabs onChange={callback} type="card">
          <TabPane tab="dawqqweqwe" key="1">
            <SearchForm
              formConfig={this.formConfig}
              doSearch={(values) => { this.getDataList(0, values) }}
            />
            <IotTable
              topButtons={this.tableTopButtons}
              columns={this.tableColumns}
              dataSource={getPopulationList}
              totalPage={count}
              onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
            />
          </TabPane>
          <TabPane tab="dasdasdas" key="2">
            <SearchForm
              formConfig={this.formConfigs}
              doSearch={(values) => { this.getDatadetails(0, values) }}
            />
            <div className='levelFour'>
              <Select
                value={quartersValue}
                style={{ width: 200 }}
                placeholder={'请选择现居地'}
                onChange={(value, item) => { streetSelectChange(value, item) }}>
                <Option value={''}>全部</Option>
                {
                  streetList.map(item =>
                    <Option key={item.name} value={item.name}>{item.name}</Option>
                  )
                }
              </Select>
              <Select value={bulidValue}
                style={{ width: 200, marginLeft: 20, marginRight: 20 }}
                placeholder={'请选择楼号'}
                onChange={(value, item, e) => { buildSelectChange(value, item) }}>
                <Option value={''}>全部</Option>
                {
                  bulidingList.map(item =>
                    <Option key={item.name} value={item.name}>{item.name}</Option>
                  )
                }
              </Select>
              <Select value={unitValue}
                style={{ width: 200, marginLeft: 20, marginRight: 20 }}
                placeholder={'请选择单元'}
                onChange={(value, item) => { placeSelectChange(value, item) }}>
                <Option value={''}>全部</Option>
                {
                  placeList.map(item =>
                    <Option key={item.name} value={item.name}>{item.name}</Option>
                  )
                }
              </Select>
              <Select value={roomValue}
                style={{ width: 200, marginLeft: 20, marginRight: 20, color: '#bfbfbf' }}
                placeholder={'请选择门牌号'}
                onChange={(value) => { roomSelectChange(value) }}>
                <Option value={''}>全部</Option>
                {
                  roomList.map(item =>
                    <Option key={item.name} value={item.name}>{item.name}</Option>
                  )
                }
              </Select>
            </div>
            <IotTable
              topButtons={this.tableTopButtons}
              columns={this.tableColumnsq}
              dataSource={getdetailedInformationList}
              totalPage={counts}
              onChange={(pagination) => { this.getDatadetails(pagination.current - 1, this.searchValuesq) }}
            />
          </TabPane>
        </Tabs>

      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    isRequestNationTypesEnd: state.default.manageReducer.get('isRequestNationTypesEnd'),
    nationTypes: state.default.manageReducer.get('nationTypes'),
    carManageList: state.default.populationFloatingReducer.get('carManageList'),
    totalPage: state.default.populationFloatingReducer.get('totalPage'),
    isRequestPlaceTopicEnd: state.default.manageReducer.get('isRequestPlaceTopicEnd'),
    placeFloating: state.default.manageReducer.get('placeFloating'),
    isRequestGetsLiveEnd: state.default.manageReducer.get('isRequestGetsLiveEnd'),
    livePlace: state.default.manageReducer.get('livePlace'),
    isCascaderEnd: state.default.manageReducer.get('isCascaderEnd'),
    CascaderEnd: state.default.manageReducer.get('CascaderEnd'),
    bulidingList: state.default.livePlaceReducer.get('bulidingList'),
    bulidValue: state.default.livePlaceReducer.get('bulidValue'),
    roomList: state.default.livePlaceReducer.get('roomList'),
    roomValue: state.default.livePlaceReducer.get('roomValue'),
    unitValue: state.default.livePlaceReducer.get('unitValue'),
    unitList: state.default.livePlaceReducer.get('unitList'),
    quartersValue: state.default.livePlaceReducer.get('quartersValue'),
    placeList: state.default.livePlaceReducer.get('placeList'),
    streetList: state.default.livePlaceReducer.get('streetList'),
    DomicilePlace: state.default.manageReducer.get('DomicilePlace'),
    isRequestDomicilePlaceEnd: state.default.manageReducer.get('isRequestDomicilePlaceEnd'),
    getPopulation: state.default.manageReducer.get('getPopulation'),
    grossPopulation: state.default.populationFloatingReducer.get('grossPopulation'),
    floatingList: state.default.populationFloatingReducer.get('floatingList'),
    floatCount: state.default.populationFloatingReducer.get('floatCount'),
    floatNationList: state.default.populationFloatingReducer.get('floatNationList'),
    floatPlacelist: state.default.populationFloatingReducer.get('floatPlacelist'),
    netFlow: state.default.populationFloatingReducer.get('netFlow'),
    netflows: state.default.populationFloatingReducer.get('netflows'),
    outFloatingList: state.default.populationFloatingReducer.get('outFloatingList'),
    outSum: state.default.populationFloatingReducer.get('outSum'),
    lineIn: state.default.populationFloatingReducer.get('lineIn'),
    lineOut: state.default.populationFloatingReducer.get('lineOut'),
    lineX: state.default.populationFloatingReducer.get('lineX'),
    islivePlacePlotEnd: state.default.livePlaceReducer.get('islivePlacePlotEnd'),
    livePlacePlot: state.default.livePlaceReducer.get('livePlacePlot'),
    getPopulationList: state.default.populationFloatingReducer.get('getPopulationList'),
    count: state.default.populationFloatingReducer.get('count'),
    counts: state.default.populationFloatingReducer.get('counts'),
    getdetailedInformationList: state.default.populationFloatingReducer.get('getdetailedInformationList')

  }
}

function callback (key) {
  console.log(key)
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    streetSelectChange,
    buildSelectChange,
    placeSelectChange,
    roomSelectChange,
    getPopulationFloatingList, detailedInformationQuery, getPopulationSize, getPopulationFloating, getLivePlacePlot
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(topicManage)
