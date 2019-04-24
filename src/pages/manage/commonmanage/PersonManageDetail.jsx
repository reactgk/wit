import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tabs, Row, Col } from 'antd'
import {
  getPersonList,
  setPersonTagStatus, setPersonWarningStatus
} from '../../../redux/actions/baseInformationManageAction'
import IotTable from '../component/table/IotTable'
import './commonmange.less'
// import {
//   ACTIVE_LINK_PERSON_DETAILS
// } from '../../../redux/actions/manageAction'
const TabPane = Tabs.TabPane
function callback (val) {
  console.log(val)
}
class peopleDetails extends PureComponent {
  constructor (props) {
    super(props)

    this.tableColumns = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      { title: '车牌号', dataIndex: 'name', key: 'name' },
      { title: '车型', dataIndex: 'sex', key: 'sex' },
      { title: '车辆颜色', dataIndex: 'nation', key: 'nation' },
      { title: '车属性', dataIndex: 'idNumber', key: 'idNumber' },
      { title: '平台登记时间', dataIndex: 'phone', key: 'phone' },
      {
        title: '操作',
        dataIndex: 'control',
        key: 'control',
        render: (text, record) => (
          <span>
            <a href="javascript:" onClick={() => { this.personControl(record) }}>{'查看'}</a>
          </span>
        )
      }
    ]
    // const { tabs, setActiveLink } = this.props
    this.tableColumnsHouse = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      { title: '场所名称', dataIndex: 'belongedPlace', key: 'belongedPlace' },
      { title: '楼栋号', dataIndex: 'houseBuilding', key: 'houseBuilding' },
      { title: '单元号', dataIndex: 'houseUnit', key: 'houseUnit' },
      { title: '层号', dataIndex: 'houseFloor', key: 'houseFloor' },
      { title: '户号', dataIndex: 'houseNumber', key: 'houseNumber' },
      { title: '房屋性质', dataIndex: 'groupid', key: 'groupid' },
      { title: '平台登记时间', dataIndex: 'groupid1', key: 'groupid1' },
      { title: '使用年限', dataIndex: 'groupid2', key: 'groupid2' },
      { title: '当前状态', dataIndex: 'groupid3', key: 'groupid3' },
      { title: '当前居住人数', dataIndex: 'groupid4', key: 'groupid4' }
      // {
      //   title: '操作',
      //   dataIndex: 'control',
      //   key: 'control',
      //   render: (text, record) => (
      //     <div className='nav-item nav-sub-item-active'
      //       onClick={() => { setActiveLink(ACTIVE_LINK_PERSON_DETAILS, tabs) }}>
      //       <span className="label">详情</span>
      //     </div >
      //   )
      // }
    ]
    this.tableColumnsCar1 = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      { title: '车牌ss号', dataIndex: 'licenseNumber', key: 'licenseNumber' },
      { title: '车型', dataIndex: 'carTypeName', key: 'carTypeName' },
      { title: '车辆颜色', dataIndex: 'vehicleColor', key: 'vehicleColor' },
      { title: '车属性', dataIndex: 'simpleTag', key: 'simpleTag',
        render: (text, record) => (
          <div>
            {
              record.simpleTag === 0 ? <span>本地车</span> : (record.simpleTag === 1 ? <span>外地车</span> : '--')
            }
          </div>
        )
      },
      { title: '平台登记时间', dataIndex: 'phone', key: 'phone' }
    ]
    this.tableColumnsCar2 = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      { title: '车牌号', dataIndex: 'licenseNumber', key: 'licenseNumber' },
      { title: '车型', dataIndex: 'carTypeName', key: 'carTypeName' },
      { title: '车辆颜色', dataIndex: 'vehicleColor', key: 'vehicleColor' },
      { title: '车属性', dataIndex: 'simpleTag', key: 'simpleTag',
        render: (text, record) => (
          <div>
            {
              record.simpleTag === 0 ? <span>本地车</span> : (record.simpleTag === 1 ? <span>外地车</span> : '--')
            }
          </div>
        )
      },
      { title: '平台登记时间', dataIndex: 'regDate', key: 'regDate' }
    ]
  }
  renderTagList (tagRelList = []) {
    const listItems = tagRelList.map((item) =>
      <li key={item.id.toString()}>
        {item.tagName}
      </li>
    )
    return (
      <ul>{listItems}</ul>
    )
  }
  componentDidMount () {

  }

  render () {
    const { populationManageDetail, populationHouseList, populationCarList, tagRelList, totalPage } = this.props

    return (
      <div className="houseManageModel">
        <Tabs defaultActiveKey="1" onChange={callback} size="large">
          <TabPane tab="人员基本信息" key="1">
            <Row style={{ margin: '0 10px' }}>
              <Col span={3}></Col>
              <Col span={9}>
                <p><span>姓名：</span><span>{populationManageDetail.name}</span></p>
                <p><span>性别：</span><span>{populationManageDetail.sex}</span></p>
                <p><span>民族：</span><span>{populationManageDetail.nation}</span></p>
                <p><span>年龄：</span><span>{populationManageDetail.age}</span></p>
                <p><span>出生年月：</span><span>{populationManageDetail.birthday}</span></p>
                <p><span>身份证号：</span><span>{populationManageDetail.idNumber}</span></p>
                <p><span>身份证有效期：</span><span>{populationManageDetail.validDateBegin + '-' + populationManageDetail.validDateEnd}</span></p>
                <p><span>证件地址：</span><span>{populationManageDetail.CurrentAddress}</span></p>
                <p><span>发证机关：</span><span>{populationManageDetail.sex}</span></p>
                <p><span>人脸照片：</span><span><img src={populationManageDetail.ImageCard} alt="" /></span></p>
                <div>
                  <span>最后一次通行信息：</span>
                  <div>
                    <span>通行时间：</span><span>{populationManageDetail.inTime}</span>
                    <span>通行方式：</span><span>{populationManageDetail.throughWay}</span>
                    <span>通行场所：</span><span>{populationManageDetail.throughPlace}</span>
                  </div>
                  <div>
                    <span>通行点位：</span><span>{populationManageDetail.throughPoint}</span>
                    <span>出入类型：</span><span>{populationManageDetail.throughType}</span>

                  </div>
                </div>
              </Col>
              <Col span={9}>
                <p><span>平台登记时间：</span><span>{populationManageDetail.RegisterTime}</span></p>
                <p><span>联系方式1：</span><span>{populationManageDetail.TelePhonr}</span></p>
                <p><span>联系方式2：</span><span>{populationManageDetail.TelePhonr}</span></p>
                <p><span>居住类型：</span><span>{populationManageDetail.validDateEnd}</span></p>
                <div><span>人员标签：</span>
                  {this.renderTagList(tagRelList)}
                  <i>编辑标签</i></div>
                <p><span>现住地址：</span><span>{populationManageDetail.CurrentAddress}</span></p>
                <div>
                  <span>证件照片：</span>
                  <div>
                    <img src="" alt="" />
                  </div>
                  <div>
                    <img src="" alt="" />
                  </div>
                </div>
                <a href=""></a>
              </Col>
              <Col span={3}></Col>
            </Row>
          </TabPane>
          <TabPane tab="附属房屋信息" key="2">
            <div className="tab-pane-container">
              <h4>房主：<span>{populationManageDetail.name}</span></h4>
              <IotTable
                columns={this.tableColumnsHouse}
                dataSource={populationHouseList}
                totalPage={totalPage}
                bordered
                onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
              />
            </div>
          </TabPane>
          <TabPane tab="附属车辆信息" key="3">
            <div className="tab-pane-container">
              <h4>机动车列表：</h4>
              <IotTable
                columns={this.tableColumnsCar1}
                dataSource={populationCarList}
                totalPage={totalPage}
                bordered
                onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
              />
              <h4>非机动车列表：</h4>
              <IotTable
                columns={this.tableColumns2Car2}
                dataSource={populationCarList}
                totalPage={totalPage}
                bordered
                onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
              />
            </div>
          </TabPane>
        </Tabs >
      </div >
    )
  }
}

function mapStateToProps (state) {
  return {
    isRequestNationTypesEnd: state.default.manageReducer.get('isRequestNationTypesEnd'),
    nationTypes: state.default.manageReducer.get('nationTypes'),
    populationManageList: state.default.populationManageReducer.get('populationManageList'),
    populationManageDetail: state.default.populationManageReducer.get('populationManageDetail'),
    populationHouseList: state.default.populationManageReducer.get('populationHouseList'),
    populationCarList: state.default.populationManageReducer.get('populationCarList'),
    tagRelList: state.default.populationManageReducer.get('tagRelList'),
    totalPage: state.default.populationManageReducer.get('totalPage')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getPersonList, setPersonTagStatus, setPersonWarningStatus }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(peopleDetails)
