import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import IotTable from '../component/table/IotTable'
import { Tabs, Row, Col, Popover } from 'antd'
// import '../commonmange.less'
import '../commonmanage/commonmange.less'
import { carLicenseNumList } from '../../../redux/actions/livePlaceAction'
const TabPane = Tabs.TabPane
class carDetails extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      value: 1,
      checkDataList: []
    }
    this.tableColumnsCar = [
      { title: '序号', dataIndex: 'relationship', key: 'relationship',
        render (text, record, index) {
          return (
            <span>{ index + 1}</span>
          )
        }
      },
      { title: '姓名', dataIndex: 'personName', key: 'personName',
        render: (text, record) => {
          let content = ''
          content = (
            <div>
              <p>姓名：{record.personName}</p>
              {/* <p>通行方式：{record.throughPoint}</p>
            <p>通行场所：{record.throughPlace}</p>
            <p>通行点位：{record.throughPoint}</p>
            <p>出入类型：{record.throughType}</p> */}
            </div>
          )
          return (
            <Popover title='' content={ content } trigger="hover">
              <a>{record.personName}</a>
            </Popover>)
        }
      },
      { title: '关系', dataIndex: 'relationship', key: 'relationship' }
    ]
  }
  render () {
    const { driversList, plateColorCode, tagNameList, pointName, imagePlate, devImport, parkingInfo, carTypeName, licenseNumber, vehicleColor, recordTime, regAddress, frameNumber, regTime, carTypeNames } = this.props
    return (
      <div className='houseManageModel'>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="车辆基础信息" key="1">
            <Row style={{ margin: '0 10px' }}>
              <Col span={3}></Col>
              <Col span={9}>
                <p>车牌号：{licenseNumber}</p>
                <p>车牌颜色：{plateColorCode}</p>
                <p>车型：{carTypeNames}</p>
                <p>车辆颜色：{vehicleColor}</p>
                <p>车属性：{carTypeName}</p>
                <p>车架号：{frameNumber}</p>
                <p>上牌时间：{recordTime}</p>
                <p>注册地：{regAddress}</p>
                <p>平台登记时间：{regTime}</p>
                <p>车辆标签：
                  {tagNameList || [].map(items =>
                    <p style={{ width: '200px', display: 'inline-block', background: '#d0e7ff' }} key={items.tagName}>{items.tagName}{items.tagName}<span>,</span></p>
                  )
                  }
                </p>
              </Col>
              <Col span={9}>
                <h3>最后一次通行信息：</h3>
                <p>通行时间：{recordTime}</p>
                {/* <p>通行方式：{inOutTpye}</p> */}
                <p>通行场所：{parkingInfo}</p>
                <p>通行点位：{pointName}</p>
                <p>出入类型：{devImport}</p>
                <div style={{ width: '200px', height: '200px' }}>
                车辆照片：<div className='img_box'><img src={imagePlate} alt=""/></div>
                </div>
              </Col>
              <Col span={3}>

              </Col>
            </Row>
          </TabPane>
          <TabPane tab="车辆附属信息" key="2">
            <div className='noPages'>
              <IotTable
                // topButtons={this.tableTopButtons}
                columns={this.tableColumnsCar}
                dataSource={driversList}
                scroll={{ y: 240 }}
                // totalPage={count}
                // onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
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
    carTypeName: state.default.livePlaceReducer.get('carTypeName'),
    vehicleColor: state.default.livePlaceReducer.get('vehicleColor'),
    carTypeNames: state.default.livePlaceReducer.get('carTypeNames'),
    regTime: state.default.livePlaceReducer.get('regTime'),
    frameNumber: state.default.livePlaceReducer.get('frameNumber'),
    plateColorCode: state.default.livePlaceReducer.get('plateColorCode'),
    regAddress: state.default.livePlaceReducer.get('regAddress'),
    recordTime: state.default.livePlaceReducer.get('recordTime'),
    pointName: state.default.livePlaceReducer.get('pointName'),
    devImport: state.default.livePlaceReducer.get('devImport'),
    imagePlate: state.default.livePlaceReducer.get('imagePlate'),
    inOutTpye: state.default.livePlaceReducer.get('inOutTpye'),
    parkingInfo: state.default.livePlaceReducer.get('parkingInfo'),
    tagNameList: state.default.livePlaceReducer.get('tagNameList'),
    licenseNumber: state.default.livePlaceReducer.get('licenseNumber'),
    driversList: state.default.livePlaceReducer.get('driversList')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ carLicenseNumList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(carDetails)
