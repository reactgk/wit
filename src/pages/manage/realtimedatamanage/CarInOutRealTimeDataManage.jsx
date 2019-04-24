import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import IotTable from '../component/table/IotTable'
import { Popover } from 'antd'
import { getCarList } from '../../../redux/actions/carInOutRealTimeDataAction.js'

class CarInOutRealTimeDataManage extends PureComponent {
  constructor (props) {
    super(props)
    this.tableColumns = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      { title: '车牌号', dataIndex: 'idplate', key: 'idplate' },
      { title: '通行时间', dataIndex: 'recordTime', key: 'recordTime' },
      { title: '车辆类型', dataIndex: 'carCompare', key: 'carCompare' },
      {
        title: '出入类型', dataIndex: 'devImport', key: 'devImport',
        render: value => <span>{value === '1' ? '进' : value === '2' ? '出' : '--'}</span>
      },
      { title: '通行场所', dataIndex: 'placeName', key: 'placeName' },
      { title: '通行点位', dataIndex: 'pointName', key: 'pointName' },
      { title: '设备名称', dataIndex: 'devName', key: 'devName' },
      {
        title: '车牌照片', dataIndex: 'imagePlate', key: 'imagePlate',
        render: (data) =>
          <Popover title="车牌照片" content={<img src={data}/>} trigger="hover">
            <img style={{ height: 40 }} src={data}/>
          </Popover>
      },
      {
        title: '全车照片', dataIndex: 'imageFullPlate', key: 'imageFullPlate',
        render: (data) =>
          <Popover title="全车照片" content={<img src={data}/>} trigger="hover">
            <img style={{ height: 40 }} src={data}/>
          </Popover>
      },
      {
        title: '车主', dataIndex: 'ownerName', key: 'ownerName',
        render: (data, record) =>
          <Popover title="车主信息" content={ this.renderPersonInfo(record.owner || {}) } trigger="hover">
            <a>{data}</a>
          </Popover>
      },
      {
        title: '驾驶人', dataIndex: 'driver', key: 'driver',
        render: (data, record) => {
          if (record.driverReged === '1') {
            return (
              <Popover title="车主信息" content={ this.renderPersonInfo(data || {}) } trigger="hover">
                <a>{(data || {})['name']}</a>
              </Popover>
            )
          } else {
            return <span>{(data || {})['name']}</span>
          }
        }
      }
    ]
  }

  componentDidMount () {
    this.getDataList()
  }

  renderPersonInfo (person) {
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

  getDataList () {
    const { getCarList } = this.props
    const requestEndCallback = () => {
      this.timer = setTimeout(() => {
        if (!this.isDestory) {
          this.getDataList()
        }
      }, 3000)
    }
    getCarList(requestEndCallback)
  }

  componentWillUnmount () {
    this.isDestory = true
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  render () {
    const { carList } = this.props
    return (
      <div>
        <IotTable
          isShowPagination={false}
          columns={this.tableColumns}
          dataSource={ carList }
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    carList: state.default.carInOutRealTimeDataReducer.get('carList')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getCarList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CarInOutRealTimeDataManage)
