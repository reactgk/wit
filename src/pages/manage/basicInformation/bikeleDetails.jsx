import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getPersonList,
  setPersonTagStatus, setPersonWarningStatus
} from '../../../redux/actions/baseInformationManageAction'
import { Row, Col } from 'antd'
// import '../commonmange.less'
import '../commonmanage/commonmange.less'
class bikeDetails extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      value: 1,
      checkDataList: []
    }
    this.tableColumnsCar = [
      { title: '车牌号', dataIndex: 'licenseNumber', key: 'licenseNumber' },
      { title: '车型', dataIndex: 'VehicleCategoryCode', key: 'VehicleCategoryCode' },
      { title: '颜色', dataIndex: 'VehicleColor', key: 'VehicleColor' },
      { title: '车主', dataIndex: 'Name', key: 'Name' },
      { title: '当前标签', dataIndex: 'tagNames', key: 'tagNames' }

    ]
  }
  render () {
    const { inOut, lastPointName, lastPlaceName, lastTime, phone, idCard, owner, okTime, ragTime, pruchasedate, deviceNo, brand, model, sealno, color, place } = this.props
    return (
      <div className='houseManageModel'>
        <Row style={{ margin: '0 10px' }}>
          <Col span={3}></Col>
          <Col span={9}>
            <h2>车辆基本信息</h2>
            <p>标签编号：{deviceNo}</p>
            <p>车辆类型：{model}</p>
            <p>车辆品牌：{brand}</p>
            <p>车辆颜色：{color}</p>
            <p>钢印编号：{sealno}</p>
            <p>所属场所：{place}</p>
            <p>上牌时间：{pruchasedate}</p>
            <p>平台登记时间：{ragTime}</p>
            <p>安装时间：{okTime}</p>
          </Col>
          <Col span={9}>
            <h3>车主信息</h3>
            <p>车主：{owner}</p>
            <p>身份证号：{idCard}</p>
            <p>联系方式：{phone}</p>
            <h3>最后一次通行信息：</h3>
            <p>通行时间：{lastTime}</p>
            <p>通行方式：{inOut}</p>
            <p>通行场所：{lastPlaceName}</p>
            <p>通行点位：{lastPointName}</p>
            <p>出入类型：进</p>
            <div style={{ width: '200px', height: '200px' }}>
                车辆照片：<div className='img_box' style={{ width: '100px', height: '100px', marginLeft: '100px' }}><img src="../../../assets/images/login-content-bg.png" alt=""/></div>
            </div>
          </Col>
          <Col span={3}>
          </Col>
        </Row>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    brand: state.default.livePlaceReducer.get('brand'),
    model: state.default.livePlaceReducer.get('model'),
    color: state.default.livePlaceReducer.get('color'),
    sealno: state.default.livePlaceReducer.get('sealno'),
    place: state.default.livePlaceReducer.get('place'),
    pruchasedate: state.default.livePlaceReducer.get('pruchasedate'),
    ragTime: state.default.livePlaceReducer.get('ragTime'),
    okTime: state.default.livePlaceReducer.get('okTime'),
    owner: state.default.livePlaceReducer.get('owner'),
    idCard: state.default.livePlaceReducer.get('idCard'),
    phone: state.default.livePlaceReducer.get('phone'),
    lastTime: state.default.livePlaceReducer.get('lastTime'),
    lastPlaceName: state.default.livePlaceReducer.get('lastPlaceName'),
    lastPointName: state.default.livePlaceReducer.get('lastPointName'),
    inOut: state.default.livePlaceReducer.get('inOut'),
    deviceNo: state.default.livePlaceReducer.get('deviceNo')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getPersonList, setPersonTagStatus, setPersonWarningStatus }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(bikeDetails)
