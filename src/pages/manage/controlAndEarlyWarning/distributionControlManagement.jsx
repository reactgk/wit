import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchForm from '../component/searchform/SearchForm'
import IotTable from '../component/table/IotTable'
import httpClient from '../../../network/httpClient'
import Cascade from '../component/cascade/Cascade'
// import { getPopulationFloating } from '../../../redux/actions/manageAction.js'
import { Modal, Select, Button, Radio, Checkbox, DatePicker, message } from 'antd'
import { PAGE_SIZE } from '../../../redux/actions/constant.js'
import {
  queryControlLisat, tagTypePersonSelect, getbikeTagsSearch, addControlLisat
} from '../../../redux/actions/livePlaceAction.js'
import { objectMonitorOptions, warnTypeOptions, validStateOptions, warningLevelOptions } from '../../../data/selectOptions'
import { getplaceTopic, warningDeviceSelect, warningPlaceSelect, warningPointSelect, reSetSelect,
  warningPlaceSearch, warningPointSearch, warningDeviceSearch } from '../../../redux/actions/manageAction'
import './controlAndEarlyW.less'
// import $ from 'jquery'
const Option = Select.Option
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD'
class topicManage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      valueRadio: 1,
      warningLevel: 1,
      permanentVal: 0,
      endTime: '',
      startTime: '',
      warnMethods: [],
      waringPrompt: ''
    }
    this.searchValues = {}
    this.formConfig = [
      { value: 'warnLevel', placeholder: '预警等级', type: 'select', options: warningLevelOptions },
      { value: 'monitorTarget', placeholder: '布控对象类型', type: 'select', options: objectMonitorOptions },
      { value: 'warnMethods', placeholder: '预警方式', type: 'select', options: warnTypeOptions },
      { value: 'validState', placeholder: '当前状态', type: 'select', options: validStateOptions }
    ]
    this.tableColumns = [
      { title: '布控场所', dataIndex: 'placeName', key: 'placeName' },
      { title: '布控点位', dataIndex: 'pointName', key: 'pointName' },
      { title: '布控设备', dataIndex: 'devName', key: 'devName' },
      { title: '布控人群', dataIndex: 'tagName1', key: 'tagName1' },
      { title: '布控人员', dataIndex: 'personName1', key: 'personName1' },
      { title: '布控车群', dataIndex: 'carTagName1', key: 'carTagName1' },
      { title: '布控车辆', dataIndex: 'carNo1', key: 'carNo1' },
      { title: '预警方式', dataIndex: 'warnMethods', key: 'warnMethods' },
      { title: '预警等级', dataIndex: 'warnLevelName', key: 'warnLevelName'
        // render: (text, record) => (
        //   <p>
        //     {
        //       record.warnLevel === 1 ? <span>一级预警</span> : (record.warnLevel === 2 ? <span>二级预警</span> : (record.warnLevel === 3 ? <span>三级预警</span> : (record.warnLevel === 4 ? <span>四级预警</span> : '')))
        //     }
        //   </p>
        // )
      },
      { title: '操作人', dataIndex: 'operater', key: 'operater' },
      { title: '布控时效', dataIndex: 'tagName', key: 'tagName' },
      { title: '当前状态', dataIndex: 'inflow', key: 'inflow' },
      { title: '操作', dataIndex: 'outflow', key: 'outflow',
        render: (text, record) => (
          <p>
            {record.validState === 1 ? <a>关闭</a> : <a onClick={() => { this.personControl(text, record) } }>启用</a>}
          </p>
        )
      }
    ]
  }

  componentDidMount () {
    this.getDataList(0)
    this.props.tagTypePersonSelect()
    this.props.getbikeTagsSearch()
  }
  personControl (text, record) {
    console.log(text, record, 888)
    httpClient.post('monitor/updateStatus', { id: record.id })
      .then(result => {
        console.log(result.data)
        message.success('启用成功', 4)
        let param = {
          pageIndex: 0,
          pageSize: PAGE_SIZE
        }
        setTimeout(this.props.queryControlLisat(param), 500)
      })
      .catch(error => {
        message.success('启用失败', 4)
      })
  }
  getPoint (e, record) {
    console.log(record)
  }

  /**
   * 获取数据列表（tab1）
   * @param pageIndex
   * @param searchValues
   */
  getDataList (pageIndex, searchValues) {
    const { queryControlLisat } = this.props
    this.searchValues = searchValues
    let params = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE
    }
    if (searchValues) {
      params.warnLevel = searchValues.warnLevel
      params.monitorTarget = searchValues.monitorTarget
      params.warnMethods = searchValues.warnMethods
      params.warnMethods = searchValues.warnMethods
      params.validState = searchValues.validState
      params.devID = this.props.deviceIDs
      params.pointID = this.props.pointIDs
      params.placeID = this.props.palceIDs
      // params.provinceCode = this.state.province
      // params.cityCode = this.state.city
      // params.areaCode = this.state.area
      // params.jdCode = this.state.street
      // params.sqCode = this.state.community
    }
    queryControlLisat(params)
  }
  // 新增
  showModal () {
    this.setState({
      visible: true
    })
  }
  handleOk (e) {
    console.log(e, this.state.warningStartTime, 888)
    const { valueRadio } = this.state
    const { palceID, pointID, deviceID, queryControlLisat } = this.props

    let params = {}
    if (valueRadio === 1) {
      if (this.idNum.value === '') {
        message.error('请输入身份证号')
        return null
      }
      if (this.idName.value === '') {
        message.error('请输入姓名')
        return null
      }
      params.personName1 = this.idName.value
      params.idnumber1 = this.idNum.value
      params.idnumber2 = this.idNum2.value
      params.personName2 = this.idName2.value
    } else if (valueRadio === 2) {
      if (this.state.peopleTypeSelect === '') {
        message.error('请选择人员标签')
        return null
      }
      params.personTagID1 = this.state.peopleTypeSelect
      params.personTagID2 = this.state.peopleTypeSelect2
    } else if (valueRadio === 3) {
      if (this.carNum.value === '') {
        message.error('请输入车牌号')
        return null
      }
      params.carNo1 = this.carNum.value
      params.carNo2 = this.carNum2.value
    } else if (valueRadio === 4) {
      if (this.state.carType === '') {
        message.error('请选择车群')
        return null
      }
      params.carTagID1 = this.state.carType
      params.carTagID2 = this.state.carType2
    }
    if (this.state.waringPrompt === '') {
      message.error('请选择预警方式')
      return null
    }
    if (this.state.warningStartTime === '' && this.state.permanentVal === 0) {
      message.error('请选择预警时效')
      return null
    }
    params.warnMethods = this.state.waringPrompt
    params.monitorTarget = this.state.valueRadio
    params.warnLevel = this.state.warningLevel
    params.startTime = this.state.warningStartTime
    params.endTime = this.state.warningEndTime
    params.placeID = palceID
    params.pointID = pointID
    params.devID = deviceID
    params.isLastingValid = this.state.permanentVal
    console.log(params)
    this.setState({
      visible: false,
      valueRadio: 1,
      warningLevel: 1,
      idNum: '',
      idNum2: '',
      idName: '',
      idName2: '',
      peopleTypeSelect: '',
      peopleTypeSelect2: '',
      carNum: '',
      carNum2: '',
      carType: '',
      carType2: '',
      dada: ''
    })
    httpClient.post('meta/monitor/save', params)
      .then(result => {
        console.log(result.data)
        message.success('保存成功', 4)
        let param = {
          pageIndex: 0,
          pageSize: PAGE_SIZE
        }
        queryControlLisat(param)
      })
      .catch(error => {
        message.success('保存失败', 4)
      })
    // this.props.addControlLisat(params)

    this.props.reSetSelect()
  }

  handleCancel (e) {
    console.log(e)
    this.setState({
      valueRadio: 1,
      warningLevel: 1,
      visible: false,
      idNum: '',
      idNum2: '',
      idName: '',
      idName2: '',
      peopleTypeSelect: '',
      peopleTypeSelect2: '',
      carNum: '',
      carNum2: '',
      carType: '',
      carType2: '',
      dada: ''
    })
  }
  onChange (e) {
    console.log('radio checked', e.target.value)
    var val = e.target.value
    if (val === 1) {
      document.getElementById('showBox1').style.display = 'block'
      document.getElementById('showBox2').style.display = 'none'
      document.getElementById('showBox3').style.display = 'none'
      document.getElementById('showBox4').style.display = 'none'
      this.setState({
        peopleTypeSelect: '',
        peopleTypeSelect2: '',
        carNum: '',
        carNum2: '',
        carType: '',
        carType2: ''
      })
    } else if (val === 2) {
      document.getElementById('showBox1').style.display = 'none'
      document.getElementById('showBox2').style.display = 'block'
      document.getElementById('showBox3').style.display = 'none'
      document.getElementById('showBox4').style.display = 'none'
      this.setState({
        idNum: '',
        idNum2: '',
        idName: '',
        idName2: '',
        carNum: '',
        carNum2: '',
        carType: '',
        carType2: ''
      })
    } else if (val === 3) {
      document.getElementById('showBox1').style.display = 'none'
      document.getElementById('showBox2').style.display = 'none'
      document.getElementById('showBox3').style.display = 'block'
      document.getElementById('showBox4').style.display = 'none'
      this.setState({
        idNum: '',
        idNum2: '',
        idName: '',
        idName2: '',
        peopleTypeSelect: '',
        peopleTypeSelect2: '',
        carType: '',
        carType2: ''
      })
    } else if (val === 4) {
      document.getElementById('showBox1').style.display = 'none'
      document.getElementById('showBox2').style.display = 'none'
      document.getElementById('showBox3').style.display = 'none'
      document.getElementById('showBox4').style.display = 'block'
      this.setState({
        idNum: '',
        idNum2: '',
        idName: '',
        idName2: '',
        peopleTypeSelect: '',
        peopleTypeSelect2: '',
        carNum: '',
        carNum2: ''
      })
    }
    this.setState({
      valueRadio: e.target.value
    })
  }
  peopleType (value) {
    console.log(`selected ${value}`)
    this.setState({
      peopleTypeSelect: value
    })
  }
  peopleType2 (value) {
    console.log(`selected ${value}`)
    this.setState({
      peopleTypeSelect2: value
    })
  }
  carNum (value) {
    console.log(`selected ${value}`)
    this.setState({
      carNum: value
    })
  }
  carNum2 (value) {
    console.log(`selected ${value}`)
    this.setState({
      carNum2: value
    })
  }
  waringDate (dates, dateStrings) {
    console.log('From: ', dates[0], ', to: ', dates[1])
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    this.setState({
      warningStartTime: dateStrings[0],
      warningEndTime: dateStrings[1]
    })
  }
  warningLevel (e) {
    console.log('radio checked', e.target.value)
    this.setState({
      warningLevel: e.target.value
    })
  }
  permanent (e) {
    console.log('radio checked', e.target.checked)
    if (e.target.checked === true) {
      document.getElementById('RangePickeraDis').style.display = 'block'
      // document.getElementById('RangePickeraDis').setAttribute('disabled', true)
      // RangePickeraDis
      this.setState({
        permanentVal: 1
      })
    } else {
      document.getElementById('RangePickeraDis').style.display = 'none'
      this.setState({
        permanentVal: 0
      })
    }
  }
  idNumState (e) {
    this.setState({ idNum: e.target.value })
  }
  idNum2State (e) {
    this.setState({ idNum2: e.target.value })
  }
  idNameState (e) {
    this.setState({ idName: e.target.value })
  }
  idName2State (e) {
    this.setState({ idName2: e.target.value })
  }
  carNumState (e) {
    this.setState({ carNum: e.target.value })
  }
  carNum2State (e) {
    this.setState({ carNum2: e.target.value })
  }
  carType (e) {
    this.setState({ carType: e })
  }
  carType2 (e) {
    this.setState({ carType2: e })
  }

  onChangeCheckWarning (checkedValues) {
    console.log('checked = ', checkedValues)
    console.log(checkedValues.toString)
    console.log(checkedValues.join(','))
    this.setState({
      waringPrompt: checkedValues.join(','),
      waringPrompts: '',
      dada: checkedValues
    })
  }
  getCommiy (e) {
    console.log(e)
    this.setState({
      province: e.province,
      city: e.city,
      area: e.area,
      street: e.street,
      community: e.community
    })
  }
  // 新增
  render () {
    const options = [
      { label: '屏幕高亮提示', value: '0' },
      { label: '系统语音报警', value: '1' },
      { label: '系统弹窗提示', value: '2' }
    ]
    const { distributionControlList, tagList, carList, warningDeviceSelect, placeValue, warningPlaceSelect
      , pointValue, warningPointSelect, pointListIDSe, deviceValue, deviceListIDSe, placeValueSearch, pointValueSearch, deviceValueSearch,
      warningPlaceSearch, warningPointSearch, warningDeviceSearch, placeFloatingIdList, pointListID, deviceListID, conut } = this.props
    console.log(placeFloatingIdList)

    return (
      <div>
        <div className='levelFour' style={{ marginBottom: '0', paddingTop: '20px' }}>
          <Cascade onDataChange={(e) => this.getCommiy(e)}></Cascade>
        </div>
        <div>
          <div style={{ width: 'calc(100% - 100px)', display: 'inline-block', marginBottom: '0px', padding: '0 16px 0 16px', borderLeft: 'solid 4px #1890ff', background: '#f7fafc' }}>
            <Select
              value={placeValueSearch}
              style={{ width: 200 }}
              placeholder={'请选择场所'}
              onChange={(value, item) => { warningPlaceSearch(value, item) }}>
              {
                placeFloatingIdList.map(item =>
                  <Option key={item.id} value={item.value}>{item.label}</Option>
                )
              }
            </Select>
            <Select value={pointValueSearch}
              style={{ width: 200, marginLeft: 20, marginRight: 20 }}
              placeholder={'请选择点位'}
              onChange={(value, item, e) => { warningPointSearch(value, item) }}>
              {
                pointListIDSe.map(item =>
                  <Option key={item.id} value={item.value}>{item.label}</Option>
                )
              }
            </Select>

            <Select value={deviceValueSearch}
              style={{ width: 200, marginLeft: 20, marginRight: 20 }}
              placeholder={'请选择设备'}
              onChange={(value, item) => { warningDeviceSearch(value, item) }}>
              {
                deviceListIDSe.map(item =>
                  <Option key={item.id} value={item.value}>{item.label}</Option>
                )
              }
            </Select>
          </div>
          <Button style={{ width: '80px' }} type="primary" onClick={() => this.showModal()}>新增</Button>
        </div>
        <SearchForm
          formConfig={this.formConfig}
          doSearch={(values) => { this.getDataList(0, values) }}
        />
        <IotTable
          topButtons={this.tableTopButtons}
          columns={this.tableColumns}
          dataSource={distributionControlList}
          totalPage={conut}
          onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
        />
        <Modal title="新增人员标签" visible={this.state.visible} width={'70%'}
          onOk={(e) => this.handleOk(e)} onCancel={(e) => this.handleCancel(e)}
        >
          <div className='label_type add_disControlManagement'>
            <h3>布控对象:</h3>
            <RadioGroup onChange={(e) => this.onChange(e)} value={this.state.valueRadio}>
              <Radio style={{ padding: '15px' }} value={0}>人员</Radio>
              <Radio style={{ padding: '15px' }} value={1}>人群</Radio>
              <Radio style={{ padding: '15px' }} value={2}>车辆</Radio>
              <Radio style={{ padding: '15px' }} value={3}>车群</Radio>
            </RadioGroup>
            <div id='showBox1' className='input_box'>
              <div style={{ marginTop: '15px', width: '80px', display: 'inline-block' }}>身份证号:</div>
              <input
                style={{ width: '300px' }}
                ref={(el) => { this.idNum = el }}
                className="form-input ant-input"
                value={this.state.idNum}
                onChange={(e) => this.idNumState(e)}
                placeholder="请输入身份证号" />
              <div style={{ marginTop: '15px', width: '80px', display: 'inline-block', marginLeft: '35px' }}>姓&emsp;&emsp;名:</div>
              <input
                style={{ width: '300px' }}
                ref={(el) => { this.idName = el }}
                className="form-input ant-input"
                value={this.state.idName}
                onChange={(e) => this.idNameState(e)}
                placeholder="请输入姓名" />
              <br/>
              <div style={{ marginTop: '15px', width: '80px', display: 'inline-block' }}>身份证号:</div>
              <input
                style={{ width: '300px' }}
                ref={(el) => { this.idNum2 = el }}
                className="form-input ant-input"
                value={this.state.idNum2}
                onChange={(e) => this.idNum2State(e)}
                placeholder="请输入身份证号" />
              <div style={{ marginTop: '15px', width: '80px', display: 'inline-block', marginLeft: '35px' }}>姓&emsp;&emsp;名:</div>
              <input
                style={{ width: '300px' }}
                ref={(el) => { this.idName2 = el }}
                className="form-input ant-input"
                value={this.state.idName2}
                onChange={(e) => this.idName2State(e)}
                placeholder="请输入姓名" />
              <br/>
            </div>
            <div id='showBox2' className='input_box'>
              <div style={{ marginTop: '15px', width: '80px', display: 'inline-block', marginLeft: '35px' }}>人员标签:</div>
              <Select value={this.state.peopleTypeSelect} style={{ width: 300 }} onChange={(value) => { this.peopleType(value) }}>
                {
                  tagList.map(items =>
                    <Option key={items.value} value={items.value}>{items.label}</Option>
                  )
                }
              </Select> <br/>
              <div style={{ marginTop: '15px', width: '80px', display: 'inline-block', marginLeft: '35px' }}>人员标签:</div>
              <Select value={this.state.peopleTypeSelect2} style={{ width: 300 }} onChange={(value) => { this.peopleType2(value) }}>
                {
                  tagList.map(items =>
                    <Option key={items.value} value={items.value}>{items.label}</Option>
                  )
                }
              </Select>
              <br/>
            </div>
            <div id='showBox3' className='input_box'>
              <div style={{ marginTop: '15px', width: '80px', display: 'inline-block' }}>车牌号:</div>
              <input
                style={{ width: '300px' }}
                ref={(el) => { this.carNum = el }}
                className="form-input ant-input"
                value={this.state.carNum}
                onChange={(e) => this.carNumState(e)}
                placeholder="请输入车牌号" />
              <br/>
              <div style={{ marginTop: '15px', width: '80px', display: 'inline-block' }}>车牌号:</div>
              <input
                style={{ width: '300px' }}
                ref={(el) => { this.carNum2 = el }}
                className="form-input ant-input"
                value={this.state.carNum2}
                onChange={(e) => this.carNum2State(e)}
                placeholder="请输入车牌号" />
              <br/>
            </div>
            <div id='showBox4' className='input_box'>
              <div style={{ marginTop: '15px', width: '80px', display: 'inline-block', marginLeft: '35px' }}>车辆标签:</div>
              <Select value={this.state.carType} style={{ width: 300 }} onChange={(value) => { this.carType(value) }}>
                {
                  carList.map(items =>
                    <Option key={items.value} value={items.value}>{items.label}</Option>
                  )
                }
              </Select><br/>
              <div style={{ marginTop: '15px', width: '80px', display: 'inline-block', marginLeft: '35px' }}>车辆标签:</div>
              <Select value={this.state.carType2} style={{ width: 300 }} onChange={(value) => { this.carType2(value) }}>
                {
                  carList.map(items =>
                    <Option key={items.value} value={items.value}>{items.label}</Option>
                  )
                }
              </Select><br/>
            </div>
            <h3>布控设置:</h3>
            <div className='input_box'>
              <div><h4>预警方式:</h4><p><CheckboxGroup value={this.state.dada} options={options} onChange={(e) => this.onChangeCheckWarning(e)} /></p></div>
              <div className="boxRange"><h4>预警时效:</h4>
                <div style={{ width: '710px', marginLeft: '78px', position: 'relative', display: 'inline-block' }}>
                  <RangePicker
                  // disabled='true'
                    format={dateFormat}
                    style={{ width: '450px' }}
                    value={this.state.forever}
                    onChange={(dates, dateStrings) => this.waringDate(dates, dateStrings)}
                  />
                  <Checkbox style={{ marginLeft: '25px' }} onChange={(e) => { this.permanent(e) }}>永久有效</Checkbox>
                  <div id="RangePickeraDis" style={{ display: 'none', height: '33px', width: '450px', position: 'absolute', top: '0', left: '0px', background: '#cecece', opacity: '0.4' }}></div>
                </div>
              </div>
              <div>
                <h4>预警等级:</h4>
                <RadioGroup style={{ marginLeft: '78px' }} onChange={(e) => this.warningLevel(e)} value={this.state.warningLevel}>
                  <Radio value={1}>一级预警</Radio>
                  <Radio value={2}>二级预警</Radio>
                  <Radio value={3}>三级预警</Radio>
                  <Radio value={4}>四级预警</Radio>
                </RadioGroup>
              </div>
            </div>
            <h3>布控点:</h3>
            <div className='input_box'>
              <div>
                <h4>布控场所:</h4>
                <Select
                  value={placeValue}
                  style={{ width: 200 }}
                  placeholder={'请选择场所'}
                  onChange={(value, item) => { warningPlaceSelect(value, item) }}>
                  {
                    placeFloatingIdList.map(item =>
                      <Option key={item.id} value={item.value}>{item.label}</Option>
                    )
                  }
                </Select>
                <Select value={pointValue}
                  style={{ width: 200, marginLeft: 20, marginRight: 20 }}
                  placeholder={'请选择点位'}
                  onChange={(value, item, e) => { warningPointSelect(value, item) }}>
                  {
                    pointListID.map(item =>
                      <Option key={item.id} value={item.value}>{item.label}</Option>
                    )
                  }
                </Select>

                <Select value={deviceValue}
                  style={{ width: 200, marginLeft: 20, marginRight: 20 }}
                  placeholder={'请选择设备'}
                  onChange={(value, item) => { warningDeviceSelect(value, item) }}>
                  {
                    deviceListID.map(item =>
                      <Option key={item.id} value={item.value}>{item.label}</Option>
                    )
                  }
                </Select>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    distributionControlList: state.default.livePlaceReducer.get('distributionControlList'),
    tagList: state.default.livePlaceReducer.get('tagList'),
    conut: state.default.livePlaceReducer.get('conut'),
    returnVal: state.default.livePlaceReducer.get('returnVal'),
    placeFloating: state.default.manageReducer.get('placeFloating'),
    placeFloatingIdList: state.default.manageReducer.get('placeFloatingIdList'),
    placeValue: state.default.manageReducer.get('placeValue'),
    palceID: state.default.manageReducer.get('palceID'),
    deviceID: state.default.manageReducer.get('deviceID'),
    pointID: state.default.manageReducer.get('pointID'),
    palceIDs: state.default.manageReducer.get('palceIDs'),
    deviceIDs: state.default.manageReducer.get('deviceIDs'),
    pointIDs: state.default.manageReducer.get('pointIDs'),
    placeValueSearch: state.default.manageReducer.get('placeValueSearch'),
    pointValue: state.default.manageReducer.get('pointValue'),
    pointValueSearch: state.default.manageReducer.get('pointValueSearch'),
    pointList: state.default.manageReducer.get('pointList'),
    pointListID: state.default.manageReducer.get('pointListID'),
    deviceList: state.default.manageReducer.get('deviceList'),
    deviceListID: state.default.manageReducer.get('deviceListID'),
    deviceValue: state.default.manageReducer.get('deviceValueSearch'),
    pointListIDSe: state.default.manageReducer.get('pointListIDSe'),
    deviceListIDSe: state.default.manageReducer.get('deviceListIDSe'),
    deviceValueSearch: state.default.manageReducer.get('deviceValueSearch'),
    carList: state.default.livePlaceReducer.get('carList')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    queryControlLisat, tagTypePersonSelect, getbikeTagsSearch, addControlLisat, getplaceTopic, warningDeviceSelect, warningPlaceSelect,
    warningPointSelect, reSetSelect, warningDeviceSearch, warningPointSearch, warningPlaceSearch }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(topicManage)
