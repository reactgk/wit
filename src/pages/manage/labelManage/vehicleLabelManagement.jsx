import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchForm from '../component/searchform/SearchForm'
import IotTable from '../component/table/IotTable'
import httpClient from '../../../network/httpClient'
import { Tabs, Modal, Button, Row, Col, Checkbox, Select, message } from 'antd'
import { PAGE_SIZE } from '../../../redux/actions/constant.js'
import { timestart, timeend } from '../component/searchform/FormWrapper'
import { carColorOptions, carTypeOptions, bikeModelOptions } from '../../../data/selectOptions'
import { tagTypePersonSelect, personTagRelList, carTagRelList, carLicenseNumList, getbikeTagsSearch, getSearchCarList, getAddSearchCarList,
  addNePeopleTags, queryByIdNum, getCarList, getNonmotorTagRelList, getNonmotorByDeviceNo, addNonmotorByDeviceNo,
  getBikeDetailsList } from '../../../redux/actions/livePlaceAction'
// import { personTagRelList } from '../../../redux/actions/labelTypeAction'
import {
  getPopulationDetail, getPopulationHouseList, getPopulationCarList
} from '../../../redux/actions/populationManageAction'
import {
  ACTIVE_LINK_PERSON_DETAILS, setActiveLink, ACTIVE_LINK_CAR_DETAILS, ACTIVE_LINK_BIKE_DETAILS
  , getCarTagsTypes, getNationTypes, selectPresonTypeList, personTypeChange, presonTagSelectChange } from '../../../redux/actions/manageAction'
const TabPane = Tabs.TabPane
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
class vehicleLabelManage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      value: 1,
      checkDataList: [],
      bikeVisible: false,
      carVisible: false
    }
    this.searchValues = {}
    this.formConfig = [
      { value: 'name', width: 145, placeholder: '姓名', type: 'input' },
      { value: 'idNumber', width: 145, placeholder: '身份证号码', type: 'input' },
      { value: 'nationCode', placeholder: '民族', type: 'select', options: [] }
    ]
    const { tabs, setActiveLink } = this.props
    this.tableColumns = [
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '民族', dataIndex: 'nation', key: 'nation' },
      { title: '身份证号', dataIndex: 'idnumber', key: 'idnumber' },
      { title: '联系方式', dataIndex: 'registerPlace', key: 'registerPlace' },
      { title: '当前标签', dataIndex: 'tagNames', key: 'tagNames' },
      { title: '操作',
        dataIndex: 'pointCount',
        key: 'pointCount',
        render: (text, record) => {
          this.setState({
            peopleDetailsData: record.personID
          })
          window.localStorage.setItem('peopleDetailsData', record.personID)
          return (
            <div className='nav-item nav-sub-item-active'
              onClick={() => {
                setActiveLink(ACTIVE_LINK_PERSON_DETAILS, tabs)
                let params = { id: record.personID }
                this.props.getPopulationDetail(params)
                getPopulationDetail(params)
                getPopulationHouseList(params)
                getPopulationCarList(params)
              }}>
              <span className="label">详情</span>
            </div>
          )
        }

      }
    ]
    this.tableColumnsCar = [
      { title: '车牌号', dataIndex: 'licenseNumber', key: 'licenseNumber' },
      { title: '车型', dataIndex: 'VehicleCategoryCode', key: 'VehicleCategoryCode' },
      { title: '颜色', dataIndex: 'VehicleColor', key: 'VehicleColor' },
      { title: '车主', dataIndex: 'Name', key: 'Name' },
      { title: '当前标签', dataIndex: 'tagNames', key: 'tagNames' },
      { title: '操作',
        dataIndex: 'pointCount',
        key: 'pointCount',
        render: (text, record) => {
          this.setState({
            peopleDetailsData: record.personID
          })
          window.localStorage.setItem('peopleDetailsData', record.personID)
          return (
            <div className='nav-item nav-sub-item-active'
              onClick={() => {
                setActiveLink(ACTIVE_LINK_CAR_DETAILS, tabs)
                this.props.carLicenseNumList(record.carID)
              }}>
              <span className="label">详情</span>
            </div>
          )
        }

      }
    ]
    this.tableColumnsBike = [
      { title: '电子标签编码', dataIndex: 'deviceno', key: 'deviceno' },
      { title: '车辆类型', dataIndex: 'model', key: 'model',
        render: (text, recode) => (
          <p>
            {
              recode.model === 0 ? <span>自行车</span> : (recode.model === 1 ? <span>电动车</span> : (recode.model === 2) ? <span>摩托车</span> : (recode.model === 4) ? <span>三轮车</span> : <span>其他</span>)
            }
          </p>
        )
      },
      { title: '颜色', dataIndex: 'color', key: 'color' },
      { title: '车主', dataIndex: 'owner', key: 'owner' },
      { title: '所属场所', dataIndex: 'placeName', key: 'placeName' },
      { title: '当前标签', dataIndex: 'tagNames', key: 'tagNames' },
      { title: '操作',
        dataIndex: 'pointCount',
        key: 'pointCount',
        render: (text, record) => {
          this.setState({
            peopleDetailsData: record.personID
          })
          window.localStorage.setItem('peopleDetailsData', record.personID)
          return (
            <div className='nav-item nav-sub-item-active'
              onClick={() => {
                setActiveLink(ACTIVE_LINK_BIKE_DETAILS, tabs)
                this.props.getBikeDetailsList(record.personID)
              }}>
              <span className="label">详情</span>
            </div>
          )
        }

      }
    ]
    this.formConfigCar = [
      { value: 'tagId', width: 200, placeholder: '车辆标签', type: 'select', options: [] },
      { value: 'LicenseNumber', width: 145, placeholder: '车牌号', type: 'input' },
      { value: 'Name', width: 145, placeholder: '车主', type: 'input' },
      { value: 'VehicleCategoryCode', width: 145, placeholder: '车型', type: 'select', options: carTypeOptions },
      { value: 'VehicleColor', placeholder: '车辆颜色', type: 'select', options: carColorOptions }
    ]
    this.formConfigBike = [
      { value: 'tagId', width: 200, placeholder: '车辆标签', type: 'select', options: [] },
      { value: 'deviceno', width: 145, placeholder: '请输入电子标签编码', type: 'input' },
      { value: 'owner', width: 145, placeholder: '请输入车主', type: 'input' },
      { value: 'placeCode', width: 145, placeholder: '所属场所', type: 'select', options: [] },
      { value: 'model', width: 145, placeholder: '车辆类型', type: 'select', options: bikeModelOptions }
    ]
  }

  componentDidMount () {
    this.getDataList(0)
    this.getDatadetails(0)
    this.props.tagTypePersonSelect()
    this.props.getCarTagsTypes()
    this.props.getbikeTagsSearch()
    this.props.selectPresonTypeList()
    this.getDatadetailBike(0)
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
    // const { getPopulationFloatingList } = this.props
    // const { getPopulationSize } = this.props
    // const { getPopulationFloating } = this.props
    const { personTagRelList } = this.props
    this.searchValues = searchValues
    let params = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE

    }
    if (searchValues) {
      params.name = searchValues.name
      params.nationCode = searchValues.nationCode
      params.idNumber = searchValues.idNumber
      params.tagId = this.props.personVal
    }
    personTagRelList(params)
    // this.props.getCarList(params)
  }
  /**
   * 获取数据列表详细信息查询（tab2）
   * @param pageIndex
   * @param searchValues
   */
  getDatadetails (pageIndex, searchValues) {
    const { carTagRelList } = this.props
    let params = {
      pageIndex: pageIndex,
      pageSize: 10
    }
    if (searchValues) {
      params.tagId = searchValues.tagId
      params.LicenseNumber = searchValues.LicenseNumber
      params.Name = searchValues.Name
      params.VehicleCategoryCode = searchValues.VehicleCategoryCode
      params.VehicleColor = searchValues.VehicleColor
    }
    carTagRelList(params)
  }
  /**
   * 获取数据列表详细信息查询（tab3）
   * @param pageIndex
   * @param searchValues
   */
  getDatadetailBike (pageIndex, searchValues) {
    const { getNonmotorTagRelList } = this.props
    console.log(3333)

    let params = {
      pageIndex: pageIndex,
      pageSize: 10
    }
    if (searchValues) {
      params.tagId = searchValues.tagId
      params.deviceno = searchValues.deviceno
      params.owner = searchValues.owner
      params.placeCode = searchValues.placeCode
      params.model = searchValues.model
    }
    getNonmotorTagRelList(params)
  }
  // 新增人员标签 start
  showModal () {
    this.setState({
      visible: true
    })
  }
  idNumbersBlur (e) {
    let params = { idNumber: this.state.idNumbers }
    const { queryByIdNum } = this.props
    queryByIdNum(params)
    const { peopleSearchName, peopleSearchPhone, peopleSearchnation } = this.props
    console.log(peopleSearchName, '这里是失去焦点事件')
    this.setState({
      peopleSearchName: peopleSearchName,
      peopleSearchPhone: peopleSearchPhone,
      peopleSearchnation: peopleSearchnation
    })
  }
  handleOk (e) {
    const { addNePeopleTags, peopleSearchId } = this.props
    // const password = this.passwordInput.value
    if (!peopleSearchId) {
      message.warning('身份证号有误')
      return null
    }
    var idChecked = document.getElementsByName('checkbos')
    var checkboxValue = []
    for (var i = 0; i < idChecked.length; i++) {
      if (idChecked[i].checked) { checkboxValue.push(idChecked[i].value) }
    }
    console.log(checkboxValue)
    if (checkboxValue === '') {
      message.warning('请选择标签')
      return null
    }
    console.log(peopleSearchId, 888)

    let params = {}
    params.personID = peopleSearchId
    params.tagIds = checkboxValue.join(',')
    params.idNumber = this.idNumbers.value
    addNePeopleTags(params)
    for (var j = 0; j < idChecked.length; j++) {
      if (idChecked[j].checked) {
        idChecked[j].checked = false
      }
    }
    this.setState({
      visible: false,
      peopleCall: '',
      idNumbers: '',
      peopleName: '',
      peopleNation: '',
      peopleSearchName: '',
      peopleSearchPhone: '',
      peopleSearchnation: ''
    })
    setTimeout(this.props.personTagRelList({ pageIndex: 0, pageSize: 10 }), 1000)
  }
  handleCancel (e) {
    var idChecked = document.getElementsByName('checkbos')
    for (var j = 0; j < idChecked.length; j++) {
      if (idChecked[j].checked) {
        idChecked[j].checked = false
      }
    }
    this.setState({
      visible: false,
      peopleCall: '',
      idNumbers: '',
      peopleName: '',
      peopleNation: '',
      peopleSearchName: '',
      peopleSearchPhone: '',
      peopleSearchnation: ''
    })
  }
  onChange (e) {
    console.log('radio checked', e.target.value, e.target)
  }
  CheckonChange (e) {
    console.log(`checked = ${e.target.checked}`, `${e.target}`)
  }
  provinceChange (e, aa) {
    console.log(`checked = ${e.target.checked}`, `${e.target}`, aa)
  }
  aaakkk (e) {
    console.log(555662, e)
  }
  idNumbersState (e) {
    this.setState({ idNumbers: e.target.value })
  }
  onchagejdj (e) {
    console.log('checked = ', e)
  }
  // 新增人员标签 end
  // 新增人员标签 start
  carShowModal () {
    this.setState({
      carVisible: true,
      carMessage: ''
    })
  }
  carHandleOk (e) {
    const { carId, carTypeName } = this.props
    const carMessage = this.carMessage.value
    let params = {
      licenseNumber: this.state.carMessage,
      carId: carId,
      tagIds: this.state.carCheckList
    }
    console.log('lose', carId, carTypeName)
    this.props.getAddSearchCarList(params)
    console.log(carMessage)
    this.setState({
      carVisible: false,
      carMessage: ''
    })
  }
  carHandleCancel (e) {
    console.log(e)
    this.setState({
      carVisible: false,
      carMessage: ''
    })
  }
  carMessageState (e) {
    this.setState({ carMessage: e.target.value })
  }
  carMessageBlur (e) {
    const { carId, carTypeName } = this.props
    // this.setState({ carMessage: e.target.value })
    let params = {
      licenseNumber: this.state.carMessage
    }
    setTimeout(this.props.getSearchCarList(params), 500)

    console.log('lose', carId, carTypeName)
  }
  onchageCar (e) {
    console.log('checked = ', e)
    this.setState({
      carCheckList: e
    })
  }
  // 新增车辆标签 end
  // 新增非机动车标签 start
  bikeShowModal () {
    this.setState({
      bikeVisible: true,
      bikeMessage: ''
    })
  }
  bikeHandleOk (e) {
    const { bikeId } = this.props
    const bikeMessage = this.bikeMessage.value
    let params = {
      deviceNo: bikeMessage,
      nonmotorId: bikeId,
      tagIds: this.state.bikeCheckList
    }
    this.props.addNonmotorByDeviceNo(params)
    // console.log(carMessage)
    this.setState({
      bikeVisible: false,
      bikeMessage: ''
    })
    let param = {
      pageIndex: 0,
      pageSize: 10
    }
    setTimeout(this.props.getNonmotorTagRelList(param), 500)
  }
  bikeHandleCancel (e) {
    console.log(e)
    this.setState({
      bikeVisible: false,
      bikeMessage: ''
    })
  }
  bikeMessageState (e) {
    this.setState({ bikeMessage: e.target.value })
  }
  bikeMessageBlur (e) {
    let params = {
      deviceNo: this.state.bikeMessage
    }
    this.props.getNonmotorByDeviceNo(params)
  }
  onchageBike (e) {
    console.log('checked = ', e)
    this.setState({
      bikeCheckList: e.join(',')
    })
  }
  // 新增非机动车标签 end

  render () {
    const { nonmotorTagRelList, counts
      , tagTypeSelectList, count, newTagList, carTagRelSelectList, isdataArrayCarEnd, dataArrayBike, dataArrayCar, isdataArrayBikeEnd
      , nationTypes, isRequestNationTypesEnd, bikeCheckBoxList, carCheckBoxList, vehicleColor, carTypeName,
      tagTypeList, personTypeChange, tagPersonList, personVal, presonTagSelectChange, personTypeVal, bikeTypeName, bikevehicleColor } = this.props
    console.log(11111, bikeCheckBoxList, bikeTypeName, tagTypeList)
    const {
      peopleSearchPhone, peopleSearchnation, peopleSearchName } = this.state
    console.log(peopleSearchName, 222)
    if (!isdataArrayCarEnd) {
      return null
    }
    if (!isdataArrayBikeEnd) {
      return null
    }
    if (!isRequestNationTypesEnd) {
      return null
    }
    this.formConfig[2].options = nationTypes
    this.formConfigCar[0].options = dataArrayCar
    this.formConfigBike[0].options = dataArrayBike
    // this.formConfigBike[4].options = nationTypes
    // this.formConfigCar[4].options = nationTypes
    console.log(nonmotorTagRelList, 5566888)
    return (
      <div className='vlabel'>
        <Tabs onChange={callback} type="card">
          <TabPane tab="人员标签管理" key="1">
            <div className='levelFour'>
              <div style={{ width: 'calc(100% - 90px)', display: 'inline-block' }}>
                <Select
                  value={personTypeVal}
                  style={{ width: 200 }}
                  placeholder={'请选择人员类型标签'}
                  onChange={(value) => {
                    personTypeChange(value, { id: value })
                  }}
                >
                  {
                    tagTypeList.map(item =>
                      <Option key={item.value} value={item.value}>{item.label}</Option>
                    )
                  }
                </Select>
                <Select
                  value={personVal}
                  style={{ width: 200, marginLeft: 20, marginRight: 20 }}
                  placeholder={'请选择人员标签'}
                  onChange={(value, item, e) => { presonTagSelectChange(value) }}
                >
                  {
                    tagPersonList.map(item =>
                      <Option key={item.value} value={item.value}>{item.label}</Option>
                    )
                  }
                </Select>
              </div>
              <Button type="primary" onClick={() => this.showModal() } style={{ width: '80px' }} >新增</Button>
            </div>
            <SearchForm
              style={{ marginBottom: '0' }}
              formConfig={this.formConfig}
              doSearch={(values) => { this.getDataList(0, values) }}
            />
            <IotTable
              topButtons={this.tableTopButtons}
              columns={this.tableColumns}
              dataSource={tagTypeSelectList}
              totalPage={count}
              onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
            />
          </TabPane>
          <TabPane tab="机动车标签管理" key="2">
            <SearchForm
              formConfig={this.formConfigCar}
              doSearch={(values) => { this.getDatadetails(0, values) }}
            />
            <div className='levelFour'>
              <div style={{ width: 'calc(100% - 90px)', display: 'inline-block' }}></div>
              <Button type="primary" style={{ width: '80px' }} onClick={(e) => this.carShowModal(e)}>新增</Button>
            </div>
            <IotTable
              topButtons={this.tableTopButtons}
              columns={this.tableColumnsCar}
              dataSource={carTagRelSelectList}
              totalPage={count}
              onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
            />
          </TabPane>
          <TabPane tab="非机动车标签管理" key="3">
            <SearchForm
              formConfig={this.formConfigBike}
              doSearch={(values) => { this.getDatadetailBike(0, values) }}
            />
            <div className='levelFour'>
              <div style={{ width: 'calc(100% - 90px)', display: 'inline-block' }}></div>
              <Button type="primary" style={{ width: '80px' }} onClick={(e) => this.bikeShowModal(e)}>新增</Button>
            </div>
            <IotTable
              topButtons={this.tableTopButtons}
              columns={this.tableColumnsBike}
              dataSource={nonmotorTagRelList}
              totalPage={counts}
              onChange={(pagination) => { this.getDatadetailBike(pagination.current - 1, this.searchValues) }}
            />
          </TabPane>
        </Tabs>
        <Modal title="新增人员标签" visible={this.state.visible} width={'70%'}
          onOk={(e) => this.handleOk(e)} onCancel={(e) => this.handleCancel(e)}
        >
          <div className='label_type'>
            <Row>
              <Col span={3}></Col>
              <Col span={2}><div style={{ marginTop: '15px' }}>人员信息:</div></Col>
              <Col span={16}>
                <div style={{ marginTop: '15px', width: '80px', display: 'inline-block' }}>身份证号:</div>
                <input
                  style={{ width: '300px' }} type="text" className='form-input ant-input'
                  onChange={(e) => this.idNumbersState(e)}
                  value={this.state.idNumbers}
                  onBlur={(e) => this.idNumbersBlur(e) }
                  ref={(el) => { this.idNumbers = el }}
                  placeholder="请输入身份证号"
                />
                <div style={{ marginTop: '15px', width: '80px', display: 'inline-block', marginLeft: '35px' }}>姓&emsp;&emsp;名:</div>
                <input
                  style={{ width: '300px' }} type="text"
                  className='form-input ant-input noChangeVal'
                  readOnly
                  // onChange={(e) => this.peopleNameState(e)}
                  value={peopleSearchName}
                  // ref={(el) => { this.peopleName = el }}
                  placeholder="请输入机构名称"
                /><br/>
                <div style={{ marginTop: '15px', width: '80px', display: 'inline-block' }}>民&emsp;&emsp;族:</div>
                <input
                  readOnly
                  style={{ width: '300px' }} type="text"
                  className='form-input ant-input noChangeVal'
                  // onChange={(e) => this.peopleNationState(e)}
                  value={peopleSearchnation}
                  // ref={(el) => { this.peopleNation = el }}
                  placeholder="请输入机构名称"
                />
                <div style={{ marginTop: '15px', width: '80px', display: 'inline-block', marginLeft: '35px' }}>联系方式:</div>
                <input
                  style={{ width: '300px' }} type="text"
                  className='form-input ant-input noChangeVal'
                  readOnly
                  // onChange={(e) => this.peopleCallState(e)}
                  value={peopleSearchPhone}
                  // ref={(el) => { this.peopleCall = el }}
                  placeholder="请输入机构名称"
                /><br/>
              </Col>
              <Col span={3}></Col>
            </Row>
            <Row>
              <Col span={3}></Col>
              <Col span={2}><div style={{ marginTop: '15px' }}>设置标签信息:</div></Col>
              <Col span={16}>
                <div className='chooseRadioBox'>
                  {(newTagList || []).map((item, key) =>
                    <p key={key} className='chooseRadio'>
                      {/* <span value={item.id} onClick={(e) => this.aaakkk(e)} style={{ background: '#d0e7ff', marginRight: '15px', padding: '5px 8px', borderRadius: '8px' }}>{item.name}:</span> */}
                      {
                        item.lists.map((item1, number) => {
                          return (
                            <span key={number}>
                              <input type='checkbox' name='checkbos' value={item1.id} style={{ height: '20px', width: '20px', marginRight: '8px' }}/>{item1.name}
                            </span>
                          )
                        })
                      }
                    </p>
                  )
                  }
                </div>

              </Col>
              <Col span={3}></Col>
            </Row>

          </div>
        </Modal>
        <Modal title="新增车辆标签" visible={this.state.carVisible} width={'70%'}
          onOk={(e) => this.carHandleOk(e)} onCancel={(e) => this.carHandleCancel(e)}
        >
          <div className='label_type'>
            <Row>
              <Col span={3}></Col>
              <Col span={2}><div style={{ marginTop: '15px' }}>人员信息:</div></Col>
              <Col span={16}>
                <div style={{ marginTop: '15px', width: '80px', display: 'inline-block' }}>车辆信息:</div>
                <input style={{ width: '300px' }} type="text" className='form-input ant-input'
                  onChange={(e) => this.carMessageState(e)}
                  onBlur={(e) => this.carMessageBlur(e) }
                  value={this.state.carMessage}
                  ref={(el) => { this.carMessage = el }}
                  placeholder="请输入机构名称"
                />
                <div style={{ marginTop: '15px', width: '80px', display: 'inline-block', marginLeft: '35px' }}>车&emsp;&emsp;型:</div>
                <input readOnly style={{ width: '300px' }} type="text" className='noChangeVal form-input ant-input' value={carTypeName}/><br/>
                <div style={{ marginTop: '15px', width: '80px', display: 'inline-block' }}>颜&emsp;&emsp;色:</div>
                <input readOnly style={{ width: '300px' }} type="text" className='noChangeVal form-input ant-input' value={vehicleColor}/>
              </Col>
              <Col span={3}></Col>
            </Row>
            <Row>
              <Col span={3}></Col>
              <Col span={2}><div style={{ marginTop: '15px' }}>设置标签信息:</div></Col>
              <Col span={16}>
                {/* <RadioGroup onChange={(e) => this.onChange(e)} value={this.state.value}>
                  <Radio value={1}>A</Radio>
                  <Radio value={2}>B</Radio>
                  <Radio value={3}>C</Radio>
                  <Radio value={4}>D</Radio>
                </RadioGroup> */}
                <div className='chooseRadioBox'>
                  <CheckboxGroup options={carCheckBoxList} onChange={(e) => this.onchageCar(e)} />

                </div>

              </Col>
              <Col span={3}></Col>
            </Row>

          </div>
        </Modal>
        <Modal title="新增非机动车标签" visible={this.state.bikeVisible} width={'70%'}
          onOk={(e) => this.bikeHandleOk(e)} onCancel={(e) => this.bikeHandleCancel(e)}
        >
          <div className='label_type'>
            <Row>
              <Col span={3}></Col>
              <Col span={2}><div style={{ marginTop: '15px' }}>人员信息:</div></Col>
              <Col span={16}>
                <div style={{ marginTop: '15px', width: '80px', display: 'inline-block' }}>车辆信息:</div>
                <input style={{ width: '300px' }} type="text" className='form-input ant-input'
                  onChange={(e) => this.bikeMessageState(e)}
                  onBlur={(e) => this.bikeMessageBlur(e) }
                  value={this.state.bikeMessage}
                  ref={(el) => { this.bikeMessage = el }}
                  placeholder="请输入机构名称"
                />
                <div style={{ marginTop: '15px', width: '80px', display: 'inline-block', marginLeft: '35px' }}>车&emsp;&emsp;型:</div>
                <input readOnly style={{ width: '300px' }} type="text" className='noChangeVal form-input ant-input' value={bikeTypeName}/><br/>
                <div style={{ marginTop: '15px', width: '80px', display: 'inline-block' }}>所属场所:</div>
                <input readOnly style={{ width: '300px' }} type="text" className='noChangeVal form-input ant-input' value={bikevehicleColor}/>
              </Col>
              <Col span={3}></Col>
            </Row>
            <Row>
              <Col span={3}></Col>
              <Col span={2}><div style={{ marginTop: '15px' }}>设置标签信息:</div></Col>
              <Col span={16}>
                <div className='chooseRadioBox'>
                  <CheckboxGroup options={bikeCheckBoxList} onChange={(e) => this.onchageBike(e)} />
                </div>

              </Col>
              <Col span={3}></Col>
            </Row>

          </div>
        </Modal>
      </div>
    )
  }
}
// function provinceChange (e) {
//   // console.log(`checked = ${e.target.checked}`, `${e.target}`, aa)
//   console.log(e)
//   console.log(1111);
// }
function mapStateToProps (state) {
  return {
    carManageList: state.default.populationFloatingReducer.get('carManageList'),
    totalPage: state.default.populationFloatingReducer.get('totalPage'),
    placeFloating: state.default.manageReducer.get('placeFloating'),
    getPopulation: state.default.manageReducer.get('getPopulation'),
    tagTypeList: state.default.manageReducer.get('tagTypeList'),
    tagPersonList: state.default.manageReducer.get('tagPersonList'),
    personVal: state.default.manageReducer.get('personVal'),
    personTypeVal: state.default.manageReducer.get('personTypeVal'),
    outFloatingList: state.default.populationFloatingReducer.get('outFloatingList'),
    getPopulationList: state.default.populationFloatingReducer.get('getPopulationList'),
    getdetailedInformationList: state.default.populationFloatingReducer.get('getdetailedInformationList'),
    activeLink: state.default.manageReducer.get('activeLink'),
    tabs: state.default.manageReducer.get('tabs'),
    // 标签列表
    newTagList: state.default.livePlaceReducer.get('newTagList'),
    tagTypeSelectList: state.default.livePlaceReducer.get('tagTypeSelectList'),
    carTagRelSelectList: state.default.livePlaceReducer.get('carTagRelSelectList'),
    selectTagList: state.default.livePlaceReducer.get('selectTagList'),
    bikeCheckBoxList: state.default.livePlaceReducer.get('bikeCheckBoxList'),
    carCheckBoxList: state.default.livePlaceReducer.get('carCheckBoxList'),
    nonmotorTagRelList: state.default.livePlaceReducer.get('nonmotorTagRelList'),
    carId: state.default.livePlaceReducer.get('carId'),
    carTypeName: state.default.livePlaceReducer.get('carTypeName'),
    vehicleColor: state.default.livePlaceReducer.get('vehicleColor'),
    isdataArrayCarEnd: state.default.manageReducer.get('isdataArrayCarEnd'),
    dataArrayBike: state.default.manageReducer.get('dataArrayBike'),
    dataArrayCar: state.default.manageReducer.get('dataArrayCar'),
    isdataArrayBikeEnd: state.default.manageReducer.get('isdataArrayBikeEnd'),
    nationTypes: state.default.manageReducer.get('nationTypes'),
    isRequestNationTypesEnd: state.default.manageReducer.get('isRequestNationTypesEnd'),
    // 新增带出
    peopleSearchName: state.default.livePlaceReducer.get('peopleSearchName'),
    peopleSearchId: state.default.livePlaceReducer.get('peopleSearchId'),
    peopleSearchPhone: state.default.livePlaceReducer.get('peopleSearchPhone'),
    peopleSearchnation: state.default.livePlaceReducer.get('peopleSearchnation'),
    bikeTypeName: state.default.livePlaceReducer.get('bikeTypeName'),
    bikevehicleColor: state.default.livePlaceReducer.get('bikevehicleColor'),
    bikeId: state.default.livePlaceReducer.get('bikeId')
  }
}
function callback (key) {
  console.log(key)
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setActiveLink,
    getPopulationDetail, tagTypePersonSelect,
    personTagRelList, carTagRelList, getCarTagsTypes, getNationTypes, carLicenseNumList, getbikeTagsSearch,
    getSearchCarList, getAddSearchCarList, selectPresonTypeList, personTypeChange, presonTagSelectChange, addNePeopleTags,
    queryByIdNum, getCarList, getNonmotorTagRelList, getNonmotorByDeviceNo, addNonmotorByDeviceNo,
    getPopulationHouseList, getPopulationCarList, getBikeDetailsList }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(vehicleLabelManage)
