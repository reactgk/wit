import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Popover } from 'antd'
import IotTable from '../../component/table/IotTable'

class PointCarTable extends PureComponent {
  constructor (props) {
    super(props)
    this.carTableColumns = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      { title: '车牌号码', dataIndex: 'idplate', key: 'idplate' },
      { title: '通行场所', dataIndex: 'pointName', key: 'pointName' },
      {
        title: '出入标识', dataIndex: 'devImport', key: 'devImport',
        render: (value) => <span>{value === '1' ? '进' : '出'}</span>
      },
      { title: '出入时间', dataIndex: 'recordTime', key: 'recordTime' }
    ]
  }

  render () {
    const { lastCarInfo, carList } = this.props
    return (
      <div className="point-real-time-data-item" style={{ marginLeft: 20 }}>
        <div className="point-real-time-data-item-info breathe-bg">
          <div style={{ position: 'relative' }}>
            <div style={{ paddingTop: 10 }}>
              <p className="point-real-time-data-item-info-item">
                <span className="point-real-time-data-item-info-item-text">车牌号</span>
                {lastCarInfo.idplate || '--'}
              </p>
              <p className="point-real-time-data-item-info-item">
                <span className="point-real-time-data-item-info-item-text">车牌颜色</span>
                {lastCarInfo.plateColor || '--'}
              </p>
              <p className="point-real-time-data-item-info-item">
                <span className="point-real-time-data-item-info-item-text">车身颜色</span>
                {lastCarInfo.carColor || '--'}
              </p>
            </div>
            <div className="point-real-time-data-item-img-container" style={{ marginTop: 10 }}>
              <Popover title="全车照片" content={<img style={{ float: 'left', height: 480, width: 800 }} src={lastCarInfo.imageFullPlate}/>} trigger="hover">
                <img style={{ display: 'inline-block', verticalAlign: 'top', height: 120, width: 200 }} src={lastCarInfo.imageFullPlate}/>
              </Popover>
              {/* <img
                style={{ display: 'inline-block', verticalAlign: 'top', height: 84, width: 120 }}
                src={lastCarInfo.imageFullPlate}/> */}
            </div>
          </div>
          <p className="point-real-time-data-item-info-item">
            <span className="point-real-time-data-item-info-item-text">车辆进入状态</span>
            {lastCarInfo.dataType || '--'}
          </p>
          <p className="point-real-time-data-item-info-item">
            <span className="point-real-time-data-item-info-item-text">车辆进入时间</span>
            {lastCarInfo.recordTime || '--'}
          </p>
          <p className="point-real-time-data-item-info-item">
            <span className="point-real-time-data-item-info-item-text">通行场所</span>
            {lastCarInfo.pointName || '--'}
          </p>
        </div>
        <IotTable
          isShowPagination={false}
          columns={this.carTableColumns}
          dataSource={carList}/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    carList: state.default.pointRealTimeDataReducer.get('carList'),
    lastCarInfo: state.default.pointRealTimeDataReducer.get('lastCarInfo')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PointCarTable)
