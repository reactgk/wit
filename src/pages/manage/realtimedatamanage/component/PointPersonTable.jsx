import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import IotTable from '../../component/table/IotTable'

class PointPersonTable extends PureComponent {
  constructor (props) {
    super(props)
    this.personTableColumns = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      { title: '人员姓名', dataIndex: 'name', key: 'name' },
      { title: '身份证号', dataIndex: 'idNumber', key: 'idNumber' },
      {
        title: '通行场所', dataIndex: 'devAddress', key: 'devAddress'
      },
      { title: '出入时间', dataIndex: 'detectTime', key: 'detectTime' }
    ]
  }
  render () {
    const { lastPersonInfo, personList } = this.props
    return (
      <div className="point-real-time-data-item">
        <div className="point-real-time-data-item-info breathe-bg">
          <div style={{ position: 'relative' }}>
            <div>
              <p className="point-real-time-data-item-info-item">
                <span className="point-real-time-data-item-info-item-text">姓名</span>
                {lastPersonInfo.name || '--'}
              </p>
              <p className="point-real-time-data-item-info-item">
                <span className="point-real-time-data-item-info-item-text">性别</span>
                {lastPersonInfo.sex || '--'}
              </p>

              <p className="point-real-time-data-item-info-item">
                <span className="point-real-time-data-item-info-item-text">民族</span>
                {lastPersonInfo.nation || '--'}
              </p>
            </div>
            <div className="point-real-time-data-item-img-container">
              <img
                style={{ display: 'inline-block', verticalAlign: 'top', height: 84, width: 80, marginRight: 20 }}
                src={lastPersonInfo.imageFace}/>
              <img style={{ height: 84, width: 100 }} src={lastPersonInfo.imageCard}/>
            </div>
          </div>
          <p className="point-real-time-data-item-info-item">
            <span className="point-real-time-data-item-info-item-text">出生</span>
            {lastPersonInfo.birthday || '--'}
          </p>
          <p className="point-real-time-data-item-info-item">
            <span className="point-real-time-data-item-info-item-text">通行时间</span>
            {lastPersonInfo.detectTime || '--'}
          </p>
          <p className="point-real-time-data-item-info-item">
            <span className="point-real-time-data-item-info-item-text">身份证号</span>
            {lastPersonInfo.idNumber || '--'}
          </p>
          <p className="point-real-time-data-item-info-item">
            <span className="point-real-time-data-item-info-item-text">通行场所</span>
            {lastPersonInfo.devAddress || '--'}
          </p>
        </div>
        <IotTable
          isShowPagination={false}
          columns={this.personTableColumns}
          dataSource={personList}/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    personList: state.default.pointRealTimeDataReducer.get('personList'),
    lastPersonInfo: state.default.pointRealTimeDataReducer.get('lastPersonInfo')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PointPersonTable)
