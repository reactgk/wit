import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import IotTable from '../component/table/IotTable'
import {
  getPersonList,
  setPersonTagStatus, setPersonWarningStatus
} from '../../../redux/actions/baseInformationManageAction'
import { Tabs, Row, Col, Popover } from 'antd'
// import '../commonmange.less'
import '../commonmanage/commonmange.less'
const TabPane = Tabs.TabPane
class peopleDetails extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      value: 1,
      checkDataList: []
    }
    this.tableColumns = [
      { title: '姓名', dataIndex: 'name', key: 'name',
        render: (text, record) => {
          let content = ''
          content = (
            <div>
              <p>车主：{record.name}</p>
              <p>联系方式1：{record.telePhonr}</p>
              <p>联系方式2：</p>
              <p>身份证号：{record.idnumber}</p>
              <p>现居住地：{record.personLiveType}</p>
              <p>居住类型：{record.throughType}</p>
            </div>
          )
          return (
            <Popover title='' content={ content } trigger="hover">
              <a>{record.personName}</a>
            </Popover>)
        }
      },
      { title: '身份证号', dataIndex: 'VehicleCategoryCode', key: 'VehicleCategoryCode' },
      { title: '民族', dataIndex: 'nation', key: 'nation' },
      { title: '联系方式', dataIndex: 'telePhonr', key: 'telePhonr' },
      { title: '关系', dataIndex: 'personShip', key: 'personShip' }

    ]
  }
  render () {
    const { houseList, created, currentAddress, houseBuildTime, houseDuration, houseType, houseUseType, housePeople, houseLayoutImage, houseStructure, houseArea, houseNumber, houseFloor, houseUnit, houseBuilding, count, houseAddress } = this.props
    return (
      <div className='houseManageModel'>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="房屋基本信息" key="1">
            <Row style={{ margin: '0 10px' }}>
              <Col span={3}></Col>
              <Col span={9}>
                <p>场所名称：{houseAddress}</p>
                <p>楼栋号：{houseBuilding}</p>
                <p>单元号：{houseUnit}</p>
                <p>楼层号：{houseFloor}</p>
                <p>户号：{houseNumber}</p>
                <p>面积：{houseArea}</p>
                <p>结构：{houseStructure}</p>
                <div style={{ width: '200px', height: '200px' }}>
                户型图：<div className='img_box' style={{ width: '100px', height: '100px', marginLeft: '100px' }}><img src={houseLayoutImage} alt=""/></div>
                </div>
              </Col>
              <Col span={9}>
                <p>户主：{housePeople}</p>
                <p>当前状态：{houseUseType}</p>
                <p>房屋性质：{houseType}</p>
                <p>建造年份：{houseBuildTime}</p>
                <p>使用年限：{houseDuration}</p>
                <p>地址：{currentAddress}</p>
                <p>平台登记时间：{created}</p>
              </Col>
              <Col span={3}>

              </Col>
            </Row>
          </TabPane>
          <TabPane tab="居住人员及关系" key="2">
            <div className='noPages'>
              <IotTable
                topButtons={this.tableTopButtons}
                columns={this.tableColumns}
                dataSource={houseList}
                totalPage={count}
                onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
              />
            </div>

          </TabPane>
        </Tabs>
      </div>
    )
  }
}
function callback (key) {
  console.log(key)
}
function mapStateToProps (state) {
  return {
    houseAddress: state.default.livePlaceReducer.get('houseAddress'),
    houseBuilding: state.default.livePlaceReducer.get('houseBuilding'),
    houseNumber: state.default.livePlaceReducer.get('houseNumber'),
    houseFloor: state.default.livePlaceReducer.get('houseFloor'),
    houseArea: state.default.livePlaceReducer.get('houseArea'),
    houseStructure: state.default.livePlaceReducer.get('houseStructure'),
    houseLayoutImage: state.default.livePlaceReducer.get('houseLayoutImage'),
    housePeople: state.default.livePlaceReducer.get('housePeople'),
    houseUseType: state.default.livePlaceReducer.get('houseUseType'),
    houseType: state.default.livePlaceReducer.get('houseType'),
    houseBuildTime: state.default.livePlaceReducer.get('houseBuildTime'),
    houseDuration: state.default.livePlaceReducer.get('houseDuration'),
    currentAddress: state.default.livePlaceReducer.get('currentAddress'),
    created: state.default.livePlaceReducer.get('created'),
    houseList: state.default.livePlaceReducer.get('houseList'),
    houseUnit: state.default.livePlaceReducer.get('houseUnit')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getPersonList, setPersonTagStatus, setPersonWarningStatus }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(peopleDetails)
