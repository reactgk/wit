import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getPopulationList,
  getPopulationDetail,
  getPopulationHouseList,
  getPopulationCarList
} from '../../../redux/actions/populationManageAction'
import Cascade from '../component/cascade/Cascade'
import {
  setPersonTagStatus, setPersonWarningStatus
} from '../../../redux/actions/personControlWarningManageAction'
import {
  tagTypeSelect
} from '../../../redux/actions/livePlaceAction'
import { Popover, Button, Upload, Icon, Row, Col } from 'antd'
import SearchForm from '../component/searchform/SearchForm'
import IotTable from '../component/table/IotTable'
import {
  ACTIVE_LINK_PERSON_DETAILS, ACTIVE_LINK_PERSON_EDIT, setActiveLink
} from '../../../redux/actions/manageAction'
import { sexOptions, personLiveOptions, companyOptions, personPropertyOptions, livingTimeOptions } from '../../../data/selectOptions.js'

import { PAGE_SIZE } from '../../../redux/actions/constant.js'
import TableSummaryPie from '../component/piechart/PieChart'
// import httpClient from '../../../network/httpClient'
class PersonManage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      dialogVisible: false
    }
    this.pageIndex = 0

    this.formConfig = [
      { value: 'name', placeholder: '请输入人员姓名', type: 'input', width: 200 },
      { value: 'nationCode', placeholder: '选择民族', type: 'select', options: [], width: 200 },
      { value: 'sexCode', placeholder: '选择性别', type: 'select', options: sexOptions, width: 200 },
      { value: 'idNumber', placeholder: '请输入身份证号', width: 200 },
      { value: 'telePhonr', placeholder: '联系方式', width: 200 },
      { value: 'tagType', placeholder: '标签类型', type: 'select', options: [], width: 200 },
      { value: 'liveType', placeholder: '居住类型', type: 'select', options: personLiveOptions },
      { value: 'company', placeholder: '所属单位', type: 'select', options: companyOptions },
      { value: 'personProperty', placeholder: '人员性质', type: 'select', options: personPropertyOptions },
      { value: 'livingTime', placeholder: '居住年限', type: 'select', options: livingTimeOptions },
      { value: 'grade', type: 'rangeDate', placeholder1: '最后一次通行开始时间', placeholder2: '最后一次通行结束时间', width: 420 },
      { value: 'grade2', type: 'rangeDate', placeholder1: '平台登记开始时间', placeholder2: '平台登记结束时间', width: 420 }
    ]
    this.tableTopButtons = [
      { label: '批量导出' },
      { label: '批量导入', style: { marginLeft: 24 } }
    ]

    this.tableColumns = [
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '性别', dataIndex: 'sexCode', key: 'sexCode',
        render: (text, recode) => (
          <div>
            {
              recode.sexCode === 0 ? <span>男</span> : <span>女</span>
            }
          </div>
        )
      },
      { title: '民族', dataIndex: 'nation', key: 'nation' },
      { title: '身份证号', dataIndex: 'idNumber', key: 'idNumber' },
      { title: '联系方式', dataIndex: 'telePhonr', key: 'telePhonr' },
      { title: '居住类型', dataIndex: 'personLiveType', key: 'personLiveType',
        render: (text, recoder) => (
          <div>
            {
              recoder.personLiveType === 1 ? <span>流动人口</span> : (recoder.personLiveType === 0 ? <span>常住人口</span> : (recoder.personLiveType === 2) ? <span>陌生人</span> : '--')
            }
          </div>
        ) },
      { title: '人员标签', dataIndex: 'tagName', key: 'tagName' },
      { title: '平台登记时间', dataIndex: 'registerTime', key: 'registerTime' },
      { title: '最后一次通行信息', dataIndex: 'inTime', key: 'inTime',
        render: (text, record) => {
          let content = ''
          content = (
            <div>
              <p>姓名：{record.personName}</p>
              <p>通行时间：{record.inTime}</p>
              <p>通行方式：{record.throughWay}</p>
              <p>通行场所：{record.throughPlace}</p>
              <p>通行点位：{record.throughPoint}</p>
              <p>出入类型：{
                record.throughType === 1 ? <span>出</span> : <span>进</span>
              }</p>
            </div>
          )
          return (
            <Popover title='' content={ content } trigger="hover">
              <a>{record.personName}</a>
            </Popover>)
        }
      },
      {
        title: '操作',
        dataIndex: 'control',
        key: 'control',
        render: (text, record) => {
          this.setState({
            personDetailsData: record.id
          })
          window.localStorage.setItem('personDetailsData', record.id)
          return (
            <div className='nav-item nav-sub-item-active'
              onClick={() => {
                const { tabs, setActiveLink, getPopulationDetail, getPopulationHouseList, getPopulationCarList } = this.props
                const params = {
                  id: record.id
                }
                setActiveLink(ACTIVE_LINK_PERSON_DETAILS, tabs)
                getPopulationDetail(params)
                getPopulationHouseList(params)
                getPopulationCarList(params)
              }}>
              <span className="label">详情</span>
            </div >
          )
        }
      }
    ]
  }

  componentDidMount () {
    this.searchForm(this.pageIndex)
    this.props.tagTypeSelect()
  }

  /**
 * 获取数据列表
 * @param pageIndex
 * @param searchValues
 */
  searchForm (pageIndex, searchValues) {
    this.pageIndex = pageIndex
    const { getPopulationList } = this.props
    let params = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE
    }
    if (searchValues) {
      this.searchValues = searchValues
      params.name = searchValues.name
      params.nationCode = searchValues.nationCode
      params.sexCode = searchValues.sexCode === 'all' ? searchValues.sexCode = '' : searchValues.sexCode
      params.idNumber = searchValues.idNumber
      params.telePhonr = searchValues.telePhonr
      params.tagId = searchValues.tagType
      params.telePhonr = searchValues.telePhonr
      // params.telePhonr = searchValues.telePhonr
      // params.telePhonr = searchValues.telePhonr
      params.personLiveType = searchValues.liveType
      params.company = searchValues.company
      params.personProperty = searchValues.personProperty
      params.livingTime = searchValues.livingTime

      // params.provinceCode = this.state.province
      // params.cityCode = this.state.city
      // params.areaCode = this.state.area
      // params.jdCode = this.state.street
      // params.sqCode = this.state.community

      params.registerStartTime = searchValues.grade2StartDate
      params.registerEndTime = searchValues.grade2EndDate
      params.throughStartTime = searchValues.gradeStartDate
      params.throughEndTime = searchValues.gradeEndDate
    }
    getPopulationList(params)
  }
  getCommiy (e) {
    this.setState({
      province: e.province,
      city: e.city,
      area: e.area,
      street: e.street,
      community: e.community
    })
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
  importExcel () {
  }
  addPerson (e) {
    const { tabs, setActiveLink } = this.props
    setActiveLink(ACTIVE_LINK_PERSON_EDIT, tabs)
  }
  // goDetailPage () {
  //   const { tabs, setActiveLink, getPopulationDetail, getPopulationHouseList, getPopulationCarList } = this.props
  //   const params = {
  //     id: 7
  //   }
  //   setActiveLink(ACTIVE_LINK_PERSON_DETAILS, tabs)
  //   getPopulationDetail(params)
  //   getPopulationHouseList(params)
  //   getPopulationCarList(params)
  // }

  render () {
    const { isRequestNationTypesEnd, nationTypes, totalPage, populationManageList, tagTypeSelectList, populationByLiveType, populationByNation, populationByLivingTime } = this.props
    if (!isRequestNationTypesEnd) {
      return null
    }

    this.formConfig[1].options = nationTypes
    this.formConfig[5].options = tagTypeSelectList
    return (
      <div>
        <SearchForm
          formConfig={this.formConfig}
          doSearch={(values) => { this.searchForm(0, values) }}
        />
        <div className='levelFour' style={{ paddingTop: '0px', marginBottom: '0', paddingBottom: '20px' }}>
          <Cascade onDataChange={(e) => this.getCommiy(e)}></Cascade>
        </div>
        <div className='middleChart' id="charts" style={{ marginBottom: '20px' }}>
          <Row>
            <Col span={8}>
              <TableSummaryPie title = {'居住类型分类'} id = {'liveTypeChart'} legendDataList = {populationByLiveType.xAxis} seriesDataList = {this.createSeries(populationByLiveType.xAxis, populationByLiveType.yAxis)}/>
            </Col>
            <Col span={8}>
              <TableSummaryPie title = {'民族分类'} id = {'nationChart'} legendDataList = {populationByNation.xAxis} seriesDataList = {this.createSeries(populationByNation.xAxis, populationByNation.yAxis)}/>
            </Col>
            <Col span={8}>
              <TableSummaryPie title = {'居住时间分类'} id = {'livingTimeChart'} legendDataList = {populationByLivingTime.xAxis} seriesDataList = {this.createSeries(populationByLivingTime.xAxis, populationByLivingTime.yAxis)}/>
            </Col>
          </Row>
        </div>
        <p align="right">
          <Upload {...this.importExcel()} showUploadList={false}>
            <Button>
              <Icon type="upload" /> 导入
            </Button>
          </Upload>
          <Button type="primary" onClick={ (e) => this.addPerson(e) }> 添加 </Button>
        </p>
        <IotTable
          topButtons={this.tableTopButtons}
          columns={this.tableColumns}
          dataSource={populationManageList}
          totalPage={totalPage}
          onChange={(pagination) => { this.searchForm(pagination.current - 1, this.searchValues) }}
        />
      </div >
    )
  }
}

function mapStateToProps (state) {
  return {
    isRequestNationTypesEnd: state.default.manageReducer.get('isRequestNationTypesEnd'),
    nationTypes: state.default.manageReducer.get('nationTypes'),
    populationManageList: state.default.populationManageReducer.get('populationManageList'),
    totalPage: state.default.populationManageReducer.get('totalPage'),
    populationByLiveType: state.default.populationManageReducer.get('populationByLiveType'),
    populationByNation: state.default.populationManageReducer.get('populationByNation'),
    populationByLivingTime: state.default.populationManageReducer.get('populationByLivingTime'),
    tagTypeSelectList: state.default.livePlaceReducer.get('tagTypeSelectList'),
    tabs: state.default.manageReducer.get('tabs')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getPopulationList, getPopulationDetail, getPopulationHouseList, getPopulationCarList,
    setPersonTagStatus, setPersonWarningStatus, setActiveLink, tagTypeSelect }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonManage)
