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
import { Tabs, Modal, Button, Row, Col, Radio, Checkbox } from 'antd'
import { PAGE_SIZE } from '../../../redux/actions/constant.js'
import { timestart, timeend } from '../component/searchform/FormWrapper'
import { tagTypePersonSelect } from '../../../redux/actions/livePlaceAction'
import { peopleTypeOptions } from '../../../data/selectOptions'
// import $ from 'jquery'
const TabPane = Tabs.TabPane
const RadioGroup = Radio.Group
class topicManage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      value: 1
    }
    this.searchValues = {}
    this.formConfig = [
      { value: 'placeTypeName', width: 200, placeholder: '标签分类', type: 'select', options: [] },
      { value: 'nationCode', placeholder: '人员标签', type: 'select', options: [] },
      { value: 'provinceCode', width: 145, placeholder: '姓名', type: 'input' },
      { value: 'provinceCodes', width: 145, placeholder: '身份证号码', type: 'input' },
      { value: 'personTag', placeholder: '民族', type: 'select', options: [] }
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
      { value: 'placeCode', width: 200, placeholder: '标签分类', type: 'select', options: [] },
      { value: 'NationCode', placeholder: '车辆标签', type: 'select', options: [] },
      { value: 'ProvinceCode', width: 145, placeholder: '车牌照', type: 'input' },
      { value: 'Provinceode', width: 145, placeholder: '车主', type: 'input' },
      { value: 'personTag', placeholder: '车辆颜色', type: 'select', options: [] },
      { value: 'flowType', placeholder: '车型', type: 'select', options: peopleTypeOptions },
      { value: 'rangdate', width: 340, type: 'hasrangeDate', placeholder1: '时间跨度开始时间', placeholder2: '时间跨度结束时间' }
    ]
    this.tableColumnsqq = [
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
    this.props.tagTypePersonSelect()
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
    } else {
      params.startDate = timestart
      params.endDate = timeend
    }
    detailedInformationQuery(params)
  }
  // 新增人员标签 start
  showModal () {
    this.setState({
      visible: true
    })
  }
  handleOk (e) {
    console.log(e)
    this.setState({
      visible: false
    })
  }
  handleCancel (e) {
    console.log(e)
    this.setState({
      visible: false
    })
  }
  onChange (e) {
    console.log('radio checked', e.target.value)
    this.setState({
      value: e.target.value
    })
  }
  // 新增人员标签 end
  render () {
    const { getdetailedInformationList, counts
      , placeFloating,
      floatNationList
      , getPopulationList, count, newTagList
    } = this.props

    this.formConfigs[0].options = placeFloating
    console.log(floatNationList, newTagList, 11111)
    return (
      <div>
        <Tabs onChange={callback} type="card">
          <TabPane tab="人员标签管理" key="1">
            <SearchForm
              formConfig={this.formConfig}
              doSearch={(values) => { this.getDataList(0, values) }}
            />
            <div className='levelFour'>
              <Button type="primary" onClick={() => this.showModal()}>新增</Button>
            </div>
            <IotTable
              topButtons={this.tableTopButtons}
              columns={this.tableColumns}
              dataSource={getPopulationList}
              totalPage={count}
              onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
            />
          </TabPane>
          <TabPane tab="机动车标签管理" key="2">
            <SearchForm
              formConfig={this.formConfigs}
              doSearch={(values) => { this.getDatadetails(0, values) }}
            />
            <div className='levelFour'>
              <Button type="primary">新增</Button>
            </div>
            <IotTable
              topButtons={this.tableTopButtons}
              columns={this.tableColumnsq}
              dataSource={getdetailedInformationList}
              totalPage={counts}
              onChange={(pagination) => { this.getDatadetails(pagination.current - 1, this.searchValuesq) }}
            />
          </TabPane>
          <TabPane tab="非机动车标签管理" key="3">
            <SearchForm
              formConfig={this.formConfigs}
              doSearch={(values) => { this.getDatadetails(0, values) }}
            />
            <div className='levelFour'>
              <Button type="primary">新增</Button>
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
        <Modal title="新增人员标签" visible={this.state.visible} width={'70%'}
          onOk={(e) => this.handleOk(e)} onCancel={(e) => this.handleCancel(e)}
        >
          <div className='label_type'>
            <Row>
              <Col span={3}>col-12</Col>
              <Col span={2}><div style={{ marginTop: '15px' }}>人员信息:</div></Col>
              <Col span={16}>
                <div style={{ marginTop: '15px', width: '80px', display: 'inline-block' }}>身份证号:</div>
                <input style={{ width: '300px' }} type="text" className='form-input ant-input'/>
                <div style={{ marginTop: '15px', width: '80px', display: 'inline-block', marginLeft: '35px' }}>姓&emsp;&emsp;名:</div>
                <input style={{ width: '300px' }} type="text" className='form-input ant-input'/><br/>
                <div style={{ marginTop: '15px', width: '80px', display: 'inline-block' }}>民&emsp;&emsp;族:</div>
                <input style={{ width: '300px' }} type="text" className='form-input ant-input'/>
                <div style={{ marginTop: '15px', width: '80px', display: 'inline-block', marginLeft: '35px' }}>联系方式:</div>
                <input style={{ width: '300px' }} type="text" className='form-input ant-input'/><br/>
              </Col>
              <Col span={3}>col-12</Col>
            </Row>
            <Row>
              <Col span={3}>col-12</Col>
              <Col span={2}><div style={{ marginTop: '15px' }}>设置标签信息:</div></Col>
              <Col span={16}>
                {/* <RadioGroup onChange={(e) => this.onChange(e)} value={this.state.value}>
                  <Radio value={1}>A</Radio>
                  <Radio value={2}>B</Radio>
                  <Radio value={3}>C</Radio>
                  <Radio value={4}>D</Radio>
                </RadioGroup> */}

                {(newTagList || []).map((item, key) =>
                  <p key={key}>
                    <RadioGroup onChange={(e) => this.onChange(e)} value={this.state.value}></RadioGroup>
                    <Radio value={item.id}>{item.name}</Radio>
                    {
                      item.lists.map(function (item1, number) {
                        return (
                          <Checkbox key={item1.id} onChange={(e) => { this.CheckonChange(e) } }>item1.name</Checkbox>
                        )
                      })
                    }
                  </p>
                )
                }

              </Col>
              <Col span={3}>col-12</Col>
            </Row>

          </div>
        </Modal>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    carManageList: state.default.populationFloatingReducer.get('carManageList'),
    totalPage: state.default.populationFloatingReducer.get('totalPage'),
    placeFloating: state.default.manageReducer.get('placeFloating'),
    getPopulation: state.default.manageReducer.get('getPopulation'),
    outFloatingList: state.default.populationFloatingReducer.get('outFloatingList'),
    getPopulationList: state.default.populationFloatingReducer.get('getPopulationList'),
    getdetailedInformationList: state.default.populationFloatingReducer.get('getdetailedInformationList'),
    // 标签列表
    newTagList: state.default.livePlaceReducer.get('newTagList')
  }
}

function callback (key) {
  console.log(key)
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getPopulationFloatingList, detailedInformationQuery, getPopulationSize, getPopulationFloating, tagTypePersonSelect }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(topicManage)
